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

console.log(` 
  _____                  _     _             ___    _____ 
 |  __ \\                | |   | |           |__ \\  | ____|
 | |  | |_   _ _ __ ___ | |__ | | ___  __   __ ) | | |__  
 | |  | | | | | '_ \` _ \\| '_ \\| |/ _ \\ \\ \\ / // /  |___ \\ 
 | |__| | |_| | | | | | | |_) | |  __/  \\ V // /_ _ ___) |
 |_____/ \\__,_|_| |_| |_|_.__/|_|\\___|   \\_/|____(_)____/ 
                                                          
                                                          
By bunsybuns123 #2EASY #RASVATONMAITO
🟢 Tool status: Undetected
🟡 Note: Please wait for tool to inject when website loads up.
`);

rl.question('Enter the exam website URL: ', async (url) => {
  rl.close();

  if (!/^https?:\/\//.test(url)) {
    console.error('❌ Invalid URL. Must start with http:// or https://');
    process.exit(1);
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--start-maximized',
      ],
      defaultViewport: null
    });

    const [page] = await browser.pages();

    process.on('SIGINT', async () => {
      console.log('\n🟡 Exiting... Closing browser.');
      await browser.close();
      process.exit(0);
    });

    page.on('console', msg => {
      const text = msg.text();
      if (/⚠️|🟢|❌/.test(text)) console.log(`Dumble v2.5: ${text}`);
      else log('Console:', text);
    });

    log('Injecting stealth bypass...');
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

      // F11 toggle via Right Control
      let rightCtrlPressed = false;
      window.addEventListener('keydown', async (e) => {
        if (e.code === 'ControlRight' && !rightCtrlPressed) {
          rightCtrlPressed = true;
          try {
            if (!document.fullscreenElement) {
              await document.documentElement.requestFullscreen();
            } else {
              await document.exitFullscreen();
            }
          } catch (err) {
            console.warn('⚠️ Fullscreen toggle error:', err.message);
          }
        }
      });
      window.addEventListener('keyup', (e) => {
        if (e.code === 'ControlRight') {
          rightCtrlPressed = false;
        }
      });

      console.log('🟢 Bypass completed successfully');
    });

    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    const viewport = page.viewport() || { width: 800, height: 600 };
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const startX = randomInt(50, viewport.width / 2);
    const startY = randomInt(50, viewport.height / 2);
    log(`Moving mouse to ${startX}, ${startY}`);
    await page.mouse.move(startX, startY, { steps: 20 });
    await new Promise(res => setTimeout(res, randomInt(500, 1500)));
    await page.mouse.move(startX + randomInt(50, 150), startY + randomInt(30, 80), { steps: 30 });

    const input = await page.$('input[type="text"], input:not([type]), textarea');
    if (input) {
      log('Found input. Simulating keystrokes...');
      await input.focus();
      await page.keyboard.type('Simulated input', { delay: 100 + Math.random() * 100 });
    } else {
      log('No text input found.');
    }

    console.log('Dumble v2.5 | 🟢 Tool Successfully Injected, Ctrl + C to Quit');
  } catch (err) {
    console.error('❌ Fatal Error:', err.message || err);
    if (browser) await browser.close();
    process.exit(1);
  }
});
