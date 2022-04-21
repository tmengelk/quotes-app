const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadComplete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function newQuote() {
  loading();
  const quote = quotes[getRandomIndex(quotes.length)];
  console.log(quote.author);

  authorText.textContent = quote.author ? quote.author : 'Unknown';

  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
  loadComplete();
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    quotes = await response.json();
    newQuote();
  } catch (error) {
    console.log('There was an error getting quotes.');
    quotes = localQuotes;
    newQuote();
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ~${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
