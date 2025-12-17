/**
 * Centralized Error Handling Service
 * Provides consistent error handling patterns across the application
 *
 * Features:
 * - Typed error categories for each domain
 * - Error logging with context
 * - User-friendly error messages
 * - Error recovery suggestions
 * - Development vs production error handling
 */

/**
 * Error categories for different domains
 */
export const ErrorCategory = {
  // Storage & Data
  STORAGE: 'storage',
  INDEXEDDB: 'indexeddb',
  PERSISTENCE: 'persistence',

  // AI & Providers
  AI_PROVIDER: 'ai_provider',
  AI_RATE_LIMIT: 'ai_rate_limit',
  AI_QUOTA: 'ai_quota',
  AI_NETWORK: 'ai_network',

  // Security
  ENCRYPTION: 'encryption',
  AUTHENTICATION: 'authentication',

  // UI & Components
  WIDGET: 'widget',
  RENDER: 'render',

  // Network
  NETWORK: 'network',
  API: 'api',

  // General
  VALIDATION: 'validation',
  UNKNOWN: 'unknown',
} as const;

export type ErrorCategory = (typeof ErrorCategory)[keyof typeof ErrorCategory];

/**
 * Error severity levels
 */
export const ErrorSeverity = {
  /** Informational - logged but not shown to user */
  INFO: 'info',
  /** Warning - shown briefly, operation continues */
  WARNING: 'warning',
  /** Error - shown to user, operation failed but app continues */
  ERROR: 'error',
  /** Critical - shown prominently, may require user action */
  CRITICAL: 'critical',
} as const;

export type ErrorSeverity = (typeof ErrorSeverity)[keyof typeof ErrorSeverity];

/**
 * Structured application error
 */
export interface AppError {
  /** Unique error ID for tracking */
  id: string;
  /** Error category for routing/handling */
  category: ErrorCategory;
  /** Severity level */
  severity: ErrorSeverity;
  /** Technical error message (for logs) */
  message: string;
  /** User-friendly message (for display) */
  userMessage: string;
  /** Original error if wrapped */
  originalError?: Error;
  /** Additional context */
  context?: Record<string, unknown>;
  /** Suggested recovery action */
  recoveryAction?: string;
  /** Timestamp */
  timestamp: Date;
  /** Whether error was reported to user */
  reported: boolean;
}

/**
 * Error listener callback type
 */
type ErrorListener = (error: AppError) => void;

/**
 * Error service configuration
 */
interface ErrorServiceConfig {
  /** Enable console logging in development */
  enableConsoleLogging: boolean;
  /** Maximum errors to keep in history */
  maxHistorySize: number;
  /** Auto-dismiss timeout for non-critical errors (ms) */
  autoDismissTimeout: number;
}

/**
 * Default user-friendly messages by category
 */
const DEFAULT_USER_MESSAGES: Record<ErrorCategory, string> = {
  [ErrorCategory.STORAGE]: 'Unable to save your data. Please try again.',
  [ErrorCategory.INDEXEDDB]: 'Database error. Your data may not be saved.',
  [ErrorCategory.PERSISTENCE]: 'Failed to persist changes.',
  [ErrorCategory.AI_PROVIDER]: 'AI service temporarily unavailable.',
  [ErrorCategory.AI_RATE_LIMIT]: 'Too many requests. Please wait a moment.',
  [ErrorCategory.AI_QUOTA]: 'API quota exceeded. Check your usage limits.',
  [ErrorCategory.AI_NETWORK]: 'Cannot connect to AI service. Check your internet.',
  [ErrorCategory.ENCRYPTION]: 'Encryption error. Please verify your password.',
  [ErrorCategory.AUTHENTICATION]: 'Authentication failed. Please try again.',
  [ErrorCategory.WIDGET]: 'Widget failed to load. Try refreshing.',
  [ErrorCategory.RENDER]: 'Display error occurred.',
  [ErrorCategory.NETWORK]: 'Network error. Check your connection.',
  [ErrorCategory.API]: 'Service request failed.',
  [ErrorCategory.VALIDATION]: 'Invalid input provided.',
  [ErrorCategory.UNKNOWN]: 'An unexpected error occurred.',
};

/**
 * Recovery suggestions by category
 */
const RECOVERY_SUGGESTIONS: Record<ErrorCategory, string> = {
  [ErrorCategory.STORAGE]: 'Try clearing browser cache or using a different browser.',
  [ErrorCategory.INDEXEDDB]: 'Refresh the page. If issue persists, export and reimport your data.',
  [ErrorCategory.PERSISTENCE]: 'Your changes are saved locally. They will sync when connection is restored.',
  [ErrorCategory.AI_PROVIDER]: 'Try switching to a different AI provider in settings.',
  [ErrorCategory.AI_RATE_LIMIT]: 'Wait 30 seconds before trying again.',
  [ErrorCategory.AI_QUOTA]: 'Upgrade your plan or switch to a free provider.',
  [ErrorCategory.AI_NETWORK]: 'Check your internet connection and try again.',
  [ErrorCategory.ENCRYPTION]: 'Re-enter your encryption password.',
  [ErrorCategory.AUTHENTICATION]: 'Log out and log back in.',
  [ErrorCategory.WIDGET]: 'Remove and re-add the widget.',
  [ErrorCategory.RENDER]: 'Refresh the page.',
  [ErrorCategory.NETWORK]: 'Check your internet connection.',
  [ErrorCategory.API]: 'Try again in a few moments.',
  [ErrorCategory.VALIDATION]: 'Check your input and try again.',
  [ErrorCategory.UNKNOWN]: 'Refresh the page. If issue persists, contact support.',
};

/**
 * Generate unique error ID
 */
function generateErrorId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Centralized Error Service
 */
class ErrorService {
  private config: ErrorServiceConfig;
  private listeners: Set<ErrorListener> = new Set();
  private errorHistory: AppError[] = [];
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.config = {
      enableConsoleLogging: this.isDevelopment,
      maxHistorySize: 100,
      autoDismissTimeout: 5000,
    };
  }

  /**
   * Update service configuration
   */
  configure(config: Partial<ErrorServiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Subscribe to error events
   */
  subscribe(listener: ErrorListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Create and handle an error
   */
  handleError(
    category: ErrorCategory,
    message: string,
    options: {
      severity?: ErrorSeverity;
      userMessage?: string;
      originalError?: Error;
      context?: Record<string, unknown>;
      recoveryAction?: string;
      silent?: boolean;
    } = {}
  ): AppError {
    const {
      severity = ErrorSeverity.ERROR,
      userMessage = DEFAULT_USER_MESSAGES[category],
      originalError,
      context,
      recoveryAction = RECOVERY_SUGGESTIONS[category],
      silent = false,
    } = options;

    const error: AppError = {
      id: generateErrorId(),
      category,
      severity,
      message,
      userMessage,
      originalError,
      context,
      recoveryAction,
      timestamp: new Date(),
      reported: false,
    };

    // Add to history
    this.errorHistory.push(error);
    if (this.errorHistory.length > this.config.maxHistorySize) {
      this.errorHistory.shift();
    }

    // Log in development
    if (this.config.enableConsoleLogging) {
      this.logError(error);
    }

    // Notify listeners (unless silent)
    if (!silent) {
      error.reported = true;
      this.listeners.forEach((listener) => listener(error));
    }

    return error;
  }

  /**
   * Handle an unknown error (catch-all)
   */
  handleUnknownError(error: unknown, context?: Record<string, unknown>): AppError {
    if (error instanceof Error) {
      return this.handleError(ErrorCategory.UNKNOWN, error.message, {
        originalError: error,
        context,
      });
    }

    return this.handleError(ErrorCategory.UNKNOWN, String(error), { context });
  }

  /**
   * Convenience methods for common error types
   */
  storageError(message: string, originalError?: Error): AppError {
    return this.handleError(ErrorCategory.STORAGE, message, { originalError });
  }

  aiProviderError(message: string, provider?: string, originalError?: Error): AppError {
    return this.handleError(ErrorCategory.AI_PROVIDER, message, {
      originalError,
      context: { provider },
    });
  }

  networkError(message: string, url?: string, originalError?: Error): AppError {
    return this.handleError(ErrorCategory.NETWORK, message, {
      originalError,
      context: { url },
    });
  }

  validationError(message: string, field?: string): AppError {
    return this.handleError(ErrorCategory.VALIDATION, message, {
      severity: ErrorSeverity.WARNING,
      context: { field },
    });
  }

  widgetError(message: string, widgetId?: string, originalError?: Error): AppError {
    return this.handleError(ErrorCategory.WIDGET, message, {
      originalError,
      context: { widgetId },
    });
  }

  encryptionError(message: string, originalError?: Error): AppError {
    return this.handleError(ErrorCategory.ENCRYPTION, message, {
      severity: ErrorSeverity.CRITICAL,
      originalError,
    });
  }

  /**
   * Log error to console (development)
   */
  private logError(error: AppError): void {
    const prefix = `[${error.category.toUpperCase()}]`;
    const style = this.getLogStyle(error.severity);

    console.groupCollapsed(`%c${prefix} ${error.message}`, style);
    console.log('Error ID:', error.id);
    console.log('Severity:', error.severity);
    console.log('User Message:', error.userMessage);
    console.log('Recovery:', error.recoveryAction);
    if (error.context) {
      console.log('Context:', error.context);
    }
    if (error.originalError) {
      console.log('Original Error:', error.originalError);
    }
    console.groupEnd();
  }

  /**
   * Get console log style based on severity
   */
  private getLogStyle(severity: ErrorSeverity): string {
    switch (severity) {
      case ErrorSeverity.INFO:
        return 'color: #3b82f6';
      case ErrorSeverity.WARNING:
        return 'color: #f59e0b; font-weight: bold';
      case ErrorSeverity.ERROR:
        return 'color: #ef4444; font-weight: bold';
      case ErrorSeverity.CRITICAL:
        return 'color: #dc2626; font-weight: bold; background: #fef2f2; padding: 2px 4px';
      default:
        return '';
    }
  }

  /**
   * Get error history
   */
  getHistory(): ReadonlyArray<AppError> {
    return this.errorHistory;
  }

  /**
   * Get recent errors (last N)
   */
  getRecentErrors(count: number = 10): ReadonlyArray<AppError> {
    return this.errorHistory.slice(-count);
  }

  /**
   * Clear error history
   */
  clearHistory(): void {
    this.errorHistory = [];
  }

  /**
   * Get auto-dismiss timeout
   */
  getAutoDismissTimeout(): number {
    return this.config.autoDismissTimeout;
  }
}

// Export singleton instance
export const errorService = new ErrorService();

// Export convenience function for try-catch blocks
export function withErrorHandling<T>(
  fn: () => T,
  category: ErrorCategory,
  errorMessage: string
): T | undefined {
  try {
    return fn();
  } catch (error) {
    errorService.handleError(category, errorMessage, {
      originalError: error instanceof Error ? error : undefined,
    });
    return undefined;
  }
}

// Export async version
export async function withErrorHandlingAsync<T>(
  fn: () => Promise<T>,
  category: ErrorCategory,
  errorMessage: string
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    errorService.handleError(category, errorMessage, {
      originalError: error instanceof Error ? error : undefined,
    });
    return undefined;
  }
}
