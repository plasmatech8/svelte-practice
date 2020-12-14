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

<style>
  ul{
    padding: 0;
  }
  li {
    list-style-type: none;
  }
  li a {
    display: block;
    padding: 15px;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
    margin: 10px auto;
    text-decoration: none;
  }
  li a:hover {
    background: #fbfbfb;
  }
  div {
    text-align: center;
  }
</style>

<svelte:head>
	<title>Jobs</title>
</svelte:head>

<h2>All Current Jobs</h2>
<ul>
	{#each jobs as job }
		<li><a href={`jobs/${job.id}`}>{job.title}</a></li>
	{/each}
</ul>

<div>
	<a href="/jobs/create" class="btn">Add a New Job</a>
</div>