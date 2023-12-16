export { displayQuestionsAndAnswers };

const rightSoundEffect = document.getElementById('rightSoundEffect');

const wrongSoundEffect = document.getElementById('wrongSoundEffect');

function displayQuestionsAndAnswers(question) {
    //grab html and declare it as js variable
    const questionContainer = document.getElementById('questionContainer');
    //initialize the element as empty
    questionContainer.innerHTML = '';

    for (let i = 0; i < question.length; i++) {
        if (question[i].type === 'multiple') {
            //displaying questions
            const questions = document.createElement('p');
            questions.innerHTML = `${i + 1}. ${question[i].question}`;
            questionContainer.appendChild(questions);

            //create new array of combined right answer and wrong answers
            //decode correct answer so it matches the html text
            let correctAnswer = decodeNumericCharacter(question[i].correct_answer);
            let wrongAnswers = question[i].incorrect_answers;
            let allAnswers = [correctAnswer, ...wrongAnswers];

            //randomly shuffle answers 
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
            for (let j = 0; j < allAnswers.length; j++) {
                const answerButton = document.createElement('button');
                answerButton.innerHTML = `${allAnswers[j]}`
                questionContainer.appendChild(answerButton);

                //if correct/wrong answer is chosen change colors accordingly
                //also play audio 
                if (answerButton.innerHTML === correctAnswer) {
                    answerButton.addEventListener('click', () => {
                        rightSoundEffect.play();
                        answerButton.style.backgroundColor = "#1bfc06";
                    })

                } else {
                    answerButton.addEventListener('click', () => {
                        wrongSoundEffect.play();
                        answerButton.style.backgroundColor = "red";
                    })
                }
            }
        }

        else if (question[i].type === 'boolean') {
            const questions = document.createElement('p');
            questions.innerHTML = `${i + 1}. ${question[i].question}`;
            questionContainer.appendChild(questions);

            //displaying true/false buttons
            const trueButton = document.createElement('button');
            const falseButton = document.createElement('button');

            trueButton.innerHTML = 'True';
            falseButton.innerHTML = 'False';

            questionContainer.appendChild(trueButton);
            questionContainer.appendChild(falseButton);

            //if correct button is clicked, change color accordingly
            trueButton.addEventListener('click', () => {
                if (trueButton.innerHTML === question[i].correct_answer) {
                    rightSoundEffect.play();
                    trueButton.style.backgroundColor = "#1bfc06";
                } else {
                    wrongSoundEffect.play();
                    trueButton.style.backgroundColor = "red";
                }
            })
            falseButton.addEventListener('click', () => {
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



