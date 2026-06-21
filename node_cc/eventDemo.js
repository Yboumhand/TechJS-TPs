import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

// event logic implementation
const greetHandler = (name) => {
  console.log(`Hello, ${name}!`);
};

const goodbyeHandler = (name) => {
  console.log(`Goodbye, ${name}!`);
};

// Register event listeners
myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);

// Emit events
myEmitter.emit("greet", "John");
myEmitter.emit("goodbye", "Jane");
