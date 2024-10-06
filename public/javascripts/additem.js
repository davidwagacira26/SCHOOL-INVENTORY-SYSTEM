document.getElementById('updateForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch('/update', { 
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to update inventory item');
    }

    const data = await response.json();

    if (data.success) {
      showMessage(data.message, 'success');
    } else {
      showMessage('An error occurred while updating the inventory item', 'error');
    }
  } catch (error) {
    console.error('Error updating inventory item:', error);
    showMessage('An error occurred while updating the inventory item', 'error');
  }
});

function showMessage(message, type) {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.innerHTML = `<div class="${type}">${message}</div>`;
}
