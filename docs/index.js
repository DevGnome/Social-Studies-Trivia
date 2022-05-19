// Make Webpage a "Quiz". Load a question, provide answers, refresh after answer.
// Load DOM -> Fetch API -> Listen for Click -> Check Event -> Correct? Y/N Text -> New Question Button
// 
// Guideline Stretch Goal: db.json
// 
// Personal Stretch Goal: Way to Change Category
// 
// 
// 
//URL for Chosen API 
//BASE_URL = "https://opentdb.com/api.php?amount=1&type=multiple"
// This was removed in a later change to my fetch. I was unable to get a
// general/default general knowledge question to load that could be changed
// with the category. This may be due to a limitation in the single file?
// Maybe this could be accomplished with a second JS set? **Look into for future rebuild

//DOMContentLoaded Listener. Checks and logs DOM loading. 
window.addEventListener("DOMContentLoaded", () =>{
    console.log('DOM fully loaded and parsed');
    //Fetch function
    getQuestion();
    handleAnswer();
});


//Get Question Function
function getQuestion(){
    //To get the functionality I wanted I utilized this eventlistener
    //It checks that one of the 4 buttons is clicked and fetches a question from the clicked category. 
    
    //Prevents clicking the more info button until correct answer is chosen more info button on click opens a google search for the question text in a new tab
    //This is imperfect: First Implementation had a search for the answer but that didn't always display relevant info, i.e. the answer being 6 and a search just
    //being about the number not the relevance to the question.
    //Second Implementation searches the question, which is less likely to display information lacking relevance although this still has cases where the question 
    //search result lacks all relevant info.
   
    addEventListener('click', (e) =>{
        if(e.target.id === 'geography'){
            questionTemplate();
            fetch("https://opentdb.com/api.php?amount=1&category=22&type=multiple")
            .then(response => response.json())
            .then(data => renderQuestion(data))
            // .then(data => console.log(data);
            document.getElementById("more-info").disabled = true;
            document.getElementById("result").innerHTML = '';
            
        }
        else if(e.target.id === 'history'){
            questionTemplate();
            fetch("https://opentdb.com/api.php?amount=1&category=23&type=multiple")
            .then(response => response.json())
            .then(data => renderQuestion(data)) 
            document.getElementById("more-info").disabled = true; 
            document.getElementById("result").innerHTML = '';      
        }
        else if(e.target.id === 'mythology'){
            questionTemplate();
            fetch("https://opentdb.com/api.php?amount=1&category=20&type=multiple")
            .then(response => response.json())
            .then(data => renderQuestion(data))
            document.getElementById("more-info").disabled = true;    
            document.getElementById("result").innerHTML = '';        
        }
        else if(e.target.id === 'politics'){
            questionTemplate();
            fetch("https://opentdb.com/api.php?amount=1&category=24&type=multiple")
            .then(response => response.json())
            .then(data => renderQuestion(data))
            document.getElementById("more-info").disabled = true; 
            document.getElementById("result").innerHTML = '';
        }
    })

}
//EventListener for answer clicked. It checks that the answer is correct. On correct choice, a more info button is enabled that Googles the question
function handleAnswer(){
    addEventListener("click", (e)=>{

        if(e.target.className === 'option'){
            console.log(e.target.innerHTML);

            if(e.target.innerHTML === document.getElementById("correct-answer").innerHTML){
                document.getElementById("result").innerHTML = "That Is Correct!";
                document.getElementById('result').style.cssText = `background-color: green; border: 1px solid black; padding-left: 2px;
                padding-right: 2px;`;
                document.getElementById("more-info").disabled = false;
                
            }
            else{
                document.getElementById("result").innerHTML = "Try Again!";
                document.getElementById('result').style.cssText=`background-color: red; border: 1px solid black; padding-left: 2px;
                padding-right: 2px;`;
                
            }
        }
    })
}

//Function that Renders the Question and Answers
function renderQuestion(data){
    //Create array containing incorrect answers
    const answerChoices = [...data.results[0].incorrect_answers];
    //This variable was added with the hope of being able to use it for my
    //handleAnswer function. This was not doable because of the promise chain.
    //To access it, I'd need to change the fetch function to return the data.
    const correctAnswer = data.results[0].correct_answer;
    //Get a random index for answer choices
    data.results[0].answer = Math.floor(Math.random()*4)+1;
    //Combine incorrect and correct answers into array to randomize
    //for the answer display.
    answerChoices.splice(data.results[0].answer - 1, 0, correctAnswer);
    //Logs all answers and specificall the Correct one. This was for testing 
    //of the correct/incorrect elements
    console.log(answerChoices);
    console.log(correctAnswer);

    //Display Question
    document.getElementById("question").innerHTML = `${data.results[0].question}`;
    //Display Answers Choices --- Could be cleaner? Still looking for other ways to complete this
    //In my initial steps I didn't have a way to randomize where the right answer would be
    //Using the above code to create random index of answers allowed me to do that,
    //preventing me from needing to have it set that there would always be a specific 'correct' button.
    document.getElementById("answer-text1").innerHTML = `${answerChoices[0]}`;
    document.getElementById("answer-text2").innerHTML = `${answerChoices[1]}`;
    document.getElementById("answer-text3").innerHTML = `${answerChoices[2]}`;
    document.getElementById("answer-text4").innerHTML = `${answerChoices[3]}`;
    //Put correctAnswer in a hidden tag because I can't get the data.result[0].correct_answer outside of the promise chain. 
    //This is permissable as a simplistic project, but in practice is not desirable because a user could use the dev tools to find the answer.
    document.getElementById("correct-answer").innerHTML = `${data.results[0].correct_answer}`;
}   

function questionTemplate(){
    //To make the initial load cleaner, the containers were removed from the HTML file so that the DOM would load just the Pick A Category text and options.
   
    const questionContainer = document.createElement("div")
    const main = document.getElementsByTagName("main")
    //the ! logical operator prevents a new Div being created on every category click. 
   if(!document.getElementById("question")){questionContainer.innerHTML = ` <div class="question-container" id="question">
    </div>
     <div style="display: flex" class="answer-container">
     <br>
         <button type="button" class="option" id="answer-text1"></button>
     </div>  
     <div style="display: flex" class="answer-container">
         <button type="button" class="option" id="answer-text2"></button>
     </div>
     <div style="display: flex" class="answer-container">
         <button type="button" class="option" id="answer-text3"></button>
     </div>
     <div style="display: flex" class="answer-container">
         <button type="button" class="option" id="answer-text4"></button>
     </div>
     <br>
     <div class="result-container">
         <p id="result">-</p>
         <p hidden id="correct-answer"></p>
         <br>
         <button onclick="getInfo()" type="button" id="more-info">More Information</button>
     </div>`
     //creates the template. 
    main[0].appendChild(questionContainer);
}}
