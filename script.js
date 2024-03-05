let leaderboardData = [
    { rank: 1, username: "Rohit", country: "India", score: 100 },
    { rank: 2, username: "Virat", country: "India", score: 90 },
    { rank: 3, username: "Jadeja", country: "India", score: 80 },
    { rank: 4, username: "MD Shami", country: "India", score: 70 },
    { rank: 5, username: "Dhoni", country: "India", score: 60 },
];

// Function to render leaderboard
function renderLeaderboard() {
    const leaderboardBody = document.getElementById("leaderboardBody");
    console.log(leaderboardBody);
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
                    `;
        leaderboardBody.appendChild(row);
    });
}

// Function to add entry to the leaderboard
document
    .getElementById("button1")
    .addEventListener("click", function addEntry() {
        const usernameInput = document.getElementById("username");
        console.log(usernameInput);
        const scoreInput = document.getElementById("score");
        console.log(scoreInput);
        const countryInput = document.getElementById("country");
        console.log(countryInput);

        const username = usernameInput.value.trim();
        const score = parseInt(scoreInput.value.trim());
        const country = countryInput.value.trim();
        const letter = parseInt(username.charAt(0));
        const countryL = parseInt(country.charAt(0));

        if (isNaN(letter) || isNaN(countryL)) {
            if (username === "" || isNaN(score) || score < 0 || country === "") {
                alert("Please enter valid data for username, score, and country.");
                return;
            }
        } else {
            alert("Username or Country name  cannot start with a number.");
            return;
        }
        leaderboardData.push({ username, score, country });
        sortLeaderboard(); // Sort leaderboard data
        updateRanks(); // Update ranks
        renderLeaderboard();
        usernameInput.value = "";
        scoreInput.value = "";
        countryInput.value = "";
    });

// Function to delete entry from the leaderboard
function deleteEntry(rank) {
    leaderboardData = leaderboardData.filter((entry) => entry.rank !== rank);
    sortLeaderboard(); // Sort leaderboard data
    updateRanks(); // Update ranks
    renderLeaderboard();
}

// Function to change score
function changeScore(rank, delta) {
    const entry = leaderboardData.find((entry) => entry.rank === rank);
    if (entry) {
        entry.score += delta;

        if (entry.score < 0) {
            deleteEntry(entry.rank);
        }
        sortLeaderboard(); // Sort leaderboard data
        updateRanks(); // Update ranks
        renderLeaderboard();
    }
}

// Function to sort leaderboard data
function sortLeaderboard() {
    leaderboardData.sort((a, b) => b.score - a.score || a.rank - b.rank);
}

// // Function to update ranks
function updateRanks() {
    leaderboardData.forEach((entry, index) => {
        entry.rank = index + 1;
    });
}

// // Call renderLeaderboard function to initially render the leaderboard
renderLeaderboard();
