# Plan: Add Documentation Platforms to alternatives.md

## Summary
Add a comprehensive "DOCUMENTATION PLATFORMS / DEVELOPER DOCS" section to `tasks/alternatives.md` with all researched alternatives.

## User's Self-Hosting Idea (Noted for Future)
**"Dogfooding" approach**: Use Neuman Brain's own documentation feature to host public documentation:
- Meta-docs section (users can read but not edit/delete)
- User workspace section (users can create their own docs)
- Eliminates need for separate documentation repo
- Proves product works by using it for own docs
- Worth considering for public launch

---

## Comprehensive Documentation Platforms to Add

### Static Site Generators (Docs-as-Code)
| Tool | Description | Pricing |
|------|-------------|---------|
| Docusaurus | Meta-backed, React + Markdown, versioning, i18n, Algolia search | Free, OSS |
| MkDocs | Python-based, Material theme popular, simple setup | Free, OSS |
| Sphinx | Python docs standard, reStructuredText/Markdown, PDF output | Free, OSS |
| Hugo | Fastest SSG, Go-based, 400+ themes, multilingual | Free, OSS |
| Jekyll | Ruby, GitHub Pages native, mature ecosystem | Free, OSS |
| VuePress | Vue.js-powered, Vue 2, now community-maintained | Free, OSS |
| VitePress | VuePress successor, Vue 3 + Vite, <100ms hot reload, Vue team supported | Free, OSS |
| mdBook | Rust-based, Markdown to HTML/PDF/ePub, used by Rust docs | Free, OSS |
| Astro Starlight | Astro-powered, modern, fast, good DX | Free, OSS |

### Hosted/SaaS Documentation Platforms
| Tool | Description | Pricing |
|------|-------------|---------|
| GitBook | Git-based workflow, AI search, WYSIWYG, developer-focused | Free personal, paid teams |
| Mintlify | Modern, AI-powered, beautiful design, MDX support | Free 80 articles, $150/mo paid |
| ReadMe | Interactive API docs, metrics, developer hub, guides + recipes | $99/mo startup, $399/mo enterprise |
| Document360 | Internal knowledge bases, governance, analytics | Paid |
| Archbee | Team docs, 1800+ integrations, AI search | $200/mo, add-ons $100/mo |
| Notion | All-in-one workspace, limited publishing, needs 3rd party for domains | Free tier, $10/mo+ |
| Confluence | Atlassian suite, enterprise, Jira integration, internal-focused | Free 10 users, $5.75/user/mo |
| Nuclino | Clean simple interface, graph view, AI assistant | Free tier, paid plans |
| Slite | Remote/async-first, AI-powered, internal knowledge | Paid |
| Tettra | Simple wiki for teams, Slack integration | Paid |
| DeveloperHub.io | Hosted docs platform, beautiful, low setup | Paid |

### API Documentation Tools
| Tool | Description | Pricing |
|------|-------------|---------|
| Swagger UI / SwaggerHub | Industry standard, OpenAPI visualization, try-it-out | Free OSS / Paid hosted |
| Stoplight Elements | Stripe-like docs, React component, OpenAPI | Free tier, $79/mo+ |
| Redocly | Enterprise-grade, docs-as-code, CLI tools, multi-team | $10/mo Pro, $24/mo Enterprise |
| Scalar | Open-source, best "Try It" feature, Git-native, dark-mode | Free OSS, hosted options |
| Bump.sh | OpenAPI + AsyncAPI, Stripe-like 3-column, changelog detection | SaaS pricing |
| Zuplo | GitOps approach, API management + docs combined, RateMyOpenAPI | Integrated pricing |
| Slate | Open-source, beautiful three-panel layout, Ruby-based | Free, OSS |
| Postman | API platform with docs publishing | Free tier, paid plans |

### Self-Hosted / Open Source
| Tool | Description | Stack |
|------|-------------|-------|
| BookStack | Books/chapters structure, WYSIWYG, role-based permissions | PHP/Laravel/MySQL, MIT |
| Wiki.js | Modern, Git sync, multiple editors, elegant UI | Node.js, MIT |
| Docmost | Enterprise-ready, Confluence/Notion alternative, SSO, offline-capable | Modern stack, OSS |
| Outline | Real-time collaboration, Slack integration, minimal UI | Node.js, requires config |
| DokuWiki | No database, plain text files, simple syntax, easy maintenance | PHP |
| MediaWiki | Wikipedia's engine, powerful, extensible, multilingual | PHP |
| XWiki | Enterprise features, Java-based, templates, strict access | Java |
| TiddlyWiki | Single HTML file, portable, personal wiki | JavaScript |
| Documize | Wiki + documentation hybrid, self/cloud/hybrid hosting | Go |

### Office/Document Platforms
| Tool | Description | Pricing |
|------|-------------|---------|
| Google Docs | Collaborative, Google ecosystem, sharing | Free / Workspace |
| Proton Docs | Privacy-first, E2E encrypted, no tracking | Proton plans |
| Dropbox Paper | Collaborative docs, Dropbox integration | Dropbox plans |
| Coda | Docs + databases + automation, powerful formulas | Free tier, paid |
| Craft | Apple-focused, beautiful native design | Free tier, $5/mo+ |
| Microsoft Word/Loop | Microsoft ecosystem, Loop for modern collab | M365 plans |
| Quip | Salesforce ecosystem, docs + spreadsheets | Salesforce plans |

---

## Implementation

**File to modify:** `tasks/alternatives.md`

**Optimal location:** Create new section `## DOCUMENTATION PLATFORMS / DEVELOPER DOCS` AFTER the existing `WIKI / DOCUMENTATION / KNOWLEDGE BASE` section (ends around line 1026).

**Rationale:** The existing WIKI section focuses on general knowledge bases. This new section specifically covers:
1. Developer documentation tools (Docusaurus, GitBook, etc.)
2. API documentation (Swagger, Redocly, etc.)
3. Docs-as-code workflows

**Structure to add:**
1. Static Site Generators (Docs-as-Code)
2. Hosted/SaaS Documentation Platforms
3. API Documentation Tools
4. Self-Hosted / Open Source
5. Office/Document Platforms
6. 2025 Trends subsection

---

## Research Sources
- [DEV Community - 15 Best Documentation Tools 2025](https://dev.to/therealmrmumba/i-tried-15-of-the-best-documentation-tools-heres-what-actually-works-in-2025-dam)
- [Featurebase - Docusaurus Alternatives](https://www.featurebase.app/blog/docusaurus-alternatives)
- [Featurebase - ReadTheDocs Alternatives](https://www.featurebase.app/blog/readthedocs-alternatives)
- [Archbee - GitBook Alternatives](https://www.archbee.com/blog/gitbook-alternatives)
- [Document360 - Mintlify Alternatives](https://document360.com/blog/mintlify-alternatives/)
- [Nuclino - GitBook Alternatives](https://www.nuclino.com/alternatives/gitbook-alternative)
- [Nuclino - Confluence Alternatives](https://www.nuclino.com/alternatives/confluence-alternative)
- [GitBook Blog - Confluence Alternatives](https://www.gitbook.com/blog/confluence-alternatives)
- [Docmost GitHub](https://github.com/docmost/docmost)
- [HeroThemes - 12 Best Wiki Software 2025](https://herothemes.com/blog/wiki-software/)
- [Slite - Open Source Knowledge Bases](https://slite.com/en/learn/open-source-knowledge-bases)
- [Docmost - Self-Hosted Wiki Software](https://docmost.com/blog/selfhosted-wiki-software/)
- [Bump.sh - 5 Best API Docs Tools 2025](https://bump.sh/blog/top-5-api-docs-tools-in-2025/)
- [Zuplo - Best API Documentation Tools](https://zuplo.com/learning-center/best-api-documentation-tools)
- [Zuplo - Scalar vs Mintlify vs Bump vs Theneo](https://zuplo.com/learning-center/scalar-mintlify-bump-theneo-comparison)
- [Apidog - Mintlify vs Scalar vs Bump vs ReadMe vs Redocly](https://apidog.com/blog/mintlify-vs-scalar-vs-bump-vs-readme-vs-redocly/)
- [VitePress Official](https://vitepress.dev/)
- [VuePress Official](https://vuepress.vuejs.org/)
- [Scalar Official](https://scalar.com/)
