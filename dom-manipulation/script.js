// Load existing quotes OR create default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Success is not final.", category: "Motivation" },
  { text: "Believe in yourself.", category: "Inspiration" },
  { text: "Knowledge is power.", category: "Education" }
];

document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  loadSavedFilter();
  showRandomQuote();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  const syncBtn = document.getElementById("syncBtn");
  if (syncBtn) syncBtn.addEventListener("click", syncWithServer);

  // Auto-sync every 10 seconds
  setInterval(syncWithServer, 10000);
});

// Show random quote
function showRandomQuote() {
  const selected = document.getElementById("categoryFilter").value;

  let filteredQuotes =
    selected === "all"
      ? quotes
      : quotes.filter(q => q.category === selected);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").textContent = "No quotes found.";
    return;
  }

  const random = Math.floor(Math.random() * filteredQuotes.length);
  document.getElementById("quoteDisplay").textContent = filteredQuotes[random].text;
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Enter both quote and category.");
    return;
  }

  quotes.push({ text, category });

  localStorage.setItem("quotes", JSON.stringify(quotes));

  populateCategories();

  console.log("Quote added to local storage.");

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Populate categories
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  dropdown.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    dropdown.appendChild(opt);
  });
}

// Category filter
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;

  localStorage.setItem("selectedCategory", selected);

  showRandomQuote();
}

// Load saved filter
function loadSavedFilter() {
  const saved = localStorage.getItem("selectedCategory");
  if (saved) {
    document.getElementById("categoryFilter").value = saved;
  }
}

// ===============================
//   SERVER SYNC + CONFLICT FIX
// ===============================

// Sync with mock server
async function syncWithServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverData = await response.json();

    // Convert to expected quote format
    const serverQuotes = serverData.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    // Conflict Resolution: SERVER WINS
    quotes = serverQuotes;

    // Save updated data
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Update UI
    populateCategories();
    showRandomQuote();

    console.log("Quotes updated from server (server wins).");

  } catch (error) {
    console.error("Error syncing with server:", error);
  }
}
