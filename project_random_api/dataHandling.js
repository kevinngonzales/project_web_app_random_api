
//use async to tell function to operate asynchronously
export async function fetchData() {
    // store api url in a constant variable
    const apiUrl = 'https://opentdb.com/api.php?amount=20';
   
    // use try - catch
    try {
        // fetch api's data and store it in response variable
        // use await keyword to pause execution of function until fetch is complete 
        const response = await fetch(apiUrl);
        // if checks if response is valid, if not throw error code
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        // extract json data and parses it into js objects
        const data = await response.json();
        // console.log "success" to show data was successfuly fetched and parsed
        console.log('Success');
        // return data.results to be used by other functions in main.js file
        return data.results;
    } catch (error) {
        // if error occurs, it will get caught in catch block to get logged into console
        console.log(error);
        throw error;
    }
}




