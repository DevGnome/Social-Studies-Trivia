// Make Webpage a "Quiz". Load a question, provide answers, refresh after answer.
// Load DOM -> Fetch API -> Listen for Click -> Check Event -> Correct? Y/N Text -> New Question Button
// 
// 
// 
// 
// 
// 
// 
//URL for Chosen API 
const BASE_URL = "https://opentdb.com/api.php?amount=1&category=18&type=multiple"

//DOMContentLoaded Listener.
window.addEventListener("DOMContentLoaded", () =>{
    //Disable New Question Button until answer chosen
    document.getElementById("new-question").disabled = true;
    getQuestion();
    handleAnswer();
    function handleAnswer(){
        addEventListener("click", (e)=>{
    
            if(e.target.className === 'option'){
                console.log(e.target.innerHTML);
                document.getElementById("new-question").disabled = false;
    
                if(e.target.innerHTML === document.getElementById("correct-answer").innerHTML
                ){
                    document.getElementById("result").innerHTML = "That Is Correct!"
                    document.getElementById('result').style.backgroundColor="green"
                }
                else{
                    document.getElementById("result").innerHTML = "Try Again!"
                    document.getElementById('result').style.backgroundColor="red"

                }
            }
        })
    }
});


//Get Question Function
function getQuestion(){
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => renderQuestion(data))
    // .then(data => console.log(data);

}
//Function that Renders the Question and Answers
function renderQuestion(data){

    const answerChoices = [...data.results[0].incorrect_answers]
    const correctAnswer = data.results[0].correct_answer;
    data.results[0].answer = Math.floor(Math.random()*4)+1;
    answerChoices.splice(data.results[0].answer - 1, 0, correctAnswer);
    console.log(answerChoices);
    console.log(correctAnswer);

    //Display Question
    document.getElementById("question").innerHTML = `${data.results[0].question}`
    //Display Answers Choices
    document.getElementById("answer-text1").innerHTML = `${answerChoices[0]}`
    document.getElementById("answer-text2").innerHTML = `${answerChoices[1]}`
    document.getElementById("answer-text3").innerHTML = `${answerChoices[2]}`
    document.getElementById("answer-text4").innerHTML = `${answerChoices[3]}`
    //Put correctAnswer in a hidden tag because I can't figure out another way to get the data into eventlistener
    document.getElementById("correct-answer").innerHTML = `${data.results[0].correct_answer}`;
}    
//EventListener for Answer button being Clicked
// function handleAnswer(){
//     addEventListener("click", (e)=>{

//         if(e.target.className === 'option'){
//             console.log(e.target.innerHTML);
//             document.getElementById("new-question").disabled = false;

//             if(e.target.innerHTML === checkCorrect){
//                 document.getElementById("result").innerHTML = "That Is Correct!"
//             }
//             else{
//                 document.getElementById("result").innerHTML = "Correct Answer:"
//             }
//         }
//     })
// }
