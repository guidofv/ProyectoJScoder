let foreignCurrencyIn;
let foreignCurrencyOut;
let chosenForeignCurrency;
let chosenCurrencyRates = [];
let currencyTypes = [];
const foreignCurrencies = [];

class ForeignCurrency {
    constructor (type, exchangeRateBuy, exchangeRateSell){
        this.type = type,
        this.exchangeRateBuy = Number(exchangeRateBuy),
        this.exchangeRateSell = Number(exchangeRateSell);
    }
};

const currency1 = new ForeignCurrency('USD', 141, 149);
const currency2 = new ForeignCurrency('EUR', 142, 150);
const currency3 = new ForeignCurrency('BRL', 25.20, 29.20);

foreignCurrencies.push(currency1,currency2, currency3);

for (const currency of foreignCurrencies){
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

while(!currencyTypes.includes(chosenForeignCurrency)){
chosenForeignCurrency = prompt(`Por favor, indique con qué moneda desea operar: ${currencyTypes.join(', ')}.`).toUpperCase();
}

for (const currency of foreignCurrencies){
    while(currency.type===chosenForeignCurrency){
        chosenCurrencyRates = [currency.exchangeRateBuy,currency.exchangeRateSell];
        console.log(chosenCurrencyRates);
        break;
    }
}

let operacion = prompt(`Por favor, indique qué tipo de operación desea realizar: (C) AR$ a ${chosenForeignCurrency} (V) ${chosenForeignCurrency} a AR$`).toUpperCase();
while (operacion != 'C' && operacion != 'V') {
    operacion = prompt('La opción ingresada es inválida. (C) AR$ a U$S (V) U$S a AR$').toUpperCase();
}
switch (operacion) {
    case 'C':
           foreignCurrencyOut = Number(prompt(`Actualmente el tipo de cambio es AR$ ${chosenCurrencyRates[1].toFixed(2)} por ${chosenForeignCurrency} para la venta. Ingrese la cantidad de ${chosenForeignCurrency} que desea comprar`));
        while ((foreignCurrencyOut*chosenCurrencyRates[1]) > (200*currency1.exchangeRateSell) || isNaN(foreignCurrencyOut)) {
            foreignCurrencyOut = Number(prompt(`No podemos procesar su operación. Por favor, ingrese la cantidad de ${chosenForeignCurrency} a comprar respetando el formato numérico y el cupo de U$S 200.`));
        }
        alert(`Para comprar ${chosenForeignCurrency} ${foreignCurrencyOut.toFixed(2)} deberá desembolsar AR$ ${localCurrencyIn(chosenCurrencyRates[1], foreignCurrencyOut).toFixed(2)} más impuesto PAIS de AR$ ${impuestoPais(localCurrencyIn).toFixed(2)} y retención a cuenta de ganancias por AR$ ${retGanancias(localCurrencyIn).toFixed(2)}`)
        alert(`Se debitará un total de AR$ ${localCurrencyInFinal(localCurrencyIn, impuestoPais, retGanancias).toFixed(2)} de su cuenta.`);
        alert('Operación exitosa. No olvide que por haber operado una compra en el MULC, el BCRA le impide vender títulos contra moneda extranjera durante los próximos 90 días.');
        break;
    case 'V':
        foreignCurrencyIn = Number(prompt(`Actualmente el tipo de cambio es AR$ ${chosenCurrencyRates[0].toFixed(2)} por unidad monetaria para la compra. Ingrese la cantidad de moneda extranjera que desea vender`));
        while (isNaN(foreignCurrencyIn) || foreignCurrencyIn<=0) {
            foreignCurrencyIn = Number(prompt(`No podemos procesar su operación. ${chosenForeignCurrency} a vender respetando el formato numérico.`));
        }
        alert(`Acreditaremos en su cuenta un total de AR$ ${localCurrencyOut(chosenCurrencyRates[0], foreignCurrencyIn).toFixed(2)} a cambio de sus ${chosenForeignCurrency} ${foreignCurrencyIn.toFixed(2)} . Su Banco Central le agradece la gentileza.`);
        break;
};