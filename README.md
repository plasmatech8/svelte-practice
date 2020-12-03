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
    - [Prop default values](#prop-default-values)
    - [Spread props](#spread-props)
  - [04. Logic](#04-logic)
    - [If blocks](#if-blocks)
    - [Else blocks](#else-blocks)
    - [Each blocks](#each-blocks)
    - [Await blocks](#await-blocks)
  - [05. Events](#05-events)
    - [Mousemove](#mousemove)
    - [Event modifiers](#event-modifiers)
    - [Component events](#component-events)
    - [Event forwarding](#event-forwarding)
    - [DOM event forwarding](#dom-event-forwarding)
  - [06. Bindings](#06-bindings)

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

Declare props (for parents to pass data) using the `export` keyword.

```svelte
<script>
	export let answer;
</script>
<p>The answer is {answer}</p>
```

### Prop default values

```svelte
<script>
	export let answer = 'a mystery';
</script>
<p>The answer is {answer}</p>
```

### Spread props

```svelte
<Info {...pkg}/>
```

You can access undeclared props by using `$$myProp`, but this is not
recommended.

## 04. Logic

### If blocks

```svelte
{#if user.loggedIn}
	Foo
{/if}
```

### Else blocks

```svelte
{#if user.loggedIn}
	Foo
{:else}
	Bar
{/if}
```

Characters:
* '#' open
* ':' continuation
* '/' closing

```svelte
{#if x > 10}
	Foo
{:else if x > 5}
	Bar
{:else}
    Raa
{/if}
```

### Each blocks

```svelte
{#each cats as cat}
    <Cat {cat}/>
{/each}
```

```svelte
{#each cats as cat, i}
    Index: {i+1} Cat: {cat}
{/each}
```

```svelte
{#each cats as {id, name}}
    ID: {id} Name: {name}
{/each}
```

### Await blocks

```svelte
{#await promise}
	<p>Waiting...</p>
{:then number}
	<p>Number is: {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

## 05. Events

### Mousemove

```svelte
<script>
	let m = { x: 0, y: 0 };
	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>
<style>
	div { width: 100%; height: 100%; }
</style>
<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>
```

Or with inline functions:

```svelte
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
	The mouse position is {m.x} x {m.y}
</div>
```

### Event modifiers

Modifiers can alter behaviour.

For example, `|once` will only allow a single event to trigger.

```svelte
<button on:click|once={handleClick}>
	Click me
</button>
```

Other modifiers:
* preventDefault (event.preventDefault())
* stopPropagation (preventing the event reaching the next element)
* passive (improves scrolling performance on touch/wheel events, svelte will add it automatically when safe)
* nonpassive
* capture (see [this](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture))
* once (remove the handle after first trigger)
* self (only trigger handler if event.target is the element itself)

You can chain modifiers too. e.g. `on:click|once|capture={handleClick}`

### Component events

We can also create custom events.

Pass the handleMessage `function` into the `message` event.

```svelte
<script>
	import Inner from './Inner.svelte';

	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>
<Inner on:message={handleMessage}/>
```

Create an event dispatcher to dispatch the `on:` event with the associated
function.

```svelte
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>
<button on:click={sayHello}>
	Click to say hello
</button>
```

It is probably simpler to pass functions as props, however events prevent
prop drilling.

We can pass the event function (declared in the top-level component) down the
child components using `on:myEvent` on each usage of a sub component. *** idk

### Event forwarding

If we defined a function for an event at the top level:

```svelte
<script>
	import Outer from './Outer.svelte';
	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>
<Outer on:message={handleMessage}/>
```

And we want the `<Inner/>` subcomponent to dispatch the event, then we can
write lots of code using the dispatcher which triggers the event passed in
from the parent...

Or we can simply pass the event from the parent to the children using
`on:message`.

Middle:

```svelte
<script>
	import Inner from './Inner.svelte';
</script>
<Inner on:message/>
```

Bottom:
```svelte
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>
<button on:click={sayHello}>
	Click to say hello
</button>
```

### DOM event forwarding

We can also forward normal DOM events.

Parent:
```
<CustomButton on:click={handleClick}/>
```

CustomButton:
```svelte
<button on:click>
	Click me
</button>
```

## 06. Bindings