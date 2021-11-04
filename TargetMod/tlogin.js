const tusername = 'abc@gmail.com'
const tpassword = 'Password1'
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
(async () => {

  const browser = await puppeteer.launch({headless : true});
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 1080 })
  await page.goto("https://www.target.com/account/orders?lnk=acct_nav_my_account");
  await page.waitForSelector('.jkfiQr', {timeout: 8000});
  await page.type('#username', tusername)
  await page.type('#password', tpassword)
  await page.click('.ysAUA');
  await page.click('#login');
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  const cookies = await page.cookies();
  await fs.writeFile('../allCookies/tcookies.json', JSON.stringify(cookies, null, 2));
  await page.screenshot({ path: 'example.png' })
  await browser.close();
})();