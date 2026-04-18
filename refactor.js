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

const state = {
  screen: "start",
  currentQuestion: 0,
  score: 0,
  answered: false,
};

function render() {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");

  if (state.screen === "start") {
    startScreen.classList.add("active");
  }

  if (state.screen === "quiz") {
    quizScreen.classList.add("active");
    renderQuestion();
  }

  if (state.screen === "result") {
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = state.score;
    maxScoreSpan.textContent = quizQuestions.length;
  }
}

function startQuiz() {
  state.screen = "quiz";
  state.currentQuestion = 0;
  state.score = 0;
  state.answered = false;

  render();
}

function selectAnswer(answer, button) {
  if (state.answered) return;

  state.answered = true;

  if (answer.correct) {
    state.score++;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  state.currentQuestion++;
  state.answered = false;

  if (state.currentQuestion >= quizQuestions.length) {
    state.screen = "result";
  }

  render();
}

restartButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startQuiz);
