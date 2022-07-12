const signUpForm = document.getElementById("signUpForm");


window.writeDBData = async function(e) {
    e.preventDefault();
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let user = {
        firstName,
        lastName,
        email,
        username,
        password,
    }
    try{
        let request = await fetch('http://localhost:3000/newuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        let result = await request.json();
        console.log(result);
        location.href="../HomeScreen/home.html"
    } catch(error) {
        console.log(error);
    }
}

signUpForm.addEventListener("submit", writeDBData);