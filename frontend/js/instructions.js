const test = JSON.parse(localStorage.getItem("selectedTest"));

if (!test) {
    window.location.href = "/tests";
}

document.getElementById("testTitle").textContent = test.title;
document.getElementById("duration").textContent = `${test.duration} Minutes`;
document.getElementById("questions").textContent = test.totalQuestions;
document.getElementById("marks").textContent = test.totalMarks;

const startTestBtn = document.getElementById("startTestBtn");

startTestBtn.addEventListener("click", () => {
    window.location.href = `/attempt-test/${test._id}`;
});