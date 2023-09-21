
let buttonColours= ["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern =[];
let started= false;
let level= 0;

function startGame(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level "+level);
        $(".start").hide();
        started= true;
    }
}

$(".start").on("click",function(){
    startGame();
})

$(document).on("keydown",function(){
    startGame();
})


$(".btn").on("click",function(){
    let userChosenColor= this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})



function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("sucess");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}



function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumbar=(Math.floor(Math.random()*4));
    let randomChosenColour = buttonColours[randomNumbar];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}



function playSound(name){
    let buttonAudio= new Audio("sounds/"+name+".mp3");
    buttonAudio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass('pressed');
       
}, 100);
}

function startOver() {
    gamePattern=[];
    level=0;
    started=false;
    $(".start").show();
}



