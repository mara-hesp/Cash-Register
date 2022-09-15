// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
// cid is a 2D array listing available currency.
// The checkCashRegister() function should always return an object with a status key and a change key.
// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

function checkCashRegister(price, cash, cid) {
  let change = (cash - price) * 100
  const origChange = change
  let result = {status: '', change: []}
  cid.reverse();
  let totalCashInDrawer = (cid.map(obj => parseFloat(obj.filter(obj => typeof obj === 'number'))).reduce((a, b) => a + b).toFixed(2)) * 100

let curr = [
    ["ONE HUNDRED", 100], 
    ["TWENTY", 20], 
    ["TEN", 10], 
    ["FIVE", 5], 
    ["ONE", 1], 
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
    ]


  let cidArr = []
  let currArr = []

    for (let i = 0; i < curr.length; i++) {
      if (origChange / (curr[i][1] * 100) >= 1) {
        cid[i][1] = Math.round(cid[i][1] * 100)
        curr[i][1] = Math.round(curr[i][1] * 100)
        cidArr.push(cid[i])
        currArr.push(curr[i])
      }
    }

  let total = change
  let totalArr = []

while (total >= 1) {
  for (let i = 0; i < cidArr.length; i++) {
    let quantity = Math.floor(total / currArr[i][1])
    let maybe = currArr[i][1] * quantity
      if (cidArr[i][1] < maybe) {
        totalArr.push(cidArr[i])
        total -= cidArr[i][1]
      } else {
        cidArr[i][1] = maybe
        totalArr.push(cidArr[i])
        total -= maybe
      }
    }
  }

    let returnArr = []

    for (let i = 0; i < totalArr.length; i++) {
      if (totalArr[i][1] === parseInt(totalArr[i][1].toFixed())) {
        totalArr[i][1] = totalArr[i][1] / 100
        returnArr.push(totalArr[i])
      }
    }

  let totalCash = (returnArr.map(obj => parseFloat(obj.filter(obj => typeof obj === 'number'))).reduce((a, b) => a + b).toFixed(2)) * 100

if (origChange == totalCashInDrawer) {
    result.status = 'CLOSED'
    result.change = cid.reverse()
    return result
  } else if (origChange > totalCashInDrawer || origChange > totalCash) {
    result.status = 'INSUFFICIENT_FUNDS'
    return result
  } else {
    let resultArr = []
      for (let i = 0; i < returnArr.length; i++) {
        if(returnArr[i][1] > 0) {
          resultArr.push(returnArr[i])
        }
      }
      result.status = 'OPEN'
      result.change = resultArr
    return result
  }

}
