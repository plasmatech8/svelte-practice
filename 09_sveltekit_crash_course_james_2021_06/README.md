# SvelteKit Crash Course

See [SvelteKit Crash Course](https://www.youtube.com/watch?v=UU7MgYIbtAk).

- [SvelteKit Crash Course](#sveltekit-crash-course)
  - [01. Init Project](#01-init-project)

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