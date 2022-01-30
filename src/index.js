//URL for Chosen API 
const BASE_URL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
// Counter for Questions, i.e. 'Questions 1/10'
// Counter for Correct Answers.




//DOMContentLoaded Listener.
window.addEventListener("DOMContentLoaded", () =>{
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => renderQuestions(data))
    // .then(data=> console.log(data))
})

//Function that Renders the Question and answers
function renderQuestions(data){
    document.querySelector("#question").innerHTML = `${data.results[0].question}`
    document.getElementById('option1').innerHTML = `${data.results[0].correct_answer}`
    document.getElementById('option2').innerHTML = `${data.results[0].incorrect_answers[0]}`
    document.getElementById('option3').innerHTML = `${data.results[0].incorrect_answers[1]}`
    document.getElementById('option4').innerHTML = `${data.results[0].incorrect_answers[2]}`
}
//Function to get next question
