document.addEventListener('DOMContentLoaded', function() {
  // Getting necessary DOM elements and storing in variables
  const saveButton = document.getElementById('saveButton');
  const linkInput = document.getElementById('linkInput');
  const messageDiv = document.getElementById('message');
  const savedLinksUl = document.getElementById('saved-links-ul');
  const deleteAllButton = document.getElementById('deleteAllButton');

  // Array to store saved links
  let savedLinks = [];

  // Function to save links to Chrome Storage
  function saveLinksToStorage() {
    chrome.storage.sync.set({ 'savedLinks': savedLinks }, function() {
      console.log('Links saved to Chrome Storage:', savedLinks);
      messageDiv.textContent = 'Links saved!'; // Update message to reflect storage
    });
  }

  // Function to load links from Chrome Storage
  function loadLinksFromStorage() {
    chrome.storage.sync.get('savedLinks', function(data) {
      if (data.savedLinks) {
        savedLinks = data.savedLinks;
        renderLinks();
        console.log('Links loaded from Chrome Storage:', savedLinks);
      }
    });
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

  // Function when save clicked
  function saveLink() {
    // 1. Take the link from the input field
    const newLink = linkInput.value.trim();

    // 2. Do something if the link is not empty
    if (newLink) {
      savedLinks.push(newLink);     // Add the new link to the array
      saveLinksToStorage();         // Save the updated array to Chrome Storage
      linkInput.value = '';         // Clear the input field
      renderLinks();               // Update the displayed list
    } else {
      messageDiv.textContent = 'Please enter a link.';
    }
  }

    // Function to delete all saved links
    function deleteAllLinks() {
      savedLinks = []; // Clear the local array
      chrome.storage.sync.remove('savedLinks', function() { // Clear from Chrome Storage
        console.log('All links deleted from Chrome Storage.');
        renderLinks(); // Update the displayed list (which will now be empty)
        messageDiv.textContent = 'All links deleted!';
      });
    }

  // Adding event listener to the save button
  saveButton.addEventListener('click', saveLink);

    // Adding event listener to the delete all button
  deleteAllButton.addEventListener('click', deleteAllLinks);
  // Load links from storage when the popup is loaded
  loadLinksFromStorage();
});