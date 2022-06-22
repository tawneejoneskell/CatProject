window.getCatData = async function(e){
    e.preventDefault();
    var accessKey = `${process.env.TEST_KEY}`;
    console.log(accessKey);

    try{
        let request= await fetch(`${process.env.CAT_API_ALL_BREEDS_URL}`, {
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