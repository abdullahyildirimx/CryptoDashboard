export const spotPriceUrl = 'https://api.binance.com/api/v3/ticker/24hr'
export const coinListUrl = 'https://api.binance.com/api/v3/exchangeInfo'
export const balancesUrl = 'https://api.binance.com/api/v3/account'
export const orderUrl = 'https://api.binance.com/api/v3/order'
export const coinLogosUrl = 'https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list'
export const marketActivityUrl = 'https://api.cryptodashboards.xyz/api'
export const getLogoLink = (number) => {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${number}.png`;
}