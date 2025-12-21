document.addEventListener("DOMContentLoaded", () => {

  let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final; failure is not fatal.", category: "Inspiration" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `"${randomQuote.text}" <br><small>(${randomQuote.category})</small>`;
  }

  function createAddQuoteForm() {
    const formDiv = document.createElement("div");

    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Quote";
    addBtn.addEventListener("click", addQuote);

    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addBtn);

    document.body.appendChild(formDiv);
  }

  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both quote and category");
      return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });

    quoteDisplay.innerHTML = `"${quoteText}" <br><small>(${quoteCategory})</small>`;

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }

  newQuoteBtn.addEventListener("click", showRandomQuote);

  createAddQuoteForm();

});
