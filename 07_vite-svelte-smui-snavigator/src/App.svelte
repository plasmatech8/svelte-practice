<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Button from '@smui/button';

  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";
</script>

<Router primary={false}>
  <header>
    <h1>Template</h1>
    <img src={logo} alt="Svelte Logo" width="200px"/>

    <h4>Links:</h4>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
    </nav>
  </header>

  <main>
    <Route path="/login">
      <h3>login</h3>
      <p>This is the login page</p>
    </Route>

    <Route path="/">
      <h3>Home</h3>
      <h1 class="mdc-typography--headline1">Headline 1</h1>
      <p>Home sweet home...</p>
      <Counter />
      <Button>Click Me!</Button>
    </Route>

    <Route path="/about">
      <h3>About</h3>
      <p>That's what it's all about!</p>
    </Route>


  </main>
</Router>

<style>
</style>
