function linkgrabber(SKU, footsite) {
    var sitelink = "https://www." + footsite + ".com/product/~/" + SKU + ".html";
    return sitelink;
}
console.log(linkgrabber("C9326400", "footlocker"));