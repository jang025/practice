# Interfaces

Using interfaces to create reusable , modular types that describe the shape of the object

```typescript
interface Person {
  name: string;
  age: number;
}
```

# Optional properties and readonly modifier for interface

```typescript
interface Person {
  readonly id: number;
  first: string;
  age: number;
  nickname?: string;
}
```

# Interface methods

```typescript
interface Greeting {
  sayHi: () => string;
}

const myGreeting: Greeting = {
  sayHi: () => {
    return "Hello!";
  },
};
```

# Interface method parameters

```typescript
interface Product {
  name: string;
  price: number;
  applyDiscount(discount: number): number;
}

const shoes: Product = {
  name: "nike offbalance white",
  price: 100,
  applyDiscount(amount: number) {
    return 2;
  },
};
```

# Adding new properties in Interface

```typescript
interface Dog {
  name: string;
}

interface Dog {
  age: number;
}
```

# Extending interfaces

```typescript
interface ServiceDog extends Dog {
  job: "guide dog" | "police dog";
}
```

# Extending multiple interfaces

```typescript
interface Person {
  name: string;
}

interface Employee {
  readonly id: number;
  email: string;
}

interface Engineer extends Person, Employee {
  level: string;
  skills: string[];
}
```

# Interfaces vs type alias

Interfaces can only describe the shape of an object
