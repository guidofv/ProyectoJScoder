let foreignCurrencyIn;
let foreignCurrencyOut;
let chosenForeignCurrency;
let transactionType;
let thisTransaction = { currency: "", transaction: "" };
let currencyTypes = [];
const foreignCurrencies = [];
class ForeignCurrency {
    constructor(type, exchangeRateBuy, exchangeRateSell) {
        this.type = type,
        this.exchangeRateBuy = Number(exchangeRateBuy),
        this.exchangeRateSell = Number(exchangeRateSell);
    }
};
const currency1 = new ForeignCurrency('USD', 141, 149);
const currency2 = new ForeignCurrency('EUR', 142, 150);
const currency3 = new ForeignCurrency('BRL', 25.20, 29.20);
foreignCurrencies.push(currency1, currency2, currency3);
chosenForeignCurrency = document.getElementById('chosen-foreign-currency');
chosenForeignCurrency.addEventListener('change', () => { chosenForeignCurrency.value });
transactionType = document.getElementById('transaction-type');
transactionType.addEventListener('change', () => { transactionType.value });
foreignCurrencies.forEach(currency => {
    let currencyOption = document.createElement('option');
    currencyOption.innerHTML = currency.type;
    chosenForeignCurrency.appendChild(currencyOption);
})
for (const currency of foreignCurrencies) {
    currencyTypes.push(currency.type);
}
function localCurrencyIn(exchangeRateSell, foreignCurrencyOut) {
    return localCurrencyIn = exchangeRateSell * foreignCurrencyOut;
}
function impuestoPais(localCurrencyIn) {
    return impuestoPais = localCurrencyIn * 0.35;
}
function retGanancias(localCurrencyIn) {
    return retGanancias = localCurrencyIn * 0.30;
}
function localCurrencyInFinal(localCurrencyIn, impuestoPais, retGanancias) {
    return localCurrencyInFinal = Number(localCurrencyIn + impuestoPais + retGanancias);
}
function localCurrencyOut(exchangeRateBuy, foreignCurrencyIn) {
    return localCurrencyOut = exchangeRateBuy * foreignCurrencyIn;
}
let transactionDesc = document.getElementById('transaction-desc');
let calculateContainer = document.getElementById('calculate-container');
let moneyIn = document.getElementById('money-in');
let moneyOut = document.getElementById('money-out');
let calculateMoneyIn
let continueButton = document.getElementById('continue');
continueButton.addEventListener('click', () => {
    updateTransaction();
    continueButton.remove();
    chosenForeignCurrency.remove();
    transactionType.remove();
});
let updateTransaction = () => {
    thisTransaction.currency = foreignCurrencies.find(currency => currency.type === chosenForeignCurrency.value);
    thisTransaction.transaction = transactionType.value;
    switch (thisTransaction.transaction) {
        case 'Buy':
            transactionDesc.innerText = `Actualmente el tipo de cambio es AR$ ${thisTransaction.currency.exchangeRateSell} por ${thisTransaction.currency.type} para la venta. Ingrese la cantidad de ${thisTransaction.currency.type} que desea comprar`;
            moneyOut.innerHTML = '<input id="foreign-currency-out" class="input" type="number">';
            calculateContainer.innerHTML = '<input type="button" id="calculate-money-in" class="input" value="Calcular">';
            calculateMoneyIn = document.getElementById('calculate-money-in');
            calculateMoneyIn.addEventListener('click', () => {
                foreignCurrencyOut = Number(document.getElementById('foreign-currency-out').value);
                moneyIn.innerHTML = `Compra: ${thisTransaction.currency.type} ${foreignCurrencyOut.toFixed(2)}
                <br>AR$: ${localCurrencyIn(thisTransaction.currency.exchangeRateSell, foreignCurrencyOut).toFixed(2)}
                <br>Impuesto PAIS: AR$ ${impuestoPais(localCurrencyIn).toFixed(2)}
                <br>Retención a cuenta de ganancias: AR$ ${retGanancias(localCurrencyIn).toFixed(2)}
                <br>Total: AR$ ${localCurrencyInFinal(localCurrencyIn, impuestoPais, retGanancias).toFixed(2)}`
                transactionDesc.remove();
                calculateMoneyIn.remove();
                moneyOut.remove();
                let confirmContainer = document.getElementById('confirm-container');
                confirmContainer.innerHTML = '<input type="submit" id="confirm"  class="input" value="Confirmar">'
                let confirm = document.getElementById('confirm');
                confirm.addEventListener('click', () => {
                    alert(`Hemos debitado ${localCurrencyInFinal.toFixed(2)} de su cuenta.`);
                    location.reload();
                })
            })
            break;
        case 'Sell':
            transactionDesc.innerText = `Actualmente el tipo de cambio es AR$ ${thisTransaction.currency.exchangeRateBuy} por ${thisTransaction.currency.type} para la compra. Ingrese la cantidad de ${thisTransaction.currency.type} que desea vender`
            moneyIn.innerHTML = '<input id="foreign-currency-in" class="input" type="number">';
            calculateContainer.innerHTML = '<input type="button" id="calculate-money-in" value="Calcular">';
            calculateMoneyIn = document.getElementById('calculate-money-in');
            calculateMoneyIn.addEventListener('click', () => {
                foreignCurrencyIn = Number(document.getElementById('foreign-currency-in').value);
                moneyIn.innerHTML = `Venta: ${thisTransaction.currency.type} ${foreignCurrencyIn.toFixed(2)}
                <br>Total a acreditar en su cuenta: AR$ ${localCurrencyOut(thisTransaction.currency.exchangeRateBuy, foreignCurrencyIn).toFixed(2)}`
                transactionDesc.remove();
                calculateMoneyIn.remove();
                moneyOut.remove();
                let confirmContainer = document.getElementById('confirm-container');
                confirmContainer.innerHTML = '<input type="submit" id="confirm" value="Confirmar">'
                let confirm = document.getElementById('confirm');
                confirm.addEventListener('click', () => {
                    alert(`Hemos acreditado AR$ ${localCurrencyOut.toFixed(2)} en su cuenta.`);
                    location.reload();
                })
            })
            break;
        default:
            transactionDesc.innerText = '';
    }
}