<script>
	import { onMount } from 'svelte';
	import { pokemon } from '../stores/pokestore';

	onMount(() => {
		console.log($pokemon);
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">Welcome to SvelteKit Pokedex!</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h2>Look at these Pokemon!</h2>

{#each $pokemon as p}
	<p>{p.name}</p>
{/each}
