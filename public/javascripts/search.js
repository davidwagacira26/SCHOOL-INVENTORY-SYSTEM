document.getElementById("searchButton").addEventListener("click", function() {
    var searchTerm = document.getElementById("searchInput").value;
    alert("Performing search for: " + searchTerm);
});
document.getElementById('filterButton').addEventListener('click', function() {
        var filterOptions = document.getElementById('filterOptions');
        if (filterOptions.style.display === 'none') {
            filterOptions.style.display = 'block';
        } else {
            filterOptions.style.display = 'none';
        }
    });