const Header = (title, date, temp) => {
  // TASK 1
  // ---------------------
  // Implement this function taking `title`, `date` and `temp` as its 3 args and returning the markup below.
  // The html tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  //  <div class="header">
  //    <span class="date">{ date }</span>
  //    <h1>{ title }</h1>
  //    <span class="temp">{ temp }</span>
  //  </div>
  //
  
    const container = document.createElement('div');
    container.className = 'header';
  
    // Create the <span> element for the date with the "date" class
    const dateElement = document.createElement('span');
    dateElement.className = 'date';
    dateElement.textContent = date;
  
    // Create the <h1> element for the title
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
  
    // Create the <span> element for the temperature with the "temp" class
    const tempElement = document.createElement('span');
    tempElement.className = 'temp';
    tempElement.textContent = temp;
  
    // Append child elements to the container in the required order
    container.appendChild(dateElement);
    container.appendChild(titleElement);
    container.appendChild(tempElement);
  
    return container;
  }
  
  // Example usage
  const title = "Today's Weather";
  const date = "September 14, 2023";
  const temp = "78°F";
  
  const result = Header(title, date, temp);
  console.log(result); // This will log the generated HTML markup
  


  // const titleElement = document.createElement('h1');
  // const dateElement = document.createElement('p');
  // const tempElement = document.createElement('span');

  // titleElement.textContent = 'title';
  // dateElement.textContent = 'date';
  // tempElement.textContent = 'temp';

 





const headerAppender = (selector) => {
  // TASK 2
  // ---------------------
  // Implement this function taking a css selector as its only argument.
  // It should create a header using the Header component above, passing arguments of your choosing.
  // It should append the header to the element in the DOM that matches the given selector.
  //

  // HINT: querySelector can take in a string (ie querySelector("#wrapper")) 
  // but it can also take in a variable (ie querySelector(selector))
  // We are taking care of passing in the correct selector on line 16,
  // so all that you need to do is pass it into the querySelector method
  // for the tests to work!

  // Create a header using the Header component with arguments of your choosing
  const title = "My Dynamic Header";
  const date = "September 14, 2023";
  const temp = "78°F";

  const headerElement = Header(title, date, temp);

  // Find the element in the DOM that matches the given selector
  const targetElement = document.querySelector(selector);

  // Check if the target element exists in the DOM
  if (targetElement) {
    // Append the header element to the target element
    targetElement.appendChild(headerElement);
  } else {
    console.error(`Element with selector "${selector}" not found in the DOM.`);
  }

}

headerAppender("#wrapper");

export { Header, headerAppender }
