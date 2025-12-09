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
});

// Show a random quote (based on selected filter)
function showRandomQuote() {
  const selected = document.getElementById("categoryFilter").value;

  let filteredQuotes =
    selected === "all"
      ? quotes
      : quotes.filter(q => q.category === selected);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").textContent = "No quotes available.";
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
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add new quote to array
  quotes.push({ text, category });

  // Save to local storage
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Update categories if new one is added
  populateCategories();

  alert("Quote added successfully!");

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Populate dropdown categories
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

// Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;

  // Save the selected filter
  localStorage.setItem("selectedCategory", selectedCategory);

  showRandomQuote();
}

// Load saved filter from localStorage
function loadSavedFilter() {
  const saved = localStorage.getItem("selectedCategory");

  if (saved) {
    document.getElementById("categoryFilter").value = saved;
  }
}
