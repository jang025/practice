# Working with object types

```typescript
const printName = (name: { first: string; last: string }) => {
  return `Name : ${first} ${last}`;
};

let coordinate: { x: number; y: number } = { x: 34, y: 2 };

function randomCoordindate(): { x: number; y: number } {
  return { x: 25, y: 7 };
}
```

# Type Alias

Instead of writing out object types in an annotation, we can declare them separately in a type alias

```typescript
type Person = {
  name: string;
  age: number;
};

const sayHappyBirthday = (person: Person) => {
  return `Hey ${person.name} , congrats on turning ${person.age}`;
};
```

# Optional Properties

Making some properties optional

```typescript
type Point = {
  x: number;
  y: number;
  z?: number;
};

const myPoint: Point = { x: 1, y: 2 };
```

# The readonly modifier

Read only properties (typescript feature)

```typescript
type User = {
  readonly id: number;
};
```

# Intersection types

Combining multiple types

```typescript
type Colorful = {
  color: string;
};
type Circle = {
  radius: number;
};

type ColorfulCircle = Circle & Colorful;

const happyFace: ColorfulCircle = {
  radius: 4,
  color: "yellow",
};
```
