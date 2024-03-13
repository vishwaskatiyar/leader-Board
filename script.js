let leaderboardData = [
    { rank: 1, username: "Rohit", country: "India", score: 100, Time: "Jan 2018 ,10:20" },
    { rank: 2, username: "Virat", country: "India", score: 90, Time: "Jan 2018 ,10:20" },
    { rank: 3, username: "Jadeja", country: "India", score: 80, Time: "Jan 2018 ,10:20" },
    { rank: 4, username: "MD Shami", country: "India", score: 70, Time: "Jan 2018 ,10:20" },
    { rank: 5, username: "Dhoni", country: "India", score: 60, Time: "Jan 2018 ,10:20" },
];

// Function to render leaderboard with animation
function renderLeaderboardWithAnimation() {
    const leaderboardBody = document.getElementById("leaderboardBody");
    leaderboardBody.innerHTML = ""; // Clear previous data
    leaderboardData.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                        <td>${entry.rank}</td>
                        <td>${entry.username}</td>
                        <td>${entry.score}</td>
                        <td>${entry.country}</td>
                        
                        <td>
                            <button onclick="deleteEntry(${entry.rank})">Delete</button>
                            <button onclick="changeScore(${entry.rank}, 5)">+5</button>
                            <button onclick="changeScore(${entry.rank}, -5)">-5</button>
                        </td>
                        <td>${entry.Time}</td>
                    `;
        row.classList.add("fade-in"); // Add fade-in animation class
        leaderboardBody.appendChild(row);
    });
}

// Function to generate month year time
function generateMonthYear() {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${month} ${year},${hours}:${minutes}`;
}

// Function to add entry to the leaderboard with animation
document
    .getElementById("button1")
    .addEventListener("click", function addEntryWithAnimation() {
        const usernameInput = document.getElementById("username");
        const scoreInput = document.getElementById("score");
        const countryInput = document.getElementById("country");

        const username = usernameInput.value.trim();
        const score = parseInt(scoreInput.value.trim());
        const country = countryInput.value.trim();
        const usernameStartsWithNumber = /^\d/.test(username);
        // Regular expression to check if the country name starts with a number
        const countryStartsWithNumber = /^\d/.test(country);

        if (usernameStartsWithNumber || countryStartsWithNumber) {
            alert("Username or Country name cannot start with a number.");
            return;
        }

        if (username === "" || isNaN(score) || score < 0 || country === "") {
            alert("Please enter valid data for username, score, and country.");
            return;
        }

        const Time = generateMonthYear();

        leaderboardData.push({ rank: leaderboardData.length + 1, username, score, country, Time });
        sortLeaderboard(); // Sort leaderboard data
        updateRanks(); // Update ranks
        renderLeaderboardWithAnimation();
        usernameInput.value = "";
        scoreInput.value = "";
        countryInput.value = "";
    });


// Function to delete entry from the leaderboard
function deleteEntry(rank) {
    leaderboardData = leaderboardData.filter((entry) => entry.rank !== rank);
    sortLeaderboard(); // Sort leaderboard data
    updateRanks(); // Update ranks
    renderLeaderboardWithAnimation(); // Re-render the leaderboard with animation
}

// Fu

// Function to change score
function changeScore(rank, delta) {
    const entry = leaderboardData.find((entry) => entry.rank === rank);
    if (entry) {
        entry.score += delta;

        if (entry.score < 0) {
            deleteEntryWithAnimation(entry.rank);
        }
        sortLeaderboard(); // Sort leaderboard data
        updateRanks(); // Update leaderboard
        renderLeaderboardWithAnimation();
    }
}

// Function to sort leaderboard data
function sortLeaderboard() {
    leaderboardData.sort((a, b) => b.score - a.score || a.rank - b.rank);
}

// Function to update ranks
function updateRanks() {
    leaderboardData.forEach((entry, index) => {
        entry.rank = index + 1;
    });
}

// Call renderLeaderboard function to initially render the leaderboard
renderLeaderboardWithAnimation();
// ................................................

// Function to show country dropdown
function showCountryDropdown() {
    const countryInput = document.getElementById("country");
    const countryDropdown = document.getElementById("countryDropdown");
    countryDropdown.innerHTML = ""; // Clear previous dropdown items

    // List of countries
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic",
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
        "Fiji", "Finland", "France",
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
        "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
        "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
        "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
        "Oman",
        "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
        "Qatar",
        "Romania", "Russia", "Rwanda",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
        "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
        "Yemen",
        "Zambia", "Zimbabwe"
    ];

    countries.forEach(country => {
        const option = document.createElement("div");
        option.textContent = country;
        option.classList.add("dropdown-option"); // Add class for styling
        countryDropdown.appendChild(option);
    });

    // Show dropdown
    countryDropdown.classList.add("show");

    // Add event listener to dropdown options
    const dropdownOptions = document.querySelectorAll(".dropdown-option");
    dropdownOptions.forEach(option => {
        option.addEventListener("click", function () {
            countryInput.value = option.textContent;
            countryDropdown.innerHTML = ""; // Hide dropdown after selection
        });
    });
}

// Function to hide country dropdown when clicking outside
window.addEventListener("click", function (event) {
    const countryInput = document.getElementById("country");
    if (!event.target.matches('#country')) {
        const countryDropdown = document.getElementById("countryDropdown");
        countryDropdown.innerHTML = ""; // Hide dropdown
    }
});

// Add event listener to input field to trigger dropdown
document.getElementById("country").addEventListener("click", showCountryDropdown);
