document.addEventListener("DOMContentLoaded", () => {
  // Default quotes
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Success is not final.", category: "Motivation" },
    { text: "Believe in yourself.", category: "Inspiration" },
    { text: "Knowledge is power.", category: "Education" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const exportBtn = document.getElementById("exportQuotes");

  // ---------------- SAVE & LOAD ----------------

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem("quotes"));
    if (storedQuotes) {
      quotes = storedQuotes;
    }
    showRandomQuote();
  }

  // ---------------- DISPLAY ----------------

  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = `"${quotes[randomIndex].text}" — ${quotes[randomIndex].category}`;
  }

  // ---------------- ADD QUOTE ----------------

  window.addQuote = function () {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text === "" || category === "") {
      alert("Please enter both quote and category");
      return;
    }

    quotes.push({ text, category });
    saveQuotes();
    showRandomQuote();

    textInput.value = "";
    categoryInput.value = "";
  };

  // ---------------- EXPORT JSON ----------------

  function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  // ---------------- IMPORT JSON ----------------

  window.importFromJsonFile = function (event) {
    const fileReader = new FileReader();

    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      showRandomQuote();
      alert("Quotes imported successfully!");
    };

    fileReader.readAsText(event.target.files[0]);
  };

  // ---------------- EVENTS ----------------

  newQuoteBtn.addEventListener("click", showRandomQuote);
  exportBtn.addEventListener("click", exportToJsonFile);

  loadQuotes();
});
