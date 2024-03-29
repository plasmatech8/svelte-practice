import { writable } from 'svelte/store';

export interface PokemanType {
	name: string;
	id: number;
	image: string;
}

export const pokemon = writable<Array<PokemanType>>([]);

const fetchPokemon = async (num: number) => {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=${num}`;
	const res = await fetch(url);
	const data = await res.json();
	const loadedPokemon = data.results.map((data: PokemanType, index: number) => {
		return {
			name: data.name,
			id: index + 1,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
				index + 1
			}.png`
		};
	});
	pokemon.set(loadedPokemon);
};
fetchPokemon(30);
