document.addEventListener("DOMContentLoaded", function() {
    
    let keywordUrls = {
        'KCSE Made Familiar Mathematics': '/textbook1',
        'KCSE Mirror Biology': '/textbook2',
        'A+ Revision KCSE Computer Studies': '/textbook3',
        'Spot On Grammar': '/textbook4',
        'Top Mark Computer Studies': '/textbook5',
        'The A Finder CRE Revision Book': '/textbook6',
        'Test it & Fix it KCSE Physics': '/textbook7',
        'Upeo wa Insha': '/textbook8',
        'Mastering Chemistry Practicals': '/textbook9',
        'KCSE Mirror History and Government': '/textbook10',
        'Solving Problems Mathematics': '/textbook11',
        'Premier Golden Tips Agriculture': '/textbook12',
    };

    let resultsBox = document.querySelector(".result-box");
    let resultList = document.getElementById("resultList");
    let inputBox = document.getElementById("searchInput");

    inputBox.addEventListener("input", function() {
        let input = inputBox.value.trim().toLowerCase();
        if (input.length) {
            let result = Object.keys(keywordUrls).filter((keyword) => {
                return keyword.toLowerCase().includes(input);
            });
            display(result);
            resultsBox.style.display = "block";
        } else {
            resultsBox.style.display = "none";
        }
    });

    function display(result) {
        resultList.innerHTML = ""; 

        if (result.length === 0) {
            let listItem = document.createElement("li");
            listItem.textContent = "Cannot find item";
            listItem.style.textAlign = "center"; 
            listItem.style.fontStyle = "italic"; 
            listItem.style.fontWeight = "normal";
            resultList.appendChild(listItem);
        } else {
            result.forEach(keyword => {
                let listItem = document.createElement("li");
                listItem.textContent = keyword;
                resultList.appendChild(listItem);

                listItem.addEventListener("click", function() {
                    let selectedKeyword = this.textContent.trim();
                    let url = keywordUrls[selectedKeyword];
                    if (url) {
                        window.location.href = url;
                    } else {
                        console.error('Invalid keyword:', selectedKeyword);
                    }
                });
            });
        }
    }
});
