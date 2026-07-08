const attemptId = window.location.pathname.split("/").pop();

async function loadResult() {
    try {
        const response = await fetch(`/api/result/${attemptId}`);
        const attempt = await response.json();
        console.log(attempt);
        document.getElementById("score").textContent = `${attempt.score} / ${attempt.testId.totalMarks}`;
        document.getElementById("totalQuestions").textContent = `${attempt.testId.totalQuestions}`;
        document.getElementById("correct").textContent = `${attempt.correctAnswers}`;
        document.getElementById("incorrect").textContent = `${attempt.incorrectAnswers}`;
        document.getElementById("unanswered").textContent = `${attempt.unanswered}`;
        const attempted = attempt.correctAnswers + attempt.incorrectAnswers;
        document.getElementById("attempted").textContent = `${attempted}`;
        const accuracy = attempted === 0 ? 0 : ((attempt.correctAnswers / attempted) * 100).toFixed(2);
        document.getElementById("accuracy").textContent = `${accuracy}%`;
        document.getElementById("reviewBtn").addEventListener("click",() => {
            window.location.href = `/review/${attemptId}`;
        });
    }
    catch (error) {
        console.log(error);
        showToast("Unable to load result","error");;
    }
}

loadResult();