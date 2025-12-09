// Basic Dynamic Quote Generator
let quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The purpose of our lives is to be happy.", category: "Life" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");

// Show a random quote
function showRandomQuote() {
  if (!quotes.length) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteObj = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quoteObj.text}</p>
    <p><strong>Category:</strong> ${quoteObj.category}</p>
  `;
}

// Add a new quote from the inputs
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text === "" || category === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add to array
  quotes.push({ text, category });

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  // Optional: show the quote just added
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${text}</p>
    <p><strong>Category:</strong> ${category}</p>
  `;
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Show a quote on load
showRandomQuote();
