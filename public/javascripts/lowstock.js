const socket = io();
socket.on('lowStockUpdate', function(lowStockItems) {
    console.log('Low stock items updated:', lowStockItems);
    const inventoryTableBody = document.getElementById('inventory-table-body');
    inventoryTableBody.innerHTML = ''; 
    lowStockItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.item_name}</td>
            <td>${item.item_quantity}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
});