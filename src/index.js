// URL for Chosen API 
const BASE_URL = "https://opentdb.com/api.php?amount=10&category=23&type=multiple"

//DOMContentLoaded Listener.
window.addEventListener("DOMContentLoaded", () =>{

})

//Function containing Fetch request. This will be a GET request that returns a PROMISE objoect
function APIFetch(){
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => console.log(data));
}

APIFetch();