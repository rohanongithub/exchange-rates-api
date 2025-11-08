// gets currency from source 3

import getBuyPrice from "../getBuyPrice.js";
import getSellPrice from "../getSellPrice.js";
import { configDotenv } from "dotenv";

async function getCurrency3(target_currency) {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/` +
      process.env.GET_CURRENCY_1_API +
      `/latest/USD`
  );
  const data = await response.json();
  const currentRateARS = parseFloat(data.conversion_rates[target_currency]);

  const buyPrice = getBuyPrice(currentRateARS);
  const sellPrice = getSellPrice(currentRateARS);
  return {
    "base-currency": "USD",
    "target-currency": target_currency,
    "current-rate": currentRateARS,
    "buy-price": parseFloat(buyPrice) - 0.12,
    "sell-price": parseFloat(sellPrice) + 0.12,
    source: "https://api.exchangerate.host",
  };
}

export default getCurrency3;
