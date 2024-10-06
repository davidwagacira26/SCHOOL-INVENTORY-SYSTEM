const socket = io();
socket.on('connect', function() {
    console.log('Socket.IO connection established successfully');
});
socket.on('connect_error', function(error) {
    console.error('Socket.IO connection error:', error);
});
socket.on('recent-activity-update', function(activity) {
    console.log('Recent activity update received:', activity);
    const activityList = document.getElementById('activity-list');
    const listItem = document.createElement('tr');
    listItem.innerHTML = `
        <td>${activity.student_id}</td>
        <td>${activity.student_name}</td>
        <td>${activity.item_id}</td>
        <td>${activity.item_name}</td>
        <td>${activity.check_out_date}</td>
        <td>${activity.check_in_date || 'Not returned'}</td>
    `;
    activityList.appendChild(listItem);
});
