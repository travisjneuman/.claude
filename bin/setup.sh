#!/bin/bash
# Cross-platform setup script for Claude Code toolkit
# Works on macOS, Linux, and Windows (Git Bash)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$(dirname "$SCRIPT_DIR")"
BIN_DIR="$SCRIPT_DIR"

echo "Setting up Claude Code toolkit..."
echo "Bin directory: $BIN_DIR"

# Detect OS
case "$(uname -s)" in
    Darwin)
        OS="macos"
        ;;
    Linux)
        OS="linux"
        ;;
    MINGW*|MSYS*|CYGWIN*)
        OS="windows"
        ;;
    *)
        OS="unknown"
        ;;
esac

echo "Detected OS: $OS"

# On Windows, create python3 shim if python3 doesn't exist
if [[ "$OS" == "windows" ]]; then
    if ! command -v python3 &> /dev/null; then
        echo "Creating python3 shim for Windows..."

        # Create python3 bash script (for Git Bash)
        cat > "$BIN_DIR/python3" << 'EOF'
#!/bin/bash
python "$@"
EOF
        chmod +x "$BIN_DIR/python3"

        # Create python3.cmd (for cmd.exe/PowerShell)
        cat > "$BIN_DIR/python3.cmd" << 'EOF'
@echo off
python %*
EOF

        # Try to copy to WindowsApps if it exists and is writable
        WINDOWS_APPS="$USERPROFILE/AppData/Local/Microsoft/WindowsApps"
        if [[ -d "$WINDOWS_APPS" && -w "$WINDOWS_APPS" ]]; then
            cp "$BIN_DIR/python3.cmd" "$WINDOWS_APPS/python3.cmd" 2>/dev/null && \
                echo "Installed python3.cmd to WindowsApps (already in PATH)" || \
                echo "Note: Could not copy to WindowsApps. Add $BIN_DIR to your PATH manually."
        else
            echo "Note: Add $BIN_DIR to your PATH for python3 to work globally."
        fi
    else
        echo "python3 already available, skipping shim creation."
    fi
fi

# Make scripts executable
chmod +x "$BIN_DIR"/*.sh 2>/dev/null || true
chmod +x "$BIN_DIR/python3" 2>/dev/null || true

# Check if bin is in PATH
if [[ ":$PATH:" != *":$BIN_DIR:"* ]]; then
    echo ""
    echo "IMPORTANT: Add the bin directory to your PATH for full functionality."
    echo ""
    if [[ "$OS" == "windows" ]]; then
        echo "For Windows (PowerShell as Administrator):"
        echo '  [Environment]::SetEnvironmentVariable("Path", $env:Path + ";'"$BIN_DIR"'", "User")'
    else
        echo "Add this line to your shell profile (~/.bashrc, ~/.zshrc, etc.):"
        echo "  export PATH=\"\$PATH:$BIN_DIR\""
    fi
    echo ""
fi

# Run git hooks setup
SETUP_HOOKS="$CLAUDE_DIR/scripts/setup-hooks.sh"
if [[ -f "$SETUP_HOOKS" ]]; then
    echo ""
    echo "Installing git hooks and running plugin maintenance..."
    bash "$SETUP_HOOKS"
fi

echo ""
echo "Setup complete!"
echo ""
echo "What was configured:"
echo "  - python3 shim for Windows compatibility (if needed)"
echo "  - Plugin line endings fixed (CRLF -> LF)"
echo "  - Git hooks installed for automatic maintenance"
echo ""
echo "Automatic maintenance:"
echo "  - Line endings will be fixed after 'git pull'"
echo "  - Run 'bash ~/.claude/scripts/update-plugins.sh' to update plugins"
