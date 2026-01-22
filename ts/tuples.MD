# Tuples

Tuples are a special type exclusive to typescript (they don't exist in JS)

Tuples are arrays of fixed lengths and ordered with specific types

Super rigid arrays

```typescript
let myTuple: [number, string];
myTuple = [10, "typescript is fun!"];
```

Limitations of tuple in typescript : push and pop method will work even if the pattern is a fixed length of a number and then a string
