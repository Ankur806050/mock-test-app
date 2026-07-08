function validateUser(user){
    if(user.password !== user.confirmPassword){
        showToast("Password and Confirm Password do not match.","error");
        return false;
    }
    if(user.currentClass === ""){
        showToast("Please select your current class.","errro");
        return false;
    }
    if(user.targetYear === ""){
        showToast("Please select your target year.","error");
        return false;
    }
    if(user.phone !== ""){
        const phoneRegex = /^[0-9]{10}$/;
        if(!phoneRegex.test(user.phone)){
            showToast("Enter a valid phone number", "error");;
            return false;
        }
    }
    return true;
}

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit",async(event) => {
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
        const requestBody = {
            fullName,
            email,
            password,
            currentClass,
            targetYear,
            phone
        };
        await registerUser(requestBody);
    }
});

async function registerUser(user){

    try{
        const response = await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        });

        const data = await response.json();

        if(response.ok){
            showToast("Registration Successful", "success");
            setTimeout(() => {
                window.location.href="/login";
            },1500);
        }
        else{
            showToast(data.message,"error");
        }

    }
    catch(error){
        showToast("Unable to connect to server.","error");
    }
}