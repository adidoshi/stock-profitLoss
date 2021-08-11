const purchasePriceInp = document.querySelector('#purchase-price');
const stockQuantityInp = document.querySelector('#stock-quantity');
const currentPriceInp = document.querySelector('#current-price');
const main = document.querySelector('.main');

const btnCheck = document.querySelector('#btn-check');
const message = document.querySelector('.message');

const output = document.querySelector(".output");

btnCheck.addEventListener('click', checkProfitLoss);

function checkProfitLoss(e) {

    let stockQuantity = stockQuantityInp.value;
    let purchasePrice = purchasePriceInp.value;
    let stockPrice = currentPriceInp.value;

    if(properValues(stockQuantity, purchasePrice, stockPrice)) {
        stockQuantity = Number(stockQuantity);
        purchasePrice = Number(purchasePrice);
        stockPrice = Number(stockPrice);

        const priceDifference = (Math.abs(purchasePrice - stockPrice)).toFixed(2);
        const profitLoss = (priceDifference*stockQuantity).toFixed(2);
        const profitLossPercentage = ((priceDifference*100) / purchasePrice).toFixed(2);

        if(purchasePrice > stockPrice) {
            message.className = "message loss";
            message.innerHTML = `You lost <span style="color:black">${profitLossPercentage}%</span>. Your total net loss is: ₹<span style="color:black">${profitLoss}</span>`;

            if(profitLossPercentage > 50) {
                changeTheme('loss-theme');
            }
            else {
                changeTheme('loss-bg-theme');
            }
        }
        else if(purchasePrice < stockPrice) {
            message.className = "message profit";
            message.innerHTML = `You gained <span style="color:black">${profitLossPercentage}%</span>. Your total net profit is: ₹<span style="color:black">${profitLoss}</span>`;

            if(profitLossPercentage > 50) {
                changeTheme('profit-theme');
            }
            else {
                changeTheme('profit-bg-theme');
            }
        }
        else {
            changeTheme('gain-loss-theme');
            message.className = "message no-gain-loss";
            message.innerHTML = `You gained 0%.<br/>Your profit is: 0/ stock. Total profit is: 0`;
        }
    }
}

function properValues(stockQuantity, purchasePrice, stockPrice) {
    if(purchasePrice === "" || stockQuantity === "" || stockPrice === "") {
        message.className = "message error";
        message.innerText = 'Please enter all the values';
        return false;
    }

    else if(Number.parseInt(stockQuantity) <=0 || Number.parseInt(purchasePrice) <= 0 || Number.parseInt(stockPrice) <= 0) {
        message.className = "message error";
        message.innerText = 'Please enter values greater than 0';
        return false;
    }

    return true;
}

function changeTheme(theme) {
    main.classList.remove('profit-theme');
    main.classList.remove('gain-loss-theme');
    main.classList.remove('loss-theme');
    output.classList.remove('profit-bg-theme');
    output.classList.remove('loss-bg-theme');

    main.classList.add(theme);
    output.classList.add(theme);
}

const getPrice = document.querySelector("#fetch-btn");
const price = document.querySelector(".price");
const stockName = document.querySelector("#stockName");

let serverURL = "https://www.alphavantage.co/query";

getPrice.addEventListener("click", funcbtn);

function stockInput(text) {
    return serverURL + "?" + "function=GLOBAL_QUOTE&symbol=" + text + ".BSE&apikey=DFFAFY0C7Y2BGWAW";
}

function funcbtn() {
    let input = (stockName.value).toUpperCase();
    fetch(stockInput(input))
        .then((response) => response.json())
        .then((data) => {
            //   console.log(data);
            price.style.display = "block";
            price.innerText = `LTP: ${data["Global Quote"]["08. previous close"]}`;

        })
        .catch((error) => console.log("error occured " + error));
}