<script lang="ts">
	import '../app.css';
	import Nav from '../components/Nav.svelte';
</script>

<div class="p-8 max-w-6xl mx-auto">
	<Nav />
	<main>
		<slot />
	</main>
</div>
