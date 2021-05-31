<script>
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  const params = {}
</script>
<p>
  Public Layout!!!
</p>
<hr>
<Route {currentRoute}  {params} />
