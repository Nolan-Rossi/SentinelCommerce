const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto("https://secure.newegg.com/NewMyAccount/");
  await page.waitForSelector('.nav-complex-title', {timeout: 150000});
  const cookies = await page.cookies();
  await fs.writeFile('./cookiesne.json', JSON.stringify(cookies, null, 2));
  await page.screenshot({ path: 'example.png' })
  await browser.close();
})();