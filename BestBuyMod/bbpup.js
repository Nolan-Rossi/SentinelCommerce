const puppeteer = require('puppeteer');
const fs = require('fs');
const accountemail = "abc@yahoo.com";
const accountpassword = "Password1";
(async () => {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto("https://www.bestbuy.com/identity/global/signin");
  await page.type("#fld-e", accountemail);
  await page.type("#fld-p1", accountpassword);
  await page.click(".cia-form__controls__submit");
  await page.screenshot({ path: 'example.png' })
  /*await page.goto("https://www.bestbuy.com/site/insignia-2-1-channel-80w-soundbar-system-with-wireless-subwoofer-black/6335126.p?skuId=6335126")
  await page.click(".add-to-cart-button");
  await page.screenshot({ path: 'example2.png' })*/
  await browser.close();
})();