let foreignCurrencyIn;
// se declara para adquirir el input de usuario sobre cuánta moneda extranjera desea vender en case Sell.

let foreignCurrencyOut;
// se declara para adquirir el input de usuario sobre cuánta moneda extranjera desea vender en case Buy.

let thisTransaction = { currency: "", transaction: "" };
// objeto inicializado vacío que  adquiere valores según input de usuario.

let remainingQuota;

let currencyTypes = [];
// array que almacena sólo el código de moneda

const foreignCurrencies = [];
// array que almacena monedas como objetos literales

class ForeignCurrency {
    constructor(type, exchangeRateBuy, exchangeRateSell) {
        this.type = type,
            this.exchangeRateBuy = Number(exchangeRateBuy),
            this.exchangeRateSell = Number(exchangeRateSell);
    };
};

const currency1 = new ForeignCurrency('USD', 141, 149);
const currency2 = new ForeignCurrency('EUR', 142, 150);
const currency3 = new ForeignCurrency('BRL', 25.20, 29.20);
// se instancia la clase constructora para crear tres monedas.

foreignCurrencies.push(currency1, currency2, currency3);
// pushea las monedas (objetos) creadas con la instanciación de la clase constructora ForeignCurrency.

let chosenForeignCurrency = document.getElementById('chosen-foreign-currency');
// se declara la variable para adquirir el input de usuario sobre el tipo de moneda a operar.

let transactionType = document.getElementById('transaction-type');
// se declara la variable para adquirir el input de usuario sobre el tipo de operación.

foreignCurrencies.forEach(currency => {
    let currencyOption = document.createElement('option');
    currencyOption.innerHTML = currency.type;
    chosenForeignCurrency.appendChild(currencyOption);
});

// pinta los códigos de moneda en el combo de selección.

for (const currency of foreignCurrencies) {
    currencyTypes.push(currency.type);
}

// genera un array con solamente los tipos de moneda extranjera disponibles.

function localCurrencyIn(exchangeRateSell, foreignCurrencyOut) {
    return localCurrencyIn = exchangeRateSell * foreignCurrencyOut;
}

// calcula la cantidad de moneda local equivalente según tipo de cambio venta.

function impuestoPais(localCurrencyIn) {
    return impuestoPais = localCurrencyIn * 0.35;
}

// obtiene el impuesto país en caso de operación tipo venta.

function retGanancias(localCurrencyIn) {
    return retGanancias = localCurrencyIn * 0.30;
}

// obtiene la retención a cuenta del impuesto a las ganancias en caso de operación tipo venta.

function localCurrencyInFinal(localCurrencyIn, impuestoPais, retGanancias) {
    return localCurrencyInFinal = Number(localCurrencyIn + impuestoPais + retGanancias);
}

// obtiene la cantidad final de pesos a debitar en caso de operaciones tipo venta.

function localCurrencyOut(exchangeRateBuy, foreignCurrencyIn) {
    return localCurrencyOut = exchangeRateBuy * foreignCurrencyIn;
}
// obtiene la cantidad de pesos a acreditar en la cuenta del usuario en operaciones tipo compra.

let transactionDesc = document.getElementById('transaction-desc');
let calculateContainer = document.getElementById('calculate-container');
let moneyIn = document.getElementById('money-in');
let moneyOut = document.getElementById('money-out');

let transactionLog = [];
let transactionLogInLS = JSON.parse(localStorage.getItem('transactionLog'));

// se genera un array vacío como log de transacciones, y se recupera en otra variable el transactionLog parseado del localStorage.

if (transactionLogInLS) {
    transactionLog = transactionLogInLS;
};

// en caso de que transactionLogInLS haya recuperado valores del LS, los asigna a transactionLog.

let quotaConsumption = [];
// se declara un array vacío donde se pushearán los débitos al cupo de U$S 200.

for(const trx of transactionLog){
    if(trx.transaction==='Buy'){
    quotaConsumption.push(trx.quotaDownBy);
    }
};

// se recorre el log de transacciones y se pushea los consumos de cupo al array dedicado para ello.

remainingQuota = 200 - (quotaConsumption.reduce((acc, element) => acc + element, 0));

// calcula el cupo restante

let continueButton = document.getElementById('continue');
continueButton.addEventListener('click', () => {
    if (chosenForeignCurrency.value === '' || transactionType.value === '') {
        Swal.fire({
            text: 'Por favor, seleccione la moneda y el tipo de transacción a operar.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    } else {
        updateTransaction();
        continueButton.remove();
        chosenForeignCurrency.remove();
        transactionType.remove();
    }
});

let calculateMoneyIn

let updateTransaction = () => {
    thisTransaction.currency = foreignCurrencies.find(currency => currency.type === chosenForeignCurrency.value);
    thisTransaction.transaction = transactionType.value;
    switch (thisTransaction.transaction) {
        case 'Buy':
            if (remainingQuota <= 0.009999) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha consumido la totalidad del cupo para la compra de moneda extranjera. Sólo podrá vender divisas.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            } else {
                transactionDesc.innerText = `Actualmente el tipo de cambio es AR$ ${thisTransaction.currency.exchangeRateSell} por ${thisTransaction.currency.type} para la venta. Ingrese la cantidad de ${thisTransaction.currency.type} que desea comprar.
            Su cupo remanente es de U$S ${remainingQuota.toFixed(2)}`;
                moneyOut.innerHTML = '<input id="foreign-currency-out" class="input" type="number">';
                calculateContainer.innerHTML = '<input type="button" id="calculate-money-in" class="input" value="Calcular">';
                calculateMoneyIn = document.getElementById('calculate-money-in');
                calculateMoneyIn.addEventListener('click', () => {
                    foreignCurrencyOut = Number(document.getElementById('foreign-currency-out').value);
                    if ((foreignCurrencyOut * thisTransaction.currency.exchangeRateSell / foreignCurrencies[0].exchangeRateSell > remainingQuota.toFixed(2)) || foreignCurrencyOut <= 0) {
                        Swal.fire({
                            title: 'Error',
                            text: 'No podemos procesar su operación. Por favor, ingrese un valor positivo respetando el cupo restante.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    } else {
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
                            thisTransaction.id = Math.random();
                            thisTransaction.foreignCurrencyOut = foreignCurrencyOut;
                            thisTransaction.localCurrencyIn = localCurrencyIn;
                            thisTransaction.taxes = localCurrencyInFinal - localCurrencyIn;
                            thisTransaction.quotaDownBy = (foreignCurrencyOut * thisTransaction.currency.exchangeRateSell / foreignCurrencies[0].exchangeRateSell)
                            transactionLog.push(thisTransaction);
                            transactionLogJSON = JSON.stringify(transactionLog);
                            localStorage.setItem('transactionLog', transactionLogJSON);
                            //asigna un ID a cada operación y almacena su moneda, cantidad comprada y equivalente en USD.
                            Swal.fire({
                                title: 'Operación exitosa',
                                text: `Hemos debitado AR$ ${localCurrencyInFinal.toFixed(2)} de su cuenta.`,
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                };
                            });
                        });
                    };
                });
            };
            break;

        case 'Sell':
            transactionDesc.innerText = `Actualmente el tipo de cambio es AR$ ${thisTransaction.currency.exchangeRateBuy} por ${thisTransaction.currency.type} para la compra. Ingrese la cantidad de ${thisTransaction.currency.type} que desea vender`
            moneyIn.innerHTML = '<input id="foreign-currency-in" class="input" type="number">';
            calculateContainer.innerHTML = '<input type="button" id="calculate-money-in" value="Calcular">';
            calculateMoneyIn = document.getElementById('calculate-money-in');
            calculateMoneyIn.addEventListener('click', () => {
                foreignCurrencyIn = Number(document.getElementById('foreign-currency-in').value);
                if (foreignCurrencyIn <= 0) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No podemos procesar su operación. Por favor, ingrese un importe válido',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        };
                    });
                };
                moneyIn.innerHTML = `Venta: ${thisTransaction.currency.type} ${foreignCurrencyIn.toFixed(2)}
                <br>Total a acreditar en su cuenta: AR$ ${localCurrencyOut(thisTransaction.currency.exchangeRateBuy, foreignCurrencyIn).toFixed(2)}`
                transactionDesc.remove();
                calculateMoneyIn.remove();
                moneyOut.remove();
                let confirmContainer = document.getElementById('confirm-container');
                confirmContainer.innerHTML = '<input type="submit" id="confirm" value="Confirmar">'
                let confirm = document.getElementById('confirm');
                confirm.addEventListener('click', () => {
                    thisTransaction.id = Math.random();
                    thisTransaction.foreignCurrencyIn = foreignCurrencyIn;
                    thisTransaction.localCurrencyOut = localCurrencyOut.toFixed(2); 
                    transactionLog.push(thisTransaction);
                    transactionLogJSON = JSON.stringify(transactionLog);
                    localStorage.setItem('transactionLog', transactionLogJSON);
                    Swal.fire({
                        title: 'Operación exitosa',
                        text: `Hemos acreditado AR$ ${localCurrencyOut.toFixed(2)} en su cuenta.`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        };
                    });
                });
            });
            break;
        default:
            transactionDesc.innerText = '';
    }
}