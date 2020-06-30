const request = require('./lib/request');
let preTime = new Date()
setInterval(async () => {
    const nowTime = new Date();
    const BTC_USDT = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/btc_usdt' })
    const ETH_USDT = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/eth_usdt' })
    const ETH_BTC = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/eth_btc' })
    if (BTC_USDT.statusCode === 200 && ETH_USDT.statusCode === 200 && ETH_BTC.statusCode === 200) {
        const BTC_USDT_Bids = JSON.parse(BTC_USDT.body).bids[0].price;
        const ETH_USDT_Asks = JSON.parse(ETH_USDT.body).asks[0].price;
        const ETH_BTC_Bids = JSON.parse(ETH_BTC.body).bids[0].price
        console.log(`BTC_USDT_Bids: ${BTC_USDT_Bids}, ETH_USDT_Asks: ${ETH_USDT_Asks}, ETH_BTC_Bids: ${ETH_BTC_Bids}`)
        console.log(`Cost ${ETH_USDT_Asks} USDT -> 1 ETH -> ${ETH_BTC_Bids} BTC -> ${ETH_BTC_Bids * BTC_USDT_Bids} USDT `)
        console.log(`Make money: ${ETH_BTC_Bids * BTC_USDT_Bids - ETH_USDT_Asks}USDT, ${((BTC_USDT_Bids * ETH_BTC_Bids - ETH_USDT_Asks) / ETH_USDT_Asks * 100).toFixed(3)}%`)
        console.log(`Spend time: ${nowTime - preTime}`)
        console.log('-----------------------------------')
        preTime = nowTime;
    }
}, 1000)