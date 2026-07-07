const attemptId = window.location.pathname.split("/").pop();
let attempt;
let responses = [];
let currentQuestion = 0;

async function loadReview() {
    try {
        const response = await fetch(`/api/review/${attemptId}`);
        if (!response.ok) {
            throw new Error("Unable to fetch review");
        }
        attempt = await response.json();
        responses = attempt.responses;
        document.getElementById("testTitle").textContent =
            attempt.testId.title;
        document.getElementById("score").textContent =
            `${attempt.score} / ${attempt.testId.totalMarks}`;
        document.getElementById("correctCount").textContent =
            attempt.correctAnswers;
        document.getElementById("wrongCount").textContent =
            attempt.incorrectAnswers;
        document.getElementById("unattemptedCount").textContent =
            attempt.unanswered;
        displayQuestion();
        displayPalette();
    }
    catch (error) {
        console.log(error);
        alert("Unable to load review.");
    }
}
function displayQuestion() {
    const response = responses[currentQuestion];
    const question = response.questionId;
    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${responses.length}`;
    document.getElementById("questionText").textContent =
        question.questionText;
    const statusBadge = document.getElementById("questionStatus");
    if (response.selectedAnswer === null) {
        statusBadge.textContent = "Not Attempted";
        statusBadge.className = "status-badge unanswered";
    }
    else if (response.selectedAnswer === question.correctAnswer) {
        statusBadge.textContent = "Correct";
        statusBadge.className = "status-badge correct";
    }
    else {
        statusBadge.textContent = "Incorrect";
        statusBadge.className = "status-badge incorrect";
    }
    const optionsContainer = document.querySelector(".options");
    optionsContainer.innerHTML = "";
    if (question.questionType === "MCQ") {
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.classList.add("option");
            if (index === question.correctAnswer) {
                optionDiv.classList.add("correct-option");
            }
            if (
                response.selectedAnswer === index &&
                response.selectedAnswer !== question.correctAnswer
            ) {
                optionDiv.classList.add("wrong-option");
            }
            optionDiv.textContent = option;
            optionsContainer.appendChild(optionDiv);
        });
    }
    else {
        optionsContainer.innerHTML = "";
    }
    if (response.selectedAnswer === null) {
        document.getElementById("yourAnswer").textContent =
            "Not Attempted";
    }
    else if (question.questionType === "MCQ") {
        document.getElementById("yourAnswer").textContent =
            question.options[response.selectedAnswer];
    }
    else {
        document.getElementById("yourAnswer").textContent =
            response.selectedAnswer;
    }
    if (question.questionType === "MCQ") {
        document.getElementById("correctAnswer").textContent =
            question.options[question.correctAnswer];
    }
    else {
        document.getElementById("correctAnswer").textContent =
            question.correctAnswer;
    }
    let marks = 0;
    if (response.selectedAnswer === null) {
        marks = 0;
    }
    else if (response.selectedAnswer === question.correctAnswer) {
        marks = question.positiveMarks;
    }
    else {
        marks = question.negativeMarks;
    }
    document.getElementById("marksAwarded").textContent =
        marks > 0 ? `+${marks}` : marks;
    document.getElementById("previousBtn").disabled =
        currentQuestion === 0;
    document.getElementById("nextBtn").disabled =
        currentQuestion === responses.length - 1;

}
function displayPalette() {
    const palette = document.getElementById("palette");
    palette.innerHTML = "";
    responses.forEach((response, index) => {
        const button = document.createElement("button");
        button.textContent = index + 1;
        if (index === currentQuestion) {
            button.classList.add("current");
        }
        else if (response.selectedAnswer === null) {
            button.classList.add("unanswered");
        }
        else if (
            response.selectedAnswer ===
            response.questionId.correctAnswer
        ) {
            button.classList.add("correct");
        }
        else {
            button.classList.add("incorrect");
        }
        button.addEventListener("click", () => {
            currentQuestion = index;
            displayQuestion();
            displayPalette();
        });
        palette.appendChild(button);
    });
}
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        displayPalette();
    }
}
function nextQuestion() {
    if (currentQuestion < responses.length - 1) {
        currentQuestion++;
        displayQuestion();
        displayPalette();
    }
}
async function init() {
    await loadReview();
}

init();

document.getElementById("previousBtn")
    .addEventListener("click", previousQuestion);
document.getElementById("nextBtn")
    .addEventListener("click", nextQuestion);
document.getElementById("resultBtn").addEventListener("click", () => {
        history.back();
    });