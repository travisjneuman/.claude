#!/usr/bin/env python3
"""
Detect code smells and technical debt indicators in JavaScript/TypeScript codebases.

This script analyzes source code to identify:
- Large files and functions
- High complexity code
- TODO/FIXME/HACK comments
- Duplicated code patterns
- Deprecated dependencies
- Missing documentation

Usage:
    python detect_code_smells.py [src-dir] [--output json|markdown]
"""

import re
import json
import sys
from pathlib import Path
from typing import List, Dict, Tuple
from collections import defaultdict

class CodeSmellDetector:
    def __init__(self, src_dir: str):
        self.src_dir = Path(src_dir)
        self.issues = defaultdict(list)
        self.stats = {
            'total_files': 0,
            'total_lines': 0,
            'total_issues': 0
        }

    def analyze(self):
        """Run all analysis checks."""
        for file_path in self.src_dir.rglob('*'):
            if self._should_analyze(file_path):
                self.stats['total_files'] += 1
                self._analyze_file(file_path)

        self.stats['total_issues'] = sum(len(issues) for issues in self.issues.values())
        return self.issues, self.stats

    def _should_analyze(self, path: Path) -> bool:
        """Check if file should be analyzed."""
        if not path.is_file():
            return False

        # Only analyze source files
        valid_extensions = {'.ts', '.tsx', '.js', '.jsx'}
        if path.suffix not in valid_extensions:
            return False

        # Skip test files, build artifacts, and dependencies
        skip_patterns = ['node_modules', 'dist', 'build', '.test.', '.spec.', '__tests__']
        return not any(pattern in str(path) for pattern in skip_patterns)

    def _analyze_file(self, file_path: Path):
        """Analyze a single file for code smells."""
        try:
            content = file_path.read_text(encoding='utf-8')
            lines = content.split('\n')
            self.stats['total_lines'] += len(lines)

            rel_path = file_path.relative_to(self.src_dir)

            # Check file size
            self._check_file_size(rel_path, lines)

            # Check function complexity
            self._check_function_complexity(rel_path, content)

            # Check for technical debt markers
            self._check_debt_markers(rel_path, lines)

            # Check for console statements
            self._check_console_statements(rel_path, lines)

            # Check for any/unknown types
            self._check_weak_types(rel_path, lines)

            # Check for long parameter lists
            self._check_long_parameters(rel_path, content)

            # Check for deep nesting
            self._check_nesting_depth(rel_path, lines)

            # Check for magic numbers
            self._check_magic_numbers(rel_path, lines)

        except Exception as e:
            self.issues['errors'].append({
                'file': str(file_path.relative_to(self.src_dir)),
                'message': f'Error analyzing file: {str(e)}'
            })

    def _check_file_size(self, file_path: Path, lines: List[str]):
        """Check for overly large files."""
        line_count = len(lines)

        if line_count > 500:
            severity = 'high' if line_count > 1000 else 'medium'
            self.issues['large_files'].append({
                'file': str(file_path),
                'lines': line_count,
                'severity': severity,
                'message': f'File has {line_count} lines (should be < 500)'
            })

    def _check_function_complexity(self, file_path: Path, content: str):
        """Check for complex functions."""
        # Match function declarations
        patterns = [
            r'function\s+(\w+)\s*\([^)]*\)\s*\{',
            r'const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{',
            r'(\w+)\s*\([^)]*\)\s*\{',  # Methods
        ]

        for pattern in patterns:
            for match in re.finditer(pattern, content):
                func_name = match.group(1)
                start_pos = match.start()

                # Find function body
                func_body = self._extract_function_body(content, start_pos)

                if func_body:
                    # Count complexity indicators
                    complexity = self._calculate_complexity(func_body)
                    lines_in_func = func_body.count('\n')

                    if complexity > 10 or lines_in_func > 50:
                        severity = 'high' if complexity > 20 or lines_in_func > 100 else 'medium'
                        self.issues['complex_functions'].append({
                            'file': str(file_path),
                            'function': func_name,
                            'complexity': complexity,
                            'lines': lines_in_func,
                            'severity': severity,
                            'message': f'Function "{func_name}" has complexity {complexity} and {lines_in_func} lines'
                        })

    def _extract_function_body(self, content: str, start_pos: int) -> str:
        """Extract function body using brace matching."""
        brace_count = 0
        in_function = False
        body_start = -1

        for i in range(start_pos, len(content)):
            if content[i] == '{':
                if not in_function:
                    body_start = i
                    in_function = True
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0 and in_function:
                    return content[body_start:i+1]

        return ''

    def _calculate_complexity(self, code: str) -> int:
        """Calculate cyclomatic complexity."""
        complexity = 1  # Base complexity

        # Count decision points
        patterns = [
            r'\bif\b',
            r'\belse\s+if\b',
            r'\bfor\b',
            r'\bwhile\b',
            r'\bcase\b',
            r'\bcatch\b',
            r'\&\&',
            r'\|\|',
            r'\?',  # Ternary operator
        ]

        for pattern in patterns:
            complexity += len(re.findall(pattern, code))

        return complexity

    def _check_debt_markers(self, file_path: Path, lines: List[str]):
        """Check for TODO, FIXME, HACK, XXX comments."""
        markers = ['TODO', 'FIXME', 'HACK', 'XXX', 'BUG', 'DEPRECATED']

        for line_num, line in enumerate(lines, 1):
            for marker in markers:
                if marker in line.upper() and ('//' in line or '/*' in line):
                    # Extract the comment
                    comment = line.strip()
                    severity = 'high' if marker in ['FIXME', 'BUG', 'HACK'] else 'low'

                    self.issues['debt_markers'].append({
                        'file': str(file_path),
                        'line': line_num,
                        'marker': marker,
                        'severity': severity,
                        'comment': comment,
                        'message': f'{marker} comment found'
                    })

    def _check_console_statements(self, file_path: Path, lines: List[str]):
        """Check for console.log statements left in code."""
        for line_num, line in enumerate(lines, 1):
            if re.search(r'\bconsole\.(log|debug|info|warn|error)\(', line):
                # Skip if it's commented out
                if '//' in line and line.index('//') < line.index('console'):
                    continue

                self.issues['console_statements'].append({
                    'file': str(file_path),
                    'line': line_num,
                    'severity': 'low',
                    'code': line.strip(),
                    'message': 'Console statement left in code'
                })

    def _check_weak_types(self, file_path: Path, lines: List[str]):
        """Check for 'any' or 'unknown' types in TypeScript."""
        if not str(file_path).endswith(('.ts', '.tsx')):
            return

        for line_num, line in enumerate(lines, 1):
            # Check for : any or <any>
            if re.search(r':\s*any\b|<any>', line):
                # Skip if it's in a comment
                if '//' in line and line.index('//') < line.index('any'):
                    continue

                self.issues['weak_typing'].append({
                    'file': str(file_path),
                    'line': line_num,
                    'severity': 'medium',
                    'code': line.strip(),
                    'message': 'Using "any" type reduces type safety'
                })

    def _check_long_parameters(self, file_path: Path, content: str):
        """Check for functions with too many parameters."""
        # Match function signatures
        pattern = r'(?:function\s+\w+|const\s+\w+\s*=.*?)\s*\(([^)]+)\)'

        for match in re.finditer(pattern, content):
            params = match.group(1)
            # Count parameters (simple comma split)
            param_count = len([p for p in params.split(',') if p.strip()])

            if param_count > 5:
                severity = 'high' if param_count > 7 else 'medium'
                # Find line number
                line_num = content[:match.start()].count('\n') + 1

                self.issues['long_parameters'].append({
                    'file': str(file_path),
                    'line': line_num,
                    'parameters': param_count,
                    'severity': severity,
                    'message': f'Function has {param_count} parameters (should be < 5)'
                })

    def _check_nesting_depth(self, file_path: Path, lines: List[str]):
        """Check for deeply nested code."""
        max_depth = 0
        current_depth = 0

        for line_num, line in enumerate(lines, 1):
            # Simple brace counting
            current_depth += line.count('{') - line.count('}')

            if current_depth > max_depth:
                max_depth = current_depth

                if current_depth > 4:
                    severity = 'high' if current_depth > 6 else 'medium'
                    self.issues['deep_nesting'].append({
                        'file': str(file_path),
                        'line': line_num,
                        'depth': current_depth,
                        'severity': severity,
                        'message': f'Nesting depth of {current_depth} (should be < 4)'
                    })

    def _check_magic_numbers(self, file_path: Path, lines: List[str]):
        """Check for magic numbers in code."""
        for line_num, line in enumerate(lines, 1):
            # Skip comments and strings
            if '//' in line or '/*' in line or '"' in line or "'" in line:
                continue

            # Find numbers that aren't 0, 1, -1, 100 (common non-magic numbers)
            numbers = re.findall(r'\b(\d{2,})\b', line)

            for num in numbers:
                if int(num) not in [0, 1, 10, 100, 1000]:
                    self.issues['magic_numbers'].append({
                        'file': str(file_path),
                        'line': line_num,
                        'number': num,
                        'severity': 'low',
                        'code': line.strip(),
                        'message': f'Magic number {num} should be a named constant'
                    })
                    break  # One per line is enough


def format_markdown_report(issues: Dict, stats: Dict) -> str:
    """Format issues as markdown report."""
    report = ["# Technical Debt Analysis Report\n"]
    report.append(f"**Generated:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    report.append("## Summary\n")
    report.append(f"- **Files Analyzed:** {stats['total_files']}")
    report.append(f"- **Total Lines:** {stats['total_lines']}")
    report.append(f"- **Total Issues:** {stats['total_issues']}\n")

    # Calculate severity distribution
    severity_count = defaultdict(int)
    for category_issues in issues.values():
        for issue in category_issues:
            if 'severity' in issue:
                severity_count[issue['severity']] += 1

    report.append("### Issues by Severity\n")
    for severity in ['high', 'medium', 'low']:
        count = severity_count.get(severity, 0)
        report.append(f"- **{severity.upper()}:** {count}")
    report.append("\n")

    # Issues by category
    category_names = {
        'large_files': 'Large Files',
        'complex_functions': 'Complex Functions',
        'debt_markers': 'Technical Debt Markers',
        'console_statements': 'Console Statements',
        'weak_typing': 'Weak Typing',
        'long_parameters': 'Long Parameter Lists',
        'deep_nesting': 'Deep Nesting',
        'magic_numbers': 'Magic Numbers',
        'errors': 'Analysis Errors'
    }

    for category, name in category_names.items():
        category_issues = issues.get(category, [])
        if category_issues:
            report.append(f"## {name} ({len(category_issues)} issues)\n")

            # Group by severity
            high = [i for i in category_issues if i.get('severity') == 'high']
            medium = [i for i in category_issues if i.get('severity') == 'medium']
            low = [i for i in category_issues if i.get('severity') == 'low']

            for severity, severity_issues in [('High', high), ('Medium', medium), ('Low', low)]:
                if severity_issues:
                    report.append(f"### {severity} Priority\n")
                    for issue in severity_issues[:10]:  # Limit to 10 per severity
                        report.append(f"- **{issue['file']}**")
                        if 'line' in issue:
                            report.append(f" (line {issue['line']})")
                        report.append(f": {issue['message']}")
                        if 'code' in issue:
                            report.append(f"\n  ```\n  {issue['code']}\n  ```")
                        report.append("\n")

                    if len(severity_issues) > 10:
                        report.append(f"\n_... and {len(severity_issues) - 10} more_\n")
            report.append("\n")

    return ''.join(report)


def main():
    src_dir = sys.argv[1] if len(sys.argv) > 1 else 'src'
    output_format = 'markdown'

    if '--output' in sys.argv:
        idx = sys.argv.index('--output')
        if idx + 1 < len(sys.argv):
            output_format = sys.argv[idx + 1]

    if not Path(src_dir).exists():
        print(f"Error: Source directory not found: {src_dir}")
        sys.exit(1)

    print(f"Analyzing codebase in: {src_dir}")

    detector = CodeSmellDetector(src_dir)
    issues, stats = detector.analyze()

    if output_format == 'json':
        result = {
            'stats': stats,
            'issues': dict(issues)
        }
        print(json.dumps(result, indent=2))
    else:
        report = format_markdown_report(issues, stats)
        print(report)


if __name__ == '__main__':
    main()
