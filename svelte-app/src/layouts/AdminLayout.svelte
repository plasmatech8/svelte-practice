<script>
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  const params = {}
</script>

Admin Layout!!!

<Route {currentRoute}  {params} />
