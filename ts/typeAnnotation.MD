# Static Checking

TypeScript detects errors in our code without **running it**. This is called static checking

# Type Checking

TypeScript does this error checking on the basis of the "Kinds of Data" in our program . AKA Types

Why Types ?

- Helps us find errors
- Analyze our code as we type
- Only exists in development

# Compile TypeScript into Javascript

tsc TypeScript file

# Our first type annotation

```typescript
const myAwesomeVariable: string = "So Awesome!";
const myNumber: number = 42;
const myBoolean: boolean = true;
```

# Type Inference

Typescript compiler ability to infer types from certain values in your code

Typescript can remember a value's type even if you didnt provide a type annotation, and it will enforce that type moving forward

# The any type

Escape hatch : turns off type checking for this variable so you can do your thing

Defeats the purpose of TS and types so use it sparingly

```typescript
let foundMovies; // inferred type is any
```
