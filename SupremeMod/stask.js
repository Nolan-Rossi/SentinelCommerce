const puppeteer = require("puppeteer-extra")
const clutter = require("../clutter");
const pluginStealth = require("puppeteer-extra-plugin-stealth")
puppeteer.use(pluginStealth())


 const BASE_URL = 'https://www.supremenewyork.com/shop/all/accessories'
 const CHECKOUT = 'https://www.supremenewyork.com/checkout'
 const BASE_URL1 = 'https://www.supremenewyork.com/shop/all/accessories'

 const itemList = "Fronts Keychain";
 const itemColor = 'White'
 const itemList1 = 'Supreme®/McDermott™ Pool Cue'
 const itemColor1 = 'Black'
 const itemSize1 = 'Large'

 const firstCard = {
   name: 'bob bobby',
   email: "abc@gmail.com",
   telephone: "1234567890",
   address: '123 abc street',
   zipcode: '12345',
   city: 'thecity',
   cc: '111111111111111',
   ccMonth: '01',
   ccYear: '2026',
   CVV: '123'
 }

 const secondCard = {
   name: 'bill billy',
   email: "xyz@gmail.com",
   telephone: "1234567890",
   address: '123 abc street',
   zipcode: '12345',
   city: 'thecity',
   cc: '111111111111111',
   ccMonth: '01',
   ccYear: '2026',
   CVV: '123'
 }


function accessoryBot1(BASE_URL, CHECKOUT, item1, name, email, telephone, address, zipcode, city, cc, ccMonth, ccYear, CVV){
  async () => {

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: false 
    });
  
    const page = await browser.newPage();
  
    await page.goto(BASE_URL);
  
    let itemSelection = await page.$x(`//a[contains(text(), "${item1}")]`)
  
    await itemSelection[0].click();
  
    await page.waitFor(700)
  
    // await page.click(`a[data-style-name = "${itemColor}"]`)
  
    await page.click('input[name = "commit"]')
  
    await page.waitFor(700)
  
    await page.goto(CHECKOUT);
  
    await page.type('input[id="order_billing_name"]', name)
  
    await page.type('input[id="order_email"]', email)
  
    await page.type('input[id="order_tel"]', telephone)
  
    await page.type('input[id="bo"]', address)
  
    await page.type('input[id="order_billing_zip"]', zipcode)
  
    await page.type('input[id="order_billing_city"]', city)
  
    await page.type('input[id="nnaerb"]', cc)
  
    await page.select('select#credit_card_month', ccMonth)
  
    await page.select('select#credit_card_year', ccYear)
  
    await page.type('input[id="orcer"]', CVV)
  
    await page.click("#order_terms")
  
    await page.click('input[name = "commit"]')
  
  
  
  }
}

function accessoryBot2(BASE_URL, CHECKOUT, item2, name2, email2, telephone2, address2, zipcode2, city2, cc2, ccMonth2, ccYear2, CVV2){async () => {

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false 
  });

  const page = await browser.newPage();

  await page.goto(BASE_URL);

  let itemSelection = await page.$x(`//a[contains(text(), "${item2}")]`)

  await itemSelection[0].click();

  await page.waitFor(700)

  // await page.click(`a[data-style-name = "${itemColor}"]`)

  await page.click('input[name = "commit"]')

  await page.waitFor(700)

  await page.goto(CHECKOUT);

  await page.type('input[id="order_billing_name"]', name2)

  await page.type('input[id="order_email"]', email2)

  await page.type('input[id="order_tel"]', telephone2)

  await page.type('input[id="bo"]', address2)

  await page.type('input[id="order_billing_zip"]', zipcode2)

  await page.type('input[id="order_billing_city"]', city2)

  await page.type('input[id="nnaerb"]', cc2)

  await page.select('select#credit_card_month', ccMonth2)

  await page.select('select#credit_card_year', ccYear2)

  await page.type('input[id="orcer"]', CVV2)

  await page.click("#order_terms")

  await page.click('input[name = "commit"]')
  }
}



function botWithSize1(BASE_URL, CHECKOUT, item1, itemSize1, name, email, telephone, address, zipcode, city, cc, ccMonth, ccYear, CVV){async () => {

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false 
  });
  console.log('before')
  const page = await browser.newPage();

  await page.goto(BASE_URL);

  //let itemSelection = await page.$x(`//a[contains(text(), "${item1}")]`)
  var presentInChild = false;
  var childContents = ' ';
  var itemSelection = 's'
  console.log('before')
  //while (presentInChild == false){
    for (var x = 0; childContents !== null; x++){
      console.log(x);
      childContents = await page.$eval(('#container li:nth-child(' + x + ')'), element => element.textContent)
    }
    
  //     if((await page.$eval(('#container li:nth-child(' + x + ')'), element => element.textContent)) !== null){
  //       itemSelection = await page.$eval(('#container li:nth-child(' + x + ')'), element => element.textContent)
  //     }
  // }
    
  //}


  await page.click(itemSelection)
  await itemSelection[0].click();

  await page.waitFor(700)

  // await page.click(`a[data-style-name = "${itemColor1}"]`)

  let $elemHandler = await page.$('#s');
  let properties = await $elemHandler.getProperties();
  for (const property of properties.values()) {
    const element = property.asElement();
    if (element) {
      let hText = await element.getProperty("text");
      let text = await hText.jsonValue();
      if (text === `${itemSize1}`) {
        let hValue = await element.getProperty("value");
        let value = await hValue.jsonValue();
        await page.select("select#s", value); // or use 58730
        console.log(`Selected ${text} which is value ${value}.`);
      }
    }
  }

  await page.click('input[name = "commit"]')

  await page.waitFor(1500)

  await page.goto(CHECKOUT);

  await page.type('input[id="order_billing_name"]', name)
  // await page.$eval('input[id="order_billing_name"]', el => el.value = 'Test Testerson')

  await page.type('input[id="order_email"]', email)

  await page.type('input[id="order_tel"]', telephone)

  await page.type('input[id="bo"]', address)

  await page.type('input[id="order_billing_zip"]', zipcode)

  await page.type('input[id="order_billing_city"]', city)

  await page.type('input[id="nnaerb"]', cc)

  await page.select('select#credit_card_month', ccMonth)

  await page.select('select#credit_card_year', ccYear)

  await page.type('input[id="orcer"]', CVV)

  await page.click("#order_terms")

  await page.click('input[name = "commit"]')

  }
}


function botWithSize2(profile, BASE_URL, CHECKOUT, item2, itemSize2, itemColor)  {
  (async () => {
  let name2 = profile.name;
  let email2 = profile.email;
  let telephone2 = profile.telephone;
  let address2 = profile.address;
  let zipcode2 = profile.zipcode;
  let city2 = profile.city;
  let cc2 = profile.cc;
  let ccMonth2 = profile.ccMonth;
  let ccYear2 = profile.ccYear;
  let CVV2 = profile.CVV;
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false 
  });

  const page = await browser.newPage();

  await page.goto(BASE_URL);
  //let itemSelection = await page.$x(`//a[contains(text(), "${item2}")]`)

  //let itemSelection = await page.$x(`//a[contains(text(), "${item1}")]`)
  var presentInChild = false;
  var childContents = ' ';
  var itemSelection = ' ';
  var itemContent = ' ';
  var numChildren = 1;
  var counter1 = 0
    while (childContents !== null){
      childContents = await page.evaluate(({numChildren}) => {
        let selector1 = document.querySelector(('#container li:nth-child(' + numChildren + ')'));
        return selector1;
      }, {numChildren});
    numChildren ++;
    };
  numChildren = numChildren - 2;

  while(presentInChild == false && counter1<numChildren){
    counter1++
    itemContent = await page.$eval(('#container li:nth-child(' + counter1 + ')'), element => element.textContent)

    if(itemContent.includes(item2)){
      if(itemContent.includes(itemColor)){
      itemSelection = ('#container li:nth-child(' + counter1 + ')');
      presentInChild = true;
      }
    }
  };

  await page.click(itemSelection)
  await page.waitForSelector('#details');
  let $elemHandler = await page.$('#s');
  let properties = await $elemHandler.getProperties();
  for (const property of properties.values()) {
    const element = property.asElement();
    if (element) {
      let hText = await element.getProperty("text");
      let text = await hText.jsonValue();
      if (text === `${itemSize2}`) {
        let hValue = await element.getProperty("value");
        let value = await hValue.jsonValue();
        await page.select("select#s", value); // or use 58730
        console.log(`Selected ${text} which is value ${value}.`);
      }
    }
  }
  
  
  await page.click('input[name = "commit"]')
  await clutter.delay(3000)
  await page.goto(CHECKOUT);
  await page.type('#order_billing_name', name2)
  // await page.$eval('input[id="order_billing_name"]', el => el.value = 'Test Testerson')

  await page.type('#order_email', email2)

  await page.type('#order_tel', telephone2)

  await page.type('#bo', address2)

  await page.type('#order_billing_zip', zipcode2)

  await page.type('#order_billing_city', city2)

  // let $elemHandler2 = await page.$('#s');
  // let properties = await $elemHandler2.getProperties();
  // for (const property of properties.values()) {
  //   const element = property.asElement();
  //   if (element) {
  //     let hText = await element.getProperty("text");
  //     let text = await hText.jsonValue();
  //     if (text === `${itemSize2}`) {
  //       let hValue = await element.getProperty("value");
  //       let value = await hValue.jsonValue();
  //       await page.select("select#s", value); // or use 58730
  //       console.log(`Selected ${text} which is value ${value}.`);
  //     }
  //   }
  // }

  await page.type('#cnb', cc2)

  await page.select('#credit_card_month', ccMonth2)

  await page.select('#credit_card_year', ccYear2)

  await page.type('#vval', CVV2)

  await page.click("#order_terms")

  await page.click('.checkout')
  await page.click('.checkout')
  })()
}


function tester(BASE_URL, CHECKOUT, item, name, email, telephone, address, zipcode, city, cc, ccMonth, ccYear, CVV){async () => {

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false 
  });

  const page = await browser.newPage();

  await page.goto(BASE_URL);

  let itemSelection = await page.$x(`//a[contains(text(), "${item}")]`)

  await itemSelection[0].click();

  await page.waitFor(700)

  // await page.click(`a[data-style-name = "${itemColor}"]`)

  await page.click('input[name = "commit"]')

  await page.waitFor(700)

  await page.goto(CHECKOUT);

  await page.type('input[id="order_billing_name"]', name)

  await page.type('input[id="order_email"]', email)

  await page.type('input[id="order_tel"]', telephone)

  await page.type('input[id="bo"]', address)

  await page.type('input[id="order_billing_zip"]', zipcode)

  await page.type('input[id="order_billing_city"]', city)

  await page.type('input[id="nnaerb"]', cc)

  await page.select('select#credit_card_month', ccMonth)

  await page.select('select#credit_card_year', ccYear)

  await page.type('input[id="orcer"]', CVV)

  await page.click("#order_terms")

  // await page.click('input[name = "commit"]')

  }
}

module.exports.accessoryBot1 = accessoryBot1;
module.exports.accessoryBot2 = accessoryBot2;
module.exports.botWithSize1 = botWithSize1;
module.exports.botWithSize2 = botWithSize2;
module.exports.tester = tester;