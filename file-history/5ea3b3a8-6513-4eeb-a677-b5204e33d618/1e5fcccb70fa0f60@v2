/**
 * WebContainer Service
 *
 * Manages WebContainer lifecycle:
 * - Boot/teardown
 * - File system operations
 * - Process spawning
 * - Dev server management
 *
 * WebContainer runs a full Node.js environment in the browser
 * using WebAssembly. Requires Cross-Origin Isolation headers.
 */

import { WebContainer, type FileSystemTree } from '@webcontainer/api';
import { logger } from '../logger';
import { usePhantomShellStore } from '../../stores/usePhantomShellStore';

const log = logger.module('PhantomShell:WebContainer');

// Singleton instance
let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

// ==================== BOOT ====================

/**
 * Boot WebContainer instance (singleton)
 *
 * This is an expensive operation (~2-5 seconds) so we:
 * 1. Only boot once per session
 * 2. Reuse the same instance
 * 3. Show loading state to user
 */
export const bootWebContainer = async (): Promise<WebContainer> => {
  // Return existing instance
  if (webcontainerInstance) {
    log.debug('Returning existing WebContainer instance');
    return webcontainerInstance;
  }

  // Return pending boot
  if (bootPromise) {
    log.debug('Waiting for pending WebContainer boot');
    return bootPromise;
  }

  // Check for Cross-Origin Isolation
  if (typeof crossOriginIsolated !== 'undefined' && !crossOriginIsolated) {
    const error = 'WebContainer requires Cross-Origin Isolation. ' +
      'Ensure COEP and COOP headers are set in vite.config.ts and public/_headers';
    log.error(error);
    usePhantomShellStore.getState().setWebContainerError(error);
    throw new Error(error);
  }

  // Start boot process
  log.info('Booting WebContainer...');
  usePhantomShellStore.getState().setWebContainerBooting(true);

  bootPromise = WebContainer.boot()
    .then((instance) => {
      webcontainerInstance = instance;
      usePhantomShellStore.getState().setWebContainerReady(true);
      usePhantomShellStore.getState().setWebContainerBooting(false);

      log.info('WebContainer booted successfully');

      // Set up server-ready listener for dev servers
      instance.on('server-ready', (port, url) => {
        log.info('Dev server ready', { port, url });
        usePhantomShellStore.getState().setDevServer(url, port);
        usePhantomShellStore.getState().setDevServerRunning(true);
      });

      return instance;
    })
    .catch((error) => {
      log.error('WebContainer boot failed', { error });
      usePhantomShellStore.getState().setWebContainerError(String(error));
      usePhantomShellStore.getState().setWebContainerBooting(false);
      bootPromise = null;
      throw error;
    });

  return bootPromise;
};

/**
 * Get WebContainer instance (must be booted first)
 */
export const getWebContainer = (): WebContainer | null => {
  return webcontainerInstance;
};

// ==================== FILE SYSTEM ====================

/**
 * Mount a file system tree to WebContainer
 */
export const mountFileSystem = async (
  files: FileSystemTree,
  path: string = '/'
): Promise<void> => {
  const container = await bootWebContainer();
  log.debug('Mounting file system', { path, fileCount: Object.keys(files).length });
  await container.mount(files, { mountPoint: path });
  log.info('File system mounted', { path });
};

/**
 * Read a file from WebContainer
 */
export const readFile = async (path: string): Promise<string> => {
  const container = await bootWebContainer();
  return container.fs.readFile(path, 'utf-8');
};

/**
 * Write a file to WebContainer
 */
export const writeFile = async (path: string, contents: string): Promise<void> => {
  const container = await bootWebContainer();
  await container.fs.writeFile(path, contents);
  log.debug('File written', { path, size: contents.length });
};

/**
 * Create directory in WebContainer
 */
export const mkdir = async (path: string, recursive = true): Promise<void> => {
  const container = await bootWebContainer();
  if (recursive) {
    await container.fs.mkdir(path, { recursive: true });
  } else {
    await container.fs.mkdir(path);
  }
  log.debug('Directory created', { path });
};

/**
 * List directory contents
 */
export const readdir = async (path: string): Promise<string[]> => {
  const container = await bootWebContainer();
  return container.fs.readdir(path);
};

/**
 * Remove file or directory
 */
export const rm = async (path: string, recursive: boolean = false): Promise<void> => {
  const container = await bootWebContainer();
  await container.fs.rm(path, { recursive });
  log.debug('Removed', { path, recursive });
};

// ==================== PROCESS MANAGEMENT ====================

/**
 * Spawn a process in WebContainer
 */
export const spawn = async (
  command: string,
  args: string[],
  options?: { cwd?: string; env?: Record<string, string> }
) => {
  const container = await bootWebContainer();
  log.info('Spawning process', { command, args });
  return container.spawn(command, args, options);
};

// ==================== PROJECT TEMPLATES ====================

export const PROJECT_TEMPLATES: Record<string, FileSystemTree> = {
  'react-vite': {
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: 'phantom-project',
          private: true,
          version: '0.0.0',
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview',
          },
          dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0',
          },
          devDependencies: {
            '@vitejs/plugin-react': '^4.0.0',
            vite: '^5.0.0',
          },
        }, null, 2),
      },
    },
    'vite.config.js': {
      file: {
        contents: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
      },
    },
    'index.html': {
      file: {
        contents: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Phantom Project</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`,
      },
    },
    src: {
      directory: {
        'main.jsx': {
          file: {
            contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
          },
        },
        'App.jsx': {
          file: {
            contents: `export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Hello from Phantom Shell!</h1>
      <p>Edit src/App.jsx to get started.</p>
    </div>
  )
}`,
          },
        },
      },
    },
  },

  'node-basic': {
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: 'phantom-node-project',
          version: '1.0.0',
          type: 'module',
          scripts: {
            start: 'node index.js',
          },
        }, null, 2),
      },
    },
    'index.js': {
      file: {
        contents: `console.log('Hello from Phantom Shell!');
console.log('Node version:', process.version);
`,
      },
    },
  },
};

/**
 * Create project from template
 */
export const createProjectFromTemplate = async (
  projectName: string,
  template: keyof typeof PROJECT_TEMPLATES
): Promise<void> => {
  const files = PROJECT_TEMPLATES[template];
  if (!files) {
    throw new Error(`Unknown template: ${template}`);
  }

  // Deep clone to avoid mutating the template
  const filesCopy = JSON.parse(JSON.stringify(files)) as FileSystemTree;

  // Update package.json with project name
  const pkgJson = filesCopy['package.json'];
  if (pkgJson && 'file' in pkgJson && 'contents' in pkgJson.file) {
    const contents = pkgJson.file.contents;
    if (typeof contents === 'string') {
      const pkg = JSON.parse(contents);
      pkg.name = projectName;
      pkgJson.file.contents = JSON.stringify(pkg, null, 2);
    }
  }

  await mountFileSystem(filesCopy);
  log.info('Project created from template', { projectName, template });
};

// ==================== TEARDOWN ====================

/**
 * Teardown WebContainer (call on unmount)
 */
export const teardownWebContainer = (): void => {
  if (webcontainerInstance) {
    webcontainerInstance = null;
    bootPromise = null;

    const store = usePhantomShellStore.getState();
    store.setWebContainerReady(false);
    store.setDevServer(null, null);
    store.setDevServerRunning(false);

    log.info('WebContainer references cleared');
  }
};

// ==================== UTILITIES ====================

/**
 * Check if WebContainer is supported and enabled
 */
export const isWebContainerSupported = (): {
  supported: boolean;
  reason?: string;
} => {
  if (typeof SharedArrayBuffer === 'undefined') {
    return {
      supported: false,
      reason: 'SharedArrayBuffer not available (requires Cross-Origin Isolation)',
    };
  }

  if (typeof crossOriginIsolated !== 'undefined' && !crossOriginIsolated) {
    return {
      supported: false,
      reason: 'Cross-Origin Isolation not enabled (COEP/COOP headers required)',
    };
  }

  return { supported: true };
};
