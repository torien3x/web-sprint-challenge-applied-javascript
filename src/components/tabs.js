const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //

  // Create the outermost <div> element with the "topics" class
  const container = document.createElement('div');
  container.className = 'topics';

  // Loop through the topics array and create a <div> element for each topic
  for (const topic of topics) {
    // Create a <div> element for the tab with the "tab" class
    const tabElement = document.createElement('div');
    tabElement.className = 'tab';
    tabElement.textContent = topic; // Set the text content to the topic

    // Append the tab element to the container
    container.appendChild(tabElement);
  }

  // Return the container element (no need to serialize to an HTML string)
  return container;
}

// Example usage:
const topics = ['javascript', 'bootstrap', 'technology'];
const tabsElement = Tabs(topics);

// Append the tabs element to the document or any desired location
document.body.appendChild(tabsElement);


const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `http://localhost:5001/api/topics` (test it with a console.log!).
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //

  // Fetch topics from the API endpoint
  fetch('http://localhost:5001/api/topics')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Extract the array of topics from the response
      const topics = data.topics || [];

      // Create tabs using the Tabs component with the obtained topics
      const tabsElement = Tabs(topics);

      // Find the element in the DOM that matches the given selector
      const targetElement = document.querySelector(selector);

      // Check if the target element exists in the DOM
      if (targetElement) {
        // Append the tabs element to the target element
        targetElement.appendChild(tabsElement);
      } else {
        console.error(`Element with selector "${selector}" not found in the DOM.`);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Example usage:
tabsAppender("#wrapper"); 

export { Tabs, tabsAppender }
