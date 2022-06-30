let dropdown = document.getElementById("dropdownMenu");
let reloadFlag = false;

window.prepareString = function(catString) {
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
        // this is the RESULT of the API call.
        let result= await request.json();
        // it's being console logged for you here so you can read it in your browser.
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
        // This is your hint and guide for how to take the cat data returned from the RESULT variable above and make it appear in your table.
        // what I'm doing below is creating a new node or element, assigning it styles before it's even created, then finding a place in the
        // DOM to append it (think of appending like giving your element up for adoption to a new parent).
        // instead of "replaceChild", you'll simply be using "appendChild"... you just need to figure out where you'll be appending it.
        // You need to take the appropriate catdata from the API result and get it into your table. May you be prosperous.
        // lines 63-71 need to be adapted to your needs. Write your logic down after line 71.
        var newNode= document.createElement("img");
        newNode.src=pictureURL;
        newNode.style.maxHeight = "350px";
        newNode.style.maxWidth = "350px";
        newNode.style.marginTop = '20px';
        newNode.style.borderRadius = '4px';
        newNode.style.boxShadow = '.5px 1px 15px  #9400d3';
        newNode.setAttribute('id', 'catImage')
        imageContainer.replaceChild(newNode, imageContainer.childNodes[0]);
        
    }catch(error){
        console.log(error);

        const errorIcon = document.createElement('img');
        errorIcon.style.maxHeight = '150px';
        errorIcon.style.maxWidth = '150px';
        errorIcon.setAttribute("src", "../../Images/errorIcon.png");
        imageContainer.replaceChild(errorIcon, imageContainer.childNodes[0]);
    }
    reloadFlag = true;
}

