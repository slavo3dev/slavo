---
title: "Demystifying JavaScript: A Deep Dive into Hoisting and Vars"
date: "2023-09-10"
author: "Slavo"
image: "var_const.png"
excerpt: "Closure is a function with access to its scope..."
isFeatured: false
category: "Java Script"
---

### Why Do We Use Variables in Computer Science?

At its core, computer science is all about data and instructions to process that data. Variables act as containers for data values, enabling developers to write flexible and dynamic code. Instead of hardcoding values, developers can use variables to store, update, and reference data throughout a program. Variables give code malleability, making programming both functional and efficient.

---

### Dive Into JavaScript Variables

In the early days of JavaScript, developers had only one way to declare a variable: using the `var` keyword. But with the advent of ES6 (ECMAScript 2015), two new ways to declare variables emerged: `let` and `const.` Let's explore the differences:

#### 1. var

- **Scope**: Function-scoped. If you declare a variable inside a function using `var,` it's only available within that function. However, if you declare it outside any function, it's globally accessible.
- **Hoisting**: Variables declared with `var` are hoisted to the top of their scope, meaning they're lifted to the beginning of their function or global context. However, only the declaration is hoisted, not the initialization.

```javascript
console.log(foo); // undefined (not ReferenceError)
var foo = "Hello World!";
console.log(foo); // "Hello World!"
```

#### 2. let

- **Scope**: Block-scoped. Variables declared with `let` are only accessible within the block in which they're contained.

- **Hoisting**: Like `var` and `let` declarations are hoisted, but accessing them before their declaration in the code will throw an error. This phenomenon is known as the Temporal Dead Zone (TDZ).

```javascript
// console.log(bar); // ReferenceError
let bar = "Hello ES6!";
console.log(bar); // "Hello ES6!"
```

#### 3. const

- **Scope**: Block-scoped, just like `let`

- **Immutability**: While a `const` variable can't be reassigned, it doesn't make the data it holds immutable. For instance, if you have a `const` object, you can still modify its properties.

```javascript
const pi = 3.14159;
// pi = 3.14; // TypeError

const obj = { name: "John" };
obj.name = "Jane"; // Works fine
// obj = { name: "Doe" }; // TypeError
```

- **Hoisting**:
  For `let` and `const` declarations are hoisted, but you can't access them before their declaration.

### Which One Should You Use?

For modern JavaScript development:

1. **Default to `const`** for variables that won't be reassigned.
2. Use **`let`** when you know the variable will need reassignment.
3. **Avoid `var`** as much as possible, given its idiosyncrasies with scope, and hoisting can lead to unpredictable behaviors.

---

## Understanding JavaScript Hoisting

In the world of JavaScript, the term "hoisting" is used to describe the unique behavior in which variable and function declarations are "lifted" or "hoisted" to the top of their containing scope during the compile phase before the code is executed. However, it's crucial to note that initializations are not while the declarations are hoisted.

\*\* Book Recommendation: [Eloquent JavaScript](https://amzn.to/44UeeZ6)

### How Hoisting Works

1. **Variable Hoisting**:

   When you declare a variable in JavaScript, the declaration gets hoisted, but the initialization does not.

   ```javascript
   console.log(myVar); // undefined
   var myVar = "Hello World";
   console.log(myVar); // 'Hello World'
   ```

   In the above code, the `var myVar` declaration is hoisted to the top of its scope, but the assignment of `'Hello World'` remains where it is. This is why the first `console.log` statement outputs `undefined`.

2. **Function Hoisting**:

   Function declarations are hoisted in their entirety. This means a traditionally declared function can be invoked even before its declaration in the code.

   ```javascript
   greet(); // 'Hello!'

   function greet() {
     console.log("Hello!");
   }
   ```

   However, if you define a function using a function expression, only the variable declaration is hoisted, not the function itself.

   ```javascript
   // greetExpression(); // TypeError: greetExpression is not a function

   var greetExpression = function () {
     console.log("Hello from the expression!");
   };

   greetExpression(); // 'Hello from the expression!'
   ```

3. **let and const Hoisting**:

   Variables declared with `let` and `const` are also hoisted but behave differently from `var`. They get hoisted to the top of their block, but accessing them before their declaration results in a `ReferenceError`. This phase before the variable declaration, where they can't be accessed, is often called the "Temporal Dead Zone" (TDZ).

   ```javascript
   // console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
   let myLet = "Hello let";

   // console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization
   const myConst = "Hello const";
   ```

\*\* Book Recommendation: [Eloquent JavaScript](https://amzn.to/44UeeZ6)

### Practical Implications

1. **Avoid Unexpected Behavior**: Always declare and initialize variables and functions at the beginning of their scope to prevent unexpected behaviors and make the code more straightforward.

2. **Embrace Block Scoping**: With the introduction of `let` and `const`, you have more granular control over variable scope. You can prevent potential bugs and write more predictable code by understanding hoisting.

3. **Be Mindful of Function Expressions**: Remember that while function declarations are fully hoisted, function expressions are not. This can lead to different behaviors and potential errors if not accounted for.

### In Conclusion

Hoisting is a peculiar yet essential concept in JavaScript. Developers can write more predictable and error-free code by understanding how it works. Always remember the different behaviors of `var`, `let`, `const`, and function declarations versus expressions, and you'll be well on your way to mastering this critical topic.

### Homework for Practice

1. **Play with Scope**: Create various blocks (like loops and conditionals) and declare variables using `var`, `let`, and `const`. Try accessing them outside of these blocks. Observe and note the results.

2. **Hoisting Exploration**: Write code snippets where you try to access variables before their declaration. Do this for `var`, `let`, and `const`. Note down the results and reasons.

3. **Mutable vs. Immutable**: Declare a `const` object and array. Try modifying, adding, and removing properties/items. Understand the difference between variable reassignment and modifying the data a variable points to.

By the end of these exercises, you should have a solid grasp of JavaScript variables and their peculiarities. Happy coding!

\*\* Book Recommendation: [Eloquent JavaScript](https://amzn.to/44UeeZ6)

Remember, if you get stuck, don't be afraid to look up solutions or ask for help. The key to learning programming is persistence! [Ask for help - Mentorship](/contact)

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/aN9Pgzz2)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
