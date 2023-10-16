// Program hänga gubbe
// 1. Lista + slumpa ord
// 2. Gissa-funktion
// 3. Uppdatera bilden
// 4. Resultat(endgame), playagain-button
// 5. Timer



// Vår lista med random ord som slupmässigt väljs ut
const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"];

// Väljer ett random ord från lista
let randomWord = words[Math.floor(Math.random() * words.length)];

// Korrekta gissningar samlas i en array
let correctGuessesDone = Array(randomWord.length).fill(false);
let timeLeft = 60; // 1 minut i sekunder
let timerInterval;

   
startTimer();



const wordDisplay = document.getElementById("word-display");
updateHiddenWord(); // startar spelet
// Funktion som gör att bokstäver går från gömda till visuella.
function updateHiddenWord() {
    wordDisplay.innerHTML = "";
    for (let i = 0; i < randomWord.length; i++) {
        if (correctGuessesDone[i]) {
            wordDisplay.innerHTML += `${randomWord[i]}`;
        } else {
            wordDisplay.innerHTML += " _ ";
        }
    
    }
}




let wrongGuessesDone = [];
const wrongGuessesDisplay = document.getElementById("wrong-guesses");
const guessInput = document.getElementById("guess-input");

// Funktion för hantering av gissningar.
//Skapa en funktion som är enbart för varningar när man gör fel
function makeGuess() {

    startTimer();
  
    const guess = guessInput.value.toLowerCase();
          
            //Varningar som säger instruerar användaren att den gjort "fel"
    if (!/[a-z]/.test(guess)) {
        alert("Please enter a single letter.");
        guessInput.value = "";
        return;
    }
        //Om du redan gissat rätt eller fel på en bokstav så får du ett felmeddelande
        //Om du gissar rätt så kommer din gissade bokstav att dyka upp synlig
    if (correctGuessesDone.includes(guess) || wrongGuessesDone.includes(guess)) {
        alert("You've already guessed that letter.");
    } else if (randomWord.includes(guess)) {
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === guess) {
                if (!correctGuessesDone[i]){
                correctGuessesDone[i] = true;
                updateHiddenWord();
            }
            else{
                alert("You've already guessed that letter.")
            }
            }
        }
    } else {
        //Felgissningar
        wrongGuessesDone.push(guess);
        incorrectGuessesImg++;
        wrongGuessesDisplay.innerHTML = wrongGuessesDone.join(", ");
        updateHangman();
        
    }
    //Rensar gissningsfältet efter en gissning
    guessInput.value = "";
    
 
    

    if (incorrectGuessesImg >= 6) {
        endGame(false);
    } else if (!correctGuessesDone.includes(false)) {
        endGame(true);
    }
}

//Man trycker enter för att göra en gissning
guessInput.addEventListener("keydown",(event) => {
    if(event.key === "Enter"){makeGuess()}})


// Funktion för att uppdatera bilden när användaren gissar fel.
let incorrectGuessesImg = 0;
function updateHangman() {
    switch (incorrectGuessesImg) {
        case 1:
            document.getElementById("ground").style.display = "block";
            break;
        case 2:
            document.getElementById("scaffold").style.display = "block";
            break;
        case 3:
            document.getElementById("head").style.display = "block";
            break;
        case 4:
            document.getElementById("body").style.display = "block";
            break;
        case 5:
            document.getElementById("arms").style.display = "block";
            break;
        case 6:
            document.getElementById("legs").style.display = "block";
            // Användaren har förlorat
            // Visa förlorad meddelande eller hantera spelet som du önskar
            break;
      
    }
}

// Funktion för att avsluta spelet och visa resultatet
// Antingen vinst eller förlust

let hideEndOFGame = document.querySelector(".container")
let showTitle = document.querySelector(".result")
const resultText = document.getElementById("result-text");
const correctWordDisplay = document.getElementById("correct-word");

function endGame(isWinner) {

    const winSound = document.getElementById("winSound");
    const loseSound = document.getElementById("loseSound");
    const winSound2 = document.getElementById("winSound2");
    const loseSound2 = document.getElementById("loseSound2");
   
    if (isWinner) {
        resultText.textContent = "You won!";
        hideEndOFGame.style.display = "none";
        showTitle.style.display = "block";
        correctWordDisplay.textContent = `Congratulations you are the best`;
        winSound.play();
        winSound2.play();
        winImg.classList.remove("hiddenImgUntillWin")
        stopTimer()
        
    } else {
        resultText.textContent = "You lost!";
        hideEndOFGame.style.display = "none";
        correctWordDisplay.innerHTML = `The correct word was: <span> ${randomWord} </span> `;
        showTitle.style.display = "block";
        loseSound.play();
        loseSound2.play();
        loseImg.classList.remove("hiddenImgUntillLose");
        stopTimer()
       
    }
}



// Eventlistener som gör en Page reload vid tryck på playagain-knappen
const playAgainButton = document.getElementById("play-again-button");
playAgainButton.addEventListener("click",() => 
{window.location.reload()})

// Du kan även trycka enter för att köra playagian
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && showTitle.style.display === "block") {
        // Kontrollera om inmatningsrutan är fokuserad
        if (document.activeElement !== guessInput) {
            window.location.reload();
        }
    }
});


//Funktion för att starta timer
function startTimer() {
    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            // Tiden har tagit slut, användaren förlorar
            clearInterval(timerInterval);
            endGame();
           
        } else {
            // Konvertera tiden till formatet mm:ss
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft  %60;
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Uppdatera visningen av tiden
            document.getElementById("timer").textContent = timeString;

            // Minska tiden med 1 sekund
            timeLeft--;
        }
    }, 1000); // Uppdatera varje sekund
}

//Funktion för att stänga timern
function stopTimer() {
    clearInterval(timerInterval);
}












