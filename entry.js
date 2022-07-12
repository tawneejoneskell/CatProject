window.getSession = async function(e) {
    try{
        let request = await fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {

            }
        });
        let result = await request.json();
        if(result.sessionExists){
            location.href="./HomeScreen/home.html";
        } else {
            location.href="./Login/login.html";
        }
    } catch(error){
        console.log(error);
    }
}

getSession();