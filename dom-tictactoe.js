
let currentMarker = 'X'
let winner;
let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

const handleNames = () => {
  //display whos turn it is
  let pTurn = document.getElementById("playersTurn");
  let pOne = document.getElementById("pOne");
  let pTwo = document.getElementById("pTwo");
  let playOne = document.getElementById("playerOne");
  let playTwo = document.getElementById("playerTwo");
  playOne.innerHTML = pOne.value;
  playTwo.innerHTML = pTwo.value;
  if(currentMarker == "X") {
    pTurn.innerHTML = pOne.value;
    winner=pOne.value;
  } else if (currentMarker == "O") {
    pTurn.innerHTML = pTwo.value;
    winner=pTwo.value;
  }
}

// is called when a square is clicked. "this" = element here
const handleClick = (element) => {
  // check to see if the square clicked has anything in it, if not continue
  // this prevents an X being changed to an O
  if(!document.getElementById(element.id).innerHTML){
    addMarker(element.id)
    updateBoard(element.id)
    checkForWin()
  }
}

const addMarker = (id) => {
  //targets the element that was clicked and sets innerhtml to val of cur marker
  document.getElementById(id).innerHTML = currentMarker;
}

// passes the element's id attribute from HTML to be used
const updateBoard = (id) => {
  // parses the id string into a number then captures the first and last part the newly create number as row & column
  const row = parseInt(id.charAt(0))
  const column = parseInt(id.charAt(2)) 
  board[row][column] = currentMarker;
}

//function to reset the wins on the board
const resetWins = () => {
  let x = document.getElementById("xScore");
  let o = document.getElementById("oScore");
  x.innerHTML = "0";
  o.innerHTML = "0";
}

const checkForWin = () => {
  // calls each checkForWin possibility and if any are true gives a page alert,
  if(horizontalWin() || verticalWin() || diagonalWin()) {
    let playerScoreDOM = document.getElementById(`${currentMarker.toLowerCase()}Score`);
    let playerScore = parseInt(playerScoreDOM.innerHTML)+1;
    playerScoreDOM.innerHTML = playerScore;
    window.alert(`Neat. ${winner} won.`);
    resetBoard();
  } else {
    // if no win, change the marker from X to O, or O to X for the next player.
    changeMarker();
    //change whos turn it is
    handleNames();
    //document.getElementById("playersTurn").innerHTML = currentMarker;
  }
}

const horizontalWin = () => {
  if ((board[0][0] == currentMarker && 
    board[0][1] == currentMarker && 
    board[0][2] == currentMarker) ||
    (board[1][0] == currentMarker && 
      board[1][1] == currentMarker && 
      board[1][2] == currentMarker) ||
    (board[2][0] == currentMarker && 
      board[2][1] == currentMarker && 
      board[2][2] == currentMarker))  {
    return true;
}
return false;
}

const verticalWin = () => {
  if ((board[0][0] == currentMarker && 
    board[1][0] == currentMarker && 
    board[2][0] == currentMarker) ||
    (board[0][1] == currentMarker && 
    board[1][1] == currentMarker && 
    board[2][1] == currentMarker) ||
    (board[0][2] == currentMarker && 
    board[1][2] == currentMarker && 
    board[2][2] == currentMarker))  {
    return true;
}

return false;
}

const diagonalWin = () => {
  if ((board[0][0] == currentMarker && 
    board[1][1] == currentMarker && 
    board[2][2] == currentMarker) ||
    (board[0][2] == currentMarker && 
    board[1][1] == currentMarker && 
    board[2][0] == currentMarker))  {
    return true;
}

return false;
}

const changeMarker = () => {
  // ternary operator: if it's an X make it an O, if O make it an X
  currentMarker = currentMarker === "X" ? "O" : "X"
}

const resetBoard = () => {
  // collects all of the "td"s into an HTML Collection: https://www.w3schools.com/jsref/dom_obj_htmlcollection.asp  
  const squares = document.getElementsByTagName("TD")
  
  // loops over the HTML Collections and clears out the Xs and Os
  for (i=0; i<squares.length; i++) {
    squares[i].innerHTML = null
  }
  board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
}