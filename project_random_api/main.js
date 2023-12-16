import { fetchData } from "./dataHandling";
import { displayQuestionsAndAnswers } from "./renderHandling";
import { audioFeatures } from "./audio";


//use async with try - catch to fetch and display data
async function fetchDataAndDisplay() {
    try {
        //store api's data in constant variable with await to ensure  fetchData function is successful
        const data = await fetchData();
        //use function from other .js file and pass api's data through it
        displayQuestionsAndAnswers(data);
        console.log('Success');
    } catch (error) {
        console.error(error);
    }
}

// call the function
fetchDataAndDisplay();

let reloadWebpageButton = document.getElementById('reloadWebpageButton');
reloadWebpageButton.addEventListener('click', () => {
    location.reload();
})

audioFeatures();

