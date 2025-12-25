# Working with State

## Event Handlers

Handling events in plain Javascript

```javascript
const button = document.querySelector(".btn");

function doSomething() {
  // Stuff here
}

button.addEventListener("click", doSomething);
```

Recommended way to handle events in React

```jsx
function App() {
  function doSomething() {
    // Stuff here
  }

  return <button onClick={doSomething}>Click me!</button>;
}
```

There are a few good reasons why:

1. **Automatic cleanup**. Whenever we add an event listener, we're also supposed to remove it when we're done, with removeEventListener. If we forget to do this, we'll introduce a memory leak. React automatically removes listeners for us when we use “on X” handler functions.
   <br/>
2. **Improved performance**. By giving React control over the event listeners, it can optimize things for us, like batching multiple event listeners together to reduce memory consumption.
   <br/>
3. **No DOM interaction**. React likes for us to stay within its abstraction. We generally try and avoid interacting with the DOM directly. In order to use addEventListener, we have to look up the element with querySelector. This is something we should avoid. The “happy path” in React involves letting React do the DOM manipulation for us.

### Passing a function reference

When working with event handlers in React, we need to pass a reference to the function.

```jsx
// ✅ We want to do this:
<button onClick={doSomething} />

// 🚫 Not this:
<button onClick={doSomething()} />
```

### Specifying Arguments

In order to specify the argument, we need to wrap it in parentheses, but then it gets called right away:

```jsx
// 🚫 Invalid: calls the function right away
<button onClick={setTheme("dark")}>Toggle theme</button>
```

We can solve this problem with a **wrapper function**:

```jsx
// ✅ Valid:
<button onClick={() => setTheme("dark")}>Toggle theme</button>
```

## The useState Hook

```jsx
import React from "react";

function Counter() {
  const [count, setCount] = React.useState(0);

  return <button onClick={() => setCount(count + 1)}>Value: {count}</button>;
}

export default Counter;
```

Our goal is to keep track of the number of times the user has clicked the button. Whenever we have “dynamic” values like this, we need to use React state.

<h2>State is used for values that change over time.</h2>

useState is a hook

<h2>A hook is a special type of function that allows us to "hook into" React internals.</h2>

The useState hook returns an array containing two items:

1. The current value of the state variable. We've decided to call it count.
2. A function we can use to update the state variable. We named it setCount.

Destructuring Assignment

```javascript
const countArray = React.useState(0);

const count = countArray[0];
const setCount = countArray[1];
```

Naming conventions

it's customary to follow the “x, setX” convention:

```javascript
const [user, setUser] = React.useState();
const [errorMessage, setErrorMessage] = React.useState();
const [flowerBouquet, setFlowerBouquet] = React.useState();
```

The first destructured variable is the name of the thing we're tracking. The second destructured variable prefixes that name with set, signifying that it's a function that can be called to change the thing. This is sometimes referred to as a “setter function”, since it sets the new value of the state variable.

### Initial Value

React state variables can be given an initial value:

```jsx
const [count, setCount] = React.useState(1);
console.log(count); // 1
```

We can also supply a function. React will call this function on the very first render to calculate the initial value:
This is sometimes called an initializer function.

```jsx
const [count, setCount] = React.useState(() => {
  return 1 + 1;
});

console.log(count); // 2

const [count, setCount] = React.useState(() => {
  return window.localStorage.getItem("saved-count");
});
```

### Core React Loop

#### Mount

When we render the component for the first time, there is no previous snapshot to compare to. And so, React will create all of the necessary DOM nodes from scratch, and inject them into the page.

#### Trigger

Eventually, something happens that triggers a state change, invoking the “set X” function (eg. setCount). We're telling React that the value of a state variable has just been updated.

#### Render

Because the state changed, we need to generate a new description of the UI! React will invoke our component function again, producing a new set of React elements.

With this new snapshot in hand, React will reconcile it, comparing it to the previous snapshot, and figuring out what needs to happen in order for the DOM to match this latest snapshot.

#### Commit

If any DOM updates are required, React will perform those mutations (eg. changing the text content of a DOM node, creating new nodes, deleting removed nodes, etc).

Once the changes have been committed, React goes idle, and waits for the next trigger, the next state change.

### Rendering VS Painting

To summarize:

- A re-render is a React process where it figures out what needs to change (AKA. “reconciliation”, the spot-the-differences game).
- If something has changed between the two snapshots, React will “commit” those changes by editing the DOM, so that it matches the latest snapshot.
- Whenever a DOM node is edited, the browser will re-paint, re-drawing the relevant pixels so that the user sees the correct UI.
- Not all re-renders require re-paints! If nothing has changed between snapshots, React won't edit any DOM nodes, and nothing will be re-painted.

The critical thing to understand is that when we talk about “re-rendering”, we're not saying that we should throw away the current UI and re-build everything from scratch.

React tries to keep the re-painting to a minimum, because re-painting is slow. Instead of generating a bunch of new DOM nodes from scratch (lots of painting), it figures out what's changed between snapshots, and makes the required tweaks with surgical precision.

### Asynchronous Updates

**state setters aren't immediate**

When we call setCount, we tell React that we'd like to request a change to a state variable. React doesn't immediately drop everything; it waits until the current operation is completed (processing the click), and then it updates the value and triggers a re-render.

For now, the important thing to know is that updating a state variable is asynchronous. It affects what the state will be for the next render. It's a scheduled update.

Here's how to fix the code, so that we have access to the newer value right away:

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <p>You've clicked {count} times.</p>
      <button
        onClick={() => {
          const nextCount = count + 1;
          setCount(nextCount);

          console.log(nextCount);
        }}
      >
        Click me!
      </button>
    </>
  );
}
```

Because state updates are asynchronous, they can be **batched**. React schedules the update, to take place as soon as the current work is completed (in practice, this is usually within a millisecond or two, so it feels completely instantaneous).

## Forms

### Data Binding

When building web applications, we often want to sync a bit of state to a particular form input. For example, a "username" field should be bound to the value of a username state variable.

This is commonly known as “data binding”. Most front-end frameworks offer a way to bind a particular bit of state to a particular form control.

```jsx
import React from "react";

function SearchForm() {
  const [searchTerm, setSearchTerm] = React.useState("cats");

  return (
    <>
      <form>
        <label htmlFor="search-input">Search:</label>
        <input
          type="text"
          id="search-input"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </form>
      <p>Search term: {searchTerm}</p>
    </>
  );
}

export default SearchForm;
```

The event is an object that describes the change that just happened
We can control an input by specifying the value attribute
**Two way data binding**
Typing in the input search bar --> Updates the State
State Updated --> input search bar changes

If you ever need to access the “real” event object, you can access it like this:

```jsx
<input
  onChange={(event) => {
    const realEvent = event.nativeEvent;

    console.log(realEvent); // DOM InputEvent object
  }}
/>
```

### Controlled vs. Uncontrolled inputs

When we set the value attribute on a form input, we tell React that it should be a controlled input. The word “controlled” has a specific definition in React; it means that React is managing the input.

By contrast, if we don't set value, the input is an uncontrolled input. This means that React doesn't do any management.

There's a golden rule here: An input should always either be controlled or uncontrolled. React doesn't like when we flip an element from one to the other.

If there isn't an initial value for useState, the initial value is undefined

```jsx
// 🚫 Incorrect. `username` will flip from `undefined` to a string:
// Uncontrolled to Controlled (Bad Practice)
const [username, setUsername] = React.useState();

// ✅ Correct. `username` will always be a string:
const [username, setUsername] = React.useState("");
```

### onClick Parable

Let's suppose we're building a search form:
Should we place an onClick handler on the search submit button ?
But what happens if the user tries to search by pressing "Enter" after typing in the text input?
Well… I suppose we could tackle that with an onKeyDown event listener?

To solve this problem, along with so many others, we should wrap our form controls in a form tag.

Then, instead of listening for clicks and keys, we can listen for the form submit event.

```jsx
import React from "react";

function SearchForm({ runSearch }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <form
      className="search-form"
      onSubmit={(event) => {
        event.preventDefault();
        runSearch(searchTerm);
      }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <button>Search!</button>
    </form>
  );
}

export default SearchForm;
```

The form submit event will be called automatically when the user clicks the button, or presses "Enter" whenever the input or button is focused. When that event fires, we'll run our search.

#### Default form behavior

Forms have a default behaviour that will make a network request
when i submit them unless i explicitly disable that.

When you submit a form, the browser will try to send the user to the URL specified by the action attribute:

**If we omit the action attribute**, the browser will use the current URL, effectively reloading the page.

In the context of a modern React application, this isn't usually what we want. We don't want to reload the entire page, we want to fetch a bit of data and re-render a few components with that data. This produces a faster, smoother user experience.

That's why we need to include **event.preventDefault()**. It stops the browser from executing a full page reload.

### Other form controls

- Text inputs
- Text areas
- Radio buttons
- Checkboxes
- Selects
- Ranges
- Color pickers

Essentially, all form controls follow the same pattern:

The current value is locked using either **value (for most inputs) or checked (for checkboxes and radio buttons)**.
We respond to changes with the **onChange event listener**.

#### Select Tag

The select tag allows the user to select a single option from a list of predefined options.

When working with select tags in React, they work pretty much exactly like text inputs. We use value and onChange.

```jsx
import React from "react";

function App() {
  const [selectedOption, setSelectedOption] = React.useState("red");

  return (
    <form>
      <fieldset>
        <legend>What is your favourite color?</legend>

        <select
          value={selectedOption}
          onChange={(event) => {
            setSelectedOption(event.target.value);
          }}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </fieldset>

      <p>
        Selected value:
        <br />
        {selectedOption}
      </p>
    </form>
  );
}

export default App;
```

#### Radio Tag

Alright, so radio buttons are a bit trickier.

Ostensibly, they serve the same purpose as a select tag; they allow the user to select 1 choice from a group of options.

The tricky thing, though, is that this state is split across multiple independent HTML elements. There's only one select tag, but there are multiple input type="radio" buttons!

```jsx
import React from "react";

function App() {
  const [terms, setTerms] = React.useState("no");

  return (
    <form>
      <fieldset>
        <legend>Do you agree?</legend>
        <input
          type="radio"
          name="agreed-to-terms"
          id="agreed-yes"
          value="yes"
          checked={terms === "yes"}
          onChange={(event) => {
            setTerms(event.target.value);
          }}
        /> <label htmlFor="agreed-yes">Yes</label>
        <br />
        <input
          type="radio"
          name="agreed-to-terms"
          id="agreed-no"
          value="no"
          checked={terms === "no"}
          onChange={(event) => {
            setTerms(event.target.value);
          }}
        /> <label htmlFor="agreed-no">No</label>
      </fieldset>
    </form>
  );
}

export default App;
```

- **name** The browser needs to know that each button is part of the same group, so that ticking one option will untick the others. This is done through the name prop. Each radio button in a group should share the same name.This is needed so that only one is picked at a time
  <br>
- **value** Each radio button has its own value. This property will be copied over to our React State when the option is ticked. This is the definition / meaning for each radio button
- **checked** This is the prop that binds a given radio button to our React state, making it a controlled value. It should be set to a boolean value: true if it's ticked, false if it's not. Only one radio button should be set to true at a time.
  <br>
  For most other inputs, we bind React state to the value prop. In this case, though, we don't have a single value prop to bind to, since we have multiple radio buttons. So instead, we bind to checked, controlling the ticked/unticked status for each button in the group with React state.

  #### Checkbox tag

  As with radio buttons, the checked property is used to create a controlled element. It should be a boolean value, specifying whether the checkbox is currently ticked or not.

**Single Checkbox**

```jsx
import React from "react";

function App() {
  const [optIn, setOptIn] = React.useState(false);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="checkbox"
          id="opt-in-checkbox"
          checked={optIn}
          onChange={(event) => {
            setOptIn(event.target.checked);
          }}
        />
        <label htmlFor="opt-in-checkbox">
          <strong>Yes,</strong> I would like to join the newsletter.
        </label>
      </form>
      <p>
        <strong>Opt in:</strong> {optIn.toString()}
      </p>
    </>
  );
}

export default App;
```

**Multiple Checkboxes**

```jsx
import React from "react";

const initialToppings = {
  anchovies: false,
  chicken: false,
  tomatoes: false,
};

function App() {
  const [pizzaToppings, setPizzaToppings] = React.useState(initialToppings);

  // Get a list of all toppings.
  // ['anchovies', 'chicken', 'tomato'];
  const toppingsList = Object.keys(initialToppings);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <fieldset>
          <legend>Select toppings:</legend>

          {/*
            Iterate over those toppings, and
            create a checkbox for each one:
          */}
          {toppingsList.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                id={option}
                value={option}
                checked={pizzaToppings[option] === true}
                onChange={(event) => {
                  setPizzaToppings({
                    ...pizzaToppings,
                    [option]: event.target.checked,
                  });
                }}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </fieldset>
      </form>
      <p>
        <strong>Stored state:</strong>
      </p>
      <p className="output">{JSON.stringify(pizzaToppings, null, 2)}</p>
    </>
  );
}

export default App;
```

## Props Vs State

When do you use props, and when do you use state?

### Props

Short for properties , they're like the attributes we place on HTML elements , like href and src and class

Props allow us to customize the behaviour of a given component, so that the exact same component can do different things in different scenarios.

Props are the inputs to our components, like arguments passed to a function.

### State

our application is completely static. Every time we run this code, we get the same result.
But what if we wanted stuff/values to change over time? That's where state comes in.

**We can pass static values (strings, numbers, boolean values) through props, or we can pass dynamic state variables.**

Use props to pass state from a parent component to a child component

## Complex State

React State , can store numbers , strings , booleans
Even more complex data like arrays , objects, functions

**But there's a catch: React state changes have to be immutable. When we call setColors, we need to provide a brand new array. We should never mutate arrays or objects held in state.**

### Mutation Bugs

When we use complex state (objects and arrays) , we always need to create a new array / object.

Assignment vs Mutation

```javascript
let arr = [1, 2, 3, 4];
let nextArr = arr;
nextArr[0] = 5;
arr; // [5,2,3,4]
nextArr === arr; // true

[1, 2, 3] === [1, 2, 3]; // false

// create a copy instead
let copyArr = [...arr];
copyArr === arr; // false

//primitive data types (boolean ,strings , numbers , null, undefined)
// declared with const  cannot be reassigned
// declared with let  can be reassigned
// all primitive data types are immutable

// arrays and objects
// declared with const cannot be reassigned
// declared with let can be reassigned
// objects and arrays are mutable

// To work with arrays and objects in an immutable fashion
// (which is a best practice in modern JavaScript frameworks like React to avoid side effects and bugs)
//  you should create new copies instead of modifying the existing ones
```

1. Create a new array
2. Modify that new array
3. Set the new array into state

```jsx
const nextColors = [...colors];
nextColors[index] = event.target.value;

setColors(nextColors);
```

```jsx
import React from "react";
function App() {
  const [colors, setColors] = React.useState(["#FFD500", "#FF0040"]);

  const colorStops = colors.join(", ");
  const backgroundImage = `linear-gradient(${colorStops})`;

  function addColor() {
    if (colors.length >= 5) {
      window.alert("There is a maximum of 5 colors");
      return;
    }

    const nextColors = [...colors];
    nextColors.push("#FF0000");
    setColors(nextColors);
  }

  function removeColor() {
    if (colors.length <= 2) {
      window.alert("There is a minimum of 2 colors");
      return;
    }

    const nextColors = [...colors];
    nextColors.pop();
    setColors(nextColors);
  }

  return (
    <div className="wrapper">
      <div className="actions">
        <button onClick={removeColor}>Remove color</button>
        <button onClick={addColor}>Add color</button>
      </div>

      <div
        className="gradient-preview"
        style={{
          backgroundImage,
        }}
      />

      <div className="colors">
        {colors.map((color, index) => {
          const colorId = `color-${index}`;
          return (
            <div key={colorId} className="color-wrapper">
              <label htmlFor={colorId}>Color {index + 1}:</label>
              <div className="input-wrapper">
                <input
                  id={colorId}
                  type="color"
                  value={color}
                  onChange={(event) => {
                    const nextColors = [...colors];
                    nextColors[index] = event.target.value;

                    setColors(nextColors);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
```

## Dynamic Key Generation

In fact, this is one of the most common questions that developers have. React needs a unique value for each item, but we don't always have one!

The goal is to fix the key warning by dynamically generating the keys for each sticker.

```jsx
function StickerPad() {
  const [stickers, setStickers] = React.useState([]);

  return (
    <button
      className={styles.wrapper}
      onClick={(event) => {
        const stickerData = getSticker();
        const newSticker = {
          ...stickerData,
          x: event.clientX,
          y: event.clientY,
          // Come up with a unique value for this sticker.
          id: crypto.randomUUID(),
        };

        const nextStickers = [...stickers, newSticker];
        setStickers(nextStickers);
      }}
    >
      {stickers.map((sticker) => (
        <img
          // Use that previously-created unique value
          // for the key:
          key={sticker.id}
          className={styles.sticker}
          src={sticker.src}
          alt={sticker.alt}
          style={{
            left: sticker.x,
            top: sticker.y,
            width: sticker.width,
            height: sticker.height,
          }}
        />
      ))}
    </button>
  );
}
```

## Lifting State up

Lifting state up is an incredibly important idea, a vital tool in every React developer's toolbox.

The main way to pass state through a React application is through props or context. This means that state always flows from parent to child. There's no way for siblings to share state directly.

The solution, then, is to bring the state into the parent component, so it can distribute it to both siblings that require it.

We can also pass the state-setter functions, allowing children to update the state.

**The component that owns that state is re-rendered when the state changes**

```jsx
import React from "react";

import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <header>
        <a className="logo" href="/">
          Wanda’s Fruits
        </a>
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <main>
        <SearchResults searchTerm={searchTerm} />
      </main>
    </>
  );
}

export default App;
```

#### Exercise

```jsx
import React from "react";

import AddNewItemForm from "./AddNewItemForm";

function App() {
  const [items, setItems] = React.useState([]);

  function handleAddItems(item) {
    const newItem = {
      id: crypto.randomUUID(),
      label: item,
    };
    const nextItem = [...items, newItem];
    setItems(nextItem);
  }
  return (
    <div className="wrapper">
      <div className="list-wrapper">
        <ol className="shopping-list">
          {items.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ol>
      </div>
      <AddNewItemForm handleAddItems={handleAddItems} />
    </div>
  );
}

export default App;
```

```jsx
import React from "react";

function AddNewItemForm({ handleAddItems }) {
  function handleSubmit(event) {
    event.preventDefault();
    handleAddItems(inputValue);
    setInputValue("");
  }
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className="new-list-item-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-list-form-input">New item:</label>

        <div className="row">
          <input
            required={true}
            id="new-list-form-input"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button>Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewItemForm;
```

## Component Instances

whenever we render a component in React, **we create a component instance**.

When we create a state hook, where does that state actually live? Is it associated with the React elements, or stored in a centralized place?

The missing piece of information is called component instances.

Whenever we render a component for the first time, we “mount” the component. Mounting a component involves two steps:

1. We evaluate the returned JSX and pass it onto React, so that React can create the corresponding DOM elements.
   <br/>
2. We create a component instance, a long-lived object that holds contextual information about this particular instance of the component.
   The state is stored on this particular instance. When we write React.useState(), this code "hooks into" the instance, getting and setting state from the instance.

With conditional rendering, it's possible to unmount a component. When we unmount a component, **we destroy the component instance, and any stored state is lost forever.**

Component instances allow us to render multiple "copies" of the same component, and they each have their own internal state.

<h1>The component lifecycle</h1>
When we render a component , we create the component instance (state lives in this component instance)

Only rendered components have a component instance

When we unmount a componet , we destroy the component instance ( state that lives in this component instance is destroyed forever)
