// app.js
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");

// Working API endpoint
const url = "https://api.adviceslip.com/advice";

async function getQuote() {
  try {
    // Fetch advice from API
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    // Update DOM
    quote.innerText = data.slip.advice;
    author.innerText = "Advice";
  } catch (err) {
    console.error("Error fetching quote:", err);
    quote.innerText = "Sorry, something went wrong!";
    author.innerText = "";
  }
}

// Event listeners
window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);
