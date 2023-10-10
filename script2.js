// Ordlistan
const wordList = ["apple", "banana", "cherry", "date", "elderberry"];

// Slumpa ett ord från listan
const randomIndex = Math.floor(Math.random() * wordList.length);
const randomWord = wordList[randomIndex];

// Delar av spelet
const wordDisplay = document.getElementById("word-display");
const guessesDisplay = document.getElementById("guesses");
const hangmanDisplay = document.getElementById("hangman");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");

// Konvertera ordet till understreck
let hiddenWord = randomWord.replace(/./g, "_");

// Visa det slumpade ordet som understreck
wordDisplay.textContent = hiddenWord;

// Håll reda på gissningar och fel
const guesses = [];
let wrongGuesses = 0;

// Gissa-funktionen
function makeGuess() {
    const guess = guessInput.value.toLowerCase();

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert("Du kan bara gissa en bokstav i taget.");
        guessInput.value = "";
        return;
    }

    if (guesses.includes(guess)) {
        alert("Du har redan gissat den här bokstaven.");
        guessInput.value = "";
        return;
    }

    guesses.push(guess);

    if (randomWord.includes(guess)) {
        // Rätt gissning
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === guess) {
                hiddenWord = hiddenWord.substring(0, i) + guess + hiddenWord.substring(i + 1);
            }
        }

        wordDisplay.textContent = hiddenWord;

        if (!hiddenWord.includes("_")) {
            // Alla bokstäver är gissade
            alert("Du vann! Ordet var: " + randomWord);
            resetGame();
        }
    } else {
        // Fel gissning
        wrongGuesses++;
        updateHangmanDisplay();
        if (wrongGuesses === 6) {
            // Sex fel gissningar, förlorat spelet
            alert("Du förlorade. Ordet var: " + randomWord);
            resetGame();
        }
    }

    guessesDisplay.textContent = "Gissningar: " + guesses.join(", ");
    guessInput.value = "";
}

function updateHangmanDisplay() {
    // Uppdatera visningen av hänga gubben baserat på fel gissningar
    // Du kan använda CSS för att visa olika delar av gubben.
    // behöver jag använda hiddenword och jämföra med??
    




}

function resetGame() {
    // Återställ spelet för en ny omgång
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    hiddenWord = randomWord.replace(/./g, "_");
    wordDisplay.textContent = hiddenWord;
    guesses.length = 0;
    wrongGuesses = 0;
    guessesDisplay.textContent = "";
    hangmanDisplay.textContent = "";
    guessInput.value = "";
}

// Lyssna på knappen för att göra en gissning
guessButton.addEventListener("click", makeGuess);

// Lyssna på tangenttryckning för att göra en giss