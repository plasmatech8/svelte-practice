<script>
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  const params = {}
</script>

Public Layout!!!

<Route {currentRoute}  {params} />
