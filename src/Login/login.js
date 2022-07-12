

window.login = async function(e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = {
        username,
        password,
    }

    try{
        let request = await fetch('http://localhost:3000/validateuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        let result = await request.json();
        if(result.sessionStarted) {
            location.href = '../HomeScreen/home.html';
        }
    }catch(error) {
        alert(error);
    }
}   

const loginForm = document.getElementById("loginForm").addEventListener('submit', login);