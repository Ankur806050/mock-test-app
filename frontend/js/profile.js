async function getProfileDetails(){
    const response = await fetch("/api/profile");
    const user = await response.json();
    const joinedDate = new Date(user[0].createdAt);
    document.getElementById("fullName").textContent = user[0].fullName;
    document.getElementById("email").textContent = user[0].email;
    document.getElementById("phone").textContent = user[0].phone;
    document.getElementById("currentClass").textContent = user[0].currentClass;
    document.getElementById("targetYear").textContent = user[0].targetYear;
    document.getElementById("joinedOn").textContent =
    joinedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

getProfileDetails();