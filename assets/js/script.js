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
var viewHighScoresBtnEl = document.querySelector("#viewHScores");
var timerEl = document.querySelector("#timer");
var score = 0;
var currentQuestion = 0;
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
      currentQuestion = questions.length;
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
  currentQuestion++;
  if (currentQuestion < questions.length) {
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
  if (
    questions[currentQuestion].answer ==
    questions[currentQuestion].choices[answer.id]
  ) {
    score += 5;
    displayMessage("Correct!");
  } else {
    secondsElapsed += 10;
    displayMessage("Wrong...");
  }
}

//displays a message for 0.65 seconds
function displayMessage(m) {
  let messageHr = document.createElement("hr");
  let messageEl = document.createElement("div");
  messageEl.textContent = m;
  document.querySelector(".jumbotron").appendChild(messageHr);
  document.querySelector(".jumbotron").appendChild(messageEl);
  setTimeout(function () {
    messageHr.remove();
    messageEl.remove();
  }, 650);
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
  currentQuestion = 0;
  secondsElapsed = 0;
  timerEl.textContent = 0;
}

//=================== Rendering ================================

//Renders current question
function renderQuestion() {
  questionEl.textContent = questions[currentQuestion].title;
  for (i = 0; i < answersEl.children.length; i++) {
    answersEl.children[i].children[0].textContent = `${i + 1}: ${
      questions[currentQuestion].choices[i]
    }`;
  }
}

//Renders high scores stored in local storage
function renderHighScores() {
  // Clear content
  scoresEl.innerHTML = "";
  show(highScoresEl);
  highScores = JSON.parse(localStorage.getItem("scores"));
  for (let i = 0; i < highScores.length; i++) {
    let scoreItem = document.createElement("div");
    scoreItem.className += "row mb-3 p-2";
    console.log(scoreItem);
    scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
    scoreItem.textContent = `${i + 1}. ${highScores[i].username} - ${
      highScores[i].userScore
    }`;
    scoresEl.appendChild(scoreItem);
  }
}

//=========================EVENTS================================

//displays high scores
viewHighScoresBtnEl.addEventListener("click", function () {
  hide(welcomeEl);
  hide(quizEl);
  hide(inputScoreEl);
  renderHighScores();
  stopTimer();
  reset();
});

//starts quiz from  Welcome page
startQuizBtnEl.addEventListener("click", function () {
  hide(welcomeEl);
  startTimer();
  renderQuestion();
  show(quizEl);
});

//Calls to check answer selected and calls to next question if button is clicked
answersEl.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    checkAnswer(e.target);
    nextQuestion();
  }
});

//Creates a user score object to push to the local storage scores array calls to display high scores
//calls to render high scores
submitInitialsBtnEl.addEventListener("click", function () {
  let initValue = initialsEl.value.trim();
  if (initValue) {
    let userScore = { username: initValue, userScore: score };
    initialsEl.value = "";
    highScores = JSON.parse(localStorage.getItem("scores")) || [];
    highScores.push(userScore);
    localStorage.setItem("scores", JSON.stringify(highScores));
    hide(inputScoreEl);
    renderHighScores();
    reset();
  }
});

//Goes back to Welcome page from High scores
goBackBtnEl.addEventListener("click", function () {
  hide(highScoresEl);
  show(welcomeEl);
});

//Clears saved scores from local storage
clearScoresBtnEl.addEventListener("click", function () {
  highScores = [];
  localStorage.setItem("scores", JSON.stringify(highScores));
  renderHighScores();
});
