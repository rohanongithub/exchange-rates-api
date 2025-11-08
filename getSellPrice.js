function getSellPrice(currentPrice){
    const spread = 0.03;    //deciding 3% to be the spread to settle to a selling price
    const sp = (currentPrice * (1 - spread / 2)).toFixed(2);
    return sp
}

export default getSellPrice