//URL for Chosen API 
const BASE_URL = "https://opentdb.com/api.php?amount=1&category=18&type=multiple"





//DOMContentLoaded Listener.
window.addEventListener("DOMContentLoaded", () =>{
    //Disable New Question Button until answer chosen
    document.getElementById("new-question").disabled = true;
    getQuestion();
    handleClick();

});


//Get Question Function
function getQuestion(){
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => renderQuestion(data))
    // .then(data => console.log(data))
}
//Function that Renders the Question and Answers
function renderQuestion(data){
    let answerChoices = [...data.results[0].incorrect_answers]
    let correctChoice = data.results[0].correct_answer;
    data.results[0].answer = Math.floor(Math.random()*4)+1;
    answerChoices.splice(data.results[0].answer - 1, 0, correctChoice);
    console.log(answerChoices);
    //Display Question
    document.getElementById("question").innerHTML = `${data.results[0].question}`
    //Display Answers Choices
    document.getElementById("answer-text1").innerHTML = `${answerChoices[0]}`
    document.getElementById("answer-text2").innerHTML = `${answerChoices[1]}`
    document.getElementById("answer-text3").innerHTML = `${answerChoices[2]}`
    document.getElementById("answer-text4").innerHTML = `${answerChoices[3]}`
}    

//Function for EventListener
function handleClick(){
    document.addEventListener("click", (e)=>{
        let chosen = e.target;
        //So far this is the only way I've been able to disable all butons on press.
        //Will revisit with better solution
        document.getElementById("btn1").disabled = true;
        document.getElementById("btn2").disabled = true;
        document.getElementById("btn3").disabled = true;
        document.getElementById("btn4").disabled = true;
        document.getElementById("new-question").disabled = false;

        if(chosen.type === "answer-button" && chosen.innerHTML === correctChoice){

                document.getElementById("result").innerHTML = "That Is Correct"
            }
            else{
                document.getElementById("result").innerHTML = "Sorry, That Is Incorrect"
            }
        })
        
}
//If -> correct answer button clicked -> Correct! Maybe change button color?
//Else -> Incorrect! maybe change button color red. 
//-------->Prevent Clicking of Buttons AFTER choice made<----------
//Function to get next question
