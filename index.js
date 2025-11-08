import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import getCurrency1 from "./arsData/getCurrency1.js";
import getCurrency2 from "./arsData/getCurrency2.js";
import getCurrency3 from "./arsData/getCurrency3.js";
import  getAllAverage  from "./getAllAverage.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.send(__dirname + "/index.html");
});

export async function getAllQuotes() {
  const arsSource1 = await getCurrency1("ARS");
  const arsSource2 = await getCurrency2("ARS");
  const arsSource3 = await getCurrency3("ARS");

  const brlSource1 = await getCurrency1("BRL");
  const brlSource2 = await getCurrency2("BRL");
  const brlSource3 = await getCurrency3("BRL");
  return {
    ARS: [arsSource1, arsSource2, arsSource3],
    BRL: [brlSource1, brlSource2, brlSource3],
  };
}
app.get("/quotes", async (req, res) => {
  const response = await getAllQuotes();
  console.log(response);
  res.json(response);
});

app.get("/average", async (req, res) => {
 const response = await getAllAverage()


res.json(
 response
)
});

app.get("/slippage", async (req,res)=>{
    const responseAllAvg = await getAllAverage()
    const responseAllQuote = await getAllQuotes()

    let arsSlippageArr = []
    for(let i = 0; i < responseAllQuote.ARS.length; i ++){
        const buyPriceSlippage = ((parseFloat(responseAllQuote.ARS[i]["buy-price"]) - responseAllAvg.ARS.average_buy_price) / responseAllAvg.ARS.average_buy_price) * 100;
        const sellPriceSlippage = ((parseFloat(responseAllQuote.ARS[i]["sell-price"]) - responseAllAvg.ARS.average_sell_price) / responseAllAvg.ARS.average_sell_price) * 100;
        
        arsSlippageArr.push({
            "buy_price_slippage": parseFloat(buyPriceSlippage.toFixed(2)),
            "sell_price_slippage": parseFloat(sellPriceSlippage.toFixed(2)),
            "source": responseAllQuote.ARS[i].source
        });
    }
    let brlSlippageArr = []
    for(let i = 0; i < responseAllQuote.BRL.length; i ++){
        const buyPriceSlippage = ((parseFloat(responseAllQuote.BRL[i]["buy-price"]) - responseAllAvg.BRL.average_buy_price) / responseAllAvg.BRL.average_buy_price) * 100;
        const sellPriceSlippage = ((parseFloat(responseAllQuote.BRL[i]["sell-price"]) - responseAllAvg.BRL.average_sell_price) / responseAllAvg.BRL.average_sell_price) * 100;
        
        brlSlippageArr.push({
            "buy_price_slippage": parseFloat(buyPriceSlippage.toFixed(2)),
            "sell_price_slippage": parseFloat(sellPriceSlippage.toFixed(2)),
            "source": responseAllQuote.BRL[i].source
        });
    }

    res.json({
        ARS: arsSlippageArr,
        BRL: brlSlippageArr
    });
    

})


app.listen(PORT, (req, res) => {
  console.log(`Server listening on port : ${PORT}`);
});
