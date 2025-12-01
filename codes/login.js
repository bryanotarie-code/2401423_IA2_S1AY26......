// --- SIGN UP SAVE ACCOUNT ---
function registerUser() {
    let email = document.getElementById("reg-email").value;
    let username = document.getElementById("reg-username").value;
    let password = document.getElementById("reg-password").value;
    let confirm = document.getElementById("reg-confirm").value;

    if(password !== confirm){
        alert("Passwords do not match!");
        return;
    }

    let user = { email, username, password };

    localStorage.setItem("userAccount", JSON.stringify(user));
    alert("Account created. You may now log in.");
    document.getElementById('id02').style.display='none';
}



// --- LOGIN CHECK ---
function loginUser(){
    let user = JSON.parse(localStorage.getItem("userAccount"));
    
    let username = document.getElementById("log-username").value;
    let password = document.getElementById("log-password").value;

    if(!user){
        alert("No account like this currently exists — please sign up first!");
        return;
    }

    if(username === user.username && password === user.password){
        localStorage.setItem("userLoggedIn","true");
        alert("Login is Success!");
        window.location.href="Home.html";
    } else {
        alert("Wrong login — try again.");
    }
}


// --- LOGOUT (Optional button) ---
function logoutUser(){
    localStorage.removeItem("userLoggedIn");
    alert("You have been logged out.");
    window.location.reload();
}