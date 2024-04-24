---
title: "Deep Copy vs. Shallow Copy in JavaScript"
date: "2023-05-25"
author: "Slavo"
image: "clo-js.png"
excerpt: "Understanding the concept of copying in JavaScript is crucial for every software engineer..."
isFeatured: false
category: "Java Script"
---

Understanding the concept of copying in JavaScript is crucial for every software engineer.

## What is a Shallow Copy?

A shallow copy is copying reference types (objects and arrays) wherein the copied object still references the original object. That means changing a value in the copied object will also change the value in the original thing.

Here's a basic example:

    ```javascript
    let originalArray = [1, 2, 3, 4];
    let shallowCopyArray = originalArray;

    shallowCopyArray[0] = 100;

    console.log(originalArray); // Output: [100, 2, 3, 4]
    console.log(shallowCopyArray); // Output: [100, 2, 3, 4]
    ```

In this case, the original array was altered when we updated the `shallowCopyArray.`

**Pros of Shallow Copy:**

- Quick and easy to implement.
- Consumes less memory as it only references the original data.

**Cons of Shallow Copy:**

- Can lead to unintended side effects when the copied data is manipulated.

## What is a Deep Copy?

A deep copy creates a new object and recursively adds copies of the values from the original object. In this case, the original and copied objects do not share any memory, and changes made to the copied object will not affect the original object, and vice versa.

Here's an example using JSON methods to create a deep copy:

    ```javascript
    let originalObj = { a: 1, b: 2 };
    let deepCopyObj = JSON.parse(JSON.stringify(originalObj));

    deepCopyObj.a = 100;

    console.log(originalObj); // Output: { a: 1, b: 2 }
    console.log(deepCopyObj); // Output: { a: 100, b: 2 }
    ```

In this case, the original object is unaffected by changes made to the `deepCopyObj.`

**Pros of Deep Copy:**

- Avoids accidental mutation of the original data.
- The copied data and the original data are entirely independent.

**Cons of Deep Copy:**

- More memory-intensive than a shallow copy as it duplicates all data.
- Can be slower because it involves recursive copying.

## Best Practices

- Use a shallow copy to create a new instance that shares the same data as the original.
- Use a deep copy when you want a new instance with the same data, but changes to the new instance should not affect the original data.
- Consider performance and memory implications when choosing between shallow copy and deep copy.

## Practice Questions

1. What will be the output of the following code snippet?

   ```javascript
   let arr1 = [1, 2, 3];
   let arr2 = arr1;
   arr2.push(4);
   console.log(arr1);
   ```

2. Consider the following code snippet. Does it result in a shallow copy or a deep copy? Why?

   ```javascript
   let obj1 = { a: 1, b: 2, c: { d: 3 } };
   let obj2 = { ...obj1 };
   obj2.c.d = 4;
   console.log(obj1.c.d);
   ```

3. Create a deep copy of the following object without using `JSON.stringify()`:

   ```javascript
   let obj = { a: 1, b: 2, c: { d: 3 } };
   ```

4. What potential issue might you run into when using `JSON

.stringify()`and`JSON.parse()` for deep copying?

By understanding these copying concepts and effectively applying them, you'll enhance your code's stability and quality. Happy coding!

\*\* Book Recommendation: [Eloquent JavaScript](https://amzn.to/44UeeZ6)

Remember, if you get stuck, don't be afraid to look up solutions or ask for help. The key to learning programming is persistence! [Ask for help - Mentorship](/contact)

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/M7keEuaw)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
