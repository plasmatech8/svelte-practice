<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PokemanType } from 'src/stores/pokestore';
	export let pokeman: PokemanType;
</script>

<a
	class="p-6 bg-gray-100 text-gray-800 text-center shadow-sm hover:shadow-md flex flex-col items-center sadsa"
	href="/pokemon/{pokeman.id}"
	in:fade={{ duration: 200 }}
>
	<img class="h-40 w-40" src={pokeman.image} alt={pokeman.name} />
	<h3 class="uppercase text-2xl">{pokeman.id}. {pokeman.name}</h3>
</a>
