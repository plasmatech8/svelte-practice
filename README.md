# svelte-practice

Docs for [svelte-router-spa](https://github.com/jorgegorka/svelte-router)

Example [repo](https://github.com/jorgegorka/svelte-firebase/tree/master/src)
for Firebase + svelte-router-spa

## Setup

Using svelte-router-spa with Firebase.

Get Svelte template:
```
npx degit sveltejs/template svelte-app
cd svelte-app
npm install
```
Wow, it is surprisingly simple.

Connect/initialise a Firebase test project:
```
cd ..
firebase init
# (select marioplan test project)
# (public directory is svelte-app/public)
```

## Router Setup

```
npm install svelte-router-spa
```

Update `rollup.config.js` because `"@rollup/plugin-commonjs"` 15.0.0 and above
have issues with Svelte Router. (Error:
`Uncaught TypeError: src.Router is not a constructor`)
```
commonjs({requireReturnsDefault: 'auto'}),
```
