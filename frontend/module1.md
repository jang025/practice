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

## Components

A component is a bundle of markup , styles , logic that controls everything about a specific part of the user interface

With React, components are the main mechanism of reuse.

Create a library of high-level reusable UI elements

In React, components are defined as JavaScript functions.

Typically, React components return one or more React elements.

### The big component rule

React components must start with a **Capital Letter**

This is how the JSX compiler can tell whether we're trying to render a built-in HTML tag, or a custom React component.

A React element is a description of a thing we want to create. In some cases, we want to create a _DOM node_, like a h1 element.
In other cases, we want to create a _component instance_.

## Props

Props are like arguments to a function: they allow us to pass data to our components, so that the components can include customizations based on the data.

1. Passing data to our component
2. Receving the data in our component

### Default values (to ensure there is fallback value)

We can specify default values for each prop

```jsx
function GreetingCard({ name = "John" }) {
  return <h1>Hi {name}</h1>;
}
```

## The children prop

children is a special value, a “reserved word” when it comes to props.

```jsx
root.render(<RedButton>Don't click me</RedButton>);

function RedButton({ children }) {
  return (
    <button
      style={{
        color: "white",
        backgroundColor: "red",
      }}
    >
      {children}
    </button>
  );
}
```

## Iteration

### Mapping over data

1. Create an array of React Elements
2. Pass that array to React in the JSX

### Keys

When we give React an array of elements, we also need to help React out by uniquely identifying each element.

**The purpose of a key is to uniquely identify each React element.**

Keys identify a particular React element. It's a property of the element itself, not something that needs to be passed along to the component!

```javascript
const element = {
  type: ContactCard,
  key: "sunita-abc123",
  props: {
    name: "Sunita Kumar",
    job: "Electrical Engineer",
    email: "sunita.kumar@acme.co",
  },
};
```

#### Key rules

1. the key needs to be applied to the very **top-level element** within the .map() call.

2. When using fragments, it's sometimes required to switch to the long-form React.Fragment, so that we can apply the key: <React.Fragment key={}>

3. Many developers believe that keys have to be globally unique, across the entire application, but this is a misconception. **Keys only have to be unique within their array**.
