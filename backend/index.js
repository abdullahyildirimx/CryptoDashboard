"use strict"

const express = require("express")
const app = express()

let priceData = []
let activityData = []

const url = "https://api.binance.com/api/v3/ticker/24hr"

const coinListDelta = 3600000
const activityDelta = 10000
const purgeControlDelta = 3600000
const purgeDelta = 86400000

const bigcoinTriggerLow = 0.99
const bigcoinTriggerHigh = 1.01
const altcoinTriggerLow = 0.97
const altcoinTriggerHigh = 1.03
const bigCoinList = ["BTC", "ETH", "USDT"]

const fetchCoinList = async () => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const jsonData = await response.json()

    const filteredCoins = jsonData.filter((coin) => {
      return (coin.symbol.endsWith("USDT") || coin.symbol === "USDTTRY") && coin.bidPrice !== "0.00000000"
    })

    const coinSymbolList = filteredCoins
      .map((item) => {
        let symbol = item.symbol
        if (symbol !== "USDTTRY") {
          symbol = symbol.slice(0, -"USDT".length)
        } else {
          symbol = symbol.slice(0, -"TRY".length)
        }
        return symbol
      })
      .slice()
      .sort((a, b) => {
        return a.localeCompare(b)
      })

    priceData = coinSymbolList.map((item) => {
      const data = priceData?.find((coin) => coin.symbol === item)?.data || Array(30).fill(0)
      return {
        symbol: item,
        data: data,
      }
    })
  } 
  catch (err) {
  }
}

const fetchMarketActivity = async () => {
  try {
    if (!priceData) {
      return
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const jsonData = await response.json()

    const filteredCoins = jsonData.filter((coin) => {
      return (coin.symbol.endsWith("USDT") || coin.symbol === "USDTTRY") && coin.bidPrice !== "0.00000000"
    })

    const prices = filteredCoins.map((item) => {
      let symbol = item.symbol
      const price = parseFloat(item.lastPrice)
      if (symbol !== "USDTTRY") {
        symbol = symbol.slice(0, -"USDT".length)
      } else {
        symbol = symbol.slice(0, -"TRY".length)
      }
      return {
        symbol: symbol,
        price: price,
      }
    })
    let resultArray = []
    const newPriceData = priceData.slice()
    newPriceData.forEach((coin, i) => {
      const currentCoinData = prices.find((item) => item.symbol === coin.symbol)
      if (!currentCoinData) {
        return
      }
      const currentPrice = parseFloat(currentCoinData.price)
      for (let k = 0; k < newPriceData[i]["data"].length; k++) {
        const prevPrice = newPriceData[i]["data"][k]
        if (prevPrice !== 0) {
          const rate = currentPrice / prevPrice
          const currentTime = new Date().getTime()
          if ((bigCoinList.includes(coin.symbol) && (rate <= bigcoinTriggerLow || rate >= bigcoinTriggerHigh)) || rate <= altcoinTriggerLow || rate >= altcoinTriggerHigh) {
            let result = {
              symbol: coin.symbol,
              oldPrice: prevPrice,
              newPrice: currentPrice,
              change: parseFloat(((rate - 1) * 100).toFixed(2)),
              time: currentTime,
            }
            resultArray.push(result)
            newPriceData[i]["data"] = Array(30).fill(0)
            break
          }
        }
      }
      newPriceData[i]["data"].shift()
      newPriceData[i]["data"].push(currentPrice)
    })
    if (resultArray.length > 0) {
      activityData = [...resultArray, ...activityData]
    }
    priceData = newPriceData
  } 
  catch (err) {
  }
}

const purgeData = () => {
  const currentTime = new Date().getTime()
  activityData = activityData.filter((activity) => {
    return activity.time > currentTime - purgeDelta
  })
}

fetchCoinList()
setInterval(fetchCoinList, coinListDelta)
setInterval(fetchMarketActivity, activityDelta)
setInterval(purgeData, purgeControlDelta)

app.get("/api", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "*")
  res.status(200).send(activityData)
})

app.listen(5000, function () {
})
