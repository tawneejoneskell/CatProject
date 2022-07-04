let dropdown = document.getElementById("dropdownMenu");
let nameInputValue = nameInput.value;
let reloadFlag = false;


window.prepareString = function(catString) {
    return catString.replace(" ", "%20")
}

let dropDownValue = prepareString(dropdown.value);


window.getChange = function(event){
    dropDownValue = event.target.value;
    dropDownValue = prepareString(dropDownValue);
}

window.getNameChange = function(event){
    nameInputValue = event.target.value;
}

dropdown.addEventListener("change", getChange);
nameInput.addEventListener("change", getNameChange);

class NothingSelectedError extends Error {
    constructor(message) {
        super(message);
        this.name = "Nothing Selected Error";
    }
}

window.writeDBData = async function(e) {
    let user = {
        firstName: "Aretha",
        lastName: "Jones",
        email: "Aretha@catmail.org",
        username: "mama",
        password: "cat",
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
    } catch(error) {
        console.log(error);
    }
}

window.getDBData = async function(e) {
try{
    let request= await fetch(`http://localhost:3000/users`, {
        method: "GET",
        headers: {

        }, 
    });
    // this is the RESULT of the API call.
    let result= await request.json();
    console.log(result);
} catch(error) {
    console.log(error);
}
}

window.getCatData = async function(e){
    e.preventDefault();
    onNameChange();
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
        if(!dropDownValue){
            throw new NothingSelectedError('There is nothing selected in the cat menu.');
        }
        let request= await fetch(`${process.env.CAT_API_SEARCH_URL}${dropDownValue}`, {
            method: "GET",
            headers: {
                'x-api-key': accessKey
            }, 
        });
        // this is the RESULT of the API call.
        let result= await request.json();
        console.log(result);
        // it's being console logged for you here so you can read it in your browser.
        let breedId = result[0].id;
        let intelligence = result[0].intelligence;
        let shedding_level = result[0].shedding_level;
        let social_needs = result[0].social_needs;

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
        // dont create an element as above. Find the ID of an element already in existence on the HTML page
        // and add your DATA to its 'innerHTML' attribute. For instance, if you are trying to insert your data
        // into a <td> tag, give the <td> tag an ID and use document.getElementById to reference it, then 
        // set its innerHTML attribute to whatever variable you have holding your data wrapped by a <p> tag.
        newNode.src=pictureURL;
        // ignore these lines
        newNode.style.maxHeight = "350px";
        newNode.style.maxWidth = "350px";
        newNode.style.marginTop = '20px';
        newNode.style.boxShadow = '.5px 1px 15px  #9400d3';
        newNode.setAttribute('id', 'catImage')
        //
        imageContainer.replaceChild(newNode, imageContainer.childNodes[0]);
        // update hyperlink
        const wikiLink = document.getElementById("wikiLink");
        wikiLink.setAttribute("href", result[0].wikipedia_url);

        const intelligenceCell = document.getElementById("intelligenceCell");
        intelligenceCell.innerHTML = "<p>" + intelligence + "</p>";
        const sheddingCell = document.getElementById("sheddingCell");
        sheddingCell.innerHTML= "<p>" + shedding_level + "</p>";
        const socialCell = document.getElementById("socialCell");
        socialCell.innerHTML = "<p>" + social_needs + "</p>";
        const tableContainer = document.getElementById("tableContainer");
        tableContainer.style.display = "block";

        
    }catch(NothingSelectedError){
        console.log(NothingSelectedError);

        const errorIcon = document.createElement('img');
        errorIcon.style.maxHeight = '150px';
        errorIcon.style.maxWidth = '150px';
        errorIcon.setAttribute("src", "../../Images/errorIcon.png");
        imageContainer.replaceChild(errorIcon, imageContainer.childNodes[0]);
    }
    reloadFlag = true;
} 

window.onNameChange = function(){
    const askExperts = document.getElementById("askExperts");
    if(nameInputValue.length > 0){
    askExperts.innerHTML = "Hello " + nameInputValue + ", is this the cat for you? (Wikipedia.com)";
    } else {
    askExperts.innerHTML = "Ask the Experts: "
    }
}

