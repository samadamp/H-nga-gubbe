function getUserInput(letter){
    let userInput = document.querySelector('#userInputField').value;
    
    const listItem = document.createElement('li') // <li>
    listItem.innerText = userInput
    document.querySelector("aside > ul").append(listItem)

}
getUserInput()