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
