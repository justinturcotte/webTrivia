
const dom = {
    score: document.getElementById("score"),
    question: document.getElementById("question"),
    result: document.getElementById("result"),
    answer: [document.getElementById("a0"), document.getElementById("a1"), document.getElementById("a2"), document.getElementById("a3")]
}

var question = "Question";
var answer = ["Answer", "Answer", "Answer", "Answer"];
var score = 0;
var total = 0;
var answered = false;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

function randomizeArray(arr) {
    let output = []
    let arrCopy = Object.assign([], arr);
    for (i = arr.length - 1; i >= 0; i--) {
        let temp = getRandomInt(i);
        output.push(arrCopy[temp]);
        arrCopy.splice(temp, 1);
    }
    return output;
}

function arenaQuiz(nhl) {
    answer = [];
    let randomTeamArray = randomizeArray(nhl.teams);
    let teamsTruncated = randomTeamArray.splice(0, 4);
    let teamName = teamsTruncated[0].name;
    question = "Where do the " + teamName + " play?"
    for (i = 3; i >= 0; i--) {
        answer.push({ choice: teamsTruncated[i].venue.name, correct: teamsTruncated[i].name === teamName })
    }
    answer = randomizeArray(answer);
    console.log(question);
    console.log(answer);
    dom.question.innerHTML = question;
    for (i = 0; i < answer.length; i++) {
        dom.answer[i].innerHTML = answer[i].choice;
    }
}

function answerClick(x) {
    dom.answer[x].addEventListener("click", function (event) {
        if (answered) { }
        else if (answer[x].correct) {
            dom.result.innerHTML = "Correct answer!!";
            dom.answer[x].style.backgroundColor = "green";
            answered = true;
            score++;
            total++;
            dom.score.innerHTML = "Score: " + score + "/" + total;
        }
        else {
            dom.result.innerHTML = "Incorrect.";
            dom.answer[x].style.backgroundColor = "red";
            answered = true;
            total++;
            dom.score.innerHTML = "Score: " + score + "/" + total;
        }
    });
};

document.getElementById("next-question").addEventListener("click", function (event) {
    if (answered !== true) {
        total++;
        dom.score.innerHTML = "Score: " + score + "/" + total;
    }
    for (i = 0; i <= 3; i++) {
        dom.answer[i].style.backgroundColor = "";
        answered = false;
        dom.result.innerHTML = "";
    }
    teamsQuestion();
});

function activateSelection() {
    for (i = 0; i <= 3; i++) {
        answerClick(i);
    }
}


const TEAMS_URL = "https://statsapi.web.nhl.com/api/v1/teams";

function teamsQuestion() {
    const promise = fetch(TEAMS_URL);
    promise
        .then(function (response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function (processedResponse) {
            arenaQuiz(processedResponse);
            activateSelection();
        });
}

teamsQuestion();

//replace all "document." DOM references with variables