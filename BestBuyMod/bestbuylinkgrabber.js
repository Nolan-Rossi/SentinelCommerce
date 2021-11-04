const SKU = 6426149;
const mainurl = "https://www.bestbuy.com/site/~/"
function t2 (SKU){
    const url = "https://www.bestbuy.com/site/~/" + SKU + ".p?skuId=" + SKU;
    return url;
}
console.log(t2(SKU));