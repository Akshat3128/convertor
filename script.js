const apiKey = 'fca_live_QFPtgLlxvFGzP0P7bXugDoBNaVt4VPN2Q5GL3Gub';
const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=EUR,USD,CAD`;

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data; // Access the currency rates
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}

async function convert() {
    const currencyFrom = document.getElementById('currencyFrom').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const resultDiv = document.getElementById('result');
    
    const rates = await fetchExchangeRates();
    if (!rates) {
        resultDiv.innerText = 'Failed to fetch exchange rates.';
        return;
    }

    let result = 0;
    let resultText = '';
    
    if (currencyFrom === 'USD') {
        result = amount * rates.EUR; // Convert USD to EUR
        resultText = `${amount} USD is equal to ${result.toFixed(2)} EUR.`;
    } else if (currencyFrom === 'EUR') {
        result = amount * (1 / rates.EUR); // Convert EUR to USD
        resultText = `${amount} EUR is equal to ${result.toFixed(2)} USD.`;
    } else {
        resultText = 'Invalid currency selected.';
    }

    resultDiv.innerText = resultText;
}
