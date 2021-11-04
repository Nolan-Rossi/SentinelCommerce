function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  
// function elementExists(field) {
//   let producttype;
//   if (true) {
//     console.log('its here');
//     producttype = 'hi'
//   } else {
//     console.log('its not here');
//     producttype = '';
//   }
// }

module.exports = {delay};