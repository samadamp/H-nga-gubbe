const arrayStrings = ["apple", "banana", "cherry"];
const letterToFind = "a";

function letterInArray(letter, arrayOfStrings) {
    
    for (let i = 0; i < arrayOfStrings.length; i++) {
      const currentString = arrayOfStrings[i];
      
      if (currentString.includes(letter)) {
        return true;
      }
    }
    return false;
  }
 
  if (letterInArray(letterToFind, arrayStrings)) {
    console.log(`The letter "${letterToFind}" is in the array.`);
  } else {
    console.log(`The letter "${letterToFind}" is not in the array.`);
  }
