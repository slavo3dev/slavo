---
title: "Quick guide to Set Up SSH Keys & Add Them to GitHub"
date: "2023-11-14"
author: "Slavo"
image: "ssh-agent.png"
excerpt: "Enhance your security with SSH keys for GitHub access. This guide covers SSH key setup for Mac, Windows, and Linux users."
isFeatured: false
category: "Dev Tools"
---

Enhancing your security when accessing your GitHub repositories can be efficiently done by setting up an SSH key. This guide will walk you through the steps to create an SSH key on Mac, Windows, and Linux systems and add it to your GitHub account.

### Check for Existing SSH Keys

- Open a terminal.
- Run `ls -al ~/.ssh` to see if existing SSH keys are present.

### Generate a New SSH Key

- Run `ssh-keygen -t ed25519 -C "your_email@example.com"` to generate a new SSH key, replacing "<your_email@example.com>" with your GitHub email address.

### Add SSH Key to the SSH-Agent

- Start the `ssh-agent` in the background with eval "$(ssh-agent -s)".
- If you are using macOS Sierra 10.12.2 or later, you need to modify `~/.ssh/config` to automatically load keys into the ssh-agent and store passphrases in your keychain. If the file doesn't exist, create it with touch `~/.ssh/config` and open it with your favorite editor.
- Add the following to `~/.ssh/config`

```bash

Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519

```

### Add the SSH Key to Your GitHub Account

- Copy the SSH public key to your clipboard with `pbcopy < ~/.ssh/id_ed25519.pub`.
- Go to GitHub and under your profile settings, find the SSH and GPG keys section.
- Click “New SSH Key”, paste your key, and save it.

## For Windows Users

### Install Git for Windows

- Download Git from [git-scm.com](git-scm.com).
- During installation, make sure to select Git Bash and the option to "Use Git from the Windows Command Prompt".

### **Generate a New SSH Key**

- Open Git Bash.
- Run `ssh-keygen -t ed25519 -C "your_email@example.com"`.

### **Add SSH Key to the SSH-Agent**

- Ensure the ssh-agent is running: `eval $(ssh-agent -s)`.
- Add your SSH key to the ssh-agent: `ssh-add ~/.ssh/id_ed25519`.

### **Add the SSH Key to Your GitHub Account**

- Copy the SSH public key by opening the file `~/.ssh/id_ed25519.pub` with a text editor and copying its content.
- Follow the same GitHub instructions as for Mac/Linux to add your SSH key to your GitHub account.

### Saving SSH Config

- For all operating systems, you may want to set up an SSH config file:
- Create or edit `~/.ssh/config` and add configurations for the hosts you connect to, such as:

```bash

Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519

```

These steps will set up your SSH keys across different operating systems and add them to your GitHub account. This setup allows for a secure connection to GitHub without repeatedly entering your credentials. Always handle your private key with care and never disclose it. Happy coding securely!

\*\* **Book Recommendation**: [Version Control with Git](https://amzn.to/46xioqF)
\*\* **_Powerful Tools and Techniques for Collaborative Software Development_**

\*\* **Book Recommendation**: [Pragmatic Programmer](https://amzn.to/43h37XQ)
\*\* **_Your journey to mastery_**

**_Join Our Discord Community_** [Unleash your potential, join a vibrant community of like-minded learners, and let's shape the future of programming together. Click here to join us on Discord.](https://discord.gg/aN9Pgzz2)

**_For Consulting and Mentorship, feel free to contact_** [slavo.io](/contact)
