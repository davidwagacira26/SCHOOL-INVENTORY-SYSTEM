document.getElementById('checkin-form').addEventListener('submit', async function(event) {
  event.preventDefault(); 
  
  const formData = new FormData(this); 
  
  const checkinData = {};
  formData.forEach((value, key) => {
    checkinData[key] = value;
  });
  
  try {
    const response = await fetch('/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkinData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to check in item. Please try again.');
    }
    
    this.reset();
    displayPopupMessage('Check-in completed successfully');
  } catch (error) {
    console.error('Error during check-in:', error);
    showMessage('An error occurred during check-in. Please try again.', 'error');
  }
});
function displayPopupMessage(message) {
  var popupMessage = document.createElement("div");
  popupMessage.classList.add("popup-message");
  popupMessage.textContent = message;
  document.body.appendChild(popupMessage);

  setTimeout(function() {
    popupMessage.remove();
  }, 3000);
}
