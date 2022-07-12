const contactForm = document.getElementById("contactForm");

window.writeData = async function(e) {
    console.log('THIS IS FIRING.')
    {
    e.preventDefault();
    let author_id = document.getElementById("authorId").value;
    let request_content = document.getElementById("requestContent").value;

    let contactReq = {
        author_id,
        request_content,
    }

    try{
        let request = await fetch('http://localhost:3000/newContactRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactReq)
        });
        let result = await request.json();
        console.log(result);
        location.href="../HomeScreen/home.html"
    } catch(error) {
        console.log(error);
    }
}
}

contactForm.addEventListener("submit", writeData);
