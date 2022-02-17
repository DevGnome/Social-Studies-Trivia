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
    //Prevents clicking the more info button until correct answer is chosen
    //more info button on click opens a google search for the question text in a new tab
    //This is imperfect: First Implementation had a search for the answer but that didn't always display relevant info,
    //i.e. the answer being 6 and a search just being about the number not the relevance to the question
    //Second Implementation searches the question, which is less likely to display information lacking relevance
    //although this still has cases where the question search result lacks all relevant info.
    //**Will work on this in future rebuild. 
});


//Get Question Function
function getQuestion(){
    //To get the functionality I wanted I utilized this eventlistener
    //It checks that one of the 3 buttons is clicked and fetches a
    //question from the clicked category. 
    addEventListener('click', (e) =>{
        // questionTemplate();

        //document.getElementById("more-info").disabled = true;
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
//EventListener for answer clicked. It checks that the answer is correct, and once an answer is chosen,
//a more info button is made clickable that googles the question
function handleAnswer(){
    addEventListener("click", (e)=>{

        if(e.target.className === 'option'){
            console.log(e.target.innerHTML);
            // document.getElementById("new-question").disabled = false;

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
    //document.getElementById("more-info").disabled = true;
    //Create array containing incorrect answers
    const answerChoices = [...data.results[0].incorrect_answers];
    //This variable was added with the hope of being able to use it for my
    //handleAnswer function. I could not get it to work, which I am thinking
    //may be due to scope maybe? It would not call in the function and might be due to the
    //promise chain. **Look into this in future rebuild.
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
    //Put correctAnswer in a hidden tag because I can't figure out another way to get the data.result[0].correct_answer into eventlistener
    //This is not preferred since someone could inspect the elements to find the answer if they wanted to
    document.getElementById("correct-answer").innerHTML = `${data.results[0].correct_answer}`;
}   

function questionTemplate(){
    const questionContainer = document.createElement("div")
    const main = document.getElementsByTagName("main")
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