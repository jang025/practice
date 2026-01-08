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
