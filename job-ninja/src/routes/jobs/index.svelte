<script context="module">
	export async function preload(page, session){
		const result = await this.fetch('/data.json')
		const todos = await result.json()
		console.log("only on the server!")
		return { todos }
	}
</script>

<script>
	export let todos;
	console.log(todos)
	console.log('jobs page')
</script>

<svelte:head>
	<title>Jobs</title>
</svelte:head>

<h2>All Current Jobs</h2>

<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
	consectetur ab fugit voluptatem dolore non expedita assumenda repudiandae
	cum excepturi!</p>

<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
	consectetur ab fugit voluptatem dolore non expedita assumenda repudiandae
	cum excepturi!</p>