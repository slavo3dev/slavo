---
title: "VS Code Setup: Quick Start Guide"
date: "2023-07-12"
author: "Slavo"
image: "vs-code-setup.png"
excerpt: "Visual Studio Code, commonly called VS Code, is a free, open-source, cross-platform code editor developed and maintained by Microsoft."
isFeatured: false
category: "Dev Tools"
---

**Visual Studio Code**: A Detailed Overview

Visual Studio Code, commonly called VS Code, is a free, open-source, cross-platform code editor developed and maintained by Microsoft. It was first released in 2015 and has gained enormous popularity among developers worldwide.

\*\* **Book Recommendation**: [Pragmatic Programmer](https://amzn.to/43h37XQ)
\*\* **_Your journey to mastery_**

## Functionality

VS Code is designed to be a fully functional editor, supporting many programming languages such as Python, JavaScript, TypeScript, C++, C#, Go, Java, and more. Its primary features include:

1. **IntelliSense:** This provides smart completions based on variable types, function definitions, and imported modules. It also offers code hints and snippets, aiding developers in writing code more quickly and efficiently.

2. **Debugging:** VS Code offers built-in support for debugging, with features like call stacks, watch variables, a console panel, and interactive debugging. The debugging functionality can be further extended for specific languages with VS Code's Debug API.

3. **Git Integration:** VS Code integrates seamlessly with Git, providing inline source control management (SCM) and easy access to output from Git, commands, and more. This integration also allows for diff views to highlight changes between different code versions.

4. **Extensions and Customization:** The extension marketplace is one of VS Code's most powerful features, enabling users to tailor the editor to specific needs. Extensions can provide anything from new themes and icons to support additional languages and tools.

5. **Built-in Terminal:** VS Code includes an integrated terminal that can spawn a command line of your choice, whether it's Bash, PowerShell, or a different shell. You can stay within the editor while using command-line tools or running scripts.

6. **Live Share:** This feature allows developers to share their workspace with others in real-time, allowing for collaborative editing and debugging.

## Design and Usability

VS Code features a sleek, user-friendly design with a robust layout that includes a sidebar, a minimap, and multiple panels that can be adjusted to accommodate a range of workflows.

The editor operates on a folder-based structure, allowing users to manage their projects and files efficiently. You can open a folder, multiple folders, or workspace in VS Code; each directory becomes part of your working environment.

The color scheme and themes are also customizable, allowing developers to modify the editor's appearance to their preferences. Many articles, both light and dark, are available through the marketplace.

## Cross-Platform Support

Visual Studio Code runs on Windows, Linux, and macOS, making it a versatile choice for teams across different operating systems. This cross-platform support is part of what makes VS Code a popular choice for many developers.

Visual Studio Code is a powerful and versatile editor suitable for almost any programming task. Its mix of intuitive design, robust built-in features, and a rich marketplace of extensions makes it a valuable tool for any developer, regardless of experience level. Whether you're a novice coder or a seasoned developer, VS Code offers tools and features that can enhance productivity and streamline your coding process.

## Here is a step-by-step guide to installing Visual Studio Code on macOS

**_Step 1: Download the Visual Studio Code installer_**

1. Open your web browser and navigate to the [Visual Studio Code download page](https://code.visualstudio.com/download).
2. Click on the macOS icon to download the setup for macOS. This will download a .zip file to your default download location (usually the 'Downloads' folder).

**_Step 2: Install Visual Studio Code_**

1. Open your 'Downloads' folder, and locate the VS Code `.zip` file you downloaded. This should be named something like `VSCode-darwin.zip.`
2. Double-click the `.zip` file to extract the Visual Studio Code application. It should remove a single file named `Visual Studio Code.`

**_Step 3: Move the Application to the Applications Folder_**

1. drag and drop the `Visual Studio Code` file into your Applications folder. This will make VS Code easily accessible, as the Applications folder is the default location for applications on macOS.

**_Step 4: Verify the Installation_**

1. Open your Applications folder, then double-click on the `Visual Studio Code` application to open it.
2. If your system shows a warning that it cannot open the application because it's from an unidentified developer, go to `System Preferences > Security & Privacy > General.` There, you should see a message about Visual Studio Code. Click on `Open Anyway` to allow the application to run.

**_Step 5: Pin Visual Studio Code to the Dock (Optional)_**

Pin it to the Dock for easy access if you use Visual Studio Code frequently.

1. First, ensure Visual Studio Code is open. You should see its icon in the Dock.
2. Right-click (or Control-click) on the Visual Studio Code icon in the Dock.
3. Hover over `Options`, then click `Keep in Dock`.

Now, Visual Studio Code is ready to use, and you should be able to launch it from the Dock or your Applications folder quickly. The first time you open it, you'll be greeted with a welcome screen where you can customize your environment, open a project folder, or explore the editor's features. Happy coding!

## Here is a detailed, step-by-step guide on how to install Visual Studio Code on Windows

**_Step 1: Download the Visual Studio Code installer_**

1. Open your preferred web browser and navigate to the [Visual Studio Code download page](https://code.visualstudio.com/download).
2. Click on the Windows icon to download the setup for Windows. This will download a `.exe` installer to your default download location, usually the 'Downloads' folder.

**_Step 2: Run the Installer_**

1. Navigate to the location of the downloaded `.exe` file (typically your 'Downloads' folder) and double-click it to start the setup process.

**_Step 3: Go Through the Installation Process_**

1. A setup window will open. Start by reviewing and accepting the agreement.
2. Click on the `Next` button. You'll be asked to choose the location on your computer where you want to install Visual Studio Code. You can choose the default location or click `Browse` to select a different location, then click `Next`.
3. You'll be asked to select the Start Menu folder. Keep the default selection and click `Next`.
4. Next, you'll see several installation options. Check all boxes, which include creating a desktop icon, adding 'Open with Code' actions in the file and folder context menus, and registering code as an editor for supported file types. Once done, click `Next`.
5. Review your choices and click `Install` to start the installation.

**_Step 4: Completing the Installation_**

1. The installer will then install Visual Studio Code on your computer. This process may take a few minutes.
2. Once the installation is complete, leave the `Launch Visual Studio Code` box checked and click `Finish` to close the installer and open Visual Studio Code.

That's it! You have successfully installed Visual Studio Code on your Windows machine. It should now be accessible from your Start Menu or desktop. When you open Visual Studio Code, you'll be welcomed with a screen where you can customize your environment, open a project folder, or learn more about the editor's features. Happy coding!

## Creating and running a basic project with HTML, CSS, and JavaScript in Visual Studio Code is straightforward. Here's a step-by-step guide

**_Step 1: Setup a Project Directory_**

1. Create a new folder on your computer. This will serve as your project directory. You can name it whatever you'd like.

**_Step 2: Open the Project in VS Code_**

1. Open Visual Studio Code.
2. Go to `File > Open Folder...` and navigate to your created folder, then click `Open`.
3. your project folder should appear in the Explorer sidebar on the left.

**_Step 3: Create Your HTML, CSS, and JS Files_**

1. Right-click in the Explorer sidebar inside your project folder, select `New File`, and create an HTML file. For example, you could name it `index.html`.
2. Repeat this process to create your CSS and JavaScript files. You might name them `styles.css` and `main.js`.

**_Step 4: Write Your Code_**

1. In the `index.html` file, you can add your HTML. Here's a basic template:

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <link rel="stylesheet" type="text/css" href="styles.css" />
     </head>
     <body>
       <h1>Hello, World!</h1>
       <script src="main.js"></script>
     </body>
   </html>
   ```

2. In the `styles.css` file, add your CSS. For example:

   ```css
   body {
     background-color: #f0f0f0;
   }

   h1 {
     color: blue;
   }
   ```

3. In the `main.js` file, add your JavaScript. For example:

   ```javascript
   console.log("Hello, World!");
   ```

**_Step 5: View Your Project in a Browser_**

1. Right-click anywhere in your `index.html` file and select `Open with Live Server` from the drop-down menu. This requires the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), which can be installed from the VS Code marketplace. Live Server will launch your default web browser to display the web page. If you change your files, Live Server will automatically reload the page.

If you don't have the Live Server extension, manually open the `index.html` file in your web browser using the `File > Open File...` menu option and navigate to the `index.html` file in your project folder.

That's it! You've created a basic project with HTML, CSS, and JavaScript in Visual Studio Code and viewed it in a web browser. Remember to save your files (`Ctrl+S` on Windows, `Command+S` on Mac) whenever you make changes.

Happy coding!

\*\* **Book Recommendation**: [Version Control with Git](https://amzn.to/46xioqF)
\*\* **_Powerful Tools and Techniques for Collaborative Software Development_**

\*\* **Book Recommendation**: [Pragmatic Programmer](https://amzn.to/43h37XQ)
\*\* **_Your journey to mastery_**

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/SdwAYvFT)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
