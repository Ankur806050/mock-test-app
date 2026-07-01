const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click",async(event) => {
    try{
        const response = await fetch("/logout",{
            method:"POST"
        });
        const data = await response.json();
        if(response.ok){
            alert(data.message);
            window.location.href = "/";
        }
    }catch(error){
        alert("Unable to connect to server");
    }
});