const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.footlocker.com/product/~/C9326400.html");

    var linkTexts = await page.$$eval("label",
                elements=> elements.map(item=>item.textContent));
  
  await page.click(".ProductSize:nth-child(12) .c-form-label-content");

  await page.click(".ProductDetails-form__action");

  
  console.log(linkTexts);

  await page.screenshot({ path: 'example.png' })
  
  await browser.close();
})();
