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

https://www.youtube.com/watch?v=zK2_FI8jcAA&list=PL4cUxeGkcC9gdr4Qhx83gBBcID-KMe-PQ&index=4