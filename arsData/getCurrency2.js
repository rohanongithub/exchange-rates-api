import getBuyPrice from "../getBuyPrice.js"
import getSellPrice from "../getSellPrice.js";
import { configDotenv } from "dotenv";

// gets currency from source 2
async function getCurrency2(target_currency) {
 
    const response = await fetch(
      `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=` + `d506d542a4b84ebbbf10b1490fa1ace9`
    );
    const data = await response.json();
    const currentRateARS = parseFloat(data.rates[target_currency]);
    const buyPrice = getBuyPrice(currentRateARS);
    const sellPrice = getSellPrice(currentRateARS);
    return {
      "base-currency": "USD",
      "target-currency": target_currency,
      "current-rate": currentRateARS,
      "buy-price": buyPrice,
      "sell-price": sellPrice,
      source: "https://api.currencyfreaks.com",
    };
  }
  
export default getCurrency2