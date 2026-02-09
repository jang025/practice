# Event Emitter

```js
const eventEmitter = require("events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("foo", () => {
  console.log("Event Occured");
});

myEmitter.emit("foo");
```
