# svelte-practice

[Examples](https://svelte.dev/examples)

[API docs](https://svelte.dev/docs)

[Quickstart](https://svelte.dev/blog/the-easiest-way-to-get-started)

## Contents

- [svelte-practice](#svelte-practice)
  - [Contents](#contents)
  - [01. Introduction](#01-introduction)
    - [Adding data](#adding-data)
    - [Dynamic Attributes](#dynamic-attributes)
    - [Nested components](#nested-components)
    - [HTML tags](#html-tags)
  - [02. Reactivity](#02-reactivity)
    - [Assignments](#assignments)
    - [Reactive Declarations](#reactive-declarations)
    - [Reactive Statements](#reactive-statements)
    - [Updating arrays and objects](#updating-arrays-and-objects)
  - [03. Props](#03-props)
    - [Declaring props](#declaring-props)

## 01. Introduction

### Adding data

```svelte
<script>
	let name = 'WOOOORLD'
</script>
<h1>Hello {name.toUpperCase()}!</h1>
```

### Dynamic Attributes

```svelte
<script>
	let src = 'tutorial/image.gif';
</script>
<img src={src} alt='A man dances'>
<!-- or -->
<img {src} alt='A man dances'>
```

### Nested components

```svelte
<script>
	import Nested from './Nested.svelte'
</script>
<Nested />
```

The CSS from the parent element does not leak into the child element.

### HTML tags

Strings are escaped by default. We can insert strings as html using @html.

```svelte
<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>
<p>{string}</p>
<p>{@html string}</p>
```

We can also insert markdown by converting to HTML using the marked package.

## 02. Reactivity

### Assignments

```svelte
<script>
	let count = 0;
	function handleClick() {
		count += 1;
	}
</script>
<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

### Reactive Declarations

We can use the dollar syntax to create a declaration which reacts based on its
dependencies.

```svelte
$: doubled = cout * 2
```

(equivalent to `{count * 2}`)

### Reactive Statements

We can create code blocks which runs based on its dependencies.

```svelte
$: console.log(`the count is ${count}`);

$: {
	console.log(`the count is ${count}`);
	alert(`I SAID THE COUNT IS ${count}`);
}

$: if (count >= 10) {
	alert(`count is dangerously high!`);
	count = 9;
}
```

### Updating arrays and objects

Svelte's state updates/reactivity is based on assignment, so `.push()` or
`.splice()` will not work.

We need to either use `myArray = myArray` or `myArray = [...myArray, etc]`.

## 03. Props

### Declaring props


