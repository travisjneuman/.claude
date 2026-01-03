#!/bin/bash
#
# Project Initialization Script
# Auto-generated quality-of-life tool for multi-window workflows
#
# Purpose: Gracefully start development environment after context window refresh
# Usage: ./init.sh

set -e  # Exit on error

echo "🚀 Initializing project environment..."
echo ""

# Print current directory for orientation
echo "📍 Working directory: $(pwd)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -f "pyproject.toml" ] && [ ! -f "go.mod" ] && [ ! -f "Cargo.toml" ]; then
    echo "⚠️  Warning: No package manifest found. Are you in the project root?"
    echo ""
fi

# Install dependencies if needed
echo "📦 Checking dependencies..."
if [ -f "package.json" ]; then
    if [ ! -d "node_modules" ]; then
        echo "   Installing npm dependencies..."
        npm install
    else
        echo "   ✅ Node modules already installed"
    fi
fi

if [ -f "requirements.txt" ]; then
    echo "   Checking Python dependencies..."
    pip list > /dev/null 2>&1 || pip install -r requirements.txt
fi

if [ -f "Cargo.toml" ]; then
    echo "   ✅ Rust project detected"
fi

if [ -f "go.mod" ]; then
    echo "   ✅ Go project detected"
fi

echo ""

# Run linter
echo "🔍 Running linter..."
if [ -f "package.json" ]; then
    npm run lint --if-present || echo "   ⚠️  Linter not configured or failed"
elif [ -f "pyproject.toml" ] || [ -f "setup.py" ]; then
    ruff check . 2>/dev/null || echo "   ⚠️  Ruff not installed or failed"
fi

echo ""

# Run tests
echo "🧪 Running test suite..."
if [ -f "package.json" ]; then
    npm test --if-present || echo "   ⚠️  Tests failed or not configured"
elif [ -f "pyproject.toml" ] || [ -f "setup.py" ]; then
    pytest 2>/dev/null || python -m pytest 2>/dev/null || echo "   ⚠️  Tests failed or pytest not installed"
elif [ -f "Cargo.toml" ]; then
    cargo test || echo "   ⚠️  Tests failed"
elif [ -f "go.mod" ]; then
    go test ./... || echo "   ⚠️  Tests failed"
fi

echo ""

# Check git status
echo "📊 Git status:"
git status --short || echo "   Not a git repository"

echo ""

# Show recent commits for context
echo "📜 Recent commits:"
git log --oneline -5 2>/dev/null || echo "   Not a git repository"

echo ""

# Check for progress notes
if [ -f "progress.md" ]; then
    echo "📝 Progress notes found:"
    tail -20 progress.md
    echo ""
fi

# Check for test tracking
if [ -f "tests.json" ]; then
    echo "✅ Test tracking file found (tests.json)"
    echo ""
fi

# Check for research notes
if [ -f "research-notes.md" ]; then
    echo "🔬 Research notes found (research-notes.md)"
    echo ""
fi

echo "✨ Initialization complete!"
echo ""
echo "Next steps:"
echo "  1. Review progress.md (if exists) to understand current state"
echo "  2. Check git log for recent work"
echo "  3. Review tests.json (if exists) for test status"
echo "  4. Continue work on next todo item"
echo ""
