async function loadTests() {
    try {
        const response = await fetch("/mock-tests",);
        const tests = await response.json();
        const testsContainer = document.getElementById("testsContainer");
        tests.forEach((test) => {
            const card = document.createElement("div");
            card.classList.add("test-card");

            card.innerHTML = `
            <h3>${test.title}</h3>
            <p><strong>Duration:</strong> ${test.duration} Minutes</p>
            <p><strong>Total Questions:</strong> ${test.totalQuestions}</p>
            <p><strong>Total Marks:</strong> ${test.totalMarks}</p>
            <button
                class="start-btn"
                data-id="${test._id}">
                Start Test
            </button>
            `;
            testsContainer.appendChild(card);

            const startBtn = card.querySelector(".start-btn");
            startBtn.addEventListener("click", () => {
                localStorage.setItem("selectedTest",JSON.stringify(test));
                window.location.href = `/instructions/${test._id}`;
            });
        });

    } catch (error) {
        showToast("Unable to load mock tests.","error");
    }
}

loadTests();