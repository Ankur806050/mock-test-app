const toast = document.createElement("div");
toast.id = "toast";
document.body.appendChild(toast);

function showToast(message, type = "info") {
    toast.textContent = message;
    toast.className = "";
    toast.classList.add(type);
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}