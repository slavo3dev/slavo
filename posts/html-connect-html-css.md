---
title: "Connecting HTML and CSS in Your Basic Web Project!!"
date: "2023-06-03"
author: "Slavo"
image: "html-css.png"
excerpt: "As the two fundamental building blocks of a web project, HTML and CSS go hand in hand in defining the structure and look of a website. HTML..."
isFeatured: false
category: "HTML and CSS"
---

As the two fundamental building blocks of a web project, HTML and CSS go hand in hand in defining the structure and look of a website. HTML, or HyperText Markup Language, provides the basic structure of sites, which is enhanced and modified by CSS or Cascading Style Sheets.

In this article, we'll explore how to connect an HTML file with a CSS file, delve into the functions of the link and href attributes, and discuss the importance of path specifications. Let's jump right in!

## Linking HTML and CSS

The connection between an HTML and a CSS file happens within the HTML document's head section. You must include the `<link>` tag within your HTML file's `<head>` section, pointing to the CSS file you'd like to connect. Here is a simple example:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
    <h1>Welcome to My Website!</h1>
    <p>This is a sample paragraph.</p>
  </body>
</html>
```

### Understanding the `<link>` Tag

The `<link>` tag is an empty HTML element, which means it contains attributes only and has no closing tag. It defines a link between an HTML document and an external resource. The `<link>` tag is most commonly used to link to style sheets.

Let's dissect the attributes used in our `<link>` tag:

1. `rel`: This attribute describes the relationship between the HTML document and the linked resource. In our case, the value "stylesheet" indicates that the linked resource is a stylesheet that will be used to style the HTML document.

2. `type`: This attribute specifies the media type of the linked resource. The value "text/css" signifies that the linked resource is a CSS file.

### Unpacking the `href` Attribute

The `href` attribute in the `<link>` tag specifies the location (URL) of the external resource (the CSS file in this context). In the example above, `href="styles.css"` points to the CSS file named "styles.css".

It's important to note that the `href` attribute can contain absolute or relative URLs. An absolute URL looks like `https://www.example.com/styles.css`, while a relative URL can take several forms such as `styles.css`, `/styles/styles.css`, or `../styles/styles.css`.

### Getting the Path Right

Paths in HTML can be tricky to grasp at first. The path you specify depends on where your HTML file is located relative to the CSS file. Here are the three types of paths you might use:

1. **Absolute path**: As previously mentioned, an absolute path is a full URL, which you would use if your CSS file is hosted on a different server.

2. **Root-relative path**: This type of path starts with a forward slash `/`, indicating that the browser should look for the file starting from the server's root directory. For example, `/styles/styles.css` would look in the 'styles' folder in the root directory.

3. **Document-relative path**: This path is relative to the location of the current HTML document. If your CSS file is in the same folder as your HTML file, you will use the filename (`styles.css`). If the CSS file is in a subfolder, you'd include the subfolder's name before the filename (`subfolder/styles.css`). If the CSS file is in a folder one level up from the HTML file, you will use `../` before the filename (`../styles.css`).

## In Conclusion

Linking HTML and CSS files is a fundamental skill in web development.

\*\* Book Recommendation: [HTML and CSS](https://amzn.to/3BaeO7d)

Remember, if you get stuck, don't be afraid to look up solutions or ask for help. The key to learning programming is persistence! [Ask for help - Mentorship](/contact)

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/aN9Pgzz2)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
