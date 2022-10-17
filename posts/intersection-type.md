---
title: 'Intersection Type'
date: '2022-10-16'
author: 'Slavo'
image: 'intersection-type-post.png'
excerpt: 'Intersection and Union types are one of the ways in which you can compose types'
isFeatured: true 
category: 'Type Script'
---


Intersection and Union types are one of the ways in which you can compose types.
It's allow us to combine other types.

Suppose that you have two types: UserName and MemberName

```js
   type userName = {
        name: string;
        privileges= string[];
   }

    type MemberName = {
        name: string;
        paidSubscription: Date;
    }

    // The following defines two intersection types:
    type User = guestUser & memberName

    const userOne: User  = {
        name: "Slavo_3",
        privileges: ["admin"].
        paidSubscription: new Date() | string 

    }
```

When you intersect types, the order of the types doesn’t matter.

As we are doing in the example above, intersection types can be helpful when used with object types.
You can use them with any types.

```js

  type Numeric = string | number;
  type Combinable = number | boolean 

  type Universal = Combinable & Numeric; // type number

```

- TypeScript sees that universal as type number because that is the only intersection we have in the example.
- Intersection operator can be used with any type and then builds the intersection of these types
