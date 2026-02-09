# React Hooks

hooks are special functions that allow us to “hook” into React internals (basically stored in a component instance). useState allows us to hook into a component instance's state, for example, while useId allows us to create and store a unique identifier on the component instance.

## The useId hook

Use the useId hook when you have two forms that exist on the same page

```javascript
const id = React.useId();
```

React hooks “hook into” the component instance. And so this ID lives on the component instance, and can be plucked out during render.
This means that the value **persists across renders**. id will always be equal to :r0:, in that first instance, on every single render.

Component instance is never changed between re-renders
The data (state and props) changes , leading to a new rendered output but the underlying component instance never changes

The useId hook is special in one more way: It produces the same value across server and client renders. This is a very special property, and something that would be very difficult to reproduce without a special React-provided solution.

## Rules of Hooks

hooks are plain old JavaScript functions

But, when we call these functions, they "hook into" React internals. And we can catch React off-guard. It expects these hook functions to be used in very specific ways, and if we violate those expectations, bad things happen.

There are two “Rules of Hooks” that we should learn, in order to make sure we're always using hooks as React expects.

1. Hooks have to be called within the scope of a React application. We can't call them outside of our React components.
2. We have to call our hooks at the top level of the component.**(Not allowed to call hooks conditionally)**

React Hooks are implemented in a way where the order matter.

Need to make sure that we're calling the exact same hooks in the exact same order on every single render.

## Immutability Revisited

Need to remember that **react state is immutable**

When we set a new state (create a new state) , we are creating a brand new state that is stored in a different place in memory (even if the value is exactly identical)

We can look at state as **snapshots(data available at that moment in time)**

every time that state changes, we create a snapshot that captures the current value of that state variable.

## Refs

### React state is suppose to be immutable but React ref is suppose to be mutated

Capture a reference to the DOM node (canvas tag for example), on the very first reference,
and then reuse that work across subsequent ones

The ref object created by the useRef hook should be thought of as a box. We can store whatever we want in this box: DOM nodes, numbers, arrays, objects, functions, etc.

That said, the primary use case for refs is to store **DOM nodes**. It's pretty rare for me to need to store anything else in a ref.

```jsx
import React from "react";

function ArtGallery() {
  // 1. Create a “ref”, a box that holds a value.
  const canvasRef = React.useRef(); // { current: undefined }

  return (
    <main>
      <div className="canvas-wrapper">
        <canvas
          // 2. Capture a reference to the <canvas> tag,
          // and put it in the “canvasRef” box.
          //
          // { current: <canvas> }
          ref={canvasRef}
          width={200}
          height={200}
        />
      </div>

      <button
        onClick={() => {
          // 3. Pluck the <canvas> tag from the box,
          // and pass it onto our `draw` function.
          draw(canvasRef.current);
        }}
      >
        Draw!
      </button>
    </main>
  );
}

function draw(canvas) {
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 200, 200);

  ctx.beginPath();
  ctx.rect(30, 90, 140, 20);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(100, 97, 75, 1 * Math.PI, 2 * Math.PI);
  ctx.fillStyle = "tomato";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(100, 103, 75, 0, 1 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(100, 100, 25, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(100, 100, 19, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

export default ArtGallery;
```

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

By specifying count, we're saying that the effect logic should only run when the count variable changes.

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
