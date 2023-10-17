
// Define an array of words to choose from
const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"];

// Choose a random word
let randomWord = words[Math.floor(Math.random() * words.length)];

// Track the current state of the game
let correctGuesses = Array(randomWord.length).fill(false);
let wrongGuesses = [];
const correctGuessedLetters = []
let incorrectGuesses = 0; // namnförslag: wrongGuessCount
let timeLeft = 60; // 1 minut i sekunder
let timerInterval;


// DOM elements
const wordDisplay = document.getElementById("word-display");
const wrongGuessesDisplay = document.getElementById("wrong-guesses");
const hangmanImage = document.querySelector(".hangman svg");
const resultText = document.getElementById("result-text");
const popUpBox = document.getElementById("correct-word");
const playAgainButton = document.getElementById("play-again-button");
const guessInput = document.getElementById("guess-input");
let hideEndOFGame = document.querySelector(".container")
let showTitle = document.querySelector(".result")
let timerButton = document.querySelector("#startTimer")

// Eventlisteners
playAgainButton.addEventListener("click",() => 
{window.location.reload()})

guessInput.addEventListener("keydown",(event) =>
{if(event.key === "Enter"){makeGuess()}})

timerButton.addEventListener("click", timer)

updateWordDisplay(); // startar spelet
// Funktion för att visa
function updateWordDisplay()
{
    wordDisplay.innerHTML = "";
    for (let i = 0; i < randomWord.length; i++) {
        if (correctGuesses[i]) {
            wordDisplay.innerHTML += `${randomWord[i]}`;
        } else {
            wordDisplay.innerHTML += " _ ";
        }
    
    }
}

// Funktion för hantering av gissningar.
function makeGuess()
{
   const guess = guessInput.value.toLowerCase();
    if (!isValidGuess(guess))
    {
        return // ej giltlig gissning - avbryt gissning.
    }
    if (randomWord.includes(guess)) {
        
        for (let i = 0; i < randomWord.length; i++) {
           
            if (randomWord[i] === guess) 
            {
                if (!correctGuesses[i])
                {
                    correctGuesses[i] = true;
                    updateWordDisplay();
                    correctGuessedLetters.push(guess)
                    console.log(`rätt gissningar`, correctGuessedLetters) //fungerar
                }
            

            }
        }
    } 
    else 
    {
        wrongGuesses.push(guess);
        console.log(`fel gissningar`, wrongGuesses)
        incorrectGuesses++;
        wrongGuessesDisplay.innerHTML = wrongGuesses.join(", ");
        updateHangman();
        
    }
    
    guessInput.value = "";

    if (incorrectGuesses >= 6) {
        endGame(false);
    } else if (!correctGuesses.includes(false)) {
        endGame(true);
    }
}

function isValidGuess(guess)
{

    if(!/[a-z]/.test(guess))
    {
        alert("Please enter a single letter between a and z.")
        return false // gissningen ej giltlig returnera false och ge en alert
    }
    if(correctGuessedLetters.includes(guess) || wrongGuesses.includes(guess))
    {
        alert("You've already guessed that letter.")
        return false // gissningen ej giltlig returnera false och ge en alert
    }
    return true
   

}

// Funktion för att uppdatera bilden när användaren gissar fel.
// Skulle ev kunna göras om till en switch.
function updateHangman() {
   
    if (incorrectGuesses === 1) {
        document.getElementById("ground").style.display = "block";
    } else if (incorrectGuesses === 2) {
        document.getElementById("scaffold").style.display = "block";
    } else if (incorrectGuesses === 3) {
        document.getElementById("head").style.display = "block";
    } else if (incorrectGuesses === 4) {
        document.getElementById("body").style.display = "block";
    } else if (incorrectGuesses === 5) {
        document.getElementById("arms").style.display = "block";
    } else if (incorrectGuesses === 6) {
        document.getElementById("legs").style.display = "block";
        // Användaren har förlorat
        // Visa förlorad meddelande eller hantera spelet som du önskar
    }
}

// Funktion för att avsluta spelet och visa resultatet
function endGame(isWinner) {
   
    if (isWinner) {
        resultText.innerText = "You won!";
        hideEndOFGame.style.display = "none";
        showTitle.style.display = "block";
        popUpBox.innerHTML = `Congratulations you are the best!
        The word was <span> ${randomWord}! </span>`;
        
    } else {
        resultText.innerText = "You lost!";
        hideEndOFGame.style.display = "none";
        popUpBox.innerHTML = `The correct word was: <span> ${randomWord} </span> `;
        showTitle.style.display = "block";
       
    }
    clearInterval(timerInterval) // Denna funktion stoppar timern
}

function timer() {
        timerInterval = setInterval(function() 
        {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft  %60;
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Uppdatera visningen av tiden
             document.getElementById("timer").textContent = timeString;

            // Minska tiden med 1 sekund
            timeLeft--;
         if(timeLeft < 0)
        {
            endGame()

        }
        }, 1000); // Uppdatera varje sekund

       
}









