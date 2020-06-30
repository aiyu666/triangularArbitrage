const request = require('./lib/request');
let preTime = new Date()
setInterval(async () => {
    const nowTime = new Date();
    const BTC_USDT = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/btc_usdt' })
    const ETH_USDT = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/eth_usdt' })
    const ETH_BTC = await request.getRequest({ url: 'https://api.bitopro.com/v3/order-book/eth_btc' })
    if (BTC_USDT.statusCode === 200 && ETH_USDT.statusCode === 200 && ETH_BTC.statusCode === 200) {
        const BTC_USDT_Asks = JSON.parse(BTC_USDT.body).asks[0].price;
        const ETH_USDT_Bids = JSON.parse(ETH_USDT.body).asks[0].price;
        const ETH_BTC_Asks = JSON.parse(ETH_BTC.body).asks[0].price
        console.log(`BTC_USDT_Asks: ${BTC_USDT_Asks}, ETH_USDT_Bids: ${ETH_USDT_Bids}, ETH_BTC_Asks: ${ETH_BTC_Asks}`)
        console.log(`Cost ${ETH_USDT_Bids} USDT -> 1 ETH -> ${ETH_BTC_Asks} BTC -> ${ETH_BTC_Asks * BTC_USDT_Asks} USDT `)
        console.log(`Make money: ${ETH_BTC_Asks * BTC_USDT_Asks - ETH_USDT_Bids}USDT, ${((BTC_USDT_Asks * ETH_BTC_Asks - ETH_USDT_Bids) / ETH_USDT_Bids * 100).toFixed(3)}%`)
        console.log(`Spend time: ${nowTime - preTime}`)
        console.log('-----------------------------------')
        preTime = nowTime;
    }
}, 1000)