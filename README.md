# Practice for Svelte

## Thoughts about Routers (31-05-2020)

Notes about routing options:

Server-integrated routing:
* Sapper
  * Most official router - but will never get a production version
  * Can use with server (npm run build)
  * Can use without server (npm run export)
  * Lots of features
* Routify
  * Lots of features
  * Can use without a server
* [Svelte Routing](https://www.npmjs.com/package/svelte-routing))
  * Most similar to React Router
  * Needs a server

Client-side-only routing:
* [Svelte SPA Router](https://www.npmjs.com/package/svelte-spa-router)
  * No server / SPA only
  * Bad for Search Engine Optimisation (SEO) - not as easily crawlable
  * Uses hash ID routing (website.com#/this/is/your/route) - >:(
* [Svelte Router SPA](https://www.npmjs.com/package/svelte-router-spa)
  * Similar to Svelte SPA router, except it works without hash-based routing
  * I like it better, but I am uncertain about it editing anchor tags
  * Not popular
* [Svelte Navigator](https://www.npmjs.com/package/svelte-navigator)
  * Appears to be catching up in popularity to Svelte SPA Router
  * Works more similarly to React Router with Link and Router/Route tags.
  * Started out as a fork of svelte-routing, so it is very similar

For **client-side-only**:
* I like Svelte Router SPA the most, followed closely by Svelte Navigator
* Svelte Navigator is much more popular
* But Svelte Router SPA is slightly more concise, has layouts, and has a guard+redirect feature on a path
* However, I appear to be having some trouble in configuring Svelte Router SPA on the Svelte SPA router example from their repo... it keeps changing the URL to 404.html

For **server-integrated-routing**:
* The only real option is SvelteKit routing (still in Alpha)