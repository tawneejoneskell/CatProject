var form = document.getElementById('catForm').addEventListener('submit', submitFunction)
var header = document.getElementById('header');
function secretMessage() {
    var secretMessage = "this is our secrete message: 1234";
    console.log("this is our secret message:1234");
}

function submitFunction() {
    var newHeader = document.createElement("h1");
    newHeader.innerHTML = "THIS IS A NEW HEADER"
    newHeader.style.color = "red";
    document.getElementById("body").appendChild(newHeader);
}

async function getCatData(e){
    e.preventDefault();
    var accessKey="fc6d6a9c-757a-4c56-a1ac-dd1a5b439826";

    try{
        let request= await fetch("https://api.thecatapi.com/v1/breeds", {
            method: "GET",
            headers: {
                'x-api-key': accessKey
            },
        });
        let result= await request.json();
        let pictureURL= result[15].image.url;
        var newNode= document.createElement("img");
        newNode.src=pictureURL;
        document.getElementById("imageContainer").appendChild(newNode);

    }catch(error){
        alert("There's an error fetching data");
        console.log(error);
    }
}