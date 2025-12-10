# React Fundamentals

## Compiling JSX into JavaScript

JavaScript engines don't understand JSX, they only understand JavaScript. And so we need to "compile" our code into plain JS.

This is most commonly done as part of a build step, using a tool like Babel;

The JSX we write gets converted into React.createElement()

The process of converting JSX into browser-friendly JS is sometimes referred to as “transpiling” instead of “compiling”.

**“transpiled” vs. “compiled”**

- "compiling" typically refers to the process of taking human-readable code and transforming it into machine-readable code.
- "transpiling", by contrast, typically refers to taking one high-level language and transforming it into another high-level language.

## Expression slots

**NOTE:** must use javascript expressions

```javascript
{
  shoppingList.length;
}
```

### Attribute expression slots

Used for dynamic attribute values

```jsx
const uniqueId = "content-wrapper";

const element = <main id={uniqueId}>Hello World</main>;
```

### Type coercion

At run-time, React will automatically convert types as needed when supplying attributes in expression slots.

```jsx
// This works:
<input required="true" />

// And this
<input required />

// And so does this!
<input required={true} />
```

```jsx
// ✅ Valid
<input type="range" min="1" max="20" />
// ✅ Valid
<input type="range" min={1} max={20} />
```
