# Dumble

# ❗ STATUS UPDATES AND MORE IN DISCORD https://discord.gg/NnpCKAV8Bh

## Introduction
Dumble is a Puppeteer-based script that runs in a Node.js environment through the command line (CMD) for simulating advanced cheating in online exams. (exam.net, etc)

## Features

- **Stealth Mode via puppeteer-extra-plugin-stealth**


  - Makes the script undetected


- **Focus and Visibility Spoofing**

  - Fake fullscreen

  - Window Blur/Focus loss spoofer

- **Viewport and Screen Spoofing**

  - Forces window.innerWidth, window.innerHeight to match screen.width, screen.height

  - Overrides screen.availWidth and availHeight for consistency

- **Input Simulation**

  - Detects text fields or textareas automatically

  - Types simulated input with randomized delays

  - Human-like mouse movement using randomized coordinates and steps

- **Time Zone and Date Spoofer**

  - Overrides Date constructor to ensure consistency with real system offset

- **Iframe Hardening**

  - Crossframe detection spoofer


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

## Examples

- **Without Dumble (Instanly detected and flagged to the teacher)**

![dumble_example2](https://github.com/user-attachments/assets/11285586-72f7-4a7c-9517-76093474784a)


- **With Dumble (Completely Undetected and looks like student is typing)**

![dumble_example](https://github.com/user-attachments/assets/ecd12534-5ebd-46af-b311-0a269c544015)



## ⚠️ Disclaimer

This tool is for **educational and testing purposes only. Do not** use it to bypass real exam systems or engage in academic dishonesty. **The author is not responsible for any misuse of this software.**

