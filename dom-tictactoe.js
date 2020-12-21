
let currentMarker = 'X'
let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

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
  console.log(`We'll place a mark on square: ${id}`)
  //targets the element that was clicked and sets innerhtml to val of cur marker
  document.getElementById(id).innerHTML = currentMarker;
}

// passes the element's id attribute from HTML to be used
const updateBoard = (id) => {
  // parses the id string into a number then captures the first and last part the newly create number as row & column
  const row = parseInt(id.charAt(0))
  const column = parseInt(id.charAt(2)) 

  console.log(`you clicked the sq at ${row} and ${column}`)
  board[row][column] = currentMarker;
  console.log(board)
  
}

const checkForWin = () => {
  // calls each checkForWin possibility and if any are true gives a page alert,
  if(horizontalWin() || verticalWin() || diagonalWin()) {
    window.alert(`Player ${currentMarker} won!`);
    resetBoard();
  } else {
    // if no win, change the marker from X to O, or O to X for the next player.
    changeMarker()
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
  // sanity check: this tells us the function is being called
  console.log("the board was cleared!")

  // collects all of the "td"s into an HTML Collection: https://www.w3schools.com/jsref/dom_obj_htmlcollection.asp  
  const squares = document.getElementsByTagName("TD")
  
  // loops over the HTML Collections and clears out the Xs and Os
  for (i=0; i<squares.length; i++) {
    console.log(squares[i])
    squares[i].innerHTML = null
  }
  board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
}

// **BONUSES**

// 1. Display the current player's turn
// 2. Count number of wins for each player and display them
// 3. Reset the number of wins
// 4. Add players names and display who wins, i.e. "Congrats Emily, you won with 0s!"