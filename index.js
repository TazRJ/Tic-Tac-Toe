const cells = document.querySelectorAll('.cell')
const statusText = document.querySelector('#statusText')
const reset = document.querySelector('#reset')
const wins = [
    //rows
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //columns
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonals
    [0,4,8],
    [2,4,6]
]

//The selections made by the players
let selections = ["","","","","","","","",""]
//First player is always x
let currentPlayer = 'X'
//Whether the game is running
let running = false

initialiseGame()

function initialiseGame(){
    //add event listeners to each cell upon click and call clickedCell
    cells.forEach(cell => {
        cell.addEventListener('click',clickedCell)
    });
    //Add event listener to reset button
    reset.addEventListener('click', resetGame)
    //Initialise the statusText to the current player's turn
    statusText.textContent = `${currentPlayer}'s turn!`;
    //Set the game as running
    running = true
}


function clickedCell(){
    //cellIdx is the clicked cells's index from the div attribute
    const cellIdx = this.getAttribute("cellIndex")
    //if the cell is empty (not clicked) or the game is not running, just return
    if(selections[cellIdx] != "" || !running){
        return;
    }

    //else, update the cell changes to the selections array
    updateCell(this/*the clicked cell*/, cellIdx)
    //then check if there is a winner
    checkWinner()
}

function updateCell(cell, index){
    //Passed in cell and index is used to update the selections array index, and text to the current player
    selections[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer(){
    //change the current player and update the status text as well
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
    statusText.textContent = `${currentPlayer}'s turn!`
}

function checkWinner(){ //function is called during every cell being clicked and after the updateCell function is called
    //initialise that the game is not won
    let gameWon = false

    //iterate over win conditions
    for(let i = 0; i < wins.length; i++){
        //win is each array element from wins
        const win = wins[i]
        //each array element's [0] index, etc in the selections array
        
        const cellA = selections[win[0]] 
        const cellB = selections[win[1]]
        const cellC = selections[win[2]]

        //if three consecutive elements in the selections array don't have the winning conditions indices, continue, else if the three cells are equal, the gameWon is true and the loop ends
        if(cellA === "" || cellB === "" || cellC === ""){
            continue;
        }
        if(cellA === cellB && cellB === cellC){
            gameWon = true
            break
        }

    }

    //the the game has been won:
    if(gameWon){
        statusText.textContent = `${currentPlayer} wins!`
        running = false
    } else if (!selections.includes("")){ //if the selections array has been filled without one player winning, the game is a draw, and the game ends
        statusText.textContent = `Draw!`
        running = false
    } else { //if it isn't a draw, change the player to continue the game
        changePlayer() 
    }

}

function resetGame(){
    currentPlayer = 'X'
    selections = ["","","","","","","","",""]
    statusText.textContent = `${currentPlayer}'s turn!`
    cells.forEach(cell => {
        cell.textContent = ""
    });
    running = true
}