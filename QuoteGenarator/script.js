const quoteText = document.querySelector(".Quote-Box blockquote");
const authorName = document.querySelector(".author");
const newQuoteBtn = document.getElementById("newQuote");
const tweetBtn = document.getElementById("tweetBtn");

// Fetch random quote from API
async function getQuote() {
  quoteText.textContent = "Loading...";
  authorName.textContent = "Loading...";

  try {
    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          'X-Api-Key': 'B/CyRcg/N3HieMmYsnNO/Q==ixjLvyqVhR4C2OMz'
        }
      });
    const data = await res.json();
    console.log(data);
    const quote = data[0];


    quoteText.textContent = `"${quote.quote}"`;
    authorName.textContent = `— ${quote.author}`;
  } catch (err) {
    quoteText.textContent = "Failed to load quote. Please try again.";
    authorName.textContent = "err";
    console.error(err);
  }
}

// Copy or Tweet the quote
tweetBtn.addEventListener("click", () => {
  const quote = quoteText.textContent;
  const author = authorName.textContent;

  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} ${author}`)}`;
  window.open(tweetURL, "_blank");
});

// New quote on button click
newQuoteBtn.addEventListener("click", getQuote);

// Load first quote on page load
window.addEventListener("DOMContentLoaded", getQuote);
