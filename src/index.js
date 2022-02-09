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

//DOMContentLoaded Listener.
window.addEventListener("DOMContentLoaded", () =>{
    //Disable New Question Button until answer chosen
    getQuestion();
    handleAnswer();
    function handleAnswer(){
        addEventListener("click", (e)=>{
    
            if(e.target.className === 'option'){
                console.log(e.target.innerHTML);
                //document.getElementById("new-question").disabled = false;
    
                if(e.target.innerHTML === document.getElementById("correct-answer").innerHTML
                ){
                    document.getElementById("result").innerHTML = "That Is Correct!"
                    document.getElementById('result').style.cssText = `background-color: green; border: 1px solid black; padding-left: 2px;
                    padding-right: 2px;`
                    document.getElementById("more-info").disabled = false;
                    
                }
                else{
                    document.getElementById("result").innerHTML = "Try Again!"
                    document.getElementById('result').style.cssText=`background-color: red; border: 1px solid black; padding-left: 2px;
                    padding-right: 2px;`
                    
                }
            }
        })
    }
});


//Get Question Function
function getQuestion(){
    addEventListener('click', (e) =>{
        if(e.target.id === 'geography'){
            fetch("https://opentdb.com/api.php?amount=1&category=22&type=multiple")
            .then(response => response.json())
            .then(data => renderQuestion(data))
            // .then(data => console.log(data);
            
        }
        else if(e.target.id === 'history'){
            fetch("https://opentdb.com/api.php?amount=1&category=23&type=multiple")
            .then(response => response.json())
            .then(data => renderQuestion(data))            
        }
        else if(e.target.id === 'mythology'){
            fetch("https://opentdb.com/api.php?amount=1&category=20&type=multiple")
            .then(response => response.json())
            .then(data => renderQuestion(data))            
        }
    })
}

//Function that Renders the Question and Answers
function renderQuestion(data){
    //Create array containing incorrect answers
    const answerChoices = [...data.results[0].incorrect_answers]
    const correctAnswer = data.results[0].correct_answer;
    //Get a random index for answer choices
    data.results[0].answer = Math.floor(Math.random()*4)+1;
    //Combine incorrect and correct answers into array to randomize
    //for the answer display.
    answerChoices.splice(data.results[0].answer - 1, 0, correctAnswer);
    //Logs all answers and specificall the Correct one.
    console.log(answerChoices);
    console.log(correctAnswer);

    //Display Question
    document.getElementById("question").innerHTML = `${data.results[0].question}`
    //Display Answers Choices --- Could be cleaner
    document.getElementById("answer-text1").innerHTML = `${answerChoices[0]}`
    document.getElementById("answer-text2").innerHTML = `${answerChoices[1]}`
    document.getElementById("answer-text3").innerHTML = `${answerChoices[2]}`
    document.getElementById("answer-text4").innerHTML = `${answerChoices[3]}`
    //Put correctAnswer in a hidden tag because I can't figure out another way to get the data into eventlistener
    document.getElementById("correct-answer").innerHTML = `${data.results[0].correct_answer}`;
}   


