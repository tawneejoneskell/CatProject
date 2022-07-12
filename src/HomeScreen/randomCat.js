window.onload=function(){
   getRandomCat();

}

function getRandomCat(){
    let randomNumber= Math.floor(Math.random() * 100)
    let randomCat;

    console.log(randomNumber);

    switch(true){
        case (randomNumber > 25):
    randomCat="mainCoon";
    break;
    case (randomNumber < 50):
        randomCat="scottishFold";
    break;
    case (randomNumber < 75):
        randomCat="americanShorthair";
        break;
    default:
        randomCat="bombayCat";
        break;
    }
    console.log(randomCat);
}