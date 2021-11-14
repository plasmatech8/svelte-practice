<script lang="ts">
	import { onMount } from 'svelte';
	import { pokemon } from '../stores/pokestore';
	import PokemonCard from '../components/PokemonCard.svelte';

	onMount(() => {
		console.log($pokemon);
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">Welcome to SvelteKit Pokedex!</h1>

<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each $pokemon as pokeman}
		<PokemonCard {pokeman} />
	{/each}
</div>
