const tcheckout = require("./TargetMod/tcheckout");
const stask = require("./SupremeMod/stask")
const clutter = require("./clutter");
//test lego helicopter TCIN:80130379
//ps5 TCIN: 81114595
//lego flowers: 80130340

const tusername = 'abc@gmail.com'
const tpassword = 'Password1'

tcheckout.tMainTask(1, 16747574, 'ship', 0, tusername, tpassword);
//tcheckout.tMainTask(2, 16747574, 'ship', 0, tusername, tpassword);
//tcheckout.tMainTask(3, 80130340, 'ship', 0, tusername, tpassword);
//tcheckout.tMainTask(4, 80130340, 'ship', 0, tusername, tpassword);

// const BASE_URL = 'https://www.supremenewyork.com/shop/all/accessories'
// const BASE_URL = 'https://www.supremenewyork.com/shop/all/t-shirts'
// const CHECKOUT = 'https://www.supremenewyork.com/checkout'
// const BASE_URL1 = 'https://www.supremenewyork.com/shop/all/accessories'

// const itemList = "Fronts Keychain";
// const itemList1 = 'Anna'
// const itemColor = 'Red'
// const itemSize = 'Large'

// const item = 'Anna'
//  const firstCard = {
    // name: 'bob bobby',
    // email: "abc@gmail.com",
    // telephone: "1234567890",
    // address: '123 abc street',
    // zipcode: '12345',
    // city: 'thecity',
    // cc: '111111111111111',
    // ccMonth: '01',
    // ccYear: '2026',
    // CVV: '123'
//  }
// stask.botWithSize2(firstCard, BASE_URL, CHECKOUT, item, itemSize, itemColor);