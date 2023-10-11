// Skriv en bokstav i inputfältet och den skrivs ut i konsollen direkt
// Gör om så att gissningen kontrollleras mot "ordet"
//Om den finns i ordet => gör så att bokstav visas på rätt plats i ordet.
// Om man gissar fel så ska en bild visas och bokstaven förflyttas till "felaktiga bokstäver"

// Spara alla bokstäver i en tom array. Om man trycker på en av de gissade bokstäverna => ej giltig gissning

// Skapa variablar på våra element

// array med ord

//väljer ett random ord från array
const guesses = []
const asideArray = ["Banan", "melon", "kiwi", "melon"]


// Select a random word from the words array
function selectRandomWord() {
    return asideArray[Math.floor(Math.random() * words.length)];
}




let answer = document.querySelector("#guess-input")
answer.addEventListener("keydown", (event) => {

      console.log(event)

    
  });