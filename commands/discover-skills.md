# Discover Skills

Search skillsmp.com for Claude Code skills using their public API.

## Usage

```
/discover-skills <query>
```

## Arguments

- `query` (required): Search term for finding skills (e.g., "git", "testing", "react")

## Examples

```
/discover-skills git automation
/discover-skills react hooks
/discover-skills database optimization
```

## Implementation

When invoked with a query:

1. **Search skillsmp.com API**:
   ```
   GET https://skillsmp.com/api/v1/skills/search?q=<query>&limit=10&sortBy=stars
   ```

2. **Parse and display results**:
   - Skill name
   - Description
   - GitHub URL
   - Star count (if available)

3. **Provide installation guidance**:
   - For individual skills: Copy to `~/.claude/skills/`
   - For marketplace repos: Suggest adding as submodule

## API Details

skillsmp.com provides a REST API (free during beta):

| Endpoint | Purpose |
|----------|---------|
| `/api/v1/skills/search` | Keyword search with `q`, `page`, `limit`, `sortBy` params |
| `/api/v1/skills/ai-search` | AI semantic search for natural language queries |

## Notes

- Results are sourced from public GitHub repositories
- Skills use the open SKILL.md standard
- Quality filter: minimum 2-star threshold
- API is in beta with no rate limits (use responsibly)

## Related

- `/list-skills` - List locally installed skills
- `/skill-finder` - Find skills in local marketplaces
- [skillsmp.com](https://skillsmp.com/) - Browse skills in browser

---

*skillsmp.com is an independent community project, not affiliated with Anthropic.*
