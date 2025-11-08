import { get } from "http";

function getBuyPrice(currentPrice){
    const spread = 0.03;    //deciding 3% to be the spread to settle to a selling price
    const bp = (currentPrice * (1 + spread / 2)).toFixed(2);
    return bp
}

export default getBuyPrice