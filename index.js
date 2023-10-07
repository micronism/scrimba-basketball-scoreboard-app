const homeScoreVal = document.querySelector(".home-score-value");
const guestScoreVal = document.querySelector(".guest-score-value");
const pointButtons = document.querySelectorAll(".btn");
const newGameBtn = document.getElementById("new-game-btn");

let homeScore = 0;
let guestScore = 0;

// Add event listener
pointButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    addPoints(event);
  });
});

// Add points
function addPoints(event) {
  const targetBtn = event.target;
  const points = parseInt(targetBtn.dataset.points, 10);
  if (targetBtn.classList.contains("home")) {
    homeScore += points;
  } else if (targetBtn.classList.contains("guest")) {
    guestScore += points;
  }
  displayScore();
}

// Display score
function displayScore() {
  homeScoreVal.innerText = homeScore;
  guestScoreVal.innerText = guestScore;
  highlightGameLeader();
}

// Highlight game-leader
function highlightGameLeader() {
  if (homeScore > guestScore) {
    homeScoreVal.classList.add("highlight");
    guestScoreVal.classList.remove("highlight");
  } else if (homeScore < guestScore) {
    guestScoreVal.classList.add("highlight");
    homeScoreVal.classList.remove("highlight");
  } else {
    homeScoreVal.classList.remove("highlight");
    guestScoreVal.classList.remove("highlight");
  }
}

const countdownTimerVal = document.getElementById("countdown-timer");
let timerInterval;
let remainingTime = 12 * 60 * 1000; // 12 Minuten in ms

// Display time
function displayTime() {
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  if (seconds < 10 && minutes < 10) {
    countdownTimerVal.innerText = `0${minutes}:0${seconds}`;
  } else if (seconds < 10) {
    countdownTimerVal.innerText = `${minutes}:0${seconds}`;
  } else if (minutes < 10) {
    countdownTimerVal.innerText = `0${minutes}:${seconds}`;
  } else {
    countdownTimerVal.innerText = `${minutes}:${seconds}`;
  }
}
// Clear timer
function clearTimer() {
  clearInterval(timerInterval);
}

// Start timer
function startTimer() {
  timerInterval = setInterval(function () {
    remainingTime -= 1000; // Reduziere um 1 Sekunde
    displayTime();

    if (remainingTime <= 0) {
      clearTimer();
      countdownTimerVal.innerText = "00:00";
    }
  }, 1000);
}

displayTime();

// Add event listener
newGameBtn.addEventListener("click", function () {
  clearTimer();
  remainingTime = 12 * 60 * 1000; // Zurücksetzen auf 12 Minuten
  displayTime();
  startTimer();
  resetScore();
});

startTimer();

function resetScore() {
  homeScore = 0;
  guestScore = 0;
  displayScore();
}
