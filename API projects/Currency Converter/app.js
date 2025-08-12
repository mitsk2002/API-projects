let apiBase = `https://v6.exchangerate-api.com/v6/${apiKey}`;

// DOM elements
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.querySelector("#result");
const amountInput = document.querySelector("#amount");

// Populate dropdowns from API
async function loadCurrencies() {
    try {
        const resp = await fetch(`${apiBase}/latest/USD`);
        const data = await resp.json();

        if (!data.conversion_rates) {
            throw new Error("Invalid API response");
        }

        const currencyCodes = Object.keys(data.conversion_rates);

        currencyCodes.forEach(currency => {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.text = currency;
            fromDropDown.add(option1);

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.text = currency;
            toDropDown.add(option2);
        });

        // Set defaults
        fromDropDown.value = "USD";
        toDropDown.value = "INR";

    } catch (error) {
        console.error("Error loading currencies:", error);
        result.textContent = "Failed to load currency list.";
    }
}

async function convertCurrency() {
    const amount = amountInput.value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if (!amount) {
        alert("Please fill in the amount");
        return;
    }

    try {
        const resp = await fetch(`${apiBase}/latest/${fromCurrency}`);
        const data = await resp.json();

        if (!data.conversion_rates) {
            throw new Error("Invalid API response");
        }

        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

    } catch (error) {
        console.error("Error converting currency:", error);
        result.textContent = "Error fetching conversion rate.";
    }
}

// Event listeners
document.querySelector("#convert-button").addEventListener("click", convertCurrency);

// Initialize
window.addEventListener("load", loadCurrencies);
