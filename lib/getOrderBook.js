const request = require('./request');
let preTime = new Date()
const timmerInterval = 500;
let chance = 0;

function binance() {
    const host = 'https://api.binance.com'
    setInterval(async () => {
        const nowTime = new Date();
        const BTC_USDT_LAST = await request.getRequest({ url: `${host}/api/v3/trades?symbol=BTCUSDT&limit=1` })
        const BTC_USDT = await request.getRequest({ url: `${host}/api/v3/depth?symbol=BTCUSDT` })
        const ETH_USDT_LAST = await request.getRequest({ url: `${host}/api/v3/trades?symbol=ETHUSDT&limit=1` })
        const ETH_USDT = await request.getRequest({ url: `${host}/api/v3/depth?symbol=ETHUSDT` })
        const ETH_BTC_LAST = await request.getRequest({ url: `${host}/api/v3/trades?symbol=ETHBTC&limit=1` })
        const ETH_BTC = await request.getRequest({ url: `${host}/api/v3/depth?symbol=ETHBTC` })
        if (BTC_USDT.statusCode === 200 && ETH_USDT.statusCode === 200 && ETH_BTC.statusCode === 200) {
            const BTC_USDT_Bids = JSON.parse(BTC_USDT.body).bids[0][0];
            const BTC_USDT_Asks = JSON.parse(BTC_USDT.body).asks[0][0];
            const ETH_USDT_Bids = JSON.parse(ETH_USDT.body).bids[0][0];
            const ETH_USDT_Asks = JSON.parse(ETH_USDT.body).asks[0][0];
            const ETH_BTC_Bids = JSON.parse(ETH_BTC.body).bids[0][0];
            const ETH_BTC_Asks = JSON.parse(ETH_BTC.body).asks[0][0];
            console.log(``)
            console.log('-----------------------------------------------------------------------------------')
            console.log(`BTC_USDT_Bids: ${BTC_USDT_Bids}, ETH_USDT_Bids: ${ETH_USDT_Bids}, ETH_BTC_Bids: ${ETH_BTC_Bids}`);
            console.log(`BTC_USDT_Asks: ${BTC_USDT_Asks}, ETH_USDT_Asks: ${ETH_USDT_Asks}, ETH_BTC_Asks: ${ETH_BTC_Asks}`);
            console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
            console.log(`Cost ${ETH_USDT_Asks} USDT -> 1 ETH -> ${ETH_BTC_Bids} BTC -> ${ETH_BTC_Bids * BTC_USDT_Bids} USDT `);
            console.log(`Profit and loss: ${(ETH_BTC_Bids * BTC_USDT_Bids - ETH_USDT_Asks).toFixed(8)} USDT, ${((BTC_USDT_Bids * ETH_BTC_Bids - ETH_USDT_Asks) / ETH_USDT_Asks * 100).toFixed(5)}%`);
            (ETH_USDT_Asks / BTC_USDT_Bids < ETH_BTC_Bids) ? console.log('套！') : console.log('套不得！');
            if (ETH_USDT_Asks / BTC_USDT_Bids < ETH_BTC_Bids) chance += 1;
            console.log(`...................................................................................`);
            console.log(`Cost ${BTC_USDT_Asks} USDT -> 1 BTC -> ${1 / ETH_BTC_Asks} ETH -> ${1 / ETH_BTC_Asks * ETH_USDT_Bids} USDT `);
            console.log(`Profit and loss: ${((1 / ETH_BTC_Asks * ETH_USDT_Bids) - BTC_USDT_Asks).toFixed(8)} USDT, ${(((1 / ETH_BTC_Asks * ETH_USDT_Bids) - BTC_USDT_Asks) / BTC_USDT_Asks * 100).toFixed(5)}%`);
            (ETH_USDT_Bids / BTC_USDT_Asks > ETH_BTC_Asks) ? console.log('套！') : console.log('套不得！');
            if (ETH_USDT_Bids / BTC_USDT_Asks > ETH_BTC_Asks) chance += 1;
            console.log(`Spend time: ${nowTime - preTime}`);
            console.log(`total chance: ${chance}`);
            console.log('-----------------------------------------------------------------------------------')
            preTime = nowTime;
        }
    }, timmerInterval)
}

function bitopro() {
    const host = 'https://api.bitopro.com'
    setInterval(async () => {
        const nowTime = new Date();
        const BTC_USDT = await request.getRequest({ url: `${host}/v3/order-book/btc_usdt` })
        const ETH_USDT = await request.getRequest({ url: `${host}/v3/order-book/eth_usdt` })
        const ETH_BTC = await request.getRequest({ url: `${host}/v3/order-book/eth_btc` })
        if (BTC_USDT.statusCode === 200 && ETH_USDT.statusCode === 200 && ETH_BTC.statusCode === 200) {
            const BTC_USDT_Bids = JSON.parse(BTC_USDT.body).bids[0].price;
            const BTC_USDT_Asks = JSON.parse(BTC_USDT.body).asks[0].price;
            const ETH_USDT_Bids = JSON.parse(ETH_USDT.body).bids[0].price;
            const ETH_USDT_Asks = JSON.parse(ETH_USDT.body).asks[0].price;
            const ETH_BTC_Bids = JSON.parse(ETH_BTC.body).bids[0].price
            const ETH_BTC_Asks = JSON.parse(ETH_BTC.body).asks[0].price
            console.log(``)
            console.log('-----------------------------------------------------------------------------------')
            console.log(`BTC_USDT_Bids: ${BTC_USDT_Bids}, ETH_USDT_Bids: ${ETH_USDT_Bids}, ETH_BTC_Bids: ${ETH_BTC_Bids}`);
            console.log(`BTC_USDT_Asks: ${BTC_USDT_Asks}, ETH_USDT_Asks: ${ETH_USDT_Asks}, ETH_BTC_Asks: ${ETH_BTC_Asks}`);
            console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
            console.log(`Cost ${ETH_USDT_Asks} USDT -> 1 ETH -> ${ETH_BTC_Bids} BTC -> ${ETH_BTC_Bids * BTC_USDT_Bids} USDT `);
            console.log(`Profit and loss: ${(ETH_BTC_Bids * BTC_USDT_Bids - ETH_USDT_Asks).toFixed(8)} USDT, ${((BTC_USDT_Bids * ETH_BTC_Bids - ETH_USDT_Asks) / ETH_USDT_Asks * 100).toFixed(5)}%`);
            (ETH_USDT_Asks / BTC_USDT_Bids < ETH_BTC_Bids) ? console.log('套！') : console.log('套不得！');
            if (ETH_USDT_Asks / BTC_USDT_Bids < ETH_BTC_Bids) chance += 1;
            console.log(`...................................................................................`);
            console.log(`Cost ${BTC_USDT_Asks} USDT -> 1 BTC -> ${1 / ETH_BTC_Asks} ETH -> ${1 / ETH_BTC_Asks * ETH_USDT_Bids} USDT `);
            console.log(`Profit and loss: ${((1 / ETH_BTC_Asks * ETH_USDT_Bids) - BTC_USDT_Asks).toFixed(8)} USDT, ${(((1 / ETH_BTC_Asks * ETH_USDT_Bids) - BTC_USDT_Asks) / BTC_USDT_Asks * 100).toFixed(5)}%`);
            (ETH_USDT_Bids / BTC_USDT_Asks > ETH_BTC_Asks) ? console.log('套！') : console.log('套不得！');
            if ((((1 / ETH_BTC_Asks * ETH_USDT_Bids) - BTC_USDT_Asks) / BTC_USDT_Asks * 100).toFixed(5) > 0.2) chance += 1;
            console.log(`Spend time: ${nowTime - preTime}`);
            console.log(`total chance: ${chance}`);
            console.log('-----------------------------------------------------------------------------------')
            preTime = nowTime;
        }
    }, timmerInterval)
}

module.exports = {
    binance,
    bitopro
}