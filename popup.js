
document.addEventListener('DOMContentLoaded', function() {
  //getting necessary DOM elements and storing in variables
  const saveButton = document.getElementById('saveButton');
  const linkInput = document.getElementById('linkInput');
  const messageDiv = document.getElementById('message');
  const savedLinksContainer = document.getElementById('saved-links-container');
  const savedLinksUl = document.getElementById('saved-links-ul');


    // Array to store saved links (for now, will reset when popup closes)
    let savedLinks = [];


  //function when save clicked
  function saveLink() {
    //1. Take the link from input field
    const link = linkInput.value.trim();
    console.log(link);
    
    //2. do smth
    if (link) {
      messageDiv.textContent = `${link} saved!`;
      savedLinks.push(link);
      linkInput.value = ''; 
    } else {      
      messageDiv.textContent = 'Please enter a link.';
    }

    renderLinks();
  }

    // Function to render the saved links in the ul
    function renderLinks() {
      savedLinksUl.innerHTML = ''; // Clear the existing list
      savedLinks.forEach(link => {
        const listItem = document.createElement('li');
        listItem.textContent = link;
        savedLinksUl.appendChild(listItem);
      });
    }
    
  //adding event listener to the save button
  saveButton.addEventListener('click', saveLink );
});
