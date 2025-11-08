import { getAllQuotes } from "./index.js";

export default async function getAllAverage(){

const allData = await getAllQuotes();

console.log(allData.ARS);

//for ars avg values
let sum_bp = 0;
let sum_sp = 0;

for (let i = 0; i < allData.ARS.length; i++) {
  sum_bp += parseFloat(allData.ARS[i]["buy-price"]);
  sum_sp += parseFloat(allData.ARS[i]["sell-price"]);
}

const average_buy_price_ARS = sum_bp / allData.ARS.length;
const average_sell_price_ARS = sum_sp / allData.ARS.length;

console.log(average_buy_price_ARS);
console.log(average_sell_price_ARS);


//for brl avg values
let sum_bp_brl = 0;
let sum_sp_brl = 0;

for (let i = 0; i < allData.ARS.length; i++) {
sum_bp_brl += parseFloat(allData.BRL[i]["buy-price"]);
sum_sp_brl += parseFloat(allData.BRL[i]["sell-price"]);
}

const average_buy_price_BRL = sum_bp_brl / allData.BRL.length;
const average_sell_price_BRL = sum_sp_brl / allData.BRL.length;

console.log(average_buy_price_BRL);
console.log(average_sell_price_BRL);

return {
    ARS : {
        "average_buy_price" : average_buy_price_ARS,
        "average_sell_price" : average_sell_price_ARS
    },
    BRL : {
        "average_buy_price" : average_buy_price_BRL,
        "average_sell_price" : average_sell_price_BRL
    }
}

}