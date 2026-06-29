function validateUser(user){
    if(user.password !== user.confirmPassword){
        alert("Password and Confirm Password do not match.");
        return false;
    }
    if(user.currentClass === ""){
        alert("Please select your current class.");
        return false;
    }
    if(user.targetYear === ""){
        alert("Please select your target year.");
        return false;
    }
    if(user.phone !== ""){
        const phoneRegex = /^[0-9]{10}$/;
        if(!phoneRegex.test(user.phone)){
            alert("Phone number must contain exactly 10 digits.");
            return false;
        }
    }
    return true;
}

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit",(event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let currentClass = "";
    for(const radio of document.getElementsByName("currentClass")){
        if(radio.checked){
            currentClass = radio.value;
            break;
        }
    };

    const targetYear = document.getElementById("targetYear").value;
    const phone = document.getElementById("phone").value.trim();

    const user = {
        fullName,
        email,
        password,
        confirmPassword,
        currentClass,
        targetYear,
        phone
    };

    if(validateUser(user)){
        console.log(user);
    }
});

