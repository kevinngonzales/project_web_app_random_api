import { fetchData } from "./dataHandling";
import { displayQuestionsAndAnswers } from "./renderHandling";
import { audioFeatures } from "./audio";
// import functions from other modules

//use async with try - catch to fetch and display data
async function fetchDataAndDisplay() {
    try {
        //store api's data in constant variable with await to ensure  fetchData function is successful
        const data = await fetchData();
        //use function from other .js file and pass api's data through it
        displayQuestionsAndAnswers(data);
        console.log('Success');
        //catch keyword to catch error and console.log it
    } catch (error) {
        console.error(error);
    }
}

// call the function
fetchDataAndDisplay();

// grab button from html to store in js variable 
let reloadWebpageButton = document.getElementById('reloadWebpageButton');
// add event listener to js variable so that if clicked, the we page is reloaded and then we get a new random set of questions
reloadWebpageButton.addEventListener('click', () => {
    location.reload();
})

//call this function to set volume of background music
audioFeatures();

