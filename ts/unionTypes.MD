# Union Types

Union types allow us to give a value a few different types

```typescript
const guessAge = (age: number | string) => {
  return `Your age is ${age}`;
};
```

# Type narrowing with union types

Narrowing the type means to check for the type before working with a value

Since union allows multiple types for a value, it's good to check what came through before working with it

```typescript
function calculateTax(price: number | string, tax: number) {
  if (typeof price === "string") {
    price.replace("$", "");
  } else {
    price * tax;
  }
}
```

# Union types with arrays

an array of strings
an array of numbers
an array of strings and numbers

```typescript
const stuff: (number | string)[] = [1, 2, 3, "hello"];
```

# Literal Types

Literal types are not just types , but the value themselves too

```typescript
const giveAnswer = (answer: "yes" | "no" | "maybe") => {
  return `the answer is ${answer}`;
};
```
