// Welcome Page Elements =====================================
var welcomeEl = document.querySelector("#welcome");
var startQuizBtnEl = document.querySelector("#startQuiz");

//Quiz Page Elements =========================================
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");

//Input Score Page Elements ==================================
var inputScoreEl = document.querySelector("#inputScore");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtnEl = document.querySelector("#submitInitials");
var userScoreEl = document.querySelector("#score");

//View High Scores Page Elements =============================
var highScoresEl = document.querySelector("#highScores");
var scoresEl = document.querySelector("#scores");
var goBackBtnEl = document.querySelector("#goBack");
var clearScoresBtnEl = document.querySelector("#clearScores");

//Universal vars =============================================
var showHighScoresBtnEl = document.querySelector("#showHighScores");
var timerEl = document.querySelector("#timer");
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 75;
var secondsElapsed = 0;

//starts and updates timer
function startTimer() {
  timerEl.textContent = timeGiven;
  interval = setInterval(function () {
    secondsElapsed++;
    timerEl.textContent = timeGiven - secondsElapsed;
    if (secondsElapsed >= timeGiven) {
      currentQ = questions.length;
      nextQuestion();
    }
  }, 1000);
}

//stops timer
function stopTimer() {
  clearInterval(interval);
}

//Clears current question and calls for display of next question
//Calls for input score display if last question
function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    renderQuestion();
  } else {
    stopTimer();
    if (timeGiven - secondsElapsed > 0) score += timeGiven - secondsElapsed;
    userScoreEl.textContent = score;
    hide(quizEl);
    show(inputScoreEl);
    timerEl.textContent = 0;
  }
}

//checks answer based on current question and updates the user score
function checkAnswer(answer) {
  if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
    score += 5;
    displayMessage("Correct!");
  } else {
    secondsElapsed += 10;
    displayMessage("Wrong...");
  }
}

//displays a message for 2 seconds
function displayMessage(m) {
  let messageHr = document.createElement("hr");
  let messageEl = document.createElement("div");
  messageEl.textContent = m;
  document.querySelector(".jumbotron").appendChild(messageHr);
  document.querySelector(".jumbotron").appendChild(messageEl);
  setTimeout(function () {
    messageHr.remove();
    messageEl.remove();
  }, 2000);
}

//hides element
function hide(element) {
  element.style.display = "none";
}

//displays element
function show(element) {
  element.style.display = "block";
}

//reset local variables
function reset() {
  score = 0;
  currentQ = 0;
  secondsElapsed = 0;
  timerEl.textContent = 0;
}
