async function displayOverdueItems() {
    const overdueTableBody = document.getElementById("overdueTableBody");

    overdueTableBody.innerHTML = "";

    try {
        const response = await fetch('/api/overdue-items');
        const overdueItems = await response.json();

        overdueItems.forEach(item => {
            const row = document.createElement("tr");

            const itemName = document.createElement("td");
            itemName.textContent = item.item_name;

            const checkedOutBy = document.createElement("td");
            checkedOutBy.textContent = item.student_name;

            const dueDate = document.createElement("td");
            dueDate.textContent = item.check_out_date;

            row.appendChild(itemName);
            row.appendChild(checkedOutBy);
            row.appendChild(dueDate);

            overdueTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching overdue items:', error);
    }
}
window.onload = () => {
    displayOverdueItems();
}
