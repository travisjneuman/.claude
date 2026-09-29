---
paths:
  - "**/api/**"
  - "**/routes/**"
  - "**/routers/**"
  - "**/controllers/**"
  - "**/handlers/**"
  - "**/*.controller.ts"
  - "**/*route*.{ts,js,py}"
---

# API Rules
RESTful conventions. Validate all inputs at boundary. Consistent error format.
Auth middleware on all non-public routes. Rate limiting on auth endpoints.
