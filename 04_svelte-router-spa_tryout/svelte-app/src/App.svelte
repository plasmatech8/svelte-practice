<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</svelte:head>

<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/login">Login!</a></li>
  <li><a href="/admin">Admin</a></li>
  <li><a href="/register">Register</a></li>
  <li><a href="/iudasd">iudasd</a></li>
</ul>

<Router {routes} />
