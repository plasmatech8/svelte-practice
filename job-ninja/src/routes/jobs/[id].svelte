<script context="module">
  console.log('jobs [id]');

	export async function preload(page, session){
    const { id } = page.params;

    const res = await this.fetch(`jobs/${id}.json`);
    const job = await res.json();

    return { job }
	}
</script>

<script>
  export let job;
  console.log(job)
</script>

<svelte:head>
	<title></title>
</svelte:head>

<style>

</style>

<h2>{job.title}</h2>
