# svelte-practice

Notes about routing options:
* React Routing
  * Most similar to React Router
  * Needs a server
* React SPA Router
  * No server / SPA only
  * Bad for Search Engine Optimisation (SEO) - not as easily crawlable
  * Uses hash ID routing (website.com#this/is/your/route) - >:(
* Sapper
  * Most official router - but will never get a production version
  * Can use with server (npm run build)
  * Can use without server (npm run export)
  * Lots of features
* Routify
  * Lots of features
  * Can use without a server

Sapper and Routify are the only good options for most scenarios IMO.

## 01. Introduction

See [Sapper documentation](https://sapper.svelte.dev/docs/).

## 02. Setup

```
npx degit "sveltejs/sapper-template#rollup" job-ninja
cd job-ninja
npm install
```

Dev server: `npm run dev`

SSR:
* Build: `npm run build`
* Run: `node __sapper__/build`

SPA:
* Build: `npm run export`
* Run: `npx serve __sapper__/export `

If we have static content like images in the static folder, we can access them
easily using `src="my-static-file.png"`

## 03. Routes


**Folder vs Component routes**

In the `src/routes` folder, we can either use a folder
`about/index.svelte` or a file `about.svelte` for our routes.

We will use single file components for routes when possible, and folders
when there are multiple pages under one parent route.

Routes:
Route | File
---|---
`/` | routes<b>/</b>index.svelte
`/about` | routes<b>/about</b>.svelte
`/contact` | routes<b>/contact</b>.svelte
`/jobs` | routes<b>/jobs</b>/index.svelte
`/jobs/create` | routes<b>/jobs/create</b>.svelte

Files starting with an _underscore are not registered as routes.

**slugs**

We can also see `[slug].svelte` components. It represents a variable in the
URL resource path (productId, postId, etc).

If is no existing component (i.e. `my-post.svelte`), then it will run the
`[slug].svelte` page.

**Error and Layouts**

* `_error.svelte`
* `_layout.svelte`

## 04. Custom layout & Nav

`_layout.svelte`

A layout will put the contents of the component inside. If the parent route
also has a layout, there will be a layout inside of a layout.

We will create a `Footer.svelte` and add it to the layout.

We will update the `Nav.svelte` links. Add a contact and jobs page. Remove blog.

The `aria-current` is used to add a class name to the components in a route.
We can ignore this for now.

**The segment prop**

The `segment` variable is provided to our layout component. It is passed into
our Nav component as a prop.

Segment = tells us the page we are currently viewing.

* `undefined` = `index.svelte`
* `undefined` = `_error.svelte`
* `about` = `about.svelte`
* `jobs` = `jobs/index.svelte`
* `jobs` = `jobs/create.svelte`

We can use this to style the pages differently.

We will use segment to add a class on the nav links.

```svelte
    <li><a class:current={segment === undefined} href=".">home</a></li>
    <li><a class:current={segment === 'contact'} href="contact">contact</a></li>
    <li><a class:current={segment === 'about'} href="about">about</a></li>
    <li><a class:current={segment === 'jobs'} href="jobs">jobs</a></li>
```

## 05. Server code vs Client code

The code in the `<script>` tag can run in both the browser and the server.

The first request runs in the server and browser, then subsequent requests are
only in the browser.

If we do `console.log('my page')`, it will be printed in the server console
for the first request.

When we change the page, it is only printed to the browser console.

```svelte
<script>
	console.log('jobs')
</script>
```

`onMount` will only ever run in the browser. It is tied to the component.

`fetch` is not defined in a server, so we should only use it on mount.

## 06. Preloading Data (server or client)

A script tag with `context="module"` is not part of the component and always
runs before the other scripts.

We can perform a `fetch` on the server (as well as the browser) using a preload
function.

```svelte
<script context="module">
	export async function preload(page, session){
		const result = await this.fetch('/data.json')
		const todos = await result.json()
		console.log("jobs page pre-load data")
		return { todos }
	}
</script>

<script>
	export let todos; // Todos data from server
	console.log(todos)
	console.log('jobs page')
</script>
```

It will either fetch from the browser or server, but not both. (Unlike the
regular script tag, which runs on both).

We can also go to the `Nav.svelte` and add this preload function to the button:

```svelte
			<li><a rel=prefetch class:current={segment === 'jobs'} href="jobs">
        jobs
        </a></li>
```

`rel=prefetch` causes the prefetch function to run when you hover over the
link! This makes it even faster when you want go to a new page without waiting
for data.

![](docs/2020-12-12-16-10-51.png)

Essentially this allows us to get data faster by (1) getting it from the
server, or (2) loading it when the user hovers the mouse over the button.

## 07 Server Routes

Instead of using data in the static folder, we will retrieve it from the
Sapper server.

We can make server requests using a JavaScript file alongside our components.
* `/jobs/index.json.js` for the server route request (for `/jobs`)
* `/jobs/index.svelte` for getting the page/component
* `mysite.com/jobs/[id]`

We call the file `index.json.js` to avoid name conflicts.

We can call this fetch from the preload function:
`const result = await this.fetch('/jobs.json')`

In `jobs/index.json.js` we will define our get request:
```js
import { jobs } from './_data.js';

export function get(req, res, next) {
  // Query the database (or just query a file on the server...)
  res.end(JSON.stringify(jobs))
}
```

In `jobs/_data.js` we will store some data:
```js
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

export let jobs = [
  {
    id: '1', title: "Mario's plumbing assistant", salary: 20000,
    details: lorem.generateSentences(3)
  },
  {
    id: '2', title: "Apple picker for Yoshi", salary: 22000,
    details: lorem.generateSentences(3)
  },
  {
    id: '3', title: "Mariokart driver", salary: 30000,
    details: lorem.generateSentences(3)
  },
]
```

And we will use this data in `jobs/index.svelte`:
```svelte
<h2>All Current Jobs</h2>
<ul>
	{#each jobs as job }
		<li><a href="/">{job.title}</a></li>
	{/each}
</ul>
```

## 08. Adding a Web Form

We will add a form that can be used to add new data to the server.

```svelte
<script>
import { prevent_default } from "svelte/internal";

	console.log('jobs create')

	let title;
	let salary;
	let details;
	const handleSubmit = () => {
		console.log(title)
		console.log(salary)
		console.log(details)
	}
</script>
<!-- ... -->
<h2>Add a New job</h2>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" placeholder="job title" required bind:value={title}>
	<input type="number" placeholder="salary" required bind:value={salary}>
	<textarea placeholder="job details" required bind:value={details}></textarea>
	<button class="btn">Add new job</button>
</form>
```

## 09. POST Requests to the server

We will add the body-parser middleware to our `server.js` and create a
`post` function in `jobs/index.json.js`.

In `jobs/index.json.js`:
```js
export function post(req, res, next) {
  const { title, salary, details } = req.body;
  const id = uuidv4();
  jobs.push({ id, title, salary, details })
  res.end(JSON.stringify(jobs))
}
```

In `jobs/create.svelte`:
```js
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
```

## 10. Route Parameters

How to get route parameters (slug) from url.

We will grab the ID from the route parameters in `jobs/[id].svelte`:
```svelte
<script context="module">
  console.log('jobs [id]');

	export async function preload(page, session){
    const { id } = page.params;

    const res = await this.fetch(`jobs/${id}.json`);
    const job = await res.json();

    return { job }
	}
</script>

<script>
  export let job;
  console.log(job)
</script>
```

And create a GET request on the server in `jobs.[id].json.js`
```js
import { jobs } from './_data.js';

export function get(req, res, next) {
  const { id } = req.params;
  const job = jobs.find(j => j.id === id);

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(job));
}
```

Remember to use `this.fetch('url');` in the preload function, because fetch
is not available in a Node server - when we do the first-load on the page.

## 11. Job Details Page

We will create the page for job details.

We will also make it so that the job data is preloaded (+ on hover of the link).

`src/routes/jobs/[id].svelte`:
```svelte
<div class="job">
  <h2>{job.title}</h2>
  <p>Salary of ${ job.salary }</p>
  <p>{ job.details }</p>
</div>
```

`src/components/jobs/index.svelte`:
```svelte
<ul>
	{#each jobs as job }
		<li><a href={`jobs/${job.id}`} rel=prefetch>{job.title}</a></li>
	{/each}
</ul>
```

`static/global.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');
/* ... */
/* extra styles */
.btn {
  display: inline-block;
  background: #ff3e00;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1px;
  font-weight: 600;
  border: 0;
  font-family: Quicksand;
}
```