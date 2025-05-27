# Dumble (v2.5)

## Introduction
Dumble is a Puppeteer-based script that runs in a Node.js environment through the command line (CMD) for simulating advanced cheating in online exams. (exam.net, etc)

## Features

- **Built-in ChatGPT**

    - Access on-site via green button on bottom right

- **Stealth Mode via puppeteer-extra-plugin-stealth**


  - Makes the script undetected


- **Focus and Visibility Spoofing**

  - Fake fullscreen

  - Window Blur/Focus loss spoofer

- **Viewport and Screen Spoofing**

  - Forces window.innerWidth, window.innerHeight to match screen.width, screen.height

  - screen.availWidth and availHeight override for consistency

- **Input Simulation**

  - Detects text fields or textareas automatically

  - Types simulated input with randomized delays

  - Human-like mouse movement using randomized coordinates and steps

- **Time Zone and Date Spoofer**

  - Overrides Date constructor to ensure consistency with real system offset

- **Iframe Hardening**

  - Crossframe detection spoofer


## Requirements

- [Node.js (v16 or later recommended)](https://nodejs.org/en/download)

- npm (comes with Node.js)

- [Git (optional, for cloning the repo)](https://git-scm.com/downloads)


## Dependencies

- puppeteer-extra

- puppeteer-extra-plugin-stealth

- puppeteer

- readline (built-in Node.js module)

## Installation (cmd)

**1. Clone the repository:**

<pre> git clone https://github.com/bunsybuns123/dumble.git </pre>


``` cd dumble ```

**2. Install the required packages:**

<pre> npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth </pre>

## Installation, macOS (Beta, not fully functional)

**1. Install Homebrew (If you don't have it):**

<pre> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" </pre>

**2. Install Node.js + Git:**

<pre> brew install node git </pre>

**3. Clone the repo:**

<pre> git clone https://github.com/bunsybuns123/dumble.git </pre> 

```cd dumble```

**4. Install dependencies:**

<pre> npm install puppeteer-extra puppeteer-extra-plugin-stealth </pre>

## Usage

**<pre>Usage:**
node dumble [args]

<ins>**for MacOS:**</ins> node dumble_unix [args]

**Arguments:**
        --verbose    Verbose output, detailed logs
</pre>


## Examples

- **UI Preview:**

![image](https://github.com/user-attachments/assets/be089826-696d-421e-a509-561ebc8fced2)




## ⚠️ Disclaimer

This tool is for **educational and testing purposes only. Do not** use it to bypass real exam systems or engage in academic dishonesty. **The author is not responsible for any misuse of this software.**

