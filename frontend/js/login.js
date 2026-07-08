const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit",async(event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const user = {
        email,
        password
    };
    
    if(validateLogin(user)){
        await loginUser(user);
    }
});

function validateLogin(user) {
    if (user.email === "") {
        alert("Email is required.");
        return false;
    }
    if (user.password === "") {
        alert("Password is required.");
        return false;
    }

    return true;
}

async function loginUser(user){
    try{
        const response = await fetch("/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        });

        const data = await response.json();
        if(response.ok){
            window.location.href = "/dashboard";
        }
        else{
            showToast(data.message, "error");
        }
    }catch(error){
        alert("Unable to connect to server.");
    }
}