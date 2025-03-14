---
title: "Core Types - TS"
date: "2022-10-15"
author: "Slavo"
image: "core-types-ts-post.png"
excerpt: "Truthy/Falsy concept in JavaScript, which you should know is not related to data types. "
isFeatured: false
category: "Type Script"
---

#### Number

- In TypeScript, as the same is true for TypeScript, there is only one number type. There are no special types for integers or floats

#### All numbers, no differentiation between integers or floats

```js
const age: number = 39;
const height: number = 6.1;
```

#### String

- That would be a text that you can define in one of these three ways: single quotes, double quotes and backticks
- The last notation with backticks is a special syntax provided in modern JavaScript and also in TypeScript, which allows us to write so-colled template literals that are regular strings where you can dynamically inject some data into them

```js
const firstName: string = "Slavo";
const lastName: string = "Slavo";
const username: string = "slavo.io";
const city: string = `Miami`;
const greeting: string = `Hello ${firstName} ${lastName}`;
```

#### Boolean

- The most basic datatype is the simple true/false value, which JavaScript and TypeScript call a boolean value
- The boolean know those two values, true or false. There is a Truthy/Falsy concept in JavaScript, which you should know is not related to data types. That some behind the scenes work JavaScript does at runtime when it sees specific values and if conditions. For example, number zero is a false value.

```js
const isGood: boolean = true;
const isLazy: string = false;
```

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/rpfrPaAbFK)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
