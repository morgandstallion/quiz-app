// DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const exitQuiz = document.getElementById("exit-quiz");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// GLOBAL VARS
let currentQuestionIndex = 0;

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// START GAME
startButton.addEventListener("click", () => {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
});

// EXIT QUIZ EARLY
exitQuiz.addEventListener("click", () => {
  startScreen.classList.add("active");
  quizScreen.classList.remove("active");

  currentQuestionIndex = 0;
  currentQuestionSpan.textContent = 1;
  scoreSpan.textContent = 0;
  answersContainer.innerHTML = "";
  addQuizQuestion(currentQuestionIndex);
  progressBar.style.width = 0;
});

// ADD QUIZ QUESTIONS
function addQuizQuestion(currentQuestionIndex) {
  questionText.textContent = quizQuestions[currentQuestionIndex].question;

  totalQuestionsSpan.textContent = quizQuestions.length;

  const questionBox = document.createElement("div");
  questionBox.classList.add("question-box");

  quizQuestions[currentQuestionIndex].answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;

    button.dataset.correct = answer.correct;

    questionBox.appendChild(button);
  });

  answersContainer.appendChild(questionBox);
}
addQuizQuestion(currentQuestionIndex);

answersContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("answer-btn")) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";

    // Disable all buttons after one is clicked
    let allButtons = answersContainer.querySelectorAll(".answer-btn");
    allButtons.forEach((btn) => {
      btn.disabled = true;
    });

    if (isCorrect) {
      scoreSpan.textContent = Number(scoreSpan.textContent) + 1;
      selectedBtn.classList.add("correct");
    } else {
      selectedBtn.classList.add("incorrect");

      allButtons.forEach((btn) => {
        if (btn.dataset.correct === "true") {
          btn.classList.add("correct");
        }
      });
    }
  }

  // UPDATE UI

  setTimeout(() => {
    currentQuestionIndex++;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    if (currentQuestionIndex < quizQuestions.length) {
      answersContainer.innerHTML = "";
      currentQuestionSpan.textContent = currentQuestionIndex + 1;
      addQuizQuestion(currentQuestionIndex);
    } else {
      setTimeout(() => {
        quizScreen.classList.remove("active");
        resultScreen.classList.add("active");

        // CALCULATE SCORE
        finalScoreSpan.textContent = scoreSpan.textContent;
        maxScoreSpan.textContent = quizQuestions.length;

        const percentage = (scoreSpan.textContent / quizQuestions.length) * 100;
        if (percentage === 100) {
          resultMessage.textContent = "Perfect! You're a genius!";
        } else if (percentage >= 80) {
          resultMessage.textContent = "Great job! You know your stuff!";
        } else if (percentage >= 60) {
          resultMessage.textContent = "Good effort! Keep learning!";
        } else if (percentage >= 40) {
          resultMessage.textContent = "Not bad! Try again to improve!";
        } else {
          resultMessage.textContent = "Keep studying! You'll get better!";
        }
      }, 500);
    }
  }, 1000);
});

// RESTART QUIZ
restartButton.addEventListener("click", () => {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");

  currentQuestionIndex = 0;
  currentQuestionSpan.textContent = 1;
  scoreSpan.textContent = 0;
  answersContainer.innerHTML = "";
  addQuizQuestion(currentQuestionIndex);
  progressBar.style.width = 0;
});
