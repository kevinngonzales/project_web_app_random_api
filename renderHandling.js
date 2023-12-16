//export function to be used in main.js
export { displayQuestionsAndAnswers };

// grab sound effects from html and store it in js variables
const rightSoundEffect = document.getElementById('rightSoundEffect');
const wrongSoundEffect = document.getElementById('wrongSoundEffect');

function displayQuestionsAndAnswers(question) {
    //grab html and declare it as js variable to be used to display questions/answers
    const questionContainer = document.getElementById('questionContainer');
    //initialize the element as empty
    questionContainer.innerHTML = '';


    //use for loop to iterate through api's data
    for (let i = 0; i < question.length; i++) {
        if (question[i].type === 'multiple') {
            //displaying questions
            //create p element and store it in variable
            const questions = document.createElement('p');
            //set text content as index + 1 for question number and the question itself at that specific index
            questions.innerHTML = `${i + 1}. ${question[i].question}`;
            //append the questions to the question container declared earlier
            questionContainer.appendChild(questions);

            //create new array of combined right answer and wrong answers
            //decode correct answer so it matches the html text
            // used [i] to store data from that specific index
            let correctAnswer = decodeNumericCharacter(question[i].correct_answer);
            let wrongAnswers = question[i].incorrect_answers;
            //use spread operator to combine arrays
            let allAnswers = [correctAnswer, ...wrongAnswers];

            //randomly shuffle answers using math.random() to generate random number between -0.5 - 0.5 and then using .sort() to randomly sort the array so that the right answer is not always the first option
            function shuffleAnswers(array) {
                return array.sort(() => Math.random() - 0.5);
            }

            //set newly shuffled answers to allAnswers variable
            allAnswers = shuffleAnswers(allAnswers);

            //function to decode items in array if it has numeric character entity reference 
            function decodeNumericCharacter(text) {
                let doc = new DOMParser().parseFromString(text, 'text/html');
                return doc.body.textContent;
            }

            //create new array using .map with all of array items decoded
            allAnswers = allAnswers.map(function (item) {
                return decodeNumericCharacter(item);
            })

            //create buttons for answers
            //use for loop to iterate through the answers we decoded/randomized
            for (let j = 0; j < allAnswers.length; j++) {
                //create button elements and store in answer button variable
                const answerButton = document.createElement('button');
                // set text content of answerbutton to the answer at the specific index we're iterating through
                answerButton.innerHTML = `${allAnswers[j]}`
                // append button with answers as text content to the question container
                questionContainer.appendChild(answerButton);

                //if correct/wrong answer is chosen change colors accordingly
                //also play audio 
                if (answerButton.innerHTML === correctAnswer) {
                    //use event listener to "listen" for click and then play sound effect and change background color to green
                    answerButton.addEventListener('click', () => {
                        rightSoundEffect.play();
                        answerButton.style.backgroundColor = "#1bfc06";
                    })

                } else {
                    answerButton.addEventListener('click', () => {
                        //use event listener to "listen" for click and then play sound effect and change background color to red
                        wrongSoundEffect.play();
                        answerButton.style.backgroundColor = "red";
                    })
                }
            }
        }
        // use else if statement to determine if it is a true or false question
        else if (question[i].type === 'boolean') {
            // create paragraph element and store it in questions variable
            const questions = document.createElement('p');
            // set text content of element to index number + 1 and the question
            questions.innerHTML = `${i + 1}. ${question[i].question}`;
            // append the question to container
            questionContainer.appendChild(questions);

            //displaying true/false buttons
            const trueButton = document.createElement('button');
            const falseButton = document.createElement('button');
            //set text to buttons to true/false
            trueButton.innerHTML = 'True';
            falseButton.innerHTML = 'False';
            //append buttons to container
            questionContainer.appendChild(trueButton);
            questionContainer.appendChild(falseButton);

            //if correct button is clicked, change color accordingly
            trueButton.addEventListener('click', () => {
                // if button that is clicked matches correct answer then play right sound effect and change color to green
                if (trueButton.innerHTML === question[i].correct_answer) {
                    rightSoundEffect.play();
                    trueButton.style.backgroundColor = "#1bfc06";
                    // if not then play wrong sound effect and change color to red
                } else {
                    wrongSoundEffect.play();
                    trueButton.style.backgroundColor = "red";
                }
            })
            falseButton.addEventListener('click', () => {
                // same thing here, just checking if false is the correct answer
                if (falseButton.innerHTML === question[i].correct_answer) {
                    rightSoundEffect.play();
                    falseButton.style.backgroundColor = "#1bfc06";
                } else {
                    wrongSoundEffect.play();
                    falseButton.style.backgroundColor = "red";
                }
            })

        }
    }
}



