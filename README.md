![banner](https://github.com/user-attachments/assets/c3da8a6e-d93b-4fb6-b102-bca62ff25c0f)

# Micro-Bounce-JS
A tiny, type-safe debounce utility for modern JavaScript and TypeScript. Lightweight. Dependency-free. Works in Node and the browser, has a very simple API surface to work with.

### 📦 Installation
```bash
npm install --save micro-bounce-js
```

### 🎲 Features
1. Debounces rapid function calls and preserves ```this``` context
2. Fully type-safe (TypeScript-first)
3. Works in Node & browser environments
4. Zero dependencies
5. Minimal Footprint
6. Unit-Tested using Jest with fake timers to verify

### 💻 Usage
```typescript
/* node modules */
import { microBounce } from "micro-bounce-js";

/* your fn */
function aSimpleLogger(message: string): void {
  console.log(messsage);
}

/* create the debounce instance */
const dLogger = microBounce(aSimpleLogger, 500);
dLogger("Hey there. How you doing?");

// the logger function will be executed after 500 milliseconds
// the log will output "Hey there. How you doing?"
```

