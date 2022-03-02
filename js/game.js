let gamePattern = [];
let isStarted = false;
let level = 0;
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let highestScore = [];

$(document).keypress( function(){
   if(!isStarted){
       $("#score").addClass("hidden");
       $("#level-title").text("Level "+ level);
       nextSequence();
       isStarted = true;
   }
});


$(".btn").click( function (e) {
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function checkHighestScore(scoreArr){
   let result = scoreArr.reduce( (acc, max) => {
        if(acc >= max){
            max = acc;
        };
        return max;
    }, 0);
    return result;
}

function checkAnswer(currentLevel){
    console.log("Game Pattern: " + gamePattern);
    console.log("User Clicked Pattern: " + userClickedPattern);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence, 1000);
        }

    }
    else {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        highestScore.push(level);
        highest_score = checkHighestScore(highestScore);
        latestScore = level;
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#score").removeClass("hidden");
        $("#score").text( "Highest Score: "+ highest_score + " " + "Latest Score: " + latestScore);
        startOver();
    }
}

function playSound(name){
    let audio = new Audio("./sounds/"+ name+".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    },100);
};

function startOver(){
    isStarted = false;
    level = 0;
    gamePattern = [];
}



