const socket = io();
const updateActivityTable = (activity) => {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    activity.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Student.student_id}</td>
            <td>${item.Student.student_name} ${item.Student._name}</td>
            <td>${item.textbook_id}</td>
            <td>${item.textbook_name}</td>
            <td>${item.check_out_date}</td>
            <td>${item.check_in_date || 'Not returned'}</td>
        `;
        activityList.appendChild(row);
    });
};
socket.on('update', (data) => {
    updateActivityTable(data);
});
