const startButtonEl = document.querySelector("#startBtn");
const highScoreButtonEl = document.querySelector("#highScoreBtn");
const questionContainerEl = document.querySelector("#container");
const questionTextEl = document.querySelector("#question");
const answerContainerEl = document.querySelector("#answers");
const answerButtonEl = document.querySelector(".btn");
const timerEl = document.querySelector("#timeLeft");
const bodyEl = document.querySelector("body");
const highScoresEl = document.querySelector("#scores");

startButtonEl.addEventListener("click", initializeGame);
highScoreButtonEl.addEventListener("click", displayHighScores);

var questionIndex;
var timeLeft;
var timerFlag;

var highScores = [
  { name: "jesse", score: "28" },
  { name: "Lisa", score: "21" },
];

function displayHighScores() {
  let evenCounter = 1;
  console.log(evenCounter);
  highScores.forEach((element) => {
    // console.log(element);
    const scoreLine = document.createElement("li");
    const highName = element.name;
    const highScore = element.score;
    scoreLine.textContent = highName + "     " + highScore;
    if (evenCounter % 2 == 0) {
      console.log(evenCounter);
      scoreLine.style.backgroundColor = "coral";
    }
    highScoresEl.appendChild(scoreLine);
    evenCounter++;
  });
}

function initializeGame() {
  countdown();
  startButtonEl.style.display = "none";
  questionContainerEl.style.display = "block";
  questionIndex = 0;
  displayQuestion();
}

//display first question
//start timer
function displayQuestion() {
  bodyEl.style.backgroundColor = "coral";
  // console.log(questionIndex, questions.length);
  if (questionIndex < questions.length) {
    clearAnswers();
    questionTextEl.textContent = questions[questionIndex].question;
    questions[questionIndex].choices.forEach(makeAnswers);
  }
  endGame();
}

function countdown() {
  timeLeft = 30;
  var timer = setInterval(function () {
    if (timeLeft > 10) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else if (timeLeft < 10 && timeLeft > 0) {
      timerEl.style.backgroundColor = "red";
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = 0;
      clearInterval(countdown);
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

function endGame() {}

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
