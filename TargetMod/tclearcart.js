const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const tlinks = require("./tlinks")
const clutter = require("../clutter");
function tclearcart() {
    (async () => {
        const browser = await puppeteer.launch({headless : true});
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        const cookiesString = await fs.readFile('../allCookies/tcookies.json');
        const cookies = JSON.parse(cookiesString);
        await page.setCookie(...cookies);
        var checkElement1 = null
        var checkElement2 = null
        await page.goto('https://www.target.com/co-cart');

        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        var stillInCart = await page.evaluate(() => {
          let selector1 = document.querySelector('.etagjo');
          return selector1;
        })

        while (stillInCart !== null){
          await page.click('.etagjo')
          await clutter.delay(1100)
          
          var stillInCart = await page.evaluate(() => {
            let selector1 = document.querySelector('.etagjo');
            return selector1;
          })
        }
        await browser.close();
      })();
}
tclearcart();
