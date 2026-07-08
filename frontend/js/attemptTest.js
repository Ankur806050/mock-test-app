const test = JSON.parse(localStorage.getItem("selectedTest"));
if(!test){
    window.location.href="/tests";
}
document.getElementById("testTitle").textContent = test.title;
let questions = [];
let currentQuestion = 0;
let responses = [];
let timeLeft = test.duration * 60;
let timerInterval;
let submitted = false;

async function loadQuestions(){
    try{
        const response = await fetch(`/questions/${test._id}`);
        questions = await response.json();
        responses = questions.map(() => ({
            answer: null,
            status: "not-visited"
        }));
    }catch(error){
        showToast("Unable to load questions","error");;
    }
}

function displayQuestion() {
    if (responses[currentQuestion].status === "not-visited") {
        responses[currentQuestion].status = "not-answered";
    }
    const question = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Question ${question.questionNumber} of ${questions.length}`;

    document.getElementById("questionText").textContent =
        question.questionText;

    const optionsContainer = document.querySelector(".options");

    optionsContainer.innerHTML = "";

    if (question.questionType === "MCQ") {
        question.options.forEach((option, index) => {

            const label = document.createElement("label");
            label.classList.add("option");

            label.innerHTML = `
                <input
                    type="radio"
                    name="answer"
                    value="${index}"
                >
                <span>${option}</span>
            `;
            label.querySelector("input").addEventListener("change", () => {
                document.getElementById("clearBtn").disabled = false;
            });
            optionsContainer.appendChild(label);

        });
        // Restore saved answer
        if (responses[currentQuestion].answer !== null) {

            const radio = document.querySelector(
                `input[name="answer"][value="${responses[currentQuestion].answer}"]`
            );

            if (radio) {
                radio.checked = true;
            }

        }
    }
    else {
        optionsContainer.innerHTML = `
            <input
                type="number"
                id="numericalAnswer"
                placeholder="Enter your answer"
            >
        `;
        const numericalInput = document.getElementById("numericalAnswer");
        numericalInput.addEventListener("input", () => {
            document.getElementById("clearBtn").disabled = false;
        });
        // Restore saved numerical answer
        if (responses[currentQuestion].answer !== null) {
            document.getElementById("numericalAnswer").value =
                responses[currentQuestion].answer

        }
    }
    const previousBtn = document.getElementById("previousBtn");
    if (currentQuestion === 0) {
        previousBtn.disabled = true;
    } else {
        previousBtn.disabled = false;
    }
    const nextBtn = document.getElementById("nextBtn");
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Save & Submit Test";
    } else {
        nextBtn.textContent = "Save & Next";
    }
    const clearBtn = document.getElementById("clearBtn");
    if (responses[currentQuestion].answer === null) {
        clearBtn.disabled = true;
    }
    else {
        clearBtn.disabled = false;
    }
}

function displayPalette() {
    const palette = document.getElementById("palette");
    palette.innerHTML = "";
    responses.forEach((response, index) => {
        const button = document.createElement("button");
        button.textContent = index + 1;
        // Current Question
        if (index === currentQuestion) {
            button.classList.add("current");
        }
        // Question Status
        else {
            button.classList.add(response.status);
        }
        button.addEventListener("click", () => {
            saveAnswer();
            currentQuestion = index;
            displayQuestion();
            displayPalette();
        });
        palette.appendChild(button);
    });
}

function saveAnswer() {
    const question = questions[currentQuestion];
    let selectedAnswer = null;
    // MCQ Question
    if (question.questionType === "MCQ") {
        const selectedOption = document.querySelector(
            'input[name="answer"]:checked'
        );
        if (selectedOption) {
            selectedAnswer = Number(selectedOption.value);
        }
    }
    // Numerical Question
    else {
        const numericalInput =
            document.getElementById("numericalAnswer");
        if (
            numericalInput &&
            numericalInput.value.trim() !== ""
        ) {
            selectedAnswer = Number(numericalInput.value);
        }
    }
    // Save Answer
    responses[currentQuestion].answer = selectedAnswer;
    // Preserve Review Status
    if (
        responses[currentQuestion].status === "review" ||
        responses[currentQuestion].status === "answered-review"
    ) {
        if (selectedAnswer === null) {
            responses[currentQuestion].status = "review";
        } else {
            responses[currentQuestion].status =
                "answered-review";
        }
    }
    // Normal Status
    else {
        if (selectedAnswer === null) {
            responses[currentQuestion].status =
                "not-answered";
        } else {
            responses[currentQuestion].status =
                "answered";
        }
    }
}

function nextQuestion() {
    saveAnswer();
    // Last Question
    if (currentQuestion === questions.length - 1) {
        const confirmSubmit = confirm(
            "Are you sure you want to submit the test?"
        );
        if (confirmSubmit) {
            submitTest();
        }
        return;
    }
    currentQuestion++;
    displayQuestion();
    displayPalette();
}

function previousQuestion() {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        displayPalette();
    }
}

function markForReview() {
    const question = questions[currentQuestion];
    let selectedAnswer = null;
    if (question.questionType === "MCQ") {
        const selected = document.querySelector(
            'input[name="answer"]:checked'
        );
        if (selected) {
            selectedAnswer = Number(selected.value);
        }
    }
    else {
        const input = document.getElementById("numericalAnswer");
        if (input.value !== "") {
            selectedAnswer = Number(input.value);
        }
    }
    responses[currentQuestion].answer = selectedAnswer;
    if (selectedAnswer === null) {
        responses[currentQuestion].status = "review";
    }
    else {
        responses[currentQuestion].status = "answered-review";
    }
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
    }
    displayQuestion();
    displayPalette();
}
function clearResponse() {
    const question = questions[currentQuestion];
    // Remove answer
    responses[currentQuestion].answer = null;
    // Clear UI
    if (question.questionType === "MCQ") {
        const selected = document.querySelector(
            'input[name="answer"]:checked'
        );
        if (selected) {
            selected.checked = false;
        }
    }
    else {
        const input = document.getElementById("numericalAnswer");
        if (input) {
            input.value = "";
        }
    }
    // Update status
    if (responses[currentQuestion].status === "answered-review") {
        responses[currentQuestion].status = "review";
    }
    else {
        responses[currentQuestion].status = "not-answered";
    }
    displayPalette();
    document.getElementById("clearBtn").disabled = true;
}

function startTimer() {
    timerInterval = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timer").textContent =
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        if(timeLeft <= 300){
            document.getElementById("timer").style.color = "red";
        }
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showToast("Time is over! Submitting test...","info");
            submitTest();
            return;
        }
        timeLeft--;
    }, 1000);
}

async function submitTest() {
    if (submitted) return;
    submitted = true;
    clearInterval(timerInterval);
    try {
        const response = await fetch(`/submit-test/${test._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                responses
            })
        });
        const data = await response.json();
        window.location.href = `/result/${data.attempt._id}`;
    } catch (error) {
        console.log(error);
    }
}

async function init(){
    await loadQuestions();
    displayQuestion();
    displayPalette();
    startTimer();
}

init();

document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("previousBtn").addEventListener("click", previousQuestion);
document.getElementById("reviewBtn").addEventListener("click", markForReview);
document.getElementById("clearBtn").addEventListener("click", clearResponse);
window.addEventListener("beforeunload", (event) => {
    if (!submitted) {
        event.preventDefault();
        event.returnValue = "";
    }
});