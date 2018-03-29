var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What year did Super Mario Bros. Come out?", "What is the name of the protaganist of the 'Legend of Zelda' series?", "What is Pikachu's Pokedex number?", "What is the singing Duo in Splattoon named?", "What planet did Captain Olimar land on in Pikmin?", "What is the first ability Kirby can copy in the entire Kirby series?", "What is Diddy Kong's relationship with Donkey Kong?", "What job has Mario NOT done?"];
var answerArray = [["2001", "1985", "1996", "2006"], ["Zelda","Luigi","Kirby","Link"], ["025", "001", "151", "176"], ["Squid Twins", "Callie+Marie", "Squid Sisters", "Rockin Ink"], ["Alpha Centauri", "Earth", "Mars", "It isn't given a name."], ["Sword", "Fire", "Sleep", "Beam"], ["Brother", "Son", "Nephew", "Friend"], ["Doctor", "Referee", "Plumber", "Computer Programmer"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/smb.png'>", "<img class='center-block img-right' src='assets/images/link.png'>", "<img class='center-block img-right' src='assets/images/pikachu.png'>", "<img class='center-block img-right' src='assets/images/squidsisters.png'>", "<img class='center-block img-right' src='assets/images/earth.png'>", "<img class='center-block img-right' src='assets/images/beamkirby.png'>", "<img class='center-block img-right' src='assets/images/kong.png'>", "<img class='center-block img-right' src='assets/images/mario.png'>"];
var rightAnswer = ["B. 1985", "D. Link", "A. 025", "C. Squid Sisters", "B. Earth", "D. Beam", "C. Nephew", "D. Computer Programmer"]
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/coin.wav");

$(document).ready(function() {
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); 
    
    $("body").on("click", ".answer", function(event){
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === rightAnswer[questionCounter]) {
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            clearInterval(theClock);
            generateLoss();
        }
    }); 
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); 
    
    }); 
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + rightAnswer[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/no_way.gif'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + rightAnswer[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ rightAnswer[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/no_way.gif'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }