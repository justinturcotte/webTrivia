document.body.style.opacity=0;
setTimeout(function(){ document.body.style.opacity=1; }, 500);

var question = {
    text: "This is the question",
    domID: document.getElementById("question")
}
var answer = {
    a: {
        text: "answer A text goes here",
        isCorrect: true,
        domID: document.getElementById("answer-a")
    },
    b: {
        text: "answer B text goes here",
        isCorrect: false,
        domID: document.getElementById("answer-b")
    },
    c: {
        text: "answer C text goes here",
        isCorrect: false,
        domID: document.getElementById("answer-c")
    },
    d: {
        text: "answer D text goes here",
        isCorrect: false,
        domID: document.getElementById("answer-d")
    }
}

var testVar;
var questionsAsked =0;
var correctAnswers =0;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max+1));
}
const actualAnswers = ["correct answer", "wrong", "wrong", "wrong"];
const actualBool=[true, false, false, false];

function randomizeQuestion(){
    let arrayQuest = ["a","b","c","d"];
    for(let i=arrayQuest.length-1; i>=0; i--){
        let temp=getRandomInt(i);
        answer[arrayQuest[temp]].text = actualAnswers[i];
        answer[arrayQuest[temp]].domID.innerHTML = actualAnswers[i];
        answer[arrayQuest[temp]].isCorrect = actualBool[i];
        arrayQuest.splice(temp,1);
    }
}

function answerClick(answer){
    answer.domID.addEventListener("click", function(event){
        document.getElementById("result").style.opacity=0;
        setTimeout(function(){ 
            if (answer.isCorrect){
                document.getElementById("result").innerHTML = "Correct answer!!";
                document.getElementById("result").style.opacity=1;
                correctAnswers ++;
                questionsAsked ++;
            }
            else{
                document.getElementById("result").innerHTML = "Incorrect."
                document.getElementById("result").style.opacity=1;
                questionsAsked ++;
            }
        },500);
    },);
}

//const QUIZ_URL = "https://opentdb.com/api.php?amount=1&type=multiple";


// const promise = fetch(QUIZ_URL);
// promise
// .then(function(response) {
//     const processingPromise = response.json();
//     return processingPromise;
// })
// .then(function(processedResponse) {

//     console.log(processedResponse.results[0]);
//     question.text=processedResponse.results[0].question;
//     question.domID.innerHTML = question.text;
//     answerA.text=processedResponse.results[0].correct_answer;
//     questionsToDOM(answerA);
//     answerB.text=processedResponse.results[0].incorrect_answers[0];
//     questionsToDOM(answerB);
//     answerC.text=processedResponse.results[0].incorrect_answers[1];
//     questionsToDOM(answerC);
//     answerD.text=processedResponse.results[0].incorrect_answers[2];
//     questionsToDOM(answerD);
// });

randomizeQuestion();
answerClick(answer.a);
answerClick(answer.b);
answerClick(answer.c);
answerClick(answer.d);
document.getElementById("next-question").addEventListener("click", function(event){
    randomizeQuestion();
    document.getElementById("result").innerHTML = "";
});
