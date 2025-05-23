# Dumble

# ❗STATUS UPDATES AND MORE IN DISCORD https://discord.gg/ynvqr3SaD

## Introduction
Dumble is a Puppeteer-based script that runs in a Node.js environment through the command line (CMD) for simulating advanced cheating in online exams. (exam.net, etc)

## Features

- **Stealth Mode via puppeteer-extra-plugin-stealth**


  - Removes navigator.webdriver

  - Mocks navigator.plugins and navigator.languages

  - Overrides WebGLRenderingContext to spoof GPU info

  - Modifies AudioContext to evade fingerprinting

  - Replaces Function.prototype.toString to avoid detection

- **Focus and Visibility Spoofing**

  - Overrides document.hidden and document.visibilityState

  - Forces document.hasFocus() to always return true

  - Prevents blur/focus loss from triggering detection scripts

  - Fullscreen Lock Circumvention

  - Fakes document.fullscreenElement and related API calls

  - Overrides requestFullscreen() and exitFullscreen() to silently resolve

- **Viewport and Screen Spoofing**

  - Forces window.innerWidth, window.innerHeight to match screen.width, screen.height

  - Overrides screen.availWidth and availHeight for consistency

- **Input Simulation**

  - Detects text fields or textareas automatically

  - Types simulated input with randomized delays

  - Human-like mouse movement using randomized coordinates and steps

- **Time Zone and Date Spoof/Fake**

  - Overrides Date constructor to ensure consistency with real system offset

- **Iframe Hardening**

  - Overrides HTMLIFrameElement.prototype.contentWindow to prevent cross-frame detection


## Requirements

- Node.js (v16 or later recommended)

- npm (comes with Node.js)

- Git (optional, for cloning the repo)


## Dependencies

- puppeteer-extra

- puppeteer-extra-plugin-stealth

- puppeteer

- readline (built-in Node.js module)

## Installation

**1. Clone the repository:**

<pre> git clone https://github.com/bunsybuns123/dumble.git </pre>


``` cd dumble ```


**2. Install the required packages:**

<pre> npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth </pre>

## Usage

**<pre>Usage:**
        node dumble [options]

**Arguments:**
        --verbose    Verbose output, detailed logs
</pre>

## ⚠️ Disclaimer

This tool is for **educational and testing purposes only. Do not** use it to bypass real exam systems or engage in academic dishonesty. **The author is not responsible for any misuse of this software.**

