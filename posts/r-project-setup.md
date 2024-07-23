---
title: "Structuring Your React Code & Setup eslint & prettier"
date: "2024-07-24"
author: "Slavo"
image: "r-setup-project.png"
excerpt: "Creating a well-structured React project is essential for maintainability..."
isFeatured: false
category: "React"
---

### Structuring Your React Code: Best Practices and Tools

Creating a well-structured React project is essential for maintainability, scalability, and collaboration. This blog post will guide you through the best practices for structuring your React code, setting up ESLint and Prettier, and organizing your project folders effectively.

---

\*\* Book Recommendation:

- [React and React Native: A complete hands-on guide to modern web and mobile development with React.js, 3rd Edition](https://amzn.to/3CStF7m)
- [React Key Concepts](https://amzn.to/43XOCJM)
- [Pragmatic Programmer](https://amzn.to/3W1P4oL) **_The: Your journey to mastery, 20th Anniversary Edition_**

[Mentorship & Consulting - Contact us for more info](/contact)

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/KXVHbAeb)

### Why Structure Matters

A well-structured React codebase is fundamental to the success of any project, regardless of its size. It offers numerous benefits that enhance development, team collaboration, and long-term maintainability. Here’s an in-depth look at why structure matters in React projects:

#### 1. **Readability and Maintainability**

- **Enhanced Readability**: A clear and logical structure makes it easier for developers to understand the code. When components, hooks, and utilities are organized systematically, finding and reading the code becomes more intuitive.
- **Simplified Maintenance**: Maintaining the codebase can become challenging as projects grow. A well-organized structure helps identify and isolate issues quickly, making the maintenance process more manageable.

#### 2. **Scalability**

- **Managing Growth**: As applications evolve, new features and components are added. A structured approach ensures that the project can scale without becoming chaotic. Each new feature can be integrated seamlessly without disrupting the existing architecture.
- **Component Reusability**: By organizing code into reusable components and modules, developers can easily use them across different application parts. This not only saves time but also ensures consistency.

#### 3. **Facilitates Collaboration**

- **Team Onboarding**: New team members can get up to speed faster when the codebase is well-structured. Clear organization reduces the learning curve and allows new developers to contribute more effectively.
- **Consistent Standards**: A standardized structure promotes uniformity in coding practices, essential when multiple developers work on the same project. This consistency reduces friction and misunderstandings within the team.

#### 4. **Easier Debugging and Testing**

- **Isolated Issues**: A modular structure helps isolate bugs to specific components or modules, making debugging more straightforward.
- **Effective Testing**: Well-organized code allows for better testing strategies. Unit tests can be written for individual components and functions, ensuring that each application part works as expected.

#### 5. **Improved Performance**

**Optimized Code**: Structured code often leads to optimized and efficient code. When the code is organized logically, performance bottlenecks can be easily identified and addressed.

- **Lazy Loading**: By structuring code into chunks, you can implement lazy loading strategies to improve the application's performance. This is particularly useful for large applications where loading everything upfront is not feasible.

#### 6. **Consistency in Development**

- **Coding Standards**: A structured approach encourages the adoption of coding standards and best practices. This consistency is crucial for maintaining code quality and reducing technical debt.
- **Predictable Patterns**: When developers follow a common structure, they can predict where to find specific pieces of code or how to implement new features, reducing the cognitive load.

#### 7. **Enhanced User Experience**

- **Faster Development Cycles**: A well-organized codebase enables faster development cycles, allowing quicker iterations and improvements. This leads to more rapid delivery of features and updates to the end-users.
- **Stable Application**: Structured code contributes to a stable and reliable application, providing a better user experience. Fewer bugs and issues mean a smoother experience for the users.

### Practical Examples

#### Example 1: Component Organization

Consider an extensive e-commerce application with features like product listing, cart management, and user authentication. A well-structured codebase would organize components into distinct directories, making managing and extending each feature easy.

```bash
src/
  components/
    Product/
      ProductList.js
      ProductItem.js
      ProductDetails.js
    Cart/
      Cart.js
      CartItem.js
    User/
      Login.js
      Register.js
      UserProfile.js
```

#### Example 2: State Management

You use Context API or a state management library like Redux to manage global states. Organizing state-related files in a dedicated directory helps maintain a clear separation of concerns.

```bash
src/
  state/
    actions/
      productActions.js
      userActions.js
    reducers/
      productReducer.js
      userReducer.js
    store.js
```

A well-structured React codebase is not just a best practice but a necessity for building high-quality, maintainable, and scalable applications. It enhances readability, maintainability, and scalability, facilitates collaboration, simplifies debugging and testing, and improves performance. Adopting a structured approach sets a solid foundation for your projects, ensuring long-term success and stability.

Investing time in planning and organizing your code structure will pay off in the long run, making development more efficient and enjoyable for you and your team.

### Best Practices for Structuring React Code

To create a maintainable and scalable React application, following best practices for structuring your code is essential. Here are detailed guidelines on how to organize your React code effectively:

#### Component Organization

1. **Atomic Design Principles**:

   - **Atoms**: These are the smallest building blocks, like buttons, inputs, labels, etc. They are usually highly reusable.
   - **Molecules**: Groups of atoms functioning together as a unit, such as a form input group (input + label).
   - **Organisms**: Complex components composed of molecules and atoms, like a header section (logo, navigation, search bar).
   - **Templates**: These define a page layout without actual content, providing a framework for organisms.
   - **Pages**: These are pages with actual content and data fetching, constructed using templates.

   Example directory structure:

```bash
        src/
            components/
            Atoms/
                Button.js
                Input.js
            Molecules/
                InputGroup.js
                Card.js
            Organisms/
                Header.js
                Footer.js
            Templates/
                MainLayout.js
            Pages/
                HomePage.js
                AboutPage.js
```

2. **File Naming Conventions**:

   - Use PascalCase for component names (e.g., `MyComponent.js`).
   - Keep component names descriptive and concise.

3. **Component File Structure**:

   - Group related files together in a component-specific directory.
   - Example:

```bash
     src/
       components/
         Button/
           Button.js
           Button.css
           Button.test.js
           Button.stories.js
```

#### Hooks

1. **Custom Hooks**:

   - Place custom hooks in a dedicated `hooks` directory.
   - Name custom hooks starting with `use` (e.g., `useAuth.js`, `useFetch.js`).

   Example directory structure:

```bash
   src/
     hooks/
       useAuth.js
       useFetch.js
```

2. **Separation of Concerns**:
   - Ensure that hooks have a single responsibility. Consider breaking it down into smaller hooks if a hook does too much.

#### Context and State Management

1. **Context Providers**:

   - Organize context providers in a `context` directory.
   - Group related context and reducer files together.

   Example directory structure:

```bash
   src/
     context/
       AuthContext.js
       AuthProvider.js
     reducers/
       authReducer.js
       productReducer.js
```

2. **State Management Libraries**:

   - If using Redux, organize actions and reducers and store configuration in separate directories.
   - Example:

```bash
     src/
       state/
         actions/
           productActions.js
           userActions.js
         reducers/
           productReducer.js
           userReducer.js
         store.js
```

#### Utilities and Helpers

1. **Utility Functions**:

   - Place utility functions and helper modules in a `utils` directory.
   - Name utility files based on their functionality (e.g., `formatDate.js`, `fetchWithTimeout.js`).

   Example directory structure:

```bash
   src/
     utils/
       formatDate.js
       fetchWithTimeout.js
```

2. **Service Modules**:

   - If you have service modules for API calls, group them in a `services` directory.
   - Example:

```bash
     src/
       services/
         api.js
         authService.js
```

#### Styling

1. **CSS-in-JS**:

   - Create a styles directory if using CSS-in-JS libraries like styled-components or emotion.
   - Example:

```bash
     src/
       styles/
         GlobalStyles.js
         theme.js
```

2. **Traditional CSS/SCSS**:

   - Organize styles in a `styles` directory or within each component's directory.
   - Example:

```bash
     src/
       components/
         Button/
           Button.css
           Button.js
```

#### Testing

1. **Test Organization**:

   - Place test files adjacent to the components they test or in a `tests` directory.
   - Name test files with the `.test.js` or `.spec.js` suffix.

   Example directory structure:

```bash
   src/
     components/
       Button/
         Button.js
         Button.test.js
```

2. **Test Coverage**:
   - Ensure comprehensive test coverage for all components, hooks, and utilities.
   - Write both unit and integration tests.

#### Routing

1. **Organizing Routes**:

   - Define routes in a dedicated `routes` or `navigation` directory.
   - Example:

```bash
     src/
       routes/
         AppRoutes.js
         PrivateRoute.js
```

2. **Dynamic Imports**:

   - Use dynamic imports for lazy loading routes to improve performance.
   - Example:

     ```js
     const HomePage = React.lazy(() => import("../pages/HomePage"));
     ```

#### Configuration

1. **Environment Variables**:

   - Store environment-specific variables in a `.env` file and use `dotenv` to load them.
   - Example `.env` file:

     ```bash
     REACT_APP_API_URL=https://api.example.com
     ```

2. **Config Files**:

   - Organize configuration settings in a `config` directory.
   - Example:

```bash
     src/
       config/
         apiConfig.js
         appConfig.js
```

Following these best practices for structuring your React code can create a well-organized, maintainable, and scalable application. A thoughtful approach to component organization, hooks, context and state management, utilities, styling, testing, routing, and configuration will set a solid foundation for your projects and ensure long-term success. Happy coding!

### Setting Up ESLint and Prettier

Linting and code formatting are crucial for maintaining code quality and consistency in a project. ESLint helps identify and fix problems in your JavaScript code, while Prettier ensures that your code is formatted consistently. This section will guide you through setting up ESLint and Prettier in a React project.

#### Table of Contents

1. [Installing ESLint and Prettier](#installing-eslint-and-prettier)
2. [Configuring ESLint](#configuring-eslint)
3. [Configuring Prettier](#configuring-prettier)
4. [Integrating with VSCode](#integrating-with-vscode)
5. [Running ESLint and Prettier](#running-eslint-and-prettier)
6. [Automating with Pre-commit Hooks](#automating-with-pre-commit-hooks)

---

### Installing ESLint and Prettier

First, you need to install ESLint and Prettier and their necessary plugins and configurations. You can do this using npm or yarn.

**Using npm**:

```sh
npm install eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier --save-dev
```

**Using yarn**:

```sh
yarn add eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier --dev
```

### Configuring ESLint

1. **Initialize ESLint**:
   Run the following command to create an ESLint configuration file:

   ```sh
   npx eslint --init
   ```

   This will prompt you to answer questions about setting up your ESLint configuration. You can choose the options that best fit your project. For a React project, you might select the following:

   - How would you like to use ESLint? **To check syntax, find problems, and enforce code style**
   - What type of modules does your project use? **JavaScript modules (import/export)**
   - Which framework does your project use? **React**
   - Does your project use TypeScript? **No**
   - Where does your code run? **Browser**
   - How would you like to define a style for your project? **Use a popular style guide**
   - Which style guide do you want to follow? **Airbnb**
   - What format do you want your config file to be in? **JavaScript**

   This will create a `.eslintrc.js` file in your project.

2. **Extend ESLint Configuration**:
   It would help if you modified the generated `.eslintrc.js` file to include Prettier. Here is an example configuration:

   ```js
   module.exports = {
     env: {
       browser: true,
       es2021: true,
     },
     extends: [
       "eslint:recommended",
       "plugin:react/recommended",
       "airbnb",
       "plugin:prettier/recommended",
     ],
     parserOptions: {
       ecmaFeatures: {
         jsx: true,
       },
       ecmaVersion: 12,
       sourceType: "module",
     },
     plugins: ["react", "prettier"],
     rules: {
       "prettier/prettier": "error",
       "react/react-in-jsx-scope": "off", // For Next.js projects
       "react/prop-types": "off",
     },
   };
   ```

### Configuring Prettier

1. **Create a Prettier Configuration File**:
   You can create a `prettier.config.js` or `.prettierrc` file in the root of your project. Here is an example configuration:

   ```js
   module.exports = {
     printWidth: 80,
     tabWidth: 2,
     useTabs: false,
     semi: true,
     singleQuote: true,
     trailingComma: "es5",
     bracketSpacing: true,
     jsxBracketSameLine: false,
     arrowParens: "avoid",
   };
   ```

### Integrating with VSCode

To ensure a seamless development experience, integrate ESLint and Prettier with Visual Studio Code (VSCode).

1. **Install VSCode Extensions**:

   - **ESLint**: Search for `ESLint` in the VSCode extensions marketplace and install it.
   - **Prettier - Code formatter**: Search for `Prettier - Code formatter` and install it.

2. **Update VSCode Settings**:
   Add the following configuration to your VSCode `settings.json` file to enable auto-formatting and linting on save:

   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "eslint.validate": [
       "javascript",
       "javascriptreact",
       "typescript",
       "typescriptreact"
     ],
     "prettier.requireConfig": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

### Running ESLint and Prettier

1. **Linting the Project**:
   You can lint your project files using the following command:

   ```sh
   npx eslint src/**/*.js
   ```

2. **Formatting the Code**:
   To format your code with Prettier, run:

   ```sh
   npx prettier --write src/**/*.js
   ```

### Automating with Pre-commit Hooks

To ensure code quality and formatting before committing, you can use pre-commit hooks with `husky` and `lint-staged`.

1. **Install Husky and lint-staged**:

   ```sh
   npm install husky lint-staged --save-dev
   ```

2. **Update package.json**:
   Add the following configuration to your `package.json`:

   ```json
   {
     "husky": {
       "hooks": {
         "pre-commit": "lint-staged"
       }
     },
     "lint-staged": {
       "src/**/*.{js,jsx,ts,tsx}": [
         "eslint --fix",
         "prettier --write"
       ]
     }
   }
   ```

3. **Initialize Husky**:

   ```sh
   npx husky install
   ```

With these steps, ESLint and Prettier will automatically check and format your code before each commit, ensuring consistent code quality.

Setting up ESLint and Prettier in your React project is critical to maintaining high code quality and consistency. By following these detailed steps, you can ensure that your codebase remains clean, readable, and maintainable, enhancing individual and team productivity. Happy coding!

\*\* Book Recommendation:

- [React and React Native: A complete hands-on guide to modern web and mobile development with React.js, 3rd Edition](https://amzn.to/3CStF7m)
- [React Key Concepts](https://amzn.to/43XOCJM)
- [Pragmatic Programmer](https://amzn.to/3W1P4oL) **_The: Your journey to mastery, 20th Anniversary Edition_**

[Mentorship & Consulting - Contact us for more info](/contact)

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/KXVHbAeb)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
