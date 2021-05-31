<script>
    // Import the router component
    // Normally, this would be: `import Router from 'svelte-spa-router'`
    import { Router } from 'svelte-router-spa'

    // Import the list of routes
    import routes from './routes'
</script>

<h1>svelte-router-spa (in the svelte-spa-router sample)</h1>
<h2>Basic routing</h2>

<!-- Navigation links -->
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/hello/svelte">Say hi!</a></li>
    <li><a href="/wild/card">Wildcard route</a></li>
    <li><a href="/does/not/exist">Not found</a></li>
</ul>

<!-- Show the router -->
<Router {routes} />

