var startBtn = document.querySelector("#start");
var introSec = document.querySelector(".intro");
var quizSec = document.querySelector(".the-quiz");
var timeEl = document.querySelector("#timer");
var questionTxt = document.querySelector("#question");
var correctTxt = document.querySelector(".correctness");
var userScore = document.querySelector(".your-score");
var submitBtn = document.querySelector("#submit");
var highScore = document.querySelector(".high-scores");
var scoreBoard = document.querySelector("#score-board");
var clearBtn = document.querySelector("#clear");
var backBtn = document.querySelector("#back");
var scoreBtn = document.querySelector("#score");
var playerScoreForm = document.querySelector("#name");
var playerScore = document.querySelector("#player-score");
var choices = document.querySelectorAll(".questions button");
var player = localStorage.length;
var secondsLeft;

var questionCounts;

var question1 = [
    "Which of the following type of variable is visible everywhere in your JavaScript code?",
    "global variable",
    "local variable",
    "both of the above.",
    "none of the above",
    "q1"              
];

var question2 =[
    "Which built-in method combines the text of two strings and returns a new string?",
    "append()",
    "concat()",
    "attach()",
    "none of the above",
    "q2"
];

var questionSet = [question1,question2];


function loadQuestion(count) {
    var currQuestion;
    if(questionCounts>0){
        currQuestion = questionSet[questionCounts-1];
        questionTxt.textContent = currQuestion[0];
        for(var i = 1; i<= 4; i++){
            choices[i-1].textContent = currQuestion[i];
            choices[i-1].addEventListener('click',function setButtons(){
                if(this.id == currQuestion[5]){
                    loadQuestion(questionCounts--);
                }else{
                    if(secondsLeft<=10){
                        secondsLeft = 0;
                        timeEl.textContent = "Time: "+secondsLeft;
                        clearInterval(timerInterval);
                        
                        quizSec.setAttribute("style","display:none;");
                        userScore.setAttribute("style","display:flex;");
                    }else{
                        secondsLeft-=10;
                        clearInterval(timerInterval);
                        setTime(secondsLeft);
                    }
                    loadQuestion(questionCounts--);
                }
            })
        }
    }else{
        timeEl.textContent ="Time: "+secondsLeft;
        clearInterval(timerInterval);
        quizSec.setAttribute("style","display:none;");
        userScore.setAttribute("style","display:flex;");
    }
    
}

//start the game when start-button is clicked
startBtn.addEventListener("click", function(){
    secondsLeft = 90;
    questionCounts =2;
    introSec.setAttribute("style","display:none;");
    quizSec.setAttribute("style","display:block; text-align:center;");
    questionTxt.setAttribute("style", "font-size:20px; margin-bottom:20px ");
    timeEl.textContent = "Time: "+secondsLeft;    
    loadQuestion(questionCounts);
    setTime(secondsLeft);
})

//set up a timer
var timerInterval;
function setTime(secondsLeft){
    timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = "Time: "+secondsLeft;
        playerScore.textContent = "your score: "+secondsLeft;
        //if time up, show score page
        if(secondsLeft === 0){
            clearInterval(timerInterval);
            quizSec.setAttribute("style","display:none;");
            userScore.setAttribute("style","display:flex;");
        }
    
    },1000)

}

function storeToBoard(initial,score){
    console.log(player);
    localStorage.setItem(player,[initial,score]);
    player++;
    console.log(player);
}
var playerName;
playerScoreForm.addEventListener('keyup',function(){
    playerName = this.value;
})


submitBtn.addEventListener("click",function(){
    // var playerScore = timeEl.splite(" ");
    storeToBoard(playerName,timeEl.textContent.split(" ")[1]);
        loadScoreboard();
    userScore.setAttribute("style","dispaly:none");
    highScore.setAttribute("style","display:flex");
    playerScoreForm.value="";
})

backBtn.addEventListener("click",function(){
    introSec.setAttribute("style","display:flex");
    highScore.setAttribute("style","display:none");
    while(scoreBoard.firstChild){
        scoreBoard.firstChild.remove();
    }
})


clearBtn.addEventListener('click',function(){
    localStorage.clear();
    while(scoreBoard.firstChild){
        scoreBoard.firstChild.remove();
    }
    player = 0 ;
})

function loadScoreboard(){
    for(var i = 0; i < localStorage.length; i++){
        var playerdata = localStorage.getItem(i).split(",");
        var player = playerdata[0];
        var score = playerdata[1];
        var playerRank = document.createElement("div");
        playerRank.textContent = player +": "+ score;
        playerRank.setAttribute('style','font-size:20px; color: white; background-color:var(--bgc); width:200px;display:block; text-align:center;');
        scoreBoard.append(playerRank);
    }
}

scoreBtn.addEventListener('click',function(){
    clearInterval(timerInterval);
    if(localStorage.length>0){
        loadScoreboard();
    }
    introSec.setAttribute("style","display:none;");
    quizSec.setAttribute("style","display:none;");
    userScore.setAttribute("style","display:none;");
    highScore.setAttribute("style","display:flex;");
})


storeToBoard("JW",15);
storeToBoard("GG",3);