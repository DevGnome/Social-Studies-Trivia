//URL for Chosen API 
const BASE_URL = "https://opentdb.com/api.php?amount=1&category=18&type=multiple"





//DOMContentLoaded Listener.
window.addEventListener("DOMContentLoaded", () =>{
    getQuestion();
   
})
//Get Question Function
function getQuestion(){
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => renderQuestion(data))
    // .then(data => console.log(data))
}
//Function that Renders the Question and answers
function renderQuestion(data){
    let answerChoices = [...data.results[0].incorrect_answers]
    data.results[0].answer = Math.floor(Math.random()*4)+1;
    answerChoices.splice(data.results[0].answer - 1, 0, data.results[0].correct_answer);
    console.log(answerChoices);
    //Display Question
    document.getElementById("question").innerHTML = `${data.results[0].question}`
    //Display Answers Choices
    document.getElementById("answer-text1").innerHTML = `${answerChoices[0]}`
    document.getElementById("answer-text2").innerHTML = `${answerChoices[1]}`
    document.getElementById("answer-text3").innerHTML = `${answerChoices[2]}`
    document.getElementById("answer-text4").innerHTML = `${answerChoices[3]}`
}    


//Function for EventListener.
//If -> correct answer button clicked -> Correct! Maybe change button color?
//Else -> Incorrect! maybe change button color red. 
//-------->Prevent Clicking of Buttons AFTER choice made<----------
//Function to get next question
