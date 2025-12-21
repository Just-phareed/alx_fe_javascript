document.addEventListener("DOMContentLoaded", () => {

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");

  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Learning never exhausts the mind.", category: "Education" },
    { text: "Success is not final; failure is not fatal.", category: "Inspiration" }
  ];

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" <br><small>(${quote.category})</small>`;
  }

  function createAddQuoteForm() {
    const formDiv = document.createElement("div");

    const textInput = document.createElement("input");
    textInput.id = "newQuoteText";
    textInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Quote";
    addBtn.addEventListener("click", addQuote);

    formDiv.appendChild(textInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addBtn);

    document.body.appendChild(formDiv);
  }

  function addQuote() {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();

    if (!text || !category) {
      alert("Please enter both quote and category");
      return;
    }

    quotes.push({ text, category });
    saveQuotes();
    showRandomQuote();
    postQuoteToServer({ text, category });
  }

  /* ================= SERVER SYNC ================= */

  async function fetchQuotesFromServer() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();

      return data.slice(0, 5).map(item => ({
        text: item.title,
        category: "Server"
      }));
    } catch {
      return [];
    }
  }

  async function postQuoteToServer(quote) {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
  }

  async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();

    if (serverQuotes.length > 0) {
      quotes = serverQuotes; // SERVER WINS
      saveQuotes();
      notifyUser("Quotes synced from server. Conflicts resolved.");
    }
  }

  function notifyUser(message) {
    let notice = document.getElementById("syncNotice");

    if (!notice) {
      notice = document.createElement("p");
      notice.id = "syncNotice";
      document.body.appendChild(notice);
    }

    notice.textContent = message;
    notice.style.color = "green";
  }

  setInterval(syncQuotes, 15000);

  newQuoteBtn.addEventListener("click", showRandomQuote);

  createAddQuoteForm();
  showRandomQuote();
});
