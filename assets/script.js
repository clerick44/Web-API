const startButtonEl = document.querySelector("#startBtn");
const highScoreButtonEl = document.querySelector("#highScoreBtn");
const highScoreContainerEl = document.querySelector("#highScoreContainer");
const closeHighScoreButtonEl = document.querySelector("#closeHighScore");
const saveInitialsButtonEl = document.querySelector("#saveInitials");
const questionContainerEl = document.querySelector("#container");
const questionTextEl = document.querySelector("#question");
const answerContainerEl = document.querySelector("#answers");
const answerButtonEl = document.querySelector(".btn");
const timerEl = document.querySelector("#timeLeft");
const bodyEl = document.querySelector("body");
const highScoresEl = document.querySelector("#scores");
const initialsContainerEl = document.querySelector("#scoreEntry");
const initialsText = document.querySelector("#initials");

startButtonEl.addEventListener("click", initializeGame);
highScoreButtonEl.addEventListener("click", displayHighScores);
closeHighScoreButtonEl.addEventListener("click", closeHighScores);
saveInitialsButtonEl.addEventListener("click", saveInitials);

var questionIndex;
var stopTimerFlag;
var timer;
var timeLeft;
var highScores = [];

// var highScores = [
//   { name: "jesse", score: "28" },
//   { name: "Lisa", score: "21" },
//   { name: "bill", score: "19" },
// ];

window.onload = function () {
  var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }
  console.log(highScores);
};

function displayHighScores() {
  resetHighScores();
  initialsContainerEl.style.display = "none";
  saveInitialsButtonEl.style.display = "none";
  highScoreContainerEl.style.display = "block";
  let evenCounter = 1;
  highScores.forEach((element) => {
    const scoreLine = document.createElement("li");
    const highName = element.name;
    const highScore = element.score;
    scoreLine.textContent = highName + "     -     " + highScore;
    if (evenCounter % 2 == 0) {
      scoreLine.style.backgroundColor = "coral";
    }
    highScoresEl.appendChild(scoreLine);
    evenCounter++;
  });
}

function resetHighScores() {
  while (highScoresEl.firstChild) {
    highScoresEl.removeChild(highScoresEl.firstChild);
  }
}

function closeHighScores() {
  highScoreContainerEl.style.display = "none";
}

function saveInitials(e) {
  e.preventDefault();
  var newName = initials.textContent;
  console.log(newName);
  // highScores =
  //   highScores +
  //   { Name: , Score: timeLeft };
  displayHighScores();
}

function initializeGame() {
  countdown();
  startButtonEl.style.display = "none";
  highScoreContainerEl.style.display = "none";
  questionContainerEl.style.display = "block";
  questionIndex = 0;
  displayQuestion();
}

function displayQuestion() {
  bodyEl.style.backgroundColor = "coral";
  if (questionIndex >= questions.length) {
    // clearInterval(countdown);
    endGame();
  } else {
    clearAnswers();
    questionTextEl.textContent = questions[questionIndex].question;
    questions[questionIndex].choices.forEach(makeAnswers);
  }
}

function countdown() {
  timeLeft = 30;
  timer = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = 0;
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}

function makeAnswers(choice) {
  const newButton = document.createElement("button");
  newButton.textContent = choice.answer;
  newButton.className = "btn";
  newButton.dataset.correct = choice.correct;
  newButton.addEventListener("click", verifyAnswer);
  answerContainerEl.appendChild(newButton);
}

function clearAnswers() {
  while (answerContainerEl.firstChild) {
    answerContainerEl.removeChild(answerContainerEl.firstChild);
  }
}

function verifyAnswer(event) {
  var clickedButton = event.target;
  if (clickedButton.dataset.correct === "false") {
    timeLeft = timeLeft - 5;
  }
  Array.from(answerContainerEl.children).forEach((button) => {
    showAnswer(button, button.dataset.correct);
  });
  questionIndex++;
  setTimeout(() => {
    return displayQuestion();
  }, 1000);
}

function showAnswer(button, correct) {
  if (correct == "true") {
    button.style.backgroundColor = "green";
  } else {
    button.style.backgroundColor = "red";
  }
}

function endGame() {
  clearInterval(timer);
  // initialsContainerEl.style.display = "none";
  // initialsContainerEl.style.display = "block";
  // saveInitialsButtonEl.style.display = "inline-block";
  displayHighScores();
  initialsContainerEl.style.display = "block";
  saveInitialsButtonEl.style.display = "inline-block";
  highScoreContainerEl.style.display = "block";
}

const questions = [
  {
    question: "Who is your favorite Beatle?",
    choices: [
      { answer: "blue", correct: "false" },
      { answer: "green", correct: "true" },
      { answer: "yellow", correct: "false" },
      { answer: "purple", correct: "false" },
    ],
  },
  {
    question: "are you tall?",
    choices: [
      { answer: "yes", correct: "false" },
      { answer: "no", correct: "true" },
      { answer: "probably?", correct: "false" },
      { answer: "you're dumb", correct: "false" },
    ],
  },
];
