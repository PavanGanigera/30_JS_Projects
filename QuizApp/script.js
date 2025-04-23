
const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Madrid", "Paris", "Berlin", "Rome"],
    correct: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Mars"
  },
  {
    question: "What is the largest ocean?",
    answers: ["Indian", "Atlantic", "Arctic", "Pacific"],
    correct: "Pacific"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const scoreText = document.getElementById("scoreText");

function showQuestion() {
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;

  answersEl.innerHTML = "";
  current.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.className = "bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg cursor-pointer transition duration-200 ease-in-out";
    btn.onclick = () => checkAnswer(answer);
    answersEl.appendChild(btn);
  });

  nextBtn.disabled = true;
  nextBtn.classList.add("opacity-50", "cursor-not-allowed");
}

function checkAnswer(selected) {
  const current = quizData[currentQuestion];
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === current.correct) {
      btn.classList.add("bg-green-500");
    } else if (btn.textContent === selected) {
      btn.classList.add("bg-red-500");
    }
  });

  if (selected === current.correct) score++;

  nextBtn.disabled = false;
  nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;
  }
});

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  showQuestion();
}

showQuestion();
