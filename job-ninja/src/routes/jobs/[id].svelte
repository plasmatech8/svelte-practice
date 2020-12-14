<script context="module">
  console.log('jobs [id]');

	export async function preload(page, session){
    const { id } = page.params;

    const res = await this.fetch(`jobs/${id}.json`);
    console.log(res.status)

    if (res.status === 200) {
      const job = await res.json();
      return { job }
    }
    if (res.status === 404){
      const { error } = await res.json();
      this.error(404, error); // error code, error message
    }

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

<div class="job">
  <h2>{job.title}</h2>
  <p>Salary of ${ job.salary }</p>
  <p>{ job.details }</p>
</div>
