<script context="module">
	export async function preload(page, session){
		const result = await this.fetch('/jobs.json')
		const jobs = await result.json()
		console.log("only on the server!")
		return { jobs }
	}
</script>

<script>
	export let jobs;
	console.log(jobs)
	console.log('jobs page')
</script>

<svelte:head>
	<title>Jobs</title>
</svelte:head>

<h2>All Current Jobs</h2>
<ul>
	{#each jobs as job }
		<li><a href="/">{job.title}</a></li>
	{/each}
</ul>