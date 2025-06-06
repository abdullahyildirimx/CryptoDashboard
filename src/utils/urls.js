export const spotPriceUrl = 'https://api.binance.com/api/v3/ticker/24hr'
export const futuresPriceUrl = 'https://fapi.binance.com/fapi/v1/ticker/24hr'
export const spotExchangeInfoUrl = 'https://api.binance.com/api/v3/exchangeInfo'
export const futuresExchangeInfoUrl = 'https://fapi.binance.com/fapi/v1/exchangeInfo'
export const balancesUrl = 'https://api.binance.com/api/v3/account'
export const orderUrl = 'https://api.binance.com/api/v3/order'
export const spotCoinLogosUrl = 'https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list'
export const futuresCoinLogosUrl = 'https://www.binance.com/bapi/asset/v1/public/asset/asset/get-asset-logo'
export const spotMarketActivityUrl = 'https://api.cryptodashboard.tech/spot'
export const futuresMarketActivityUrl = 'https://api.cryptodashboard.tech/futures'
export const getLogoLink = (number) => {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${number}.png`;
}