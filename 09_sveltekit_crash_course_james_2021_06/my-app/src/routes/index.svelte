<script lang="ts">
	import { pokemon } from '../stores/pokestore';
	import PokemonCard from '../components/PokemonCard.svelte';

	let searchTerm = '';
	let filteredPokemon = [];
	$: {
		if (searchTerm) {
			filteredPokemon = $pokemon.filter((p) =>
				p.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...$pokemon];
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">Welcome to SvelteKit Pokedex!</h1>

<input
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
	type="text"
	placeholder="Search Pokemon"
	bind:value={searchTerm}
/>

<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each filteredPokemon as pokeman}
		<PokemonCard {pokeman} />
	{/each}
</div>
