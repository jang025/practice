# React Hooks

hooks are special functions that allow us to “hook” into React internals. useState allows us to hook into a component instance's state, for example, while useId allows us to create and store a unique identifier on the component instance.

## The useId hook

## Rules of Hooks

hooks are plain old JavaScript functions

But, when we call these functions, they "hook into" React internals. And we can catch React off-guard. It expects these hook functions to be used in very specific ways, and if we violate those expectations, bad things happen.

There are two “Rules of Hooks” that we should learn, in order to make sure we're always using hooks as React expects.

1. Hooks have to be called within the scope of a React application. We can't call them outside of our React components.
2. We have to call our hooks at the top level of the component.(Not allowed to call hooks conditionally)

## Immutability Revisited

## Refs

## Side Effects

Doing anything outside of React's typical job responsibilities

examples of side effects include interacting with Local Storage, or making network requests.

React gives us a specific tool for managing side effects: the useEffect hook. We pass some code to useEffect, via a callback function, and React calls that function for us **after each render**.

useEffect always runs after the first render

We can specify dependencies so that the effect only runs sometimes, when a particular value has changed. For example:

```jsx
React.useEffect(() => {
  // Effect logic
  document.title = `(${count}) — Counter 2.0`;
}, [count]);
```

By specifying [count], we're saying that the effect logic should only run when the count variable changes.

Effects always run after the very first render, no matter what we specify in our dependency array.

```jsx
React.useEffect(() => {
  // Effect logic here

  // Cleanup function:
  return () => {
    // Cleanup logic here
  };
});
```

We give React two functions, an effect function and a cleanup function, and React calls these functions for us at the appropriate time.

## Custom Hooks

## Data Fetching

send data to our backend API using fetch

not allowed to actually send arrays , objects , functions over a network
It has to be a string so we do JSON.stringify()

## Memoization
