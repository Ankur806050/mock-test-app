async function loadHistory() {
    try {
        const response = await fetch("/api/history");
        const attempts = await response.json();
        console.log(attempts);
        const attemptContainer = document.getElementById("attemptContainer");
        attemptContainer.innerHTML = "";
        attempts.forEach((attempt) => {
            const date = new Date(attempt.createdAt);
            const card = document.createElement("div");
            card.classList.add("attempt-card");
            card.innerHTML = `
                <div class="left">
                    <h3 class="test-title">
                        ${attempt.testId.title}
                    </h3>
                    <p class="attempt-date">
                        ${date.toLocaleDateString("en-IN",{
                            day:"numeric",
                            month:"long",
                            year:"numeric"
                        })}
                    </p>
                    <p class="score">
                        Score :
                        ${attempt.score} / ${attempt.testId.totalMarks}
                    </p>
                    <p>
                        Correct :
                        ${attempt.correctAnswers}
                    </p>
                    <p>
                        Incorrect :
                        ${attempt.incorrectAnswers}
                    </p>
                    <p>
                        Unanswered :
                        ${attempt.unanswered}
                    </p>
                </div>
                <div class="right">
                    <button
                        class="view-btn"
                        data-id="${attempt._id}">
                        View Result
                    </button>
                </div>
            `;
            const viewBtn = card.querySelector(".view-btn");
            viewBtn.addEventListener("click", () => {
                window.location.href = `/result/${attempt._id}`;
            });
            attemptContainer.appendChild(card);
        });
    }
    catch (error) {
        console.log(error);
        showToast("Unable to load history","error");
    }
}

loadHistory();