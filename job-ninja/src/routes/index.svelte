<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	img {
		width: 200px;
		margin: 0 auto;
		display: block;
	}

	p {
		margin: 1em auto;
	}

	a {
		margin-top: 40px;
	}

	div {
		margin-top: 60px;
		text-align: center;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Job Ninja</title>
</svelte:head>

<div>
	<img src="no-text-logo.png" alt="Ninja Banner"/>
	<h1>Jobs for Ninjas!</h1>
	<p>Find your next assignement right here.</p>
	<a href="jobs" class="btn">View jobs</a>
</div>