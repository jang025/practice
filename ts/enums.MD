# Enums

Unique to typescript

Enums allow us to define a set of named constants. We can give these constants numeric or string values or a mix of numeric and string values

```typescript
enum OrderStatus {
  PENDING = 10,
  SHIPPED,
  DELIVERED,
  RETURNED,
}

function isDelivered(status: OrderStatus) {
  return status === OrderStatus.DELIVERED;
}

isDelivered(OrderStatus.RETURNED);
```
