
document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.getElementById('saveButton');
  const linkInput = document.getElementById('linkInput');
  const messageDiv = document.getElementById('message');

  saveButton.addEventListener('click', function() {
    const link = linkInput.value.trim();
    if (link) {
      chrome.storage.local.get({ 'savedLinks': [] }, function(data) {
        const savedLinks = data.savedLinks;
        savedLinks.push(link);
        chrome.storage.local.set({ 'savedLinks': savedLinks }, function() {
          messageDiv.textContent = 'Link saved!';
          linkInput.value = ''; // Clear the input field
        });
      });
    } else {
      messageDiv.textContent = 'Please enter a link.';
    }
  });
});
