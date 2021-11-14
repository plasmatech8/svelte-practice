# SvelteKit Crash Course

See:
* [SvelteKit Crash Course](https://www.youtube.com/watch?v=UU7MgYIbtAk).
* [Error pages](https://www.youtube.com/watch?v=OdQruaoDVj0)

- [SvelteKit Crash Course](#sveltekit-crash-course)
  - [01. Init Project](#01-init-project)
  - [02. Pages](#02-pages)
  - [03. Routing and Layouts](#03-routing-and-layouts)
  - [04. Stores](#04-stores)
  - [05. Adding TailwindCSS](#05-adding-tailwindcss)
  - [06. Creating a Pokeman Card Component](#06-creating-a-pokeman-card-component)

## 01. Init Project

```bash
# initialise SvelteKit app
npm init svelte@next my-app
# > select: skeleton project + typescript + eslint + prettier
cd my-app
npm install
npm run dev

# install eslint-plugin-html (because of annoying "Parsing error: '>'" in html files)
npm install --save-dev eslint-plugin-html
# > add 'html' to .eslintrc.cjs plugins
```

Make sure format on save is configured.

Make sure prettier is set as the default formatter + format on save.

## 02. Pages

SvelteKit uses path based routing, and each .svelte file is a page.

Use `<svelte:head>` tag to add header information (i.e. titles, meta)

Anchor tags are automatically set to client-side routing.

## 03. Routing and Layouts

The router will match the closest route in alphabetical order. (i.e. first try `foo.svelte`, then `[slug].svelte`)

A 404 route can be done by creating a `__errors.svelte` file.

A layout can be created using a `__layout.svelte` file.

## 04. Stores

Writable stores can be created easily...

Subscibe using $ sign.

## 05. Adding TailwindCSS

See [this setup example](https://jsco.dev/blog/how-to-set-up-tailwindcss-with-svelte-kit)
or possibly [this svelte-adder for tailwind](https://github.com/svelte-add/tailwindcss).

I think I will use the svelte adder.

```bash
npx svelte-add@latest tailwindcss
npm install
```
This will:
* create a `postcss.config.cjs` and `tailwind.config.cjs`.
* modify your `svelte.config.js` and `__layout.svelte`.
* change the fonts and styling/fonts of your app to tailwind.

You might also want to:
* install the tailwind intellisense VSCode extension.
* install Past JSON as Code
* turn on quick suggestions so that suggestions are instant when using Svelte.
```json
"editor.quickSuggestions": {
    "strings": true
}
```

## 06. Creating a Pokeman Card Component

We will use tailwind to create a card.

We will use CSS grid (tailwind) to format the cards into a grid.