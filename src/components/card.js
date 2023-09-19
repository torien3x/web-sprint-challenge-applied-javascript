const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  // Create the outermost <div> element with the "card" class
  const cardElement = document.createElement('div');
  cardElement.className = 'card';

  // Create the <div> element for the headline with the "headline" class
  const headlineElement = document.createElement('div');
  headlineElement.className = 'headline';
  headlineElement.textContent = article.headline; // Set the text content

  // Create the <div> element for the author with the "author" class
  const authorElement = document.createElement('div');
  authorElement.className = 'author';

  // Create the <div> element for the image container with the "img-container" class
  const imgContainerElement = document.createElement('div');
  imgContainerElement.className = 'img-container';

  // Create the <img> element for the author's photo with the src attribute
  const imgElement = document.createElement('img');
  imgElement.src = article.authorPhoto; // Set the src attribute

  // Create the <span> element for the author's name
  const authorNameElement = document.createElement('span');
  authorNameElement.textContent = `By ${article.authorName}`; // Set the text content

  // Add a click event listener to log the headline when the card is clicked
  cardElement.addEventListener('click', () => {
    console.log(article.headline);
  });

  // Append child elements to the appropriate parent elements
  imgContainerElement.appendChild(imgElement);
  authorElement.appendChild(imgContainerElement);
  authorElement.appendChild(authorNameElement);
  cardElement.appendChild(headlineElement);
  cardElement.appendChild(authorElement);

  // Return the card element
  return cardElement;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  // Fetch articles from the API endpoint
  fetch('http://localhost:5001/api/articles')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Initialize an empty array to collect all articles
      const allArticles = [];

      // Loop through the categories (e.g., 'javascript', 'bootstrap', 'technology', etc.)
      for (const category in data.articles) {
        // Extract articles from each category and push them into the allArticles array
        allArticles.push(...data.articles[category]);
      }

      // Create cards for each article using the Card component
      const cardElements = allArticles.map((article) => Card(article));

      // Find the element in the DOM that matches the given selector
      const targetElement = document.querySelector(selector);

      // Check if the target element exists in the DOM
      if (targetElement) {
        // Append each card element to the target element
        cardElements.forEach((cardElement) => {
          targetElement.appendChild(cardElement);
        });
      } else {
        console.error(`Element with selector "${selector}" not found in the DOM.`);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

}

console.log(cardAppender("#card-container"));

export { Card, cardAppender }
