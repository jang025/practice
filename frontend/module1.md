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

## Conditional Rendering

### With an if statement

There's no rule that says that our JSX has to be part of the return statement. We can absolutely assign chunks of JSX to a variable, anywhere within our component definition!

React ignores undefined values

Undefined attributes - React ignores undefined attributes (omits it entirely from the DOM node)

This is true for null and false as well

```jsx
import Friend from "./Friend";

function App() {
  return (
    <ul className="friend-list">
      <Friend name="Andrew" isOnline={false} />
      <Friend name="Beatrice" isOnline={true} />
      <Friend name="Chen" isOnline={true} />
    </ul>
  );
}

export default App;
```

```jsx
function Friend({ name, isOnline }) {
  let prefix;

  if (isOnline) {
    prefix = <div className="green-dot" />;
  }

  return (
    <li className="friend">
      {prefix}
      {name}
    </li>
  );
}

export default Friend;
```

### With &&

The downside with using an if statement is that we need to pull the logic up, away from the rest of the markup. While this is perfectly valid, it can make it harder to understand how a component is structured, especially in larger and more-complex components. We'd have to hop all over the place to understand what gets returned!

Fortunately, there's a way for us to embed if logic right in our JSX: using the && operator.

```jsx
function Friend({ name, isOnline }) {
  return (
    <li className="friend">
      {isOnline && <div className="green-dot" />}
      {name}
    </li>
  );
}

function App() {
  return (
    <ul className="friend-list">
      <Friend name="Andrew" isOnline={false} />
      <Friend name="Beatrice" isOnline={true} />
      <Friend name="Chen" isOnline={true} />
    </ul>
  );
}

export default App;
```

**Common gotcha: the number zero**

```jsx
import ShoppingList from "./ShoppingList";

function App() {
  const shoppingList = [];
  const numOfItems = shoppingList.length;

  return <div>{numOfItems && <ShoppingList items={shoppingList} />}</div>;
}

export default App;
```

This will render 0 on the UI

Why is this happening? We need to keep two things in mind:

1. The && operator doesn't return true or false. It returns either the left-hand side or the right-hand side. So, when our list is empty, this expression evaluates to 0.
   <br>
2. React will render any number you give it, even zero!
   React will ignore most falsy values like false or null, but it won't ignore the number zero.

```jsx
Only 0 and NaN are rendering on the UI
function App() {
  return (
    <ul>
      <li>false: {false}</li>
      <li>undefined: {undefined}</li>
      <li>null: {null}</li>
      <li>Empty string: {""}</li>
      <li>Zero: {0}</li>
      <li>NaN: {NaN}</li>
    </ul>
  );
}

export default App;
```

**Solution: Always use boolean values with &&**

To avoid having random 0 characters sprinkled around your application, I suggest following a “golden rule”: make sure that the left-hand side of && always evaluates to a boolean value, either true or false.

For example, we can check if the number is greater than zero:

```jsx
function App() {
  const shoppingList = ["avocado", "banana", "cinnamon"];
  const numOfItems = shoppingList.length;

  return <div>{numOfItems > 0 && <ShoppingList items={shoppingList} />}</div>;
}
```

### With ternary

The && operator allows us to conditionally render something if a condition is met. But what if we want to render something else if the condition isn't met?

For example, suppose we're building an admin dashboard. If the user is logged in, we want to render the charts and tables and everything. If they're not logged in, we want to render a short message asking them to log in.

```jsx
function App({ user }) {
  const isLoggedIn = true;

  return <>{isLoggedIn ? <AdminDashboard /> : <p>Please login first</p>}</>;
}
```

## Styling in React

### Using CSS modules

```jsx
import Sidenote from "./components/Sidenote";

function App() {
  return (
    <>
      <Sidenote title="I'm a sidenote!">I contain some text!</Sidenote>
    </>
  );
}

export default App;
```

```jsx
import styles from "./Sidenote.module.css";

function Sidenote({ title, children }) {
  console.log(styles);
  return (
    <aside className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <p>{children}</p>
    </aside>
  );
}

export default Sidenote;
```

```css
.wrapper {
  padding: 24px;
  background-color: hsl(210deg 55% 92%);
  border-left: 3px solid hsl(245deg 100% 60%);
  border-radius: 3px 6px 6px 3px;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 4px;
}
```

Modern bundlers like Webpack support importing non-JS files like CSS modules.

When our CSS file ends in **.module.css** , and we import it like a JS module, three things happen:

1. Longer, guaranteed-unique class names are generated for every CSS class in the module
2. The raw CSS, using the longer generated class names, are appended to the document's head.
3. A styles object is produced, mapping the short classes onto their generated alternatives.

CSS classes in a module.css file are unique and will never overlap
because they are tied to the file system **(locally scoped by default)**

className="undefined" (usually a bug)
className={undefined} (React will omit attributes with null or undefined value)
