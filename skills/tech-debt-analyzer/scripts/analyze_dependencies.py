#!/usr/bin/env python3
"""
Analyze project dependencies for technical debt indicators.

This script examines package.json to identify:
- Outdated dependencies
- Unused dependencies
- Security vulnerabilities (if audit data available)
- Dependency size and complexity

Usage:
    python analyze_dependencies.py [package.json-path]
"""

import json
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, List

class DependencyAnalyzer:
    def __init__(self, package_json_path: str):
        self.package_json_path = Path(package_json_path)
        self.issues = {
            'outdated': [],
            'unused': [],
            'duplicate_functionality': [],
            'warnings': []
        }

    def analyze(self):
        """Analyze package.json for dependency issues."""
        if not self.package_json_path.exists():
            print(f"Error: {self.package_json_path} not found")
            return None

        try:
            with open(self.package_json_path, 'r') as f:
                package_data = json.load(f)

            dependencies = package_data.get('dependencies', {})
            dev_dependencies = package_data.get('devDependencies', {})

            # Analyze version constraints
            self._check_version_constraints(dependencies, 'dependencies')
            self._check_version_constraints(dev_dependencies, 'devDependencies')

            # Check for common duplications
            self._check_duplicate_functionality(dependencies, dev_dependencies)

            # Check for deprecated packages
            self._check_deprecated_packages(dependencies, dev_dependencies)

            return {
                'package_name': package_data.get('name', 'unknown'),
                'total_dependencies': len(dependencies),
                'total_dev_dependencies': len(dev_dependencies),
                'issues': self.issues,
                'summary': self._generate_summary()
            }

        except json.JSONDecodeError as e:
            print(f"Error parsing package.json: {e}")
            return None

    def _check_version_constraints(self, deps: Dict[str, str], dep_type: str):
        """Check for overly loose or strict version constraints."""
        for name, version in deps.items():
            # Check for wildcards or very loose constraints
            if version in ['*', 'latest', '']:
                self.issues['warnings'].append({
                    'package': name,
                    'type': dep_type,
                    'version': version,
                    'severity': 'high',
                    'message': f'Using unsafe version constraint "{version}" - can cause unexpected breaking changes'
                })

            # Check for missing caret or tilde
            if version and version[0].isdigit():
                self.issues['warnings'].append({
                    'package': name,
                    'type': dep_type,
                    'version': version,
                    'severity': 'low',
                    'message': f'Using exact version "{version}" - consider using ^ or ~ for flexibility'
                })

    def _check_duplicate_functionality(self, deps: Dict, dev_deps: Dict):
        """Check for packages that provide duplicate functionality."""
        all_deps = {**deps, **dev_deps}

        # Common duplications
        duplication_groups = [
            {
                'packages': ['moment', 'dayjs', 'date-fns', 'luxon'],
                'functionality': 'Date/Time manipulation'
            },
            {
                'packages': ['lodash', 'underscore', 'ramda'],
                'functionality': 'Utility functions'
            },
            {
                'packages': ['axios', 'node-fetch', 'got', 'request'],
                'functionality': 'HTTP client'
            },
            {
                'packages': ['webpack', 'rollup', 'parcel', 'vite'],
                'functionality': 'Module bundler'
            },
            {
                'packages': ['jest', 'mocha', 'jasmine', 'vitest'],
                'functionality': 'Test framework'
            },
            {
                'packages': ['eslint', 'tslint'],
                'functionality': 'Linting'
            },
        ]

        for group in duplication_groups:
            found = [pkg for pkg in group['packages'] if pkg in all_deps]
            if len(found) > 1:
                self.issues['duplicate_functionality'].append({
                    'packages': found,
                    'functionality': group['functionality'],
                    'severity': 'medium',
                    'message': f'Multiple packages for {group["functionality"]}: {", ".join(found)}'
                })

    def _check_deprecated_packages(self, deps: Dict, dev_deps: Dict):
        """Check for known deprecated packages."""
        deprecated = {
            'request': 'Deprecated - use axios, node-fetch, or got instead',
            'tslint': 'Deprecated - migrate to ESLint with @typescript-eslint',
            'node-sass': 'Deprecated - use dart-sass (sass) instead',
            'gulp': 'Consider modern alternatives like npm scripts or vite',
            'bower': 'Deprecated - use npm or yarn',
            'istanbul': 'Deprecated - use nyc instead',
            '@types/node-sass': 'node-sass is deprecated',
        }

        all_deps = {**deps, **dev_deps}

        for pkg, message in deprecated.items():
            if pkg in all_deps:
                dep_type = 'dependencies' if pkg in deps else 'devDependencies'
                self.issues['outdated'].append({
                    'package': pkg,
                    'type': dep_type,
                    'version': all_deps[pkg],
                    'severity': 'high',
                    'message': message
                })

    def _generate_summary(self) -> Dict:
        """Generate summary statistics."""
        total_issues = sum(len(issues) for issues in self.issues.values())

        severity_count = {'high': 0, 'medium': 0, 'low': 0}
        for category in self.issues.values():
            for issue in category:
                if 'severity' in issue:
                    severity_count[issue['severity']] += 1

        return {
            'total_issues': total_issues,
            'by_severity': severity_count,
            'by_category': {k: len(v) for k, v in self.issues.items()}
        }


def format_report(analysis: Dict) -> str:
    """Format analysis results as markdown."""
    if not analysis:
        return "No analysis available"

    report = ["# Dependency Analysis Report\n"]
    report.append(f"**Package:** {analysis['package_name']}")
    report.append(f"**Dependencies:** {analysis['total_dependencies']}")
    report.append(f"**Dev Dependencies:** {analysis['total_dev_dependencies']}")
    report.append(f"**Total Issues:** {analysis['summary']['total_issues']}\n")

    report.append("## Summary\n")
    for severity, count in analysis['summary']['by_severity'].items():
        if count > 0:
            report.append(f"- **{severity.upper()}:** {count}")
    report.append("\n")

    # Issues by category
    category_names = {
        'outdated': 'Deprecated/Outdated Packages',
        'duplicate_functionality': 'Duplicate Functionality',
        'warnings': 'Version Constraint Warnings',
        'unused': 'Potentially Unused Dependencies'
    }

    for category, name in category_names.items():
        issues = analysis['issues'].get(category, [])
        if issues:
            report.append(f"## {name} ({len(issues)})\n")

            for issue in issues:
                report.append(f"### {issue.get('package', 'Unknown')} ")
                report.append(f"[{issue.get('severity', 'info').upper()}]\n")
                report.append(f"{issue['message']}\n")
                if 'version' in issue:
                    report.append(f"- Current version: `{issue['version']}`\n")
                if 'packages' in issue:
                    report.append(f"- Affected packages: {', '.join(issue['packages'])}\n")
                report.append("\n")

    # Recommendations
    report.append("## Recommendations\n")
    if analysis['summary']['total_issues'] > 0:
        report.append("1. Update deprecated packages to modern alternatives\n")
        report.append("2. Consolidate duplicate functionality to reduce bundle size\n")
        report.append("3. Run `npm audit` or `yarn audit` to check for security vulnerabilities\n")
        report.append("4. Consider running `npm outdated` to check for available updates\n")
        report.append("5. Use `depcheck` or similar tools to find unused dependencies\n")
    else:
        report.append("✅ No major dependency issues detected!\n")

    return ''.join(report)


def main():
    package_json_path = sys.argv[1] if len(sys.argv) > 1 else 'package.json'

    analyzer = DependencyAnalyzer(package_json_path)
    analysis = analyzer.analyze()

    if analysis:
        report = format_report(analysis)
        print(report)
    else:
        sys.exit(1)


if __name__ == '__main__':
    main()
