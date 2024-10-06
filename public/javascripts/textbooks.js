document.addEventListener("DOMContentLoaded", function() {
    const socket = io();

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');
        });
    });

    socket.on('textbook-added', function(newTextbook) {
        const textbookHTML = generateTextbookHTML(newTextbook);
        
        const textbooksContainer = document.getElementById("textbooks-container");
        textbooksContainer.insertAdjacentHTML('beforeend', textbookHTML);
    });
    
    document.getElementById("search-bar").addEventListener("input", function() {
        var searchText = this.value.toLowerCase();
        var textbooks = document.querySelectorAll(".textbook");
        var noResultsMessage = document.getElementById("no-results-message");

        var resultsFound = false; 

        textbooks.forEach(function(textbook) {
            var title = textbook.querySelector("h2").textContent.toLowerCase();
            if (title.includes(searchText)) {
                textbook.style.display = "block";
                resultsFound = true;
            } else {
                textbook.style.display = "none";
            }
        });

        if (!resultsFound) {
            noResultsMessage.style.display = "block";
        } else {
            noResultsMessage.style.display = "none";
        }
    });

    document.querySelectorAll(".textbook-checkbox").forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            var checkedCheckboxes = document.querySelectorAll(".textbook-checkbox:checked");
            var checkInBtn = document.getElementById("check-in-btn");
            if (checkedCheckboxes.length > 0) {
                checkInBtn.disabled = false;
            } else {
                checkInBtn.disabled = true;
            }
        });
    });

    document.getElementById("close-popup").addEventListener("click", function() {
        var popupContainer = document.getElementById("popup-container");
        popupContainer.style.display = "none";
    });


    document.getElementById("check-in-btn").addEventListener("click", async function() {
        var checkedCheckboxes = document.querySelectorAll(".textbook-checkbox:checked");
        var selectedTextbooks = [];

        checkedCheckboxes.forEach(function(checkbox) {
            var textbook = checkbox.closest(".textbook");
            var title = textbook.querySelector("h2").textContent;
            var imageSrc = textbook.querySelector("img").src;
            var id = checkbox.value; 
            selectedTextbooks.push({ id: id, title: title, imageSrc: imageSrc });

            checkbox.disabled = true;

            textbook.classList.add("checked-out");
        });

        var popupContainer = document.getElementById("popup-container");
        popupContainer.style.display = "block";

        updateSelectedBooksList(selectedTextbooks);
    });

    function updateSelectedBooksList(selectedTextbooks) {
        var selectedBooksDiv = document.getElementById("selected-books");
        selectedBooksDiv.innerHTML = ""; 

        selectedTextbooks.forEach(function(book) {
            var bookDiv = document.createElement("div");
            bookDiv.classList.add("selected-book");
            bookDiv.innerHTML = `
                <img src="${book.imageSrc}" alt="${book.title}">
                <p>${book.title}</p>
            `;
            selectedBooksDiv.appendChild(bookDiv);
        });
    }

    document.getElementById("confirm-check-in").addEventListener("click", async function() {
        const selectedTextbooks = [...document.querySelectorAll(".textbook-checkbox:checked")].map(checkbox => ({
            id: checkbox.value,
            title: checkbox.closest('.textbook').querySelector('h2').textContent,
            imageSrc: checkbox.closest('.textbook').querySelector('img').src
        }));
        const checkInDate = document.getElementById("check-in-date").value;
        const checkOutDate = new Date().toISOString(); 
        
        const studentId = document.getElementById("student-id").value;
        const studentName = document.getElementById("student-name").value;

        try {
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentId, studentName, selectedTextbooks, checkInDate, checkOutDate }) 
            });
            if (response.ok) {
                displayPopupMessage("Check-Out Completed Successfully");
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Checkout Error:', error.message);
            displayPopupMessage("Error during checkout. Please try again later.");
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
});