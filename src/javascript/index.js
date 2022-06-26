let dropdown = document.getElementById("dropdownMenu");

window.prepareString = function(catString) {
    console.log('CALLING PREPARE STRING.')
    return catString.replace(" ", "%20")
}

let dropDownValue = prepareString(dropdown.value);


window.getChange = function(event){
    dropDownValue = event.target.value;
    dropDownValue = prepareString(dropDownValue);
}

dropdown.addEventListener("change", getChange);


window.getCatData = async function(e){
    e.preventDefault();
    var accessKey = `${process.env.CAT_API_KEY}`;
    try{
        let request= await fetch(`${process.env.CAT_API_SEARCH_URL}${dropDownValue}`, {
            method: "GET",
            headers: {
                'x-api-key': accessKey
            },
        });
        let result= await request.json();
        console.log(result);
        let breedId = result[0].id;

        let imageRequest = await fetch(`${process.env.CAT_API_IMAGE_SEARCH_URL}${breedId}`, {
            method: "GET",
            headers: {
                'x-api-key': accessKey
            },
        });
        let imageResult = await imageRequest.json();
        let pictureURL= imageResult[0].url;
        var newNode= document.createElement("img");
        newNode.src=pictureURL;
        document.getElementById("imageContainer").appendChild(newNode);

    }catch(error){
        alert("There's an error fetching data");
        console.log(error);
    }
}

