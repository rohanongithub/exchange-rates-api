import getBuyPrice from "../getBuyPrice.js"
import getSellPrice from "../getSellPrice.js";
import dotenv from "dotenv";
dotenv.config();

async function getCurrency1(target_currency) {

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/` + process.env.GET_CURRENCY_1_API +`/latest/USD`
    );
    const data = await response.json();
    const currentRateARS = data.conversion_rates[target_currency]
    const buyPrice = getBuyPrice(currentRateARS);
    const sellPrice = getSellPrice(currentRateARS);
    return {
      "base-currency": "USD",
      "target-currency": target_currency,
      "current-rate": currentRateARS,
      "buy-price": buyPrice,
      "sell-price": sellPrice,
      source: "https://v6.exchangerate-api.com",
    };
  }

export default getCurrency1