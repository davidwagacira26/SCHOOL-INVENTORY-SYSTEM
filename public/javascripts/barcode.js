async function handleBarcodeScan() {
    const barcodeInput = document.getElementById('barcodeInput');
    const barcode = barcodeInput.value.trim();
    if (barcode) {
      try {
        const response = await fetch('/barcodescan/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ barcode })
        });
        if (!response.ok) {
          displayErrorMessage('Item not found');
          return;
        }
        const textbook = await response.json();
        displayScannedTextbook(textbook);
        barcodeInput.value = '';
      } catch (error) {
        console.error('Error retrieving textbook information:', error);
        displayErrorMessage('Error retrieving textbook information');
      }
    } else {
      console.log('Barcode value is empty.');
    }
  }
  
  function displayScannedTextbook(textbook) {
    const scannedTextbookInfo = document.getElementById('scanned-textbook-info');
    const textbookElement = document.createElement('div');
    textbookElement.classList.add('scanned-textbook');
    textbookElement.innerHTML = `
        <p>Title: ${textbook.title}</p>
        <p>Author: ${textbook.author}</p>
        <p>Barcode: ${textbook.barcode}</p>
        <button onclick="deleteScannedTextbook(this)">Delete</button>
    `;
  
    scannedTextbookInfo.appendChild(textbookElement);
  }
  
  function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    console.log('Displaying error message:', message);
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = 'red';
    setTimeout(function() {
        errorMessageElement.textContent = '';
    }, 5000); 
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const scanButton = document.querySelector('.btn');
    scanButton.addEventListener('click', handleBarcodeScan);
  });
  
  async function deleteScannedTextbook(button) {
    button.parentNode.remove();
  }
  