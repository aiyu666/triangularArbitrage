const request = require('./lib/request');
let preTime = new Date()
setInterval(async () => {
    const nowTime = new Date();
    const btcUSDT = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/btc_usdt' })
    const ethUSDT = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/eth_usdt' })
    const ethBTC = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/eth_btc' })
    if (btcUSDT.statusCode === 200 && ethUSDT.statusCode === 200 && ethBTC.statusCode === 200) {
        const btcUSDT_asks = JSON.parse(btcUSDT.body).asks[0].price;
        const btcUSDT_bids = JSON.parse(btcUSDT.body).bids[0].price;
        const ethUSDT_asks = JSON.parse(ethUSDT.body).asks[0].price;
        const ethBTC_bids = JSON.parse(ethBTC.body).asks[0].price
        console.log(`btcUSDT_asks: ${btcUSDT_asks}, btcUSDT_bids: ${btcUSDT_bids}, ethUSDT_asks: ${ethUSDT_asks}, ethBTC_bids: ${ethBTC_bids}`)
        console.log(`Cost ${ethUSDT_asks} USDT -> 1 ETH, 1 ETH -> ${ethBTC_bids} BTC , ${ethBTC_bids} BTC -> ${btcUSDT_asks * ethBTC_bids} USDT `)
        console.log(`Make money: ${btcUSDT_asks * ethBTC_bids - ethUSDT_asks}`)
        console.log(`Spend time: ${nowTime - preTime}`)
        console.log('-----------------------------------')
        preTime = nowTime;
    }
}, 1000)