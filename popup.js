
document.addEventListener('DOMContentLoaded', function() {
  //getting necessary DOM elements and storing in variables
  const saveButton = document.getElementById('saveButton');
  const linkInput = document.getElementById('linkInput');
  const messageDiv = document.getElementById('message');
  const savedLinksContainer = document.getElementById('saved-links-container');
  const savedLinksUl = document.getElementById('saved-links-ul');

  //function when save clicked
  function saveLink() {
    //1. Take the link from input field
    const link = linkInput.value.trim();
    console.log(link);
    
    //2. do smth
    if (link) {
      messageDiv.textContent = `${link} saved!`;
    } else {
      messageDiv.textContent = 'Please enter a link.';
    }
  }

  //adding event listener to the save button
  saveButton.addEventListener('click', saveLink );
});
