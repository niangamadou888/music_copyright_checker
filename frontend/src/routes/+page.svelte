<script>
	let count = 0;

function handleClick() {
    // calling this function will trigger an
    // update if the markup references `count`
    count = count + 1;
}
</script>

<h1>Welcome to your library project</h1>
<p>Counter {count}</p>
<button on:click={() => count++}>increase</button>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
