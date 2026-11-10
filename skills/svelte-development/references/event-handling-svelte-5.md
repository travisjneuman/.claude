# svelte-development: Event Handling (Svelte 5)

Part of the `svelte-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Event Handling (Svelte 5)

### DOM Events (New Syntax)

```svelte
<!-- Old: on:click -->
<!-- New: onclick -->

<button onclick={() => count++}>Click me</button>

<input
  oninput={(e) => name = e.currentTarget.value}
  onkeydown={(e) => e.key === 'Enter' && submit()}
/>

<!-- Event modifiers: use JavaScript -->
<button onclick={(e) => {
  e.preventDefault()
  e.stopPropagation()
  handleClick()
}}>
  Submit
</button>

<!-- Once: use wrapper -->
<script>
  function once(fn) {
    return function(e) {
      if (!e.target.dataset.clicked) {
        e.target.dataset.clicked = 'true'
        fn(e)
      }
    }
  }
</script>

<button onclick={once(() => console.log('Once!'))}>
  Click once
</button>
```

### Component Events (Callback Props)

```svelte
<!-- Old: createEventDispatcher -->
<!-- New: callback props -->

<!-- Child.svelte -->
<script lang="ts">
  interface Props {
    onSelect?: (id: string) => void
    onClose?: () => void
  }

  let { onSelect, onClose }: Props = $props()
</script>

<button onclick={() => onSelect?.('123')}>Select</button>
<button onclick={onClose}>Close</button>

<!-- Parent.svelte -->
<Child
  onSelect={(id) => console.log('Selected:', id)}
  onClose={() => console.log('Closed')}
/>
```

---
