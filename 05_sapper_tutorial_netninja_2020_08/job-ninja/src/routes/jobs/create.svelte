<script>
	import { goto } from "@sapper/app";

	console.log('jobs create')

	let title;
	let salary;
	let details;
	const handleSubmit = async () => {
		console.log(title, salary, details)
		if (title && salary && details){
			const res = await fetch('/jobs.json', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, salary, details })
			});
			const updatedJobs = await res.json();
			console.log(updatedJobs)
			goto('/jobs')
		}
	}
</script>

<svelte:head>
	<title>Create Job</title>
</svelte:head>

<style>
	h2{
		text-align: center;
	}
	form{
		max-width: 360px;
		margin: 40px auto;
		text-align: center;
	}
	input, textarea{
		display: block;
		width: 100%;
		padding: 10px;
		font-family: arial;
		margin: 10px auto;
		border: 1px solid #eee;
		border-radius: 8px;
	}
</style>

<h2>Add a New job</h2>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" placeholder="job title" required bind:value={title}>
	<input type="number" placeholder="salary" required bind:value={salary}>
	<textarea placeholder="job details" required bind:value={details}></textarea>
	<button class="btn">Add new job</button>
</form>
