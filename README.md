# svelte-practice

## 01. Setup

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

## 02. Routes

https://www.youtube.com/watch?v=jQGmvrHeYC4

## Notes

Routing options:
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
