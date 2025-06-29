const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const readline = require('readline');

const VERBOSE = process.argv.includes('--verbose');
const log = (...args) => VERBOSE && console.log('[verbose]', ...args);

puppeteer.use(StealthPlugin());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const spinnerStates = ['|', '/', '-', '\\'];
let spinnerIndex = 0;
let spinnerInterval;

function startSpinner(text) {
  spinnerIndex = 0;
  process.stdout.write(text + ' ');
  spinnerInterval = setInterval(() => {
    process.stdout.write('\r' + text + ' ' + spinnerStates[spinnerIndex]);
    spinnerIndex = (spinnerIndex + 1) % spinnerStates.length;
  }, 100);
}

function stopSpinner(successText = 'Done') {
  clearInterval(spinnerInterval);
  process.stdout.write('\r\x1b[K'); // Clear entire line
  process.stdout.write(`✅ ${successText}\n`);
}

async function simulateProgress(text, duration = 1500) {
  const steps = 10;
  const interval = duration / steps;
  for (let i = 0; i <= steps; i++) {
    const percent = (i * 100) / steps;
    process.stdout.write(`\r${text}: ${percent}%`);
    await sleep(interval);
  }
  process.stdout.write(`\r${text}: 100%\n`);
}

console.log(` 
  _____                  _     _             ___    _____ 
 |  __ \\                | |   | |           |__ \\  | ____|
 | |  | |_   _ _ __ ___ | |__ | | ___  __   __ ) | | |__  
 | |  | | | | | '_ \` _ \\| '_ \\| |/ _ \\ \\ \\ / // /  |___ \\ 
 | |__| | |_| | | | | | | |_) | |  __/  \\ V // /_ _ ___) |
 |_____/ \\__,_|_| |_| |_|_.__/|_|\\___|   \\_/|____(_)____/ 
                                                          
By bunsybuns123 #2EASY #RASVATONMAITO
🟡 Note: Please wait for tool to inject when website loads up.
`);

rl.question('Enter the exam website URL: ', async (url) => {
  rl.close();

  startSpinner('Launching browser');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--start-maximized',
    ],
    defaultViewport: null
  });
  stopSpinner('Browser launched');

  const [page] = await browser.pages();

  page.on('console', msg => {
    const text = msg.text();
    if (/⚠️|🟢|❌/.test(text)) console.log(`Dumble v2.5: ${text}`);
    else log('Console:', text);
  });

  startSpinner('Injecting stealth bypass');
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });

    const originalQuery = navigator.permissions.query;
    navigator.permissions.query = (params) =>
      params.name === 'notifications'
        ? Promise.resolve({ state: Notification.permission })
        : originalQuery(params);

    Object.defineProperty(document, 'visibilityState', { get: () => 'visible' });
    Object.defineProperty(document, 'hidden', { get: () => false });
    document.hasFocus = () => true;
    window.onblur = null;
    window.onfocus = null;
    window.addEventListener = new Proxy(window.addEventListener, {
      apply: (target, thisArg, args) => {
        if (args[0] === 'blur' || args[0] === 'visibilitychange') return;
        return Reflect.apply(target, thisArg, args);
      }
    });

    const getParam = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function (p) {
      if (p === 37445) return 'Intel Inc.';
      if (p === 37446) return 'Intel Iris OpenGL Engine';
      return getParam.call(this, p);
    };

    HTMLCanvasElement.prototype.toDataURL = () =>
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAA";

    const createAnalyser = AudioContext.prototype.createAnalyser;
    AudioContext.prototype.createAnalyser = function () {
      const analyser = createAnalyser.call(this);
      analyser.getFloatFrequencyData = array => array.fill(-100);
      return analyser;
    };

    Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
      get: function () { return window; }
    });

    const oldToString = Function.prototype.toString;
    Function.prototype.toString = function () {
      return typeof this === 'function' && this.name === 'toString'
        ? 'function toString() { [native code] }'
        : oldToString.call(this);
    };

    const offset = new Date().getTimezoneOffset();
    const RealDate = Date;
    window.Date = class extends RealDate {
      constructor(...args) {
        return args.length ? new RealDate(...args) : new RealDate(Date.now() + offset * 60 * 1000);
      }
    };

    Object.defineProperty(document, 'fullscreenElement', {
      get: () => document.documentElement
    });
    Object.defineProperty(document, 'fullscreenEnabled', {
      get: () => true
    });
    document.exitFullscreen = () => Promise.resolve();
    document.documentElement.requestFullscreen = () => Promise.resolve();

    Object.defineProperty(window, 'innerWidth', { get: () => screen.width });
    Object.defineProperty(window, 'innerHeight', { get: () => screen.height });
    Object.defineProperty(screen, 'availWidth', { get: () => screen.width });
    Object.defineProperty(screen, 'availHeight', { get: () => screen.height });

    document.addEventListener = new Proxy(document.addEventListener, {
      apply: (target, thisArg, args) => {
        if (['mouseleave', 'mouseout', 'blur'].includes(args[0])) return;
        return Reflect.apply(target, thisArg, args);
      }
    });

    console.log('🟢 Bypass completed successfully');
  });
  stopSpinner('Spoofer, ChatGPT and bypasses injected');

  async function injectChatGPT() {
    await page.evaluate(() => {
      if (window._chatgptPopup && !window._chatgptPopup.closed) {
        // do nothing
      } else {
        window._chatgptPopup = null;
      }

      function injectButton() {
        if (!document.body) return;
        if (document.getElementById('chatgpt-toggle-btn')) return;

        const styleId = 'chatgpt-toggle-style';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.textContent = `
            #chatgpt-toggle-btn {
              position: fixed;
              bottom: 15px;
              right: 15px;
              z-index: 999999;
              width: 20px;
              height: 20px;
              background: rgba(16, 163, 127, 0.4);
              border-radius: 50%;
              border: 1px solid rgba(16, 163, 127, 0.7);
              cursor: pointer;
              user-select: none;
              transition: background 0.3s ease;
            }
            #chatgpt-toggle-btn:hover {
              background: rgba(16, 163, 127, 0.8);
            }
          `;
          document.head.appendChild(style);
        }

        const btn = document.createElement('button');
        btn.id = 'chatgpt-toggle-btn';
        btn.title = 'ChatGPT Toggle';
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
          const url = 'https://chat.openai.com/';
          if (window._chatgptPopup && !window._chatgptPopup.closed) {
            try {
              window._chatgptPopup.focus();
            } catch {
              window._chatgptPopup = window.open(url, 'chatgpt_window', 'width=800,height=600,resizable,scrollbars');
            }
          } else {
            window._chatgptPopup = window.open(url, 'chatgpt_window', 'width=800,height=600,resizable,scrollbars');
          }
        });
      }

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectButton();
      } else {
        window.addEventListener('DOMContentLoaded', injectButton);
      }
    });
  }

  page.on('framenavigated', async () => {
    log('Frame navigated, reinjecting ChatGPT button...');
    await injectChatGPT();
  });

  try {
    startSpinner(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });
    stopSpinner('Page loaded');

    await injectChatGPT();
    await simulateProgress('Simulating mouse', 1000);

    const viewport = page.viewport() || { width: 800, height: 600 };
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const startX = randomInt(50, viewport.width / 2);
    const startY = randomInt(50, viewport.height / 2);
    await page.mouse.move(startX, startY, { steps: 20 });
    await sleep(randomInt(500, 1500));
    await page.mouse.move(startX + randomInt(50, 150), startY + randomInt(30, 80), { steps: 30 });

    const input = await page.$('input[type="text"], input:not([type]), textarea');
    if (input) {
      log('Found input. Simulating keystrokes...');
      await input.focus();
      await page.keyboard.type('Simulated input', { delay: 100 + Math.random() * 100 });
    } else {
      log('No text input found.');
    }

    console.log('Dumble v2.5 | 🟢 Tool 100% Successfully Injected, Ctrl + C to Quit');
  } catch (err) {
    console.error('Dumble v2.5 | ❌ Error during injection:', err);
  }
});
