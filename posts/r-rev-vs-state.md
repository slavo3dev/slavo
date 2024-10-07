---
title: "Understanding `ref` vs `state` in React: When and Why to Use Each"
date: "2024-07-20"
author: "Slavo"
image: "r-refs.png"
excerpt: "React offers powerful tools to manage your application's data and interactions...."
isFeatured: false
category: "React"
---

React offers powerful tools to manage your application's data and interactions. Among these tools, `ref` and `state` are fundamental yet often misunderstood. Both serve different purposes and knowing when and how to use them is crucial for writing efficient and maintainable React applications. In this blog post, we will delve into the differences between `ref` and `state`, explore when to use each, and outline best practices for their usage.

- [React Key Concepts](https://amzn.to/43XOCJM)
- [Mentorship & Consulting - Contact us for more info](/contact)
- **_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/T5eF5zDf)

#### What is `state` in React?

[Learn more about state and props](blog/r-explain-state-props)

`state` is an object that holds information about the component's current situation. This information can change over time in response to user actions or other events, and React will re-render the component whenever the `state` changes.

**Key characteristics of `state`:**

1. **Reactive:** When the state changes, React re-renders the component to reflect the new state.
2. **Managed by React:** The `useState` hook in functional components or `this.setState` in class components are used to update the state.
3. **Used for rendering:** The state directly influences what gets rendered on the screen.

**Example of using `state`:**

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

In this example, the `count` state variable controls the number of clicks, and the component re-renders whenever the `count` changes.

#### What is `ref` in React?

[Learn more about ref](/blog/r-react-use-ref)

`ref` allows access to DOM nodes or React elements created in the render method. It allows users to access elements directly without triggering a re-render.

**Key characteristics of `ref`:**

1. **Imperative:** Allows direct access to a DOM node or a React element.
2. **Not reactive:** Changing a `ref` does not trigger a re-render.
3. **Used for DOM manipulation:** Commonly used for accessing form inputs, triggering animations, or integrating with third-party libraries that require direct DOM access.

**Example of using `ref`:**

```javascript
import React, { useRef } from "react";

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </div>
  );
}
```

In this example, `useRef` focuses the input element programmatically when clicking the button.

### When to Use `state` vs `ref`

Understanding when to use `state` versus `ref` is crucial for efficient React development. Let's examine the specific scenarios and use cases for each.

#### When to Use `state`

`state` should be used when you need React to manage a value that affects the rendering of your component. This means any value that, when changed, should cause the component to re-render to reflect the new value. Here are some specific scenarios:

1. **Component Data Rendering:**

   - **Example:** You have a list of items you fetch from an API, and you want to display this list in your component. The list should be stored in the component’s state.

   ```javascript
   const [items, setItems] = useState([]);
   useEffect(() => {
     fetch("/api/items")
       .then((response) => response.json())
       .then((data) => setItems(data));
   }, []);
   ```

2. **User Input Handling:**

   - **Example:** For form inputs, you need to update the component based on user input. The values should be stored in the state to trigger re-renders when they change.

   ```javascript
   const [name, setName] = useState("");
   return (
     <input
       type="text"
       value={name}
       onChange={(e) => setName(e.target.value)}
     />
   );
   ```

3. **UI State Management:**

   - **Example:** Toggling UI elements such as showing or hiding a modal, toggling a dropdown, or switching tabs.

   ```javascript
   const [isModalOpen, setIsModalOpen] = useState(false);
   return (
     <>
       <button onClick={() => setIsModalOpen(true)}>
         Open Modal
       </button>
       {isModalOpen && <Modal />}
     </>
   );
   ```

4. **Dynamic Style Adjustments:**

   - **Example:** Adjusting styles dynamically based on user interactions or other events. For instance, changing the class of an element based on a condition.

   ```javascript
   const [isActive, setIsActive] = useState(false);
   return (
     <div className={isActive ? "active" : ""}>
       <button onClick={() => setIsActive(!isActive)}>
         Toggle Active
       </button>
     </div>
   );
   ```

#### When to Use `ref`

`ref` should be used when you need to interact directly with a DOM element or when you need to store a mutable value that does not cause a component re-render. Here are some specific scenarios:

1. **Direct DOM Manipulation:**

   - **Example:** Managing focus, text selection, or other direct DOM interactions. This is common with form inputs.

   ```javascript
   const inputRef = useRef(null);
   const focusInput = () => {
     inputRef.current.focus();
   };
   return (
     <>
       <input ref={inputRef} type="text" />
       <button onClick={focusInput}>Focus Input</button>
     </>
   );
   ```

2. **Storing Mutable Values:**

   - **Example:** Storing values that change over time but do not require a re-render. This could be a timer ID, previous props, or any other value you want to persist across renders.

   ```javascript
   const timerId = useRef(null);
   useEffect(() => {
     timerId.current = setInterval(() => {
       console.log("Tick");
     }, 1000);
     return () => clearInterval(timerId.current);
   }, []);
   ```

3. **Integrating Third-Party Libraries:**

   - **Example:** Using third-party libraries that require direct DOM access, such as certain chart libraries, map libraries, or any other external tool that operates outside React's rendering cycle.

   ```javascript
   const chartRef = useRef(null);
   useEffect(() => {
     const chart = new ChartLibrary(chartRef.current);
     return () => chart.destroy();
   }, []);
   return <div ref={chartRef} />;
   ```

4. **Storing Previous Values:**

   - **Example:** Keeping track of previous values without causing a re-render. This is useful for comparison purposes or when accessing the previous state or props in a `useEffect`.

   ```javascript
   const prevCount = useRef(count);
   useEffect(() => {
     prevCount.current = count;
   }, [count]);
   ```

### Best Practices for Using `state` and `ref`

Effective use of `state` and `ref` can significantly improve your React applications' performance, readability, and maintainability. Here are detailed best practices to help you use these tools optimally.

#### Best Practices for Using `state`

1. **Keep State Minimal:**

   - **Avoid Redundant State:** Store only the necessary data in the state. Derived or computed values should be calculated rather than stored in the state during rendering.

   - **Example:** Instead of storing both `isAuthenticated` and `user`, store only `user` and derive `isAuthenticated` from it.

   ```javascript
   const [user, setUser] = useState(null);
   const isAuthenticated = !!user;
   ```

2. **Structure State Properly:**

   - **Flatten State:** Avoid deeply nested state objects, as they can make updates cumbersome and error-prone.
   - **Example:** Instead of storing nested objects, consider flattening them if possible.

   ```javascript
   // Avoid this
   const [state, setState] = useState({
     user: { name: "", age: 0 },
     settings: { theme: "light" },
   });

   // Prefer this
   const [user, setUser] = useState({ name: "", age: 0 });
   const [settings, setSettings] = useState({ theme: "light" });
   ```

3. **Update State Correctly:**

   - **Use Functional Updates:** When updating state based on the previous state, use the functional update form of `setState`.
   - **Example:**

   ```javascript
   setCount((prevCount) => prevCount + 1);
   ```

4. **Avoid Frequent Re-renders:**

   - **Batch Updates:** React batches state updates made inside event handlers for better performance. Group related updates together.
   - **Memoize Expensive Calculations:** Use `useMemo` to memoize expensive calculations that depend on state.

   ```javascript
   const expensiveCalculation = useMemo(() => {
     // Some expensive calculation
   }, [dependencies]);
   ```

5. **Encapsulate State Logic in Custom Hooks:**

   - **Custom Hooks:** Encapsulate related state logic in custom hooks to promote reusability and separation of concerns.
   - **Example:**

   ```javascript
   function useCounter(initialValue = 0) {
     const [count, setCount] = useState(initialValue);
     const increment = () => setCount(count + 1);
     const decrement = () => setCount(count - 1);
     return { count, increment, decrement };
   }
   ```

6. **Effectively Use `useReducer`:**

   - **Complex State Management:** For complex state logic, prefer `useReducer` over multiple `useState` hooks.
   - **Example:**

   ```javascript
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
   const [state, dispatch] = useReducer(reducer, initialState);
   ```

#### Best Practices for Using `ref`

1. **Use Refs Sparingly:**

   - **Direct DOM Access:** Only use refs for direct DOM access, such as manipulating form inputs, triggering animations, or integrating with third-party libraries.
   - **Example:**

   ```javascript
   const inputRef = useRef(null);
   const focusInput = () => inputRef.current.focus();
   ```

2. **Avoid Overusing Refs for State Management:**

   - **State for UI Changes:** Use state for any data that affects rendering. Avoid using refs to store such data, as it can lead to untracked and harder-to-debug state changes.
   - **Example:**

   ```javascript
   const [count, setCount] = useState(0); // Use state for count
   ```

3. **Store Mutable Values:**

   - **Non-UI Data:** Use refs to store mutable values that do not affect rendering, such as timers, previous state values, or mutable variables.
   - **Example:**

   ```javascript
   const timerRef = useRef(null);
   useEffect(() => {
     timerRef.current = setTimeout(() => {
       // Some action
     }, 1000);
     return () => clearTimeout(timerRef.current);
   }, []);
   ```

4. **Clean Up Refs Properly:**

   - **Effect Cleanup:** Ensure that any side effects related to refs are cleaned up in `useEffect` cleanup functions to avoid memory leaks or unexpected behavior.

   - **Example:**

   ```javascript
   useEffect(() => {
     const handle = someEvent.subscribe(() => {
       // Some action
     });
     return () => {
       handle.unsubscribe();
     };
   }, []);
   ```

5. **Ref Forwarding:**

   - **Pass Refs to Child Components:** Use `React.forwardRef` to pass refs to child components, enabling parent components to interact with child DOM nodes.
   - **Example:**

   ```javascript
   const FancyButton = React.forwardRef((props, ref) => (
     <button ref={ref} className="FancyButton">
       {props.children}
     </button>
   ));
   ```

6. **Combining Refs:**

   - **Multiple Refs:** When combining multiple refs, use the `useImperativeHandle` hook to customize the instance value exposed when using `ref`.
   - **Example:**

   ```javascript
   function CustomInput(props, ref) {
     const inputRef = useRef();
     useImperativeHandle(ref, () => ({
       focus: () => {
         inputRef.current.focus();
       },
     }));
     return <input ref={inputRef} />;
   }
   CustomInput = forwardRef(CustomInput);
   ```

By following these best practices, you can harness the full potential of `state` and `ref` in your React applications. Properly managing the state ensures your UI updates efficiently and correctly in response to user actions. Using refs appropriately allows for direct DOM manipulation and handling of mutable values without causing unnecessary re-renders. Keep these practices in mind to build performant and maintainable React components.

Choosing between `state` and `ref` depends on the specific needs of your component. `state` should be used for data that affects rendering, while `ref` should be used for interacting with DOM elements or storing mutable values that do not influence rendering. By following best practices and understanding each of their strengths and weaknesses, you can create React components that are both efficient and easy to maintain.

Feel free to share your thoughts or ask questions in the comments below. Happy coding!

---

By mastering the use of `state` and `ref`, you can elevate your React development skills and build more robust and interactive applications. Keep exploring and experimenting with these tools to find the best patterns and practices for your projects.

\*\* Book Recommendation:

- [React and React Native: A complete hands-on guide to modern web and mobile development with React.js, 3rd Edition](https://amzn.to/3CStF7m)
- [React Key Concepts](https://amzn.to/43XOCJM)
- [Pragmatic Programmer](https://amzn.to/3W1P4oL) **_The: Your journey to mastery, 20th Anniversary Edition_**

[Mentorship & Consulting - Contact us for more info](/contact)

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/T5eF5zDf)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
