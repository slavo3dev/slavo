---
title: "JSX and TSX: The Building Blocks of Modern React Development"
date: "2024-06-29"
author: "Slavo"
image: "r-jsx.png"
excerpt: "JSx..."
isFeatured: false
category: "React"
---

- [React Key Concepts](https://amzn.to/43XOCJM)

- [Mentorship & Consulting - Contact us for more info](/contact)

In modern web development, especially when dealing with React, you'll often encounter terms like JSX and TSX. These are essential tools that help developers create dynamic, interactive user interfaces. Whether you're a seasoned developer or just starting, understanding JSX and TSX is crucial for mastering React.

### What is JSX?

JSX, which stands for JavaScript XML, is a syntax extension for JavaScript commonly used with React to describe the structure of the user interface (UI). It allows developers to write HTML-like code within JavaScript, making creating and managing UI components more intuitive and efficient.

#### The Basics of JSX

At its core, JSX allows you to write code that looks like HTML but can contain JavaScript expressions. This combination makes it powerful and expressive. Here's a basic example:

```jsx
const element = <h1>Hello, world!</h1>;
```

In this example, we create a simple JSX element that renders an `<h1>` tag with the text "Hello, world!". While this looks like plain HTML, it is JSX. When processed, it gets transpiled into regular JavaScript.

#### How JSX transpile to JavaScript

When JSX code is compiled, it is transformed into JavaScript function calls. Specifically, the above example is converted to:

```javascript
const element = React.createElement("h1", null, "Hello, world!");
```

Here, `React.createElement` is a function that creates a virtual DOM element. React uses this element to update the actual DOM efficiently when necessary.

#### Embedding JavaScript in JSX

One of the key features of JSX is the ability to embed JavaScript expressions directly within the markup. This is done using curly braces `{}`. For example:

```jsx
const name = "John";
const element = <h1>Hello, {name}!</h1>;
```

In this example, the value of the `name` variable is embedded within the JSX, resulting in the rendered output being "Hello, John!".

#### JSX Attributes

JSX supports attributes similar to HTML. These attributes are specified using camelCase notation. For instance, instead of using `class` as in HTML, JSX uses `className`:

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
```

This distinction is because `class` is a reserved keyword in JavaScript. Similarly, other HTML attributes are adapted to fit JavaScript's camelCase convention.

#### Nesting and Children

JSX allows you to nest elements just like HTML. This makes it easy to create complex UIs. For example:

```jsx
const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>Welcome to my website.</p>
  </div>
);
```

In this example, a `<div>` element contains an `<h1>` and a `<p>` element as its children. JSX elements can be nested in a tree-like structure, making it straightforward to visualize and manage the UI hierarchy.

#### Conditional Rendering

JSX also supports conditional rendering, allowing you to render elements based on certain conditions. This can be done using JavaScript conditional statements like `if` statements or ternary operators. For example:

```jsx
const isLoggedIn = true;
const element = (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
  </div>
);
```

In this example, the `<div>` content will change based on the value of `isLoggedIn`. If `isLoggedIn` is `true`, it renders "Welcome back!", otherwise, it renders "Please sign in."

#### Lists and Keys

When rendering lists of elements in JSX, providing a unique `key` attribute for each list item is important. This helps React identify which items have changed, been added, or removed. For example:

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));

const element = <ul>{listItems}</ul>;
```

In this example, each `<li>` element in the `listItems` array is assigned a unique `key` based on the `number`. This unique key helps React efficiently update the list when changes occur.

#### Using JSX with Functions and Components

JSX can be used within React components to define the UI structure. Components can be defined as functions or classes and can return JSX to render. For example:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
```

In this example, `Welcome` is a functional component that takes `props` as an argument and returns a JSX element. The `element` renders the `Welcome` component with the `name` prop set to "Sara".

JSX is a powerful syntax extension that allows developers to write HTML-like code within JavaScript, making creating and managing complex UIs in React easier. By understanding the basics of JSX, how it transpires to JavaScript, and how to use its features like attributes, conditional rendering, lists, and keys, you can leverage its full potential to build dynamic and efficient web applications. Whether you're new to React or looking to deepen your knowledge, mastering JSX is a fundamental step in becoming proficient with React development.

### What is TSX?

TSX stands for TypeScript XML and is an extension of JSX designed to be used with TypeScript. TypeScript is a superset of JavaScript that adds static typing, which can help catch errors early and improve code quality. By combining TypeScript with JSX, TSX allows developers to write strongly typed, more maintainable React components.

#### The Basics of TSX

TSX files have the `.tsx` extension and can include TypeScript and JSX codes. To define your UI components, you can use all the TypeScript features, such as interfaces and type annotations, alongside JSX syntax.

Here's a basic example of TSX:

```tsx
import React from "react";

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

This example defines a `Greeting` component that takes a `name` prop. We use an interface, `GreetingProps,` to specify the type of the `name` prop, ensuring that it must be a string.

#### Why Use TSX?

1. **Type Safety**: One of the primary benefits of using TSX is type safety. By leveraging TypeScript's type system, you can catch errors at compile time rather than runtime, reducing bugs and making your code more robust.
2. **Improved Developer Experience**: TypeScript provides enhanced tooling support, such as autocompletion, code navigation, and refactoring tools. These features significantly improve the developer experience, making writing and maintaining code more accessible.
3. **Better Documentation**: You can create self-documenting code using TypeScript's type annotations and interfaces. This makes it easier for other developers (or your future self) to understand your components' expected types of props and state.
4. **Scalability**: TypeScript's static typing can help manage the increasing complexity of your project as it grows. It ensures that changes in one part of your codebase don't inadvertently break other parts, making large-scale refactoring more manageable.

#### Setting Up a TSX Project

To start using TSX in a React project, you must set up TypeScript. Here are the steps to get started:

1. **Install TypeScript and Necessary Type Definitions**: First, install TypeScript and the required type definitions for React and React DOM.

```bash
npm install --save typescript @types/react @types/react-dom
```

2. **Add a TypeScript Configuration File**: To configure TypeScript, create a `tsconfig.json` file in the root of your project.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "jsx": "react",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

3. **Rename Files**: Change the file extension of your React components from `.jsx` to `.tsx`.

4. **Add Type Annotations**: Add type annotations to your React components to take advantage of TypeScript's static typing.

#### Using TSX: A Detailed Example

Let's explore a more detailed example of how TSX works in practice.

```tsx
import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

In this example, we define a `TodoList` component that manages a list of todo items. We use the `Todo` interface to determine the structure of a todo item, and we use TypeScript's type annotations for the state variables and functions.

- **State Variables**: The `todos` state variable is an array of `Todo` objects, and the `newTodo` state variable is a string.
- **Type Annotations for Functions**: The `addTodo` and `toggleTodo` functions have inferred types based on their implementation. TypeScript ensures that these functions manipulate the state in a type-safe manner.

#### Integrating TypeScript with Existing Projects

If you have an existing React project and want to integrate TypeScript, follow these steps:

**_Add TypeScript and Type Definitions_**: Install TypeScript and the necessary type definitions for React and React DOM.

```bash
npm install --save typescript @types/react @types/react-dom
```

**_Configure TypeScript_**: Create a `tsconfig.json` file to configure TypeScript settings.

**_Rename Files_**: Rename your existing `.jsx` files to `.tsx` and add type annotations to your components and state.

**_Gradual Adoption_**: You can adopt TypeScript gradually by converting one file at a time. This approach allows you to introduce TypeScript without a significant upfront effort.

TSX is a powerful extension of JSX that combines the strengths of TypeScript with the flexibility of JSX. Using TSX, you can enjoy the benefits of static typing, improved developer experience, better documentation, and scalability. Whether starting a new project or integrating TypeScript into an existing one, mastering TSX is essential for modern React development. With TypeScript and TSX, you can write more reliable, maintainable, and scalable React applications.

\*\* Book Recommendation:

- [React and React Native: A complete hands-on guide to modern web and mobile development with React.js, 3rd Edition](https://amzn.to/3CStF7m)

- [React Key Concepts](https://amzn.to/43XOCJM)

- [Pragmatic Programmer](https://amzn.to/3W1P4oL) **_The: Your journey to mastery, 20th Anniversary Edition_**

[Mentorship & Consulting - Contact us for more info](/contact)

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/9zvxqj4w)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
