const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];

let selectedWord = "";
let guessedWord = [];
let wrongGuesses = [];
let attemptsLeft = 6;
let gameWon = false;

// Select a random word from the words array
function selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Initialize the game
function initGame() {
    selectedWord = selectRandomWord().toLowerCase();
    guessedWord = Array(selectedWord.length).fill("_");
    wrongGuesses = [];
    attemptsLeft = 6;
    gameWon = false;

    updateDisplay();
}

// Update the display
function updateDisplay() {
    const hangmanImage = document.getElementById("hangman-image");
    const wordDisplay = document.getElementById("word-display");
    const guessesDisplay = document.getElementById("guesses");
    const message = document.getElementById("message");

    hangmanImage.src = `hangman-${attemptsLeft}.png`;
    wordDisplay.textContent = guessedWord.join(" ");
    guessesDisplay.textContent = `Wrong guesses: ${wrongGuesses.join(", ")}`;

    if (gameWon) {
        message.textContent = "Congratulations! You won!";
    } else if (attemptsLeft === 0) {
        message.textContent = `Game over. The word was "${selectedWord}".`;
    } else {
        message.textContent = "";
    }
}

// Check if the guessed letter is correct
function checkGuess(letter) {
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        wrongGuesses.push(letter);
        attemptsLeft--;
    }

    if (guessedWord.join("") === selectedWord) {
        gameWon = true;
    }

    updateDisplay();
}

// Event listener for guess button click
document.getElementById("guess-button").addEventListener("click", () => {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase();

    if (guess.length === 1 && /^[a-zA-Z]+$/.test(guess)) {
        if (!guessedWord.includes(guess) && !wrongGuesses.includes(guess)) {
            checkGuess(guess);
        }
    }

    guessInput.value = "";
});

// Event listener for restart button click
document.getElementById("restart-button").addEventListener("click", () => {
    initGame();
});

// Initialize the game when the page loads
window.onload = initGame;