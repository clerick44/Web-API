const startButtonEl = document.querySelector("#startBtn");
const questionContainerEl = document.querySelector("#container");
const questionTextEl = document.querySelector("#question");
const answerContainerEl = document.querySelector("#answers");
const answerButtonEl = document.querySelector(".btn");

startButtonEl.addEventListener("click", initializeGame);

var questionIndex;

function initializeGame() {
  startButtonEl.style.display = "none";
  questionContainerEl.style.display = "block";
  questionIndex = 0;
  displayQuestion();
  //   questionTextEl.textContent = questions[0].question;
}

//display first question
//start timer
function displayQuestion() {
  console.log(questionIndex, questions.length);
  if (questionIndex < questions.length) {
    clearAnswers();
    questionTextEl.textContent = questions[questionIndex].question;
    questions[questionIndex].choices.forEach(makeAnswers);
  }
  endGame();
}

function makeAnswers(choice) {
  console.log(choice);
  var newButton = document.createElement("button");
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
  console.log("clicked");
  var clickedButton = event.target;
  console.log(clickedButton.dataset.correct);
  if (clickedButton.dataset.correct === "false") {
    wrongAnswer();
    return displayQuestion();
  }
  rightAnswer();
  return displayQuestion();
}

function wrongAnswer() {
  console.log("you're dumb");
  questionIndex++;
  return;
}

function rightAnswer() {
  console.log("you're smart!");
  questionIndex++;
  return;
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
