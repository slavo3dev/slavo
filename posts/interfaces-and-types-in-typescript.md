---
title: "Interfaces and Types in TS"
date: "2022-10-17"
author: "Slavo"
image: "interfaces-and-types-in-typescript.png"
excerpt: "There are two different ways now how you can specify the structure of your data."
isFeatured: false
category: "Type Script"
---

### There are two different ways in TypeScript how you can specify the structure of your data

- Interface and Types
- They are very similar, almost everything you can do with the Interface, you can also do with the Type
- In TypeScript is recommending to use Interface over Type alias when it's possible
- Interface describes data structure in a more natural way
- Interface keyword exists only in TypeScript non in vanilla JavaScript. It is helping us to write structured and very explicit code that can help you force classes to have certain features or objects in general to have a specific structure. They allow for optional properties and all optional methods if you add a question mark after the method name
- You can't assign a default value inside the Interface, just the property's name, and type

```js
  interface User {
    username: string
    project: string
    years: number

    hello?(name: string): void
  }

  const userOne: User = {
    username: "slavo3dev",
    project: "NRG Nomad",
    years: 1
  }
```

### Type Alias

```js
type Username = string;
type PersonLogFunction = (name: string) => string;

const username: string = "Slavo3 NRG Nomad";

const logUser: PersonLogFunction = (name) => {
  return name;
};

const firstUser: Username = logUser(username);
```
