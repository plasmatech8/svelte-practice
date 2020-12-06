# svelte-practice

[Examples](https://svelte.dev/examples)

[API docs](https://svelte.dev/docs)

[Quickstart](https://svelte.dev/blog/the-easiest-way-to-get-started)

[Examples](https://svelte.dev/examples)

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
		- [Text Bindings](#text-bindings)
		- [Numeric Inputs](#numeric-inputs)
		- [Checkbox inputs](#checkbox-inputs)
		- [Group inputs (checkbox & radio) *](#group-inputs-checkbox--radio-)
		- [TextArea inputs](#textarea-inputs)
		- [Select bindings (dropdown)](#select-bindings-dropdown)
		- [Select Multiple *](#select-multiple-)
		- [Contenteditable bindings](#contenteditable-bindings)
		- [Each block bindings *](#each-block-bindings-)
		- [Media element bindings](#media-element-bindings)
		- [Dimensions](#dimensions)
		- [This](#this)
		- [Component bindings](#component-bindings)
	- [07. Lifecycle](#07-lifecycle)
		- [onMount](#onmount)
		- [onDestroy *](#ondestroy-)
		- [beforeUpdate and afterUpdate](#beforeupdate-and-afterupdate)
		- [Tick *](#tick-)
	- [08. Stores](#08-stores)
		- [Writable stores](#writable-stores)

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
```svelte
<CustomButton on:click={handleClick}/>
```

CustomButton:
```svelte
<button on:click>
	Click me
</button>
```

## 06. Bindings

### Text Bindings

```svelte
<input bind:value={name}>
```

### Numeric Inputs

```svelte
<script>
	let a = 1;
	let b = 2;
</script>

<label>
	<input type=number bind:value={a} min=0 max=10>
	<input type=range bind:value={a} min=0 max=10>
</label>

<label>
	<input type=number bind:value={b} min=0 max=10>
	<input type=range bind:value={b} min=0 max=10>
</label>

<p>{a} + {b} = {a + b}</p>
```

The number input and slider input are bound to the variable.

### Checkbox inputs

```svelte
<input type=checkbox bind:checked={yes}>
```

### Group inputs (checkbox & radio) *

Radio buttons: the group denotes which one is selected.

```svelte
<script>let scoops = 1;</script>
<input type=radio bind:group={scoops} value={1}>
<input type=radio bind:group={scoops} value={2}>
<input type=radio bind:group={scoops} value={3}>
```

Checkbox buttons: the group denotes an array of selected values.

```svelte
<script>let flavours = ['Mint choc chip'];</script>
<input type=checkbox bind:group={flavours} value="Cookies and cream">
<input type=checkbox bind:group={flavours} value="Mint choc chip">
<input type=checkbox bind:group={flavours} value="Raspberry ripple">
```

### TextArea inputs

```svelte
<script>
	import marked from 'marked';
	let value = `Some words are *italic*, some are **bold**`;
</script>

<style>
	textarea { width: 100%; height: 200px; }
</style>

<textarea bind:value={value}></textarea>
{@html marked(value)}
```

### Select bindings (dropdown)

Binds the personal question from the select dropdown to selected, and resets
the text input.

```svelte
<select bind:value={selected} on:change="{() => answer = ''}">
	{#each questions as question}
		<option value={question}>
			{question.text}
		</option>
	{/each}
</select>
```

### Select Multiple *

We can use select multiple to select multiple options using ctrl or shift click
(like a file explorer!!!)

```svelte
<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>
```

### Contenteditable bindings

The `contenteditable` tag supports binding textContent and innerHTML.

```svelte
<div  contenteditable="true" bind:textContent={html}></div>
<div  contenteditable="true" bind:innerHTML={html}></div>
```

### Each block bindings *

Bindings work on objects iterated through an each block.

```svelte
{#each todos as todo}
	<div class:done={todo.done}>
		<input
			type=checkbox
			bind:checked={todo.done}
		>

		<input
			placeholder="What needs to be done?"
			bind:value={todo.text}
		>
	</div>
{/each}
```


### Media element bindings

```svelte
<video
	poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
	src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
	on:mousemove={handleMousemove}
	on:mousedown={handleMousedown}
	bind:currentTime={time}
	bind:duration
	bind:paused
>
```
Bindings for `<audio>` and `<video>`:
* duration (readonly) — the total duration of the video, in seconds
* buffered (readonly) — an array of {start, end} objects
* seekable (readonly) — ditto
* played (readonly) — ditto
* seeking (readonly) — boolean
* ended (readonly) — boolean
* currentTime — the current point in the video, in seconds
* playbackRate — how fast to play the video, where 1 is 'normal'
* paused — this one should be self-explanatory
* volume — a value between 0 and 1
* muted — a boolean value where true is muted

### Dimensions

Block level elements have attributes:
* clientWidth
* clientHeight
* offsetWidth
* offsetHeight

```svelte
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>
```

### This

Allows you to bind the element itself to a variable for use in code.

```svelte
<canvas
	bind:this={canvas}
	width={32}
	height={32}
></canvas>
```

### Component bindings

We can bind a prop in a custom component to a variable.

```svelte
<Keypad bind:value={pin} on:submit={handleSubmit}/>
```

## 07. Lifecycle

### onMount

```svelte
<script>
	import {onMount} from 'svelte';
	let photos = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	})
</script>
```

The returned function is runned when the component is destroyed.

### onDestroy *

We can call the onDestroy method from the component just like onMount.

We can also use onDestroy in helper methods in order to perform cleanup.

utils.js
```js
import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {

	// Calls a function every number of seconds
	const interval = setInterval(callback, milliseconds);

	// Clears the interval when the component is destroyed
	onDestroy(() => {
		clearInterval(interval);
	});
}
```

### beforeUpdate and afterUpdate

beforeUpdate: before the DOM updates

afterUpdate: after the DOM updates

Used to run code once the DOM is in sync with data.

We can use it to perform autoscrolling properly.

```js
let autoscroll;
let div;

beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
});

afterUpdate(() => {
		if (autoscroll) div.scrollTo(0, div.scrollHeight);
});
```

### Tick *

Is a promise function which resolves when pending state changes have been
applied to the DOM.

It is useful when we want to ensure that selections range in textarea is
maintained.

```js
let text = `Select some text and hit the tab key to toggle uppercase`;
import { tick } from 'svelte';

async function handleKeydown(event) {
	if (event.key !== 'Tab') return;

	event.preventDefault();

	const { selectionStart, selectionEnd, value } = this;
	const selection = value.slice(selectionStart, selectionEnd);

	const replacement = /[a-z]/.test(selection)
		? selection.toUpperCase()
		: selection.toLowerCase();

	text = (
		value.slice(0, selectionStart) +
		replacement +
		value.slice(selectionEnd)
	);

	// Need to wait for the tick so that we can (re)select our highlighted text.
	await tick();
	this.selectionStart = selectionStart;
	this.selectionEnd = selectionEnd;
}
```

## 08. Stores

### Writable stores



