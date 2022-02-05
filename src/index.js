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
    // .then(data => renderQuestion(data))
    .then(data => console.log(data))
}
//Function that Renders the Question and answers
function renderQuestion(data){
    document.getElementById("question").innerHTML = `${data.results[0].question}`

}    
const answerChoices = []
//Function for EventListener.
//If -> correct answer button clicked -> Correct! Maybe change button color?
//Else -> Incorrect! maybe change button color red. 
//-------->Prevent Clicking of Buttons AFTER choice made<----------
//Function to get next question
