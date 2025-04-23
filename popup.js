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
      const savedLinksMsg = 'Changes saved!'; // Update message to reflect storage
      showMessage(savedLinksMsg);
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

      // Create a list item for each link
      savedLinks.forEach((link, index) => { // Get the index of each link
      // Create List, Link and Delete Icon
      const listItem = document.createElement('li');
      const linktagContainer = document.createElement('a');
      const deleteIconContainer = document.createElement('span');  

    //set link tag
      linktagContainer.href = link;
      linktagContainer.textContent = `${index+1+'.'} ${link}`;
      //set delete icon
      deleteIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="delete-icon size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>`;
     // listItem.textContent = link + ' '; // Just add the link and some spacing

      listItem.appendChild(linktagContainer);
      deleteIconContainer.classList.add('delete-icon-container');
      deleteIconContainer.dataset.index = index;
      deleteIconContainer.style.cursor = 'pointer';
      deleteIconContainer.addEventListener('click', deleteLink);

      listItem.appendChild(deleteIconContainer);
      savedLinksUl.appendChild(listItem);
      });
    }

  // Function to delete a single link
  function deleteLink(event) {
    const indexToDelete = parseInt(event.currentTarget.dataset.index); // Get the index from the container

    if (!isNaN(indexToDelete) && indexToDelete >= 0 && indexToDelete < savedLinks.length) {
      const deletedLink = savedLinks.splice(indexToDelete, 1); // Remove the link from the array
      console.log(`Deleted link: ${deletedLink} at index ${indexToDelete}`);
      saveLinksToStorage(); // Save the updated array to Chrome Storage
      renderLinks(); // Re-render the list
      //messageDiv.textContent = 'Link deleted!';
      const deleteLinkMsg = 'Link deleted!'
      showMessage(deleteLinkMsg)
      
    }
  }
  function showMessage (msg){
    messageDiv.style.display = 'block';
    messageDiv.textContent = msg;
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 2000);  
  }
  // Function to delete all saved links
  function deleteAllLinks() {
    savedLinks = []; // Clear the local array
    chrome.storage.sync.remove('savedLinks', function() { // Clear from Chrome Storage
      console.log('All links deleted from Chrome Storage.');
      renderLinks(); // Update the displayed list (which will now be empty)
      const deleteAllLinksMsg = 'All links deleted!';
      showMessage(deleteAllLinksMsg);
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
      const nullLinkMsg = 'Please enter a link.';
      showMessage(nullLinkMsg);
    }
  }

  // Adding event listener to the save button
  saveButton.addEventListener('click', saveLink);

  // Adding event listener to the delete all button
  deleteAllButton.addEventListener('click', deleteAllLinks);

  // Load links from storage when the popup is loaded
  loadLinksFromStorage();
});