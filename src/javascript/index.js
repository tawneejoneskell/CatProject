let dropdown = document.getElementById("dropdownMenu");
let reloadFlag = false;

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
    const imageContainer = document.getElementById('imageContainer');
    if(reloadFlag) {
        while(imageContainer.firstChild){
            imageContainer.removeChild(imageContainer.firstChild);
        }
    }
    //present loading icon until catData is available:

    const loadingIcon = document.createElement("img");
    loadingIcon.setAttribute("src", "../../Images/loadingIcon.jpg");
    loadingIcon.style.maxHeight = '100px';
    loadingIcon.style.maxWidth = '100px';
    imageContainer.appendChild(loadingIcon);

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
        newNode.style.maxHeight = "350px";
        newNode.style.maxWidth = "350px";
        newNode.style.marginTop = '20px';
        newNode.style.borderRadius = '4px';
        newNode.style.boxShadow = '.5px 1px 15px  #9400d3';
        newNode.setAttribute('id', 'catImage')
        imageContainer.replaceChild(newNode, imageContainer.childNodes[0]);
        reloadFlag = true;
    }catch(error){
        alert("There's an error fetching data");
        console.log(error);
    }
}

