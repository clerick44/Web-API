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

//setting eventListeners
startButtonEl.addEventListener("click", initializeGame);
highScoreButtonEl.addEventListener("click", displayHighScores);
closeHighScoreButtonEl.addEventListener("click", closeHighScores);
saveInitialsButtonEl.addEventListener("click", saveInitials);

//Setting global variables
var questionIndex;
var timer;
var timeLeft;
var highScores = [];

//called by High Score button. opens and creates the highscore sheet
function displayHighScores() {
  resetHighScores();
  retrieveHighscores();
  //hides all elements except highScoreContainer
  initialsContainerEl.style.display = "none";
  saveInitialsButtonEl.style.display = "none";
  highScoreContainerEl.style.display = "block";
  //used to alternate background color in highscore list
  let evenCounter = 1;
  //creates high score list and display
  highScores.forEach((element) => {
    const scoreLine = document.createElement("li");
    var highName = element.name;
    var highScore = element.score;
    scoreLine.textContent = highName + "     -     " + highScore;
    if (evenCounter % 2 == 0) {
      scoreLine.style.backgroundColor = "coral";
    }
    highScoresEl.appendChild(scoreLine);
    evenCounter++;
  });
}

//prevents highscores being displayed again when button clicked
function resetHighScores() {
  while (highScoresEl.firstChild) {
    highScoresEl.removeChild(highScoresEl.firstChild);
  }
}

//closes/hides highscore window
function closeHighScores() {
  highScoreContainerEl.style.display = "none";
}

//called by Save button, saves score data and updatges list
function saveInitials(e) {
  var newName = initials.value;
  highScores.push({ name: newName, score: timeLeft });
  storeHighScores();
  displayHighScores();
}

//stores highScores locally
function storeHighScores() {
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

//looks for highscores in local memory and sets highscore variable
function retrieveHighscores() {
  var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
}

//called by start button; initializes timer, calls for questions to be displayed
function initializeGame() {
  //starts timer
  countdown();
  //hides elements other than quiz
  startButtonEl.style.display = "none";
  highScoreContainerEl.style.display = "none";
  questionContainerEl.style.display = "block";
  //resets question position
  questionIndex = 0;
  displayQuestion();
}

//builds quiz display
function displayQuestion() {
  // checks if on last question
  if (questionIndex >= questions.length) {
    // clearInterval(countdown);
    endGame();
  } else {
    //clears out old question and answers and calls for next question
    clearAnswers();
    questionTextEl.textContent = questions[questionIndex].question;
    questions[questionIndex].choices.forEach(makeAnswers);
  }
}

//countdown timer
function countdown() {
  timeLeft = 30;
  timer = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.textContent = timeLeft;
    } else {
      timerEl.textContent = 0;
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}

//makes buttons for answers
function makeAnswers(choice) {
  const newButton = document.createElement("button");
  newButton.textContent = choice.answer;
  newButton.className = "btn";
  newButton.dataset.correct = choice.correct;
  newButton.addEventListener("click", verifyAnswer);
  answerContainerEl.appendChild(newButton);
}

//checks for child elements of answerContainer and clears them out before building next set
function clearAnswers() {
  while (answerContainerEl.firstChild) {
    answerContainerEl.removeChild(answerContainerEl.firstChild);
  }
}

//verifies if selected answer is right or wrong
function verifyAnswer(event) {
  var clickedButton = event.target;
  //deducts 5 seconds if wrong answer
  if (clickedButton.dataset.correct === "false") {
    timeLeft = timeLeft - 5;
  }
  //calls function that changes color of choices to reflect correct/incorrect
  Array.from(answerContainerEl.children).forEach((button) => {
    showAnswer(button, button.dataset.correct);
  });
  questionIndex++;
  //sets delay to show correct answer
  setTimeout(() => {
    return displayQuestion();
  }, 750);
}

//changes answer background based on correct/incorrect
function showAnswer(button, correct) {
  if (correct == "true") {
    button.style.backgroundColor = "green";
  } else {
    button.style.backgroundColor = "red";
  }
}

//stops timer and calls for initials input
function endGame() {
  clearInterval(timer);
  timerEl.textContent = timeLeft;
  displayHighScores();
  initialsContainerEl.style.display = "block";
  saveInitialsButtonEl.style.display = "inline-block";
  highScoreContainerEl.style.display = "block";
  startButtonEl.style.display = "block";
  questionContainerEl.style.display = "none";
}
//list of all questions
const questions = [
  {
    question: "What is your quest?",
    choices: [
      { answer: "To get a snack!", correct: "false" },
      { answer: "To seek the Holy grail!", correct: "true" },
      { answer: "I'd never buy a Nissan...", correct: "false" },
      { answer: "I love lamp ", correct: "false" },
    ],
  },
  {
    question: "What is your favorite color?",
    choices: [
      { answer: "Rebecca Purple", correct: "false" },
      { answer: "Mauve", correct: "false" },
      { answer: "Red", correct: "false" },
      { answer: "Blue", correct: "true" },
    ],
  },
  {
    question: "Are you saying POW?",
    choices: [
      { answer: "yes", correct: "false" },
      { answer: "no", correct: "true" },
    ],
  },
  {
    question: "What is the capital of Assyria?",
    choices: [
      { answer: "I don't know that!", correct: "false" },
      { answer: "Assur", correct: "true" },
      { answer: "Ninevah", correct: "true" },
      { answer: "Montpilier ", correct: "false" },
    ],
  },
  {
    question: "Aren't you a little short for a Stormtrooper?",
    choices: [
      { answer: "huh?", correct: "true" },
      { answer: "no", correct: "false" },
    ],
  },
  {
    question: "Is this the last question?",
    choices: [
      { answer: "yes", correct: "false" },
      { answer: "no", correct: "true" },
    ],
  },
  {
    question: "Did we just become best friends?",
    choices: [
      { answer: "yes", correct: "false" },
      { answer: "no", correct: "false" },
      { answer: "For the love of god enough!", correct: "true" },
    ],
  },
];
