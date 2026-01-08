# Function Parameter Types

In Typescript, we can specify the type of function parameters in a function declaration

This allows typescript to enforce the types for the values being passed into your function

Typing parameters is like typing parameters

The default type for function parameters if not declared is **any**

```typescript
const encourageStudent = function (name: string) {
  return `Hey, ${name}, you're doing great`;
};
```

# Working with default parameters

```typescript
function greet(person: string = "stranger") {
  return `Hey, there ,${person}`;
}
```

# Return Type Annotations

We can specify the type returned by a function.

```typescript
const addNums = (x: number, y: number): number => {
  return x + y;
};
```

# The void type

Void is a return type for functions that don't return anything.

```typescript
const printTwice = function (msg: string): void {
  console.log(msg);
  console.log(msg);
};
```

# The never type

The never type represents values that never occur. We might use it to annotate a function that always throws an exception, or a function that never finishes executing.

```typescript
const neverStop = (): never => {
  while (true) {
    console.log("I'm still going!");
  }
};

const giveError = (msg: string): never => {
  throw new Error(msg);
};
```
