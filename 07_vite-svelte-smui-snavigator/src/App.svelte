<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Button from "@smui/button";

  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";
</script>

  <Router primary={false} >
    <header class="mdc-typography--body1">
      <h1>Template</h1>
      <img src={logo} alt="Svelte Logo" width="200px" />

      <h4>Links:</h4>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>

    <main class="mdc-typography--body1">
      <Route path="/login">
        <h3>login</h3>
        <p>This is the login page</p>
      </Route>

      <Route path="/">
        <h3>Home</h3>
        <p>Home sweet home...</p>
        <Counter />
        <Button>Click Me!</Button>
      </Route>

      <Route path="/about">
        <h3>About</h3>
        <div class="mdc-typography--headline1">Headline 1</div>
        <div class="mdc-typography--headline2">Headline 2</div>
        <div class="mdc-typography--headline3">Headline 3</div>
        <div class="mdc-typography--headline4">Headline 4</div>
        <div class="mdc-typography--headline5">Headline 5</div>
        <div class="mdc-typography--headline6">Headline 6</div>
        <div class="mdc-typography--subtitle1">Subtitle 1</div>
        <div class="mdc-typography--subtitle2">Subtitle 2</div>
        <div class="mdc-typography--body1">Body 1</div>
        <div class="mdc-typography--body2">Body 2</div>
        <div class="mdc-typography--caption">Caption</div>
        <div class="mdc-typography--button">Button</div>
        <div class="mdc-typography--overline">Overline</div>
        <div class="mdc-typography--body1">
          <small>small</small>
          <big>big</big>
          <sup>sup</sup>
          <sub>sub</sub>
          <strong>strong</strong>
          <em>em</em>
        </div>
      </Route>
    </main>
  </Router>
