//URL for Chosen API 
const BASE_URL = "https://opentdb.com/api.php?amount=10&category=23&type=multiple"


//Element Variables
const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-choices'));
// Counter for Questions, i.e. 'Questions 1/10'
// Counter for Correct Answers.




//DOMContentLoaded Listener.
window.addEventListener("DOMContentLoaded", () =>{
    fetch(BASE_URL)
    .then(response => response.json)
    .then()
})

//Function containing Fetch request. This will be a GET request that returns a PROMISE objoect
// function APIFetch(){
//     fetch(BASE_URL)
//     .then(response => response.json())
//     .then(data => console.log(data));
// }
//APIFetch();