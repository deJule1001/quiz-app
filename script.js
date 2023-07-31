let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
  {
    id: "1",
    question: "Which is the most spoken language in the world?",
    options: ["German", "English", "Mandarin"],
    correct: "Mandarin",
  },
  {
    id: "2",
    question: "What is the tallest mountain in the world?",
    options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
    correct: "Mount Everest",
  },
  {
    id: "3",
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Elephant", "Lion", "Giraffe"],
    correct: "Lion",
  },
  {
    id: "4",
    question: "What is the largest species of shark?",
    options: ["Great White Shark", "Hammerhead Shark", "Whale Shark"],
    correct: "Whale Shark",
  },
  {
    id: "5",
    question: "Which flower is often associated with the Netherlands?",
    options: ["Sunflower", "Tulip", "Rose"],
    correct: "Tulip",
  },
];

// Funktion zum Starten des Quiz
function startQuiz() {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  timerDisplay();
  quizDisplay(questionCount);
  nextBtn.classList.remove("hide");
}

// Funktion zum Anzeigen des Timers
function timerDisplay() {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      checkAnswer();
      showNextButton();
    }
  }, 1000);
}

// Funktion zum Anzeigen der Quiz-Frage und Antworten
function quizDisplay(questionCount) {
  let currentQuestion = quizArray[questionCount];
  countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Questions`;
  quizContainer.innerHTML = `
    <p class="question">${currentQuestion.question}</p>
    <button class="option-div" onclick="checker(this)">${currentQuestion.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${currentQuestion.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${currentQuestion.options[2]}</button>
  `;
}

// Funktion zum Überprüfen der Benutzerantwort
function checker(userOption) {
  let userSolution = userOption.innerText;
  let currentQuestion = quizArray[questionCount];
  let options = quizContainer.querySelectorAll(".option-div");

  options.forEach((element) => {
    element.disabled = true;
  });

  if (userSolution === currentQuestion.correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    options.forEach((element) => {
      if (element.innerText === currentQuestion.correct) {
        element.classList.add("correct");
      }
    });
    userOption.classList.add("incorrect");
  }

  showNextButton();
}

// Funktion zum Anzeigen des "Next" Buttons
function showNextButton() {
  nextBtn.classList.remove("hide");
}

// Funktion zum Verstecken des "Next" Buttons
function hideNextButton() {
  nextBtn.classList.add("hide");
}

// Funktion zum Fortfahren zur nächsten Frage
function nextQuestion() {
  hideNextButton();
  questionCount++;
  if (questionCount < quizArray.length) {
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizDisplay(questionCount);
  } else {
    showResult();
  }
}

// Funktion zum Anzeigen des Quiz-Ergebnisses
function showResult() {
  displayContainer.classList.add("hide");
  scoreContainer.classList.remove("hide");

  let summaryMessage;
  if (scoreCount < 2) {
    summaryMessage = "Better practice. Your answers are weak.";
  } else {
    summaryMessage = "Great, you answered a lot correct! Good job!";
  }

  userScore.innerHTML = `Your score: ${scoreCount} of ${quizArray.length} Questions correct.<br>${summaryMessage}`;
}

// Funktion zum Neustart des Quiz
function restartQuiz() {
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  hideNextButton();

  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
  scoreContainer.classList.add("hide");
  userScore.innerHTML = "";

  let options = quizContainer.querySelectorAll(".option-div");
  options.forEach((element) => {
    element.disabled = false;
    element.classList.remove("correct");
    element.classList.remove("incorrect");
  });

  shuffleArray(quizArray);
}

// Funktion zum Mischen des Quiz-Arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Event-Listener für den Start-Button
startButton.addEventListener("click", startQuiz);

// Event-Listener für den "Next" Button
nextBtn.addEventListener("click", nextQuestion);

// Event-Listener für den "Restart" Button
restart.addEventListener("click", () => {
  restartQuiz();
  timerDisplay();
  quizDisplay(questionCount);
});
