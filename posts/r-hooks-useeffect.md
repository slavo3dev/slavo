---
title: "Understanding React Hooks: A Comprehensive Guide for Developers"
date: "2024-07-10"
author: "Slavo"
image: "r-hooks.png"
excerpt: "React has transformed how we build user interfaces by introducing a more declarative approach to UI development...."
isFeatured: false
category: "React"
---

React has transformed how we build user interfaces by introducing a more declarative approach to UI development. One of the most significant updates to React is the introduction of hooks in version 16.8. Hooks provides a new way to use state and other React features without writing a class. In this blog post, we'll explore what hooks are, why we need them, how to create them, and delve into the most critical hooks in React. We'll also cover best practices to help you make the most out of hooks in your projects.

- [React Key Concepts](https://amzn.to/43XOCJM)
- [Mentorship & Consulting - Contact us for more info](/contact)
  **_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/T5eF5zDf)

## What Are Hooks?

In React, hooks are special functions that allow you to "hook into" React state and lifecycle features from function components. They provide a powerful way to manage state, side effects, context, and other functionalities more concisely and reusable than was possible with class components. Let's delve into what hooks are, their significance, and the different types of hooks provided by React.

### The Evolution of Hooks

Before hooks were introduced in React 16.8, developers used class components to manage state and lifecycle methods. Class components often led to complex and less readable code, significantly as applications grew in size and complexity. Sharing stateful logic between components took a lot of work, typically requiring higher-order components (HOCs) or render props, which could make the code harder to follow.

Hooks were introduced to address these pain points by enabling state and other React features in functional components. This shift has led to cleaner, more maintainable, and more reusable code.

### Key Benefits of Hooks

1. **Simplicity and Readability**: Hooks allow you to manage state and side effects directly within functional components, reducing the need for boilerplate code and making components more accessible to read and understand.

2. **Reusability**: Custom hooks enable you to extract and reuse stateful logic across multiple components, promoting better code organization and reducing duplication.

3. **Functional Programming**: Hooks embraces functional programming principles, allowing you to write components as pure functions with minimal side effects.

4. **Gradual Adoption**: Hooks are backward-compatible and can be gradually adopted in existing codebases. You can start using hooks in new components without rewriting existing class components.

### Rules of Hooks

To ensure consistent behavior and avoid pitfalls, React enforces two main rules when using hooks:

1. **Only Call Hooks at the Top Level**: Do not call hooks inside loops, conditions, or nested functions. Always use hooks at the top level of your React function to ensure they are called in the same order each time a component renders.

2. **Only Call Hooks from React Functions**: You can call hooks from React function components or custom hooks, but not from regular JavaScript functions.

### Built-In Hooks

React provides several built-in hooks that cover everyday use cases for managing state, side effects, and context:

#### useState

The `useState` hook lets you add state to functional components. You pass the initial state to `useState`, which returns an array with the current state and a function to update it.

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

#### useEffect

The `useEffect` hook allows you to perform side effects in function components, such as fetching data, directly interacting with the DOM, or setting up subscriptions. It runs after the render and can optionally clean up before the component unmounts.

```javascript
import React, { useEffect, useState } from "react";

function DataFetcher({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
```

#### useContext

The `useContext` hook lets you subscribe to React context without introducing nesting, allowing you to access context values directly within function components.

```javascript
import React, { useContext } from "react";

const ThemeContext = React.createContext("light");

function ThemeButton() {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === "dark" ? "#333" : "#FFF" }}
    >
      {theme === "dark" ? "Dark" : "Light"} Mode
    </button>
  );
}
```

#### useReducer

The `useReducer` hook is an alternative to `useState` for managing more complex state logic. It is often used when the next state depends on the previous state or when you have multiple sub-values.

```javascript
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        -
      </button>
    </div>
  );
}
```

#### useCallback

The `useCallback` hook returns a memoized version of the callback function that only changes if one of the dependencies has changed. It is helpful for optimizing performance by preventing unnecessary re-renders.

```javascript
import React, { useState, useCallback } from "react";

const Button = React.memo(({ handleClick }) => {
  console.log("Button rendered");
  return <button onClick={handleClick}>Click me</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <Button handleClick={increment} />
      <button onClick={() => setOtherState(!otherState)}>
        Toggle Other State
      </button>
    </div>
  );
}
```

#### useMemo

The `useMemo` hook memoizes a value, recomputing it only when one of the dependencies has changed. This can help optimize performance by avoiding expensive calculations on every render.

```javascript
import React, { useMemo, useState } from "react";

function ExpensiveCalculationComponent({ input }) {
  const computeExpensiveValue = (input) => {
    // simulate an expensive calculation
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += input;
    }
    return result;
  };

  const memoizedValue = useMemo(
    () => computeExpensiveValue(input),
    [input],
  );

  return <div>Expensive Value: {memoizedValue}</div>;
}

function App() {
  const [input, setInput] = useState(1);
  const [otherState, setOtherState] = useState(false);

  return (
    <div>
      <ExpensiveCalculationComponent input={input} />
      <button onClick={() => setInput(input + 1)}>
        Increment Input
      </button>
      <button onClick={() => setOtherState(!otherState)}>
        Toggle Other State
      </button>
    </div>
  );
}
```

#### useRef

The `useRef` hook allows you to persist values across renders without causing a re-render. It can also be used to access and manipulate DOM elements directly.

```javascript
import React, { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

### Custom Hooks

Custom hooks allow you to encapsulate and reuse stateful logic across multiple components. A custom hook is simply a JavaScript function that can call other hooks.

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

export default useFetch;
```

By following these guidelines and understanding the core concepts of hooks, you can harness their full potential to write more efficient, maintainable, and scalable React applications.

## Why Do We Need Hooks?

React hooks were introduced in version 16.8 to address several long-standing issues and limitations with class components. They provide a new way to manage state and other React features in functional components, leading to simpler, more maintainable, and reusable code. Here, we will explore why hooks are essential and how they improve the React development experience.

### Simplifying Component Logic

One of the main reasons we need hooks is to simplify component logic. Before hooks, managing state and lifecycle methods in class components often led to complex and less readable code. Hooks allow you to organize related logic within a component more intuitively.

#### Class Component Example

Consider a class component that fetches data and manages a loading state:

```javascript
class DataFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((data) => this.setState({ data, loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return <div>{JSON.stringify(this.state.data)}</div>;
  }
}
```

This code is verbose and mixes different concerns (fetching data and rendering) within the same class. Now, consider the same logic using hooks:

#### Functional Component with Hooks

```javascript
import React, { useState, useEffect } from "react";

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
}
```

The functional component is more concise and separates concerns more cleanly, making the code easier to read and maintain.

### Enhancing reusability

Sharing stateful logic between components in class components was challenging and often required higher-order components (HOCs) or render props. These patterns could lead to deeply nested components and less readable code. Hooks enable you to extract and reuse stateful logic without these drawbacks.

#### Custom Hooks for Reusability

Custom hooks allow you to encapsulate logic and reuse it across different components. For example, you can create a custom hook to handle fetching data:

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
```

You can then use this custom hook in multiple components, promoting code reuse and reducing duplication:

```javascript
import React from "react";
import useFetch from "./useFetch";

function DataFetcher({ url }) {
  const { data, loading } = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
}
```

### Improving performance

Hooks like `useCallback` and `useMemo` help optimize performance by preventing unnecessary re-renders and recalculations. Memoizing functions and values in class components often require additional libraries or verbose code. Hooks make it easier to optimize performance directly within functional components.

#### useCallback and useMemo

```javascript
import React, { useState, useCallback, useMemo } from "react";

function ExpensiveComponent({ compute, count }) {
  const result = useMemo(() => compute(count), [compute, count]);
  return <div>Computed Result: {result}</div>;
}

function App() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  const compute = useCallback((num) => {
    // simulate an expensive calculation
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += num;
    }
    return result;
  }, []);

  return (
    <div>
      <ExpensiveComponent compute={compute} count={count} />
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
      <button onClick={() => setOtherState(!otherState)}>
        Toggle Other State
      </button>
    </div>
  );
}
```

In this example, `useCallback` memoizes the `compute` function, and `useMemo` memoizes the result of the expensive calculation. This prevents unnecessary recalculations and re-renders, improving performance.

### Embracing Functional Programming

Hooks embrace functional programming principles, allowing you to write components as pure functions with minimal side effects. This approach leads to more predictable and testable code. Functional components with hooks are more accessible to reason about, as they focus on inputs (props and state) and outputs (rendered UI) without managing internal state and lifecycle methods in a complex class structure.

### Gradual Adoption

Hooks are backward-compatible and can be gradually adopted in existing codebases. You can start using hooks in new components or refactor existing components to use hooks without having to rewrite your entire codebase. This makes hooks a practical and non-disruptive addition to any React project.

### Enhanced Developer Experience

Hooks improves the developer experience by making React code more intuitive and less verbose. The consistent patterns and more straightforward API reduce the learning curve for new developers and make code reviews and collaboration more straightforward.

React hooks have revolutionized how we write React applications by addressing the limitations of class components. They simplify component logic, enhance reusability, improve performance, embrace functional programming principles, and can be adopted gradually. By understanding the benefits and capabilities of hooks, you can write more efficient, maintainable, and scalable React applications, ultimately enhancing your development experience and productivity.

## How to Create Hooks

React hooks provide a powerful and intuitive way to manage state and side effects in functional components. This section will cover using built-in hooks and creating custom hooks to encapsulate and reuse logic across your React components.

### Using Built-In Hooks

React provides several built-in hooks that cover the most common use cases for managing state, side effects, and context. Below, we will explore some of the most commonly used built-in hooks.

#### useState

The `useState` hook adds a state to a functional component. It takes the initial state as an argument and returns an array with the current state and a function to update it.

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

In this example, `useState(0)` initializes the state with a value of `0`. The `setCount` function updates the state when the button is clicked.

#### useEffect

The `useEffect` hook allows you to perform side effects in your functional components. It takes a function as an argument, which React will call after the component renders. You can use this hook to fetch data, set up subscriptions, and more.

```javascript
import React, { useEffect, useState } from "react";

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
```

In this example, `useEffect` fetches data from the given URL whenever the `URL` prop changes. The empty dependency array `[]` means the effect runs only once when the component mounts.

#### useContext

The `useContext` hook lets you subscribe to React context without introducing nesting, allowing you to access context values directly within functional components.

```javascript
import React, { useContext } from "react";

const ThemeContext = React.createContext("light");

function ThemeButton() {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === "dark" ? "#333" : "#FFF" }}
    >
      {theme === "dark" ? "Dark" : "Light"} Mode
    </button>
  );
}
```

In this example, `useContext(ThemeContext)` retrieves the current value of `ThemeContext`, which is then used to set the button's background color.

#### useReducer

The `useReducer` hook is an alternative to `useState` for managing complex state logic. It is often used when the next state depends on the previous state or when you have multiple sub-values.

```javascript
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        -
      </button>
    </div>
  );
}
```

In this example, `useReducer(reducer, initialState)` initializes the state and returns the current state. It also includes a `dispatch` function to send actions to the reducer.

### Creating Custom Hooks

Custom hooks allow you to encapsulate and reuse stateful logic across multiple components. A custom hook is simply a JavaScript function that can call other hooks. By convention, custom hooks start with the word "use."

#### Example of a Custom Hook

Let's create a custom hook that fetches data from an API.

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

export default useFetch;
```

In this custom hook, `useFetch`, we use `useState` to manage the data and loading state and `useEffect` to fetch the data when the `url` changes. The custom hook returns the data and loading state, making it easy to reuse this logic in different components.

#### Using the Custom Hook

```javascript
import React from "react";
import useFetch from "./useFetch";

function DataFetcher({ url }) {
  const { data, loading } = useFetch(url);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
```

Using the `useFetch` custom hook, we simplify the `DataFetcher` component and reusable the data-fetching logic.

### Best Practices for Creating Hooks

1. **Prefix with "use"**: Always start custom hooks with "use" to indicate that they follow the rules of hooks and can call other hooks.

2. **Keep Hooks at the Top Level**: Do not call hooks inside loops, conditions, or nested functions. Always use hooks at the top level of your React function to ensure consistent behavior.

3. **Return a Consistent API**: Custom hooks should return a consistent API that makes them easy to use and understand. Typically, this involves returning state variables and any functions needed to update the state.

4. **Avoid Side Effects**: Try to keep custom hooks pure and avoid side effects within the hook itself. If you need to perform side effects, use `useEffect` inside the hook.

5. **Use Descriptive Names**: Name your custom hooks descriptively, clearly indicating their purpose and functionality.

Hooks have transformed how we write React components, making our code more concise, readable, and reusable. By mastering built-in hooks and creating custom hooks, you can leverage the full power of React to build efficient and maintainable applications. Whether you're managing state, side effects, or context, hooks provide a consistent and intuitive API that simplifies React development.

## Best Practices for Using Hooks

React hooks provide a powerful and flexible way to manage state and side effects in functional components. However, to leverage their capabilities and avoid common pitfalls, it's essential to follow best practices. Here are some detailed best practices for using hooks in your React applications.

### 1. Follow the Rules of Hooks

#### Only Call Hooks at the Top Level

Hooks should always be at the top of your React function components, not inside loops, conditions, or nested functions. This ensures that hooks are called in the same order every time a component renders, which is crucial for React to manage state and side effects correctly.

```javascript
// Correct
function MyComponent() {
  const [count, setCount] = useState(0);

  // Incorrect
  if (count > 0) {
    useEffect(() => {
      console.log("Count is greater than 0");
    }, [count]);
  }
}
```

#### Only Call Hooks from React Functions

Hooks should only be called from React function components or custom hooks. Do not call hooks from regular JavaScript functions.

```javascript
// Correct
function useCustomHook() {
  const [value, setValue] = useState(null);
  // other hook logic
}

// Incorrect
function regularFunction() {
  const [value, setValue] = useState(null); // This will cause an error
}
```

### 2. Use Custom Hooks for Reusable Logic

Custom hooks allow you to encapsulate and reuse stateful logic across multiple components. If you repeat the same logic in different elements, consider extracting it into a custom hook.

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
```

### 3. Keep Hooks Simple and Focused

Custom hooks should be simple and focused on a single responsibility. This makes them easier to understand, test, and reuse. Consider breaking it down into smaller hooks if a hook does too much.

```javascript
// Too complex
function useComplexHook(url, interval) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return { data, count };
}

// Better
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

function useCounter(interval) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return count;
}
```

### 4. Optimize performance with useMemo and useCallback

Use `useMemo` and `useCallback` to optimize performance by memoizing expensive calculations and functions. This prevents unnecessary re-renders and improves the efficiency of your components.

```javascript
import React, { useState, useCallback, useMemo } from "react";

function ExpensiveComponent({ compute, count }) {
  const result = useMemo(() => compute(count), [compute, count]);
  return <div>Computed Result: {result}</div>;
}

function App() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  const compute = useCallback((num) => {
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += num;
    }
    return result;
  }, []);

  return (
    <div>
      <ExpensiveComponent compute={compute} count={count} />
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
      <button onClick={() => setOtherState(!otherState)}>
        Toggle Other State
      </button>
    </div>
  );
}
```

### 5. Clean Up Side Effects

When using `useEffect` to perform side effects, ensure you clean up subscriptions, event listeners, or any other resources to prevent memory leaks and unexpected behavior.

```javascript
import React, { useEffect } from "react";

function EventListenerComponent() {
  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized");
    };

    window.addEventListener("resize", handleResize);

    // Clean up the effect
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>Resize the window and check the console</div>;
}
```

### 6. Handle Dependencies Properly

When using `useEffect`, `useCallback`, or `useMemo`, list all dependencies that affect the hook. This ensures that the hook runs correctly and avoids stale closures.

```javascript
import React, { useState, useEffect } from "react";

function DataFetcher({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]); // Add `url` as a dependency

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}
```

### 7. Avoid Overusing useEffect

While `useEffect` is powerful, avoid overusing it for logic that can be handled elsewhere. Complex `useEffect` logic sometimes indicates that the component's responsibilities are not well-separated, and the code may benefit from refactoring.

### 8. Debugging with useDebugValue

For custom hooks, use `useDebugValue` to display a label in React DevTools. This makes it easier to debug and understand the hook's state.

```javascript
import { useState, useEffect, useDebugValue } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  useDebugValue(data ? "Data Loaded" : "Loading...");

  return { data, loading };
}
```

### 9. Avoid Premature Optimization

While performance optimization is essential, avoid premature optimization. First, focus on writing clear and correct code. Use `useMemo` and `useCallback` when identifying performance bottlenecks, but don't add them everywhere unnecessarily.

### 10. Use TypeScript for Type Safety

If you're using TypeScript, leverage its type safety features to create more robust hooks. Type your custom hooks to ensure they return the expected values and accept the correct arguments.

```typescript
import { useState, useEffect } from "react";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
```

By following these best practices, you can harness the full potential of hooks in React, creating more efficient, maintainable, and scalable applications. Hooks simplify component logic, enhance reusability, and improve the developer experience, making them an essential tool in modern React development.

\*\* Book Recommendation:

- [React and React Native: A complete hands-on guide to modern web and mobile development with React.js, 3rd Edition](https://amzn.to/3CStF7m)
- [React Key Concepts](https://amzn.to/43XOCJM)
- [Pragmatic Programmer](https://amzn.to/3W1P4oL) **_The: Your journey to mastery, 20th Anniversary Edition_**

[Mentorship & Consulting - Contact us for more info](/contact)

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/T5eF5zDf)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
