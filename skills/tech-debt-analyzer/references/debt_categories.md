# Technical Debt Categories and Assessment

## Overview

Technical debt represents shortcuts, workarounds, or suboptimal solutions that reduce long-term code quality and maintainability. This reference provides a comprehensive framework for identifying, categorizing, and assessing technical debt.

## Debt Categories

### 1. Code Quality Debt

Code that works but is difficult to understand, maintain, or extend.

#### Indicators

**Code Smells:**
- Large files (>500 lines)
- Long functions (>50 lines)
- High cyclomatic complexity (>10)
- Deep nesting (>4 levels)
- Long parameter lists (>5 parameters)
- Duplicate code
- Magic numbers
- Unclear naming

**Examples:**
```typescript
// Bad: Complex function with multiple responsibilities
function processUserData(data: any) {
  if (data && data.user) {
    const user = data.user;
    if (user.age > 18 && user.status === 'active') {
      if (user.permissions) {
        for (let perm of user.permissions) {
          if (perm.type === 'admin') {
            // Deep nesting, unclear logic
            if (perm.scope === 'full') {
              return { access: 'granted', level: 'admin' };
            }
          }
        }
      }
    }
  }
  return { access: 'denied' };
}
```

**Impact:**
- High maintenance cost
- Difficult to understand and modify
- Error-prone
- Slows down development

**Priority:** Medium to High (depending on frequency of changes)

---

### 2. Architectural Debt

Structural issues in how code is organized and components interact.

#### Indicators

**Tight Coupling:**
- Components directly depend on implementation details
- Difficult to test in isolation
- Changes cascade across modules

**Poor Separation of Concerns:**
- Business logic mixed with UI code
- Data access mixed with business logic
- Multiple responsibilities in single module

**Missing Abstractions:**
- No clear interfaces or contracts
- Direct dependencies on concrete implementations
- Difficulty swapping implementations

**Examples:**
```typescript
// Bad: Component tightly coupled to API implementation
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Direct API call in component
    fetch('https://api.example.com/users/123')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  // UI logic mixed with data transformation
  const displayName = user ?
    `${user.firstName} ${user.lastName}`.toUpperCase() : '';

  return <div>{displayName}</div>;
}
```

**Impact:**
- Difficult to modify or extend
- Hard to test
- Rigid architecture
- Prevents reuse

**Priority:** High (affects long-term maintainability)

---

### 3. Test Debt

Insufficient or inadequate test coverage.

#### Indicators

- Missing tests for critical functionality
- Low code coverage (<80%)
- No integration or E2E tests
- Fragile tests that break frequently
- Tests coupled to implementation details
- Slow test suite

**Test Coverage Gaps:**
- Untested edge cases
- Missing error handling tests
- No security tests
- No performance tests

**Examples:**
```typescript
// Bad: Test coupled to implementation
test('UserService', () => {
  const service = new UserService();

  // Testing internal implementation details
  expect(service.internalCache).toBeDefined();
  expect(service.apiClient.baseUrl).toBe('https://api.example.com');
});

// Missing: Actual behavior tests
// - Does it fetch users correctly?
// - Does it handle errors?
// - Does it cache properly?
```

**Impact:**
- Fear of refactoring
- Bugs slip into production
- Regression issues
- Slow development velocity

**Priority:** High for critical paths, Medium for others

---

### 4. Documentation Debt

Missing or outdated documentation.

#### Indicators

- No README or setup instructions
- Missing API documentation
- Outdated architecture diagrams
- No inline comments for complex logic
- Missing decision records (ADRs)
- No changelog

**Examples:**
```typescript
// Bad: Complex logic with no explanation
function calculatePrice(items, user, promo) {
  return items.reduce((acc, item) =>
    acc + item.price * (1 - (user.tier === 'gold' ? 0.15 :
    user.tier === 'silver' ? 0.10 : 0)) *
    (promo?.code === 'SAVE20' ? 0.8 : 1), 0
  ) * (user.country === 'US' ? 1.07 : 1);
}

// Good: Documented logic
/**
 * Calculate final price with tier discounts and tax
 *
 * Applies:
 * - Tier discount (Gold: 15%, Silver: 10%, Bronze: 0%)
 * - Promo code discount (SAVE20: 20% off)
 * - Sales tax (US: 7%, Other: 0%)
 */
function calculatePrice(items, user, promo) {
  // Implementation with clear structure
}
```

**Impact:**
- Onboarding takes longer
- Knowledge loss when developers leave
- Duplicate work
- Poor decision making

**Priority:** Medium (varies by project)

---

### 5. Dependency Debt

Issues with third-party libraries and packages.

#### Indicators

- Outdated dependencies
- Deprecated packages
- Security vulnerabilities
- Unused dependencies
- Version conflicts
- Duplicate functionality

**Examples:**
```json
{
  "dependencies": {
    "moment": "^2.24.0",      // Deprecated, use date-fns or dayjs
    "request": "^2.88.0",     // Deprecated, use axios or node-fetch
    "tslint": "^6.1.0",       // Deprecated, use ESLint
    "lodash": "^4.17.21",     // AND
    "underscore": "^1.13.1"   // Duplicate functionality
  }
}
```

**Impact:**
- Security vulnerabilities
- Missing features and bug fixes
- Larger bundle sizes
- Maintenance burden

**Priority:** High for security issues, Medium for others

---

### 6. Performance Debt

Code that works but performs poorly.

#### Indicators

- N+1 query problems
- Missing database indexes
- Inefficient algorithms
- Memory leaks
- Large bundle sizes
- Slow API responses
- Unnecessary re-renders

**Examples:**
```typescript
// Bad: N+1 query problem
async function getUsersWithPosts() {
  const users = await db.users.findAll();

  // Separate query for each user!
  for (const user of users) {
    user.posts = await db.posts.findByUserId(user.id);
  }

  return users;
}

// Good: Single query with join
async function getUsersWithPosts() {
  return db.users.findAll({
    include: [{ model: db.posts }]
  });
}
```

**Impact:**
- Poor user experience
- Higher infrastructure costs
- Scalability issues
- Customer churn

**Priority:** High for user-facing features, Medium for internal tools

---

### 7. Security Debt

Security vulnerabilities and weaknesses.

#### Indicators

- Missing input validation
- No authentication/authorization
- Exposed secrets in code
- SQL injection vulnerabilities
- XSS vulnerabilities
- CSRF vulnerabilities
- Insecure dependencies

**Examples:**
```typescript
// Bad: SQL injection vulnerability
function getUser(userId: string) {
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  return db.query(query);
}

// Bad: XSS vulnerability
function displayComment(comment: string) {
  document.getElementById('comment').innerHTML = comment;
}

// Bad: Exposed secrets
const API_KEY = 'sk_live_abc123xyz789';
```

**Impact:**
- Data breaches
- Legal liability
- Reputation damage
- Financial loss

**Priority:** Critical (immediate fix required)

---

### 8. Infrastructure/DevOps Debt

Issues with deployment, CI/CD, and infrastructure.

#### Indicators

- Manual deployment process
- No CI/CD pipeline
- Missing environment configs
- No monitoring or logging
- No backup strategy
- Hardcoded configuration
- Missing disaster recovery

**Examples:**
```typescript
// Bad: Hardcoded environment-specific values
const config = {
  apiUrl: 'https://prod-api.example.com',
  dbHost: '10.0.1.52',
  cacheEnabled: true
};

// Good: Environment-based configuration
const config = {
  apiUrl: process.env.API_URL,
  dbHost: process.env.DB_HOST,
  cacheEnabled: process.env.CACHE_ENABLED === 'true'
};
```

**Impact:**
- Deployment errors
- Downtime
- Difficult rollbacks
- Slow incident response

**Priority:** High (reduces operational risk)

---

### 9. Design Debt

UI/UX issues and inconsistencies.

#### Indicators

- Inconsistent styling
- No design system
- Accessibility issues
- Poor responsive design
- Inconsistent user flows
- Duplicate components

**Examples:**
```typescript
// Bad: Inconsistent button styling across app
<button style={{background: 'blue', padding: '10px'}}>Submit</button>
<button className="btn-primary">Submit</button>
<Button color="primary" size="lg">Submit</Button>

// Good: Consistent design system
<Button variant="primary">Submit</Button>
```

**Impact:**
- Poor user experience
- Brand inconsistency
- Accessibility compliance issues
- Higher development cost

**Priority:** Medium (varies by product)

---

## Assessment Framework

### Severity Levels

**Critical:**
- Security vulnerabilities
- Production-breaking issues
- Data loss risks
- Immediate action required

**High:**
- Significant performance issues
- Architectural problems blocking features
- High-risk areas with no tests
- Action required within sprint

**Medium:**
- Code quality issues
- Missing documentation
- Outdated dependencies (non-security)
- Address in next few sprints

**Low:**
- Minor code smells
- Optimization opportunities
- Nice-to-have improvements
- Address when convenient

### Impact Assessment

**Business Impact:**
- Does it affect user experience?
- Does it block new features?
- Does it increase costs?
- Does it create risk?

**Technical Impact:**
- How difficult to fix?
- How widespread is the issue?
- How frequently is code changed?
- What's the maintenance burden?

**Urgency:**
- Is it getting worse over time?
- Will it be harder to fix later?
- Is there a deadline or trigger event?

### Prioritization Matrix

| Impact / Effort | Low Effort | Medium Effort | High Effort |
|----------------|-----------|---------------|-------------|
| High Impact    | Do First  | Do Second     | Plan & Do   |
| Medium Impact  | Do Second | Plan & Do     | Consider    |
| Low Impact     | Quick Win | Consider      | Avoid       |

---

## Measurement Metrics

### Code Quality Metrics

- **Lines of Code (LOC):** Track file/function sizes
- **Cyclomatic Complexity:** Measure code complexity
- **Code Duplication:** Percentage of duplicated code
- **Test Coverage:** Percentage of code covered by tests
- **Code Churn:** Frequency of changes to files

### Dependency Metrics

- **Outdated Dependencies:** Count of packages behind latest
- **Vulnerable Dependencies:** Count with known CVEs
- **Dependency Age:** Time since last update
- **Bundle Size:** Total size of dependencies

### Development Metrics

- **Build Time:** Time to build project
- **Test Execution Time:** Time to run test suite
- **Deployment Frequency:** How often code is deployed
- **Lead Time:** Time from commit to production
- **MTTR:** Mean time to recovery from incidents

---

## Documentation Standards

### Required Documentation

1. **README.md**
   - Project overview
   - Setup instructions
   - Development workflow
   - Testing approach

2. **Architecture Docs**
   - System architecture diagram
   - Data flow diagrams
   - Technology stack
   - Key design decisions

3. **API Documentation**
   - Endpoint descriptions
   - Request/response formats
   - Authentication
   - Error codes

4. **Code Comments**
   - Complex algorithms
   - Non-obvious business logic
   - Workarounds and their reasons
   - TODOs with context

5. **ADRs (Architecture Decision Records)**
   - Context for major decisions
   - Alternatives considered
   - Rationale for choice
   - Consequences

---

## Prevention Strategies

### Code Review Checklist

- [ ] No code smells introduced
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Performance considered
- [ ] Accessibility addressed
- [ ] No new dependencies without justification

### Automated Prevention

- **Linting:** ESLint, TypeScript strict mode
- **Formatting:** Prettier, consistent style
- **Testing:** Required minimum coverage
- **Security:** Automated vulnerability scanning
- **Performance:** Bundle size limits, lighthouse CI
- **Dependencies:** Automated update PRs (Dependabot)

### Regular Maintenance

- Weekly: Review TODO/FIXME comments
- Monthly: Dependency updates
- Quarterly: Architecture review
- Annually: Major refactoring initiatives
