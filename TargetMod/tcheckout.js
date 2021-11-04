const puppeteer = require('puppeteer');
const tlinks = require("./tlinks");
const clutter = require("../clutter");
const util = require("util");
const fs = require('fs').promises;

// '../allCookies/tcookies.json'   the cookies to use if task is being run in the targetmod folder
// '../psummit/allCookies/tcookies.json' the cookies to use if task is being run in psummit

function tMainTask (taskNumber, TCIN, deliveryMethod, monitoringDelay, tusername, tpassword) {    // to be ran from main.js because of different file location of cookies
  (async () => {
    // constructs delivery method variable
    taskNumber = 'Task ' + taskNumber + ': '
    var deliverBy = ''
    if (deliveryMethod == 'ship'){
      deliverBy = '.fkIGFH .iIyhFg'
    }
    if (deliveryMethod == 'pickup'){
      deliverBy = '.fIHckm div .fdXLni .iIyhFg';
    }

    // lanches puppeteer session and specifies settings

    console.log(taskNumber + 'launching session');
    const browser = await puppeteer.launch({
      headless : false
      //   , args: ['--proxy-server=']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 })

    //loads cookies

    console.log(taskNumber + 'loading cookies');
    const cookiesString = await fs.readFile('../psummit/allCookies/tcookies.json');
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    //visits product page

    console.log(taskNumber + 'visiting product page')
    await page.goto(tlinks.t1(TCIN));

    //if cookies are using an old session, refreshes login

    signedIn1 = await page.$eval('.iQFCAn', element => element.textContent);
    if (signedIn1 == 'Sign in'){
      console.log(taskNumber + 'Refreshing old cookies')
      await page.goto("https://www.target.com/account/orders?lnk=acct_nav_my_account");
      await page.waitForSelector('#password', {timeout: 8000});
      await page.type('#password', tpassword)
      await page.click('.ysAUA');
      await page.click('#login');
      await page.waitForNavigation({ waitUntil: 'networkidle0' })
      const cookies = await page.cookies();
      await fs.writeFile('./allCookies/tcookies.json', JSON.stringify(cookies, null, 2));
      await page.goto(tlinks.t1(TCIN));
    }
    
    //checks stock status and monitor if oos


    // await page.waitForSelector('.h-padding-t-tight+ .h-padding-t-tight')
    // var stockCheck = await page.$eval('.h-padding-t-tight+ .h-padding-t-tight', element => element.textContent)
    // var inStock = stockCheck.includes('Ship it')
    // if (deliveryMethod = 'ship'){
    // var outOfStock = (stockCheck.includes('Sold out') || stockCheck.includes("This item isn't available for shipping."))
    // }

    // while (outOfStock == true){
    //   console.log('oos');
    //   await clutter.delay(monitoringDelay);
    //   await page.reload();
    //   await page.waitForSelector('.h-padding-t-tight+ .h-padding-t-tight')
    //   var stockCheck = await page.$eval('.h-padding-t-tight+ .h-padding-t-tight', element => element.textContent);
      
    //   if (deliveryMethod = 'ship'){
    //     var outOfStock = (stockCheck.includes('Sold out') || stockCheck.includes("This item isn't available for shipping."))
    //   }
      
    // }
    await page.waitForSelector('.h-padding-t-tight+ .h-padding-t-tight');
    var stockCheck = await page.evaluate(({deliverBy}) => {
      let selector1 = document.querySelector(deliverBy);
      return selector1;
    }, {deliverBy})
    while (stockCheck === null){
      console.log(taskNumber + 'oos');
      await clutter.delay(monitoringDelay);
      await page.reload();
      await page.waitForSelector('.h-padding-t-tight+ .h-padding-t-tight');
      var stockCheck = await page.evaluate(({deliverBy}) => {
        let selector1 = document.querySelector(deliverBy);
        return selector1;
      }, {deliverBy})
    }

    //checks items in cart before and after ATC to ensure that they were added correctly

    var itemsCartedBeforeATC = 0;
    var quantitiyInCart = await page.evaluate(() => {
      let numItemsInCart = document.querySelector('.cartLinkQuantity')
      return numItemsInCart
    })
    if (quantitiyInCart !== null){
    itemsCartedBeforeATC = await page.$eval('.cartLinkQuantity', element => element.textContent) 
    }
    console.log(taskNumber + 'this many before atc' + itemsCartedBeforeATC)
    await page.click(deliverBy)
    await page.waitForSelector('.cartLinkQuantity')
    var itemsCartedAfterATC = await page.$eval('.cartLinkQuantity', element => element.textContent) 
    while (!(itemsCartedAfterATC>itemsCartedBeforeATC)){
      var itemsCartedAfterATC = await page.$eval('.cartLinkQuantity', element => element.textContent) 
    }
    console.log(taskNumber + 'this many after atc' + itemsCartedAfterATC)

    //visits checkout
 
    console.log(taskNumber + 'checkingout')
    await page.goto('https://www.target.com/co-review?precheckout=true')

    // checks to see if logged in again
    var checkElement5 = null;
    var checkElement6 = null
    while ((checkElement5 === null) && (checkElement6 === null)){
      checkElement5 = await page.evaluate(() => {
        let selector1 = document.querySelector('.JRFKP')
        return selector1
      })
      checkElement6 = await page.evaluate(() => {
        let selector2 = document.querySelector('.lhXIuw') //future nolan, make selector 2 lead into an if statement when it isnt null where it then checks the content of the selector to see if it actually is the relogin page
        return selector2
      })
    }

    // for whatever reason, if relogin page appears, resign in

    if (checkElement6 === undefined){
      console.log(taskNumber + 'resign in!')
      await page.waitForSelector('#password')
      await page.type('#password', tpassword)
      await page.click('.gxIeGa');
      await page.click('#login');
      await page.goto('https://www.target.com/co-review?precheckout=true')
    }

    // purchase

       await page.waitForSelector('.JRFKP')
       await page.click('.JRFKP')
       console.log(taskNumber + 'order processing...')
       await page.waitForSelector('.iOqSZs')
       var orderPlaced = await page.$eval('.iOqSZs', element => element.textContent)
       if (orderPlaced == 'How was your checkout experience?'){
         console.log(taskNumber + 'success!')
       } else{
         console.log(taskNumber + 'error placing order')
       }
      await page.screenshot({ path: 'tcheckout.png' })
      await browser.close();
  })();
}
module.exports = {tMainTask};