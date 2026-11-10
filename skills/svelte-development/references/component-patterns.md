# svelte-development: Component Patterns

Part of the `svelte-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Component Patterns

### Props with Defaults and Spreading

```svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    children: import('svelte').Snippet
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    children,
    ...restProps
  }: Props = $props()
</script>

<button
  class="btn btn-{variant} btn-{size}"
  {disabled}
  {...restProps}
>
  {@render children()}
</button>
```

### Two-Way Binding with $bindable

```svelte
<!-- Input.svelte -->
<script lang="ts">
  interface Props {
    value: string
  }

  let { value = $bindable() }: Props = $props()
</script>

<input bind:value />

<!-- Parent.svelte -->
<script lang="ts">
  let name = $state('')
</script>

<Input bind:value={name} />
<p>Hello, {name}!</p>
```

### Snippets (Replacing Slots)

```svelte
<!-- Card.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    title: string
    children: Snippet
    footer?: Snippet
  }

  let { title, children, footer }: Props = $props()
</script>

<div class="card">
  <header>{title}</header>
  <main>{@render children()}</main>
  {#if footer}
    <footer>{@render footer()}</footer>
  {/if}
</div>

<!-- Usage -->
<Card title="My Card">
  <p>Card content goes here</p>

  {#snippet footer()}
    <button>Action</button>
  {/snippet}
</Card>
```

### Snippets with Parameters

```svelte
<!-- List.svelte -->
<script lang="ts" generics="T">
  import type { Snippet } from 'svelte'

  interface Props {
    items: T[]
    row: Snippet<[T, number]>
    empty?: Snippet
  }

  let { items, row, empty }: Props = $props()
</script>

{#if items.length === 0}
  {#if empty}
    {@render empty()}
  {:else}
    <p>No items</p>
  {/if}
{:else}
  <ul>
    {#each items as item, index}
      <li>{@render row(item, index)}</li>
    {/each}
  </ul>
{/if}

<!-- Usage -->
<List items={users}>
  {#snippet row(user, i)}
    <span>{i + 1}. {user.name}</span>
  {/snippet}

  {#snippet empty()}
    <p>No users found</p>
  {/snippet}
</List>
```

---
