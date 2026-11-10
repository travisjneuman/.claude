# vue-development: Anti-Patterns to Avoid

Part of the `vue-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns to Avoid

| Anti-Pattern                             | Problem                         | Solution                 |
| ---------------------------------------- | ------------------------------- | ------------------------ |
| Using Options API for complex components | Poor code organization          | Use Composition API      |
| Mutating props directly                  | Breaks one-way data flow        | Emit events to parent    |
| Using `$refs` for state                  | Not reactive                    | Use `ref()` and props    |
| Deeply nested watchers                   | Performance issues              | Use `computed()` instead |
| Using mixins                             | Name collisions, unclear source | Use composables          |
| Not using `storeToRefs()`                | Loses reactivity on destructure | Always use with Pinia    |

---
