---
title: "What is React Native"
date: "2022-09-12"
author: "Slavo"
image: "reactnative-post.png"
excerpt: "React is a JavaScript library for building user interfaces."
isFeatured: false
category: "React Native"
---

### React is a JavaScript library for building user interfaces

### React Native is a cross-platform solution for building mobile apps

#### React Native is a collection of "special React components" that you can use in your React Native App. These "components" are unique because React Native knows how to translate them and compile them to native widgets for iOS and Android. React Native gives you access to some Native Platform APIs exposed to JavaScript

#### React Native is different than other technologies for cross-platform development

#### Technologies like Ionic, for example, what do they gravure JavaScript Code. They will put it on frame or web page, a native application that gets installed on the phone, and what it will do is render a web view with your translated code. But this is not native code. The only thing it's such as native, it's going to be that frame or that web

#### Whit React Native is different because when we create our application, React Native will recognize that JavaScript code will compile and make two native bundles, one for Android and one for iOS

#### If you develop your app with React code, that doesn't mean that React Native app will recognize that code. Most of the things will be the same, but you are halfway there. Still needs to be adjustments in your code

#### For example: with React, you know that you can create "div," and the browser will recognize him, but on iOS you have "UIview." On Android, you have "android.view" instead of "div" with ReacNative; you can not use "div"; you are using the particular component "View," that they will give you to render "div" or "UIview.". So you still need to use all the "components" that React Native will provide you to create the application

### How does React Native works?

#### We build normal React Components with JavaScript because JavaScript is our language to build React Native apps. Still, we use "Special React Components" like View and Text ( as you can see in the example below ) because the standard HTML elements are not supported, the native platforms don't know how to use them

#### It's important to understand that the View component is compiling to real native widgets. Your JavaScript logic where you manage your business logic will not be compiled into the native code. Still, your views will be, and that, of course, also means that you get excellent performance when you build React Native apps because of the large chunk of the is actual native code

![Picture](/images/post-img/reactnative-body-post.png)

```js
const App = (props) => {
  return (
    <View>
      <Text>foo(Nomad)</Text>
    </View>
  );
};
```

#### React Native gives you unique components, which are then compiled to native code/views. For other logic, if you are sending HTTP requests, you are transforming data... all your other JavaScript code is not compiled to Native Code, but instead, it's running on a particular thread hosted by React Native. You can imagine it, like a mini javascript app running inside your app, hosted and started by React Native, which runs all your JavaScript code and then talks to the native platform. It is happening because that JavaScript Core ( Virtual Machine ) knows how to communicate to the native platform features. Your app's operating system communicates through the bridge, and React Native automatically provides that bridge and the virtual machine

#### Now you understand that you have a real native app at the end. Not all your code is compiled, that would be impossible, but your views are compiled. That is most important when it comes to performance for an app because re-rendering the UI and all of that, that's typically the performance-intensive part. Therefore, it is excellent that this is compiled, and that's one of the enormous strengths of React Native

\*\* **Book Recommendation**: [Version Control with Git](https://amzn.to/46xioqF)
\*\* **_Powerful Tools and Techniques for Collaborative Software Development_**

\*\* **Book Recommendation**: [Pragmatic Programmer](https://amzn.to/43h37XQ)
\*\* **_Your journey to mastery_**

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/aN9Pgzz2)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
