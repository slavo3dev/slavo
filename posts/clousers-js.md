---
title: "Power of Closures!"
date: "2023-05-20"
author: "Slavo"
image: "clo-js.png"
excerpt: "Closure is a function with access to its scope..."
isFeatured: true
category: "Java Script"
---

In JavaScript, a closure is a function with access to its scope, the outer function's scope, and the global scope. That means that closure can access variables from three different scopes. Interestingly, a closure can access the outer function's variables even after the external function has returned. This aspect makes closures very useful and powerful.

Here's a simple example to illustrate the concept:

```javascript
function outerFunction() {
  let outerVariable = "I am from outer function!";

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

let closure = outerFunction();
closure(); // Logs: 'I am from outer function!'
```

In this example, **innerFunction** is a closure that is defined inside **outerFunction** and has access to **outerFunction's** scope, which includes **outerVariable**. When we call **outerFunction**(), it returns **innerFunction** which we store in the closure variable. Even though **outerFunction** has finished executing, closure can still access **outerVariable** when we call it.

Closures are essential for several reasons:

- **Data privacy**: Closures can help create private variables that can only be accessed and manipulated by the functions that reference them.
- **Function factories:** Closures allow us to write flexible and efficient code by creating functions within a function.
- **Asynchronous programming:** They are also frequently used in JavaScript for asynchronous programming and callbacks because they allow access to an outer function’s scope from an asynchronous callback function.

**_Pros and Cons of Closures_**

Pros:

1. Encapsulation and Data Privacy: They allow you to create private data and methods to prevent unexpected side effects due to accidental data modification.
2. Functional Programming: Closures are a fundamental part of available programming and can be used to create function factories and modular code.

Cons:

1. Memory Overhead: Closures retain their lexical scope, meaning they can lead to memory leaks if you're not careful.
2. Complexity: The concept of closures can be complex for beginners and lead to hard-to-track bugs.

**_How to Use Them in a Project_**

Let's consider a simple project where you might use a closure - a module with private data.

```javascript
let userModule = (function () {
  let privateUsers = [];

  function addUser(name) {
    privateUsers.push(name);
  }

  function listUsers() {
    return privateUsers;
  }

  return {
    addUser: addUser,
    listUsers: listUsers,
  };
})();

userModule.addUser("John");
console.log(userModule.listUsers()); // Logs: ['John']
```

In the above example, userModule is a JavaScript object returned by a self-invoking function. This object exposes the `addUser` and `listUsers` methods, which work on the `privateUsers` array. The `privateUsers` array, however, is not directly accessible from outside the self-invoking function, providing a level of data privacy.

Remember, while closures are a powerful tool, they also can make code more complex, and incorrect use can lead to issues such as memory leaks. Always try to keep your functions and closures as simple and as clean as possible.

**Practicing with exercises** is a great way to understand closures better.

**Here are some questions that you can try:**

**Basic Closure:**

- Write a function outerFunction which takes a string as input. This function should return an inner function, which also takes a string as input. When the inner function is invoked, it should return the concatenation of the string given to outerFunction and the string given to the inner function.

```javascript
// Example usage:
let closure = outerFunction("Hello, ");
console.log(closure("John")); // Should log: 'Hello, John'
```

**Counter Function**:

- Write a function createCounter that returns a function, which when invoked, increments and returns a counter. The counter should start at 0.

```javascript
// Example usage:
let counter = createCounter();
console.log(counter()); // Should log: 1
console.log(counter()); // Should log: 2
```

**Function Factory**:

- Write a function multiplier that takes a number as an argument and returns a new function. The returned function should take a single argument and return the product of its input and the input to the outer function.

```javascript
// Example usage:
let doubler = multiplier(2);
console.log(doubler(5)); // Should log: 10

let tripler = multiplier(3);
console.log(tripler(5)); // Should log: 15
```

**Data Privacy:**

- Create a module to manage a list of tasks. It should have methods to add a task, remove a task, and list all tasks. However, the tasks themselves should be kept private and not exposed directly.

```javascript
// Example usage:
let taskModule = createTaskModule();
taskModule.addTask("Walk the dog");
taskModule.removeTask("Walk the dog");
console.log(taskModule.listTasks());
```

**Closures and Asynchronous Code:**

- Write a function delayedLog that takes an array of messages and logs each one after 1 second, preserving the order. Hint: You will need to use setTimeout, and you'll need to create a closure to keep track of the correct message to log.

```javascript
// Example usage:
delayedLog(["Hello", "World", "!"]); // Should log 'Hello', then 'World', then '!', each one second apart
```

\*\* Book Recomedation: [Eloquent JavaScript](https://amzn.to/44UeeZ6)

Remember, if you get stuck, don't be afraid to look up solutions or ask for help. The key to learning programming is persistence! [Ask for help - Mentorship](https://wwww.slavo.io/contact)
