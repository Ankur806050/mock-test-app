async function loadHistory() {
    try {
        const response = await fetch("/api/history");
        const attempts = await response.json();
        let testAttemptCount = attempts.length;
        let bestScore = 0;
        let totalScores = 0;
        for(let i=0;i<testAttemptCount;i++){
            totalScores += attempts[i].score;
            if(attempts[i].score>bestScore){
                bestScore = attempts[i].score;
            }
        }
        let averageScore = testAttemptCount === 0?0:(totalScores/testAttemptCount).toFixed(1);
        if (attempts.length === 0) {
            document.getElementById("totalAttempts").textContent = 0;
            document.getElementById("bestScore").textContent = 0;
            document.getElementById("averageScore").textContent = 0;
            const recentActivity = document.getElementById("recentActivity");
            recentActivity.innerHTML = "";
            recentActivity.innerHTML = `
                <div class="activity-card">
                    <div class="activity-left">
                    <h3>No Attempts Yet</h3>
                    <p>
                        Start your first mock test and track your progress here.
                    </p>
                    <a href="/tests" class="primary-btn">
                        Attempt Mock Test
                    </a>
                </div>
            </div>
            `;
            return;
        }
        document.getElementById("totalAttempts").textContent = testAttemptCount;
        document.getElementById("bestScore").textContent = bestScore;
        document.getElementById("averageScore").textContent = averageScore;
        attempts.slice(0, 3).forEach((attempt) => {
            const date = new Date(attempt.createdAt);
            const card = document.createElement("div");
            card.classList.add("activity-card");
            card.innerHTML = `
                <div class="activity-left">
                    <h3>${attempt.testId.title}</h3>
                <p>
                    Score :
                    <strong>${attempt.score} / ${attempt.testId.totalMarks}</strong>
                </p>
                <p>
                    ${date.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}
                </p>
            </div>
            <button
                class="view-btn"
                data-id="${attempt._id}">
                View Result
            </button>
        `;
            card.querySelector(".view-btn").addEventListener("click", () => {
                window.location.href = `/result/${attempt._id}`;
            });
            recentActivity.appendChild(card);
        });
    }
    catch (error) {
        showToast("Unable to load attempt history.","error");
    }
}

loadHistory();

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click",async(event) => {
    try{
        const response = await fetch("/logout",{
            method:"POST"
        });
        const data = await response.json();
        if(response.ok){
            window.location.href = "/";
        }
    }catch(error){
        showToast("Unable to connect to server","error");
    }
});

