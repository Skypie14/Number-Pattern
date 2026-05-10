// 25301714_WEBA262_26_S1_SS2 - Number Pair Game

//Global Variables
let pairs = [];
let timeLeft;
let timerInterval;
let boardSize;
let card1 = null;
let card2 = null;
let lockBoard = false;
let score = 0
let TotalPairs = 0;
let matchedPairs = 0;
let totalPairsLeft = TotalPairs;
let TotalMoves = 0;


//loads instantly when page is opened - loads all game information into display
document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("displayPlayer").textContent = sessionStorage.getItem("playerName");
  document.getElementById("displayBoardSize").textContent = sessionStorage.getItem("boardSize");
  document.getElementById("displayDifficulty").textContent = sessionStorage.getItem("difficulty");
  document.getElementById("displayPairType").textContent = sessionStorage.getItem("pairType");
  document.getElementById("displayHints").textContent = sessionStorage.getItem("hints") === "true" ? "Enabled" : "Disabled";
  document.getElementById("displayScore").textContent = 0;

  const bestScore = getCookie("bestScore");

  if (bestScore) {
    document.getElementById("displayBestScore").textContent = bestScore;
  } else {
    document.getElementById("displayBestScore").textContent = "0";
  }

});


//gets cookies
//https://www.w3schools.com/js/js_cookies.asp
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// sets cookie
//https://www.w3schools.com/jsref/jsref_toutcstring.asp
//https://www.w3schools.com/js/js_cookies.asp
function setCookie(name, value) {
  const expiryDate = new Date("2027-12-31T23:59:59");
  const expires = "; expires=" + expiryDate.toUTCString();

  document.cookie = name + "=" + value + expires + "; path=/";
}

//collects game information then makes the game based on what was chosen by the player in settings
function GetGameInfo() {

  if (sessionStorage.getItem("boardSize") === "4x4") {
        //sets 4x4 grid
       boardSize = { x: 4, y: 4 };
       TotalPairs = 8;
       totalPairsLeft = TotalPairs;
      
      if (sessionStorage.getItem("pairType") === "numberWord") {
        pairs = ['one', '1', 'two', '2', 'three', '3', 'four', '4', 'five', '5', 'six', '6', 'seven', '7', 'eight', '8'];
        }
      else if (sessionStorage.getItem("pairType") === "sumAnswer") {
        pairs = ['1 + 1', '2', '2 + 2', '4', '3 + 3', '6', '4 + 4', '8', '5 + 5', '10', '6 + 6', '12', '7 + 7', '14', '8 + 8', '16'];
        }
      else if (sessionStorage.getItem("pairType") === "mixed") {
        pairs = ['one', '1', 'two', '2', 'three', '3', 'four', '4', '5 + 5', '10', '6 + 6', '12', '7 + 7', '14', '8 + 8', '16'];
       }
    } 
    else if (sessionStorage.getItem("boardSize") === "4x5") {
        //sets 4x5 grid
       boardSize = { x: 4, y: 5 };
       TotalPairs = 10;
       totalPairsLeft = TotalPairs; 

       if (sessionStorage.getItem("pairType") === "numberWord") {
         pairs = ['1', 'one', '2', 'two', '3', 'three', '4', 'four', '5', 'five', '6', 'six', '7', 'seven', '8', 'eight', '9', 'nine', '10', 'ten'];
       }
      else if (sessionStorage.getItem("pairType") === "sumAnswer") {
        pairs = ['1 + 1', '2', '2 + 2', '4', '3 + 3', '6', '4 + 4', '8', '5 + 5', '10', '6 + 6', '12', '7 + 7', '14', '8 + 8', '16', '9 + 9', '18', '10 + 10', '20'];
      }
       else if (sessionStorage.getItem("pairType") === "mixed") {
        pairs = ['1', 'one', '2', 'two', '3', 'three', '4', 'four', '5 + 5', '10', '6 + 6', '12', '7 + 7', '14', '8 + 8', '16', '9 + 9', '18', '10 + 10', '20'];
      }
    }
    else if (sessionStorage.getItem("boardSize") === "6x6") {
        //sets 6x6 grid
       boardSize = { x: 6, y: 6 };
       TotalPairs = 18;
       totalPairsLeft = TotalPairs;


       if (sessionStorage.getItem("pairType") === "numberWord") {
        pairs = ['1', 'one', '2', 'two', '3', 'three', '4', 'four', '5', 'five', '6', 'six', '7', 'seven', '8', 'eight', '9', 'nine', '10', 'ten', '11', 'eleven', '12', 'twelve', '13', 'thirteen', '14', 'fourteen', '15', 'fifteen', '16', 'sixteen', '17', 'seventeen', '18', 'eighteen'];
       }
       else if (sessionStorage.getItem("pairType") === "sumAnswer") {
        pairs = ['1 + 1', '2', '2 + 2', '4', '3 + 3', '6', '4 + 4', '8', '5 + 5', '10', '6 + 6', '12', '7 + 7', '14', '8 + 8', '16', '9 + 9', '18', '10 + 10', '20', '11 + 11', '22', '12 + 12', '24', '13 + 13', '26', '14 + 14', '28', '15 + 15', '30', '16 + 16', '32', '17 + 17', '34', '18 + 18', '36'];
        }
       else if (sessionStorage.getItem("pairType") === "mixed") {
        pairs = ['1', 'one', '2', 'two', '3', 'three', '4', 'four', '5 + 5', '10', '6 + 6', '12', '7 + 7', '14', '8 + 8', '16', '9 + 9', '18', '10 + 10', '20', '11 + 11', '22', '12 + 12', '24', '13 + 13', '26', '14 + 14', '28', '15 + 15', '30', '16 + 16', '32', '17 + 17', '34', '18 + 18', '36'];
        }

    }

    pairs = pairs.sort(() => Math.random() - 0.5); // Shuffles the pairs around in the grid

    // sets the time based on difficulty harder it is, the less time
    if (sessionStorage.getItem("difficulty") === "easy") {
        timeLeft = 240;
     }
    else if (sessionStorage.getItem("difficulty") === "medium") {
        timeLeft = 120;
     }
    else if (sessionStorage.getItem("difficulty") === "hard") {
        timeLeft = 60;
     }

  };


 // creates the grid for the game based on the board size
 // https://stackoverflow.com/questions/76856866/creating-grid-with-background-color?
 // https://www.javascripttutorial.net/javascript-dom/javascript-classlist/
 //https://www.w3schools.com/jsref/prop_html_classname.asp
 // some inspiration and learning material used to figure out how to make a grid.
 function createGrid() {

    const board = document.getElementById("gameBoard");
    board.innerHTML = "";

    board.className = "game-board";

    // checks the x and y value of the grid size before collecting the information from the CSS to add that board size.
    if (boardSize.x === 4 && boardSize.y === 4) {
        board.classList.add("board-4x4"); 
    } 
    else if (boardSize.x === 4 && boardSize.y === 5) {
        board.classList.add("board-4x5");
    } 
    else if (boardSize.x === 6 && boardSize.y === 6) {
        board.classList.add("board-6x6");
    }

    // create places numbers in each card 

    for (let i = 0; i < pairs.length; i++) {

        const card = document.createElement("div");

        card.classList.add("number-card");
        card.dataset.value = pairs[i];
        card.textContent = "?";

        board.appendChild(card);
    }
}


// Makes and starts the timer
//https://www.w3schools.com/js/js_timing.asp
function startTimer() {

  const timerDisplay = document.getElementById("displayTime");
  const timerShow = sessionStorage.getItem("timershow");

  if (timerShow === "true") {
      //clears previous timer if one was running
     clearInterval(timerInterval);

     timerDisplay.textContent = timeLeft + " s";

     timerInterval = setInterval(() => {

      timeLeft--; //time goes down
      timerDisplay.textContent = timeLeft + " s";

     if (timeLeft <= 0) {
       clearInterval(timerInterval);
       timerDisplay.textContent = "0 s";
       alert("Time's up!");
       lockBoard = true;
     }

  }, 1000);

  } else {
     clearInterval(timerInterval);
     timerDisplay.textContent = "N/A";
     return;
  }
}


//Start Button clicked
document.getElementById("startBtn").addEventListener("click", function() {

  alert("Starting game..."); 
  

  clearInterval(timerInterval); //resets timer

  matchedPairs = 0;  //resets matched pairs
  score = 0;  //resets score
  TotalMoves = 0; //resets moves made
  lockBoard = false;

  GetGameInfo();   //collects game information, makes game grid and then starts the timer
  createGrid();    
  startTimer();    

  document.getElementById("displayMoves").textContent = 0; //changes display to be 0
  document.getElementById("displayScore").textContent = 0;
  

  document.getElementById("displayPairsLeft").textContent = totalPairsLeft; //loads how many pairs are left to match
  document.getElementById("displayMatches").textContent = matchedPairs;  //loads how many pairs have been matched so far
  gameAction("Started Game Below");
  console.log("Game started");

});

// The event that occurs when the card on the gameboard is clicked
document.getElementById("gameBoard").addEventListener("click", function(event) {

   TotalMoves +=1; //increases moves made
   document.getElementById("displayMoves").textContent = TotalMoves; // changes display to match new total

   const card = event.target;

   if (!card.classList.contains("number-card")) return; 
   if (lockBoard) return; //if board is locked [true] then wont continue
   if (card.classList.contains("matched")) return; // if cared is already matched won't continue
   if (card === card1) return; // if new card and card1 are the same does not continue

   card.classList.add("flipped"); //flips the card
   card.textContent = card.dataset.value; //shows the card value

   //displays in game action panel based on what card it is.
   if (!card1) { 
    card1 = card;
    gameAction("Selected first card: " + card.dataset.value);
    return;
   }
   else {
    card2 = card;
    gameAction("Selected second card: " + card.dataset.value);
   };
 
  lockBoard = true; //locks board when 2 cards are flipped
  checkMatch(); // checks for a match once 2 cards are flipped
});

// resets the turn after checking match
function resetTurn() { 
  card1 = null;
  card2 = null;
  lockBoard = false;
}

// card values per each pair type, so its possible to match pairs
function cardValue(card) {
  const value = card.dataset.value;
  if (sessionStorage.getItem("pairType") === "numberWord") {
  if (value === "one") return "1";
  if (value === "two") return "2";
  if (value === "three") return "3";
  if (value === "four") return "4";
  if (value === "five") return "5";
  if (value === "six") return "6";
  if (value === "seven") return "7";
  if (value === "eight") return "8";
  if (value === "nine") return "9";
  if (value === "ten") return "10";
  if (value === "eleven") return "11";
  if (value === "twelve") return "12";
  if (value === "thirteen") return "13";
  if (value === "fourteen") return "14";
  if (value === "fifteen") return "15";
  if (value === "sixteen") return "16";
  if (value === "seventeen") return "17";
  if (value === "eighteen") return "18";
  }
  else if (sessionStorage.getItem("pairType") === "sumAnswer") {
    if (value === "1 + 1") return "2";
    if (value === "2 + 2") return "4";
    if (value === "3 + 3") return "6";
    if (value === "4 + 4") return "8";
    if (value === "5 + 5") return "10";
    if (value === "6 + 6") return "12";
    if (value === "7 + 7") return "14";
    if (value === "8 + 8") return "16";
    if (value === "9 + 9") return "18";
    if (value === "10 + 10") return "20";
    if (value === "11 + 11") return "22";
    if (value === "12 + 12") return "24";
    if (value === "13 + 13") return "26";
    if (value === "14 + 14") return "28";
    if (value === "15 + 15") return "30";
    if (value === "16 + 16") return "32";
    if (value === "17 + 17") return "34";
    if (value === "18 + 18") return "36";
  }
   else if (sessionStorage.getItem("pairType") === "mixed") {
    if (value === "one") return "1";
    if (value === "two") return "2";
    if (value === "three") return "3";
    if (value === "four") return "4";
    if (value === "5 + 5") return "10";
    if (value === "6 + 6") return "12";
    if (value === "7 + 7") return "14";
    if (value === "8 + 8") return "16";
    if (value === "9 + 9") return "18";
    if (value === "10 + 10") return "20";
    if (value === "11 + 11") return "22";
    if (value === "12 + 12") return "24";
    if (value === "13 + 13") return "26";
    if (value === "14 + 14") return "28";
    if (value === "15 + 15") return "30";
    if (value === "16 + 16") return "32";
    if (value === "17 + 17") return "34";
    if (value === "18 + 18") return "36";
  } 
  return value;
}

// increases score based on difficulty level
function IncreaseScore() {
  let difficulty = sessionStorage.getItem("difficulty");

  if (difficulty === "easy") {
    score += 15;
  } else if (difficulty === "medium") {
    score += 25;
  } else if (difficulty === "hard") {
    score += 40;
  }

  document.getElementById("displayScore").textContent = score;

}

// decreases score based on difficulty level
function decreaseScore() {
  let difficulty = sessionStorage.getItem("difficulty");

  if (difficulty === "easy") {
    score -= 5;
  } else if (difficulty === "medium") {
    score -= 15;
  } else if (difficulty === "hard") {
    score -= 20;
  }
  
  document.getElementById("displayScore").textContent = score;
}

function decreasePairs () { //decreases pairs and increases matched pairs
   totalPairsLeft -= 1;
   matchedPairs += 1;
   document.getElementById("displayPairsLeft").textContent = totalPairsLeft;
   document.getElementById("displayMatches").textContent = matchedPairs;
}

// checks if the two flipped cards are a match
function checkMatch() {

  if (cardValue(card1) === cardValue(card2)) { // sees if value is the same

    card1.classList.add("matched"); // sets the cards as matched
    card2.classList.add("matched"); // sets the cards as matched
    card1.style.pointerEvents = "none"; // changes appearance of pointer to show not clickable
    card2.style.pointerEvents = "none";

    gameAction("Correctly Matched: " + card1.dataset.value + " & " + card2.dataset.value);
    GameLog("Correctly Matched: " + card1.dataset.value + " & " + card2.dataset.value);

    resetTurn(); // resets turn if correct
    decreasePairs(); // decreases pairs + increases Matches left if correct
    IncreaseScore(); // increases score if correct
    checkWin();

  } else {

    setTimeout(() => {
      card1.classList.remove("flipped"); //returns cards back to original version when not flipped
      card2.classList.remove("flipped"); 

      card1.textContent = "?"; //changes text
      card2.textContent = "?";

      gameAction("InCorrectly Matched: " + card1.dataset.value + " & " + card2.dataset.value);
      GameLog("InCorrectly Matched: " + card1.dataset.value + " & " + card2.dataset.value);


      resetTurn();
      decreaseScore();
    }, 800);
  }
}

//checks if the game has been won
function checkWin(){

  if (TotalPairs === matchedPairs) {
    lockBoard = true;
    clearInterval(timerInterval);

    updateBestScore();

    if (score < 0) {
      alert("You Lost!");
    } else {
      alert("You win!");
    }
  }
}

function updateBestScore() { //updates the bestscore in cookie if the new score is better than the one stored
  const score = parseInt(document.getElementById("displayScore").textContent);
  const bestScore = getCookie("bestScore");
  if (!bestScore || score > parseInt(bestScore)) {
    setCookie("bestScore", score, 365);
    document.getElementById("displayBestScore").textContent = score;
    alert("New Best Score: " + score);
  }
}

// A hint button to tell the user a hint when clicked only works when enabled by user
document.getElementById("hintBtn").addEventListener("click", function() {

  if (sessionStorage.getItem("hints") !== "true") { // hints not enabled
    alert("Hints are disabled. Enable hints in settings to use this feature.");
    return;
  }

  //https://www.w3schools.com/jsref/met_document_queryselectorall.asp
  const cards = document.querySelectorAll(".number-card");

  //looks through each card to find the possible match
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {

      const cardA = cards[i];
      const cardB = cards[j];

      if (cardA.classList.contains("matched") || cardB.classList.contains("matched")) continue; //if it is matched then it continues to look for another

      if (cardValue(cardA) === cardValue(cardB)) {

        // highlight the two cards
        cardA.classList.add("hint");
        cardB.classList.add("hint");

        // the highlight disappears after a second
        setTimeout(() => {
          cardA.classList.remove("hint");
          cardB.classList.remove("hint");
        }, 1000);

        GameLog("Hint was used.");
        console.log("Hint Used");
        return;
      }
     }
    }

});

//save button

document.getElementById("saveBtn").addEventListener("click", function() {
  alert("Saving session...");


  //https://www.w3schools.com/jsref/met_document_queryselectorall.asp
  const cards = document.querySelectorAll(".number-card");

  let cardStates = [];

  cards.forEach(card => {
    cardStates.push({
      value: card.dataset.value,
      flipped: card.classList.contains("flipped"),
      matched: card.classList.contains("matched")
    });
  });

  const gameData = { //saves data in an array
    pairs: pairs,
    timeLeft: timeLeft,
    score: score,
    matchedPairs: matchedPairs,
    boardSize: boardSize,
    cardStates: cardStates,
    TotalMoves: TotalMoves,
    totalPairsLeft: totalPairsLeft,
    TotalPairs: TotalPairs
  };


  //https://www.w3schools.com/js/js_json_stringify.asp
  // Stores the saved game
  sessionStorage.setItem("savedGame", JSON.stringify(gameData));

  alert("Game saved!");
});

// load game
document.getElementById("loadBtn").addEventListener("click", function() {
  alert("Loading session...");

  const savedData = sessionStorage.getItem("savedGame");

  if (!savedData) {
    alert("No saved game found!");
    return;
  }

  const gameData = JSON.parse(savedData); //https://www.w3schools.com/Js/js_json_parse.asp converts text to object

  // Restore variables
  pairs = gameData.pairs;
  timeLeft = gameData.timeLeft;
  score = gameData.score;
  matchedPairs = gameData.matchedPairs;
  boardSize = gameData.boardSize;
  TotalMoves = gameData.TotalMoves;
  matchedPairs  =  gameData. matchedPairs;
  totalPairsLeft = gameData.totalPairsLeft;

  document.getElementById("displayScore").textContent = score;
  document.getElementById("displayMoves").textContent = TotalMoves;
  document.getElementById("displayPairsLeft").textContent = totalPairsLeft;
  document.getElementById("displayMatches").textContent = matchedPairs;

  // Reset board state
  card1 = null;
  card2 = null;
  lockBoard = false;

  // Rebuild grid
  createGrid();

  const cards = document.querySelectorAll(".number-card");

  // Restore each card
  cards.forEach((card, index) => {
    const savedCard = gameData.cardStates[index];

    if (savedCard.flipped) {
      card.classList.add("flipped");
      card.textContent = savedCard.value;
    }

    if (savedCard.matched) {
      card.classList.add("matched");
      card.textContent = savedCard.value;
      card.style.pointerEvents = "none";
    }
  });

  // Restart timer
  startTimer();

  alert("Game loaded!");
});

document.getElementById("resetBtn").addEventListener("click", function() {

const confirmReset = confirm("Are you sure you want to reset the game?");

  if (!confirmReset) return;


  //stops timer
  clearInterval(timerInterval);
  document.getElementById("displayTime").textContent = "0 s"; 
  // Reset score
  score = 0;
  document.getElementById("displayScore").textContent = 0;
  document.getElementById("displayMoves").textContent = 0;
  document.getElementById("displayMatches").textContent = 0;
  document.getElementById("displayPairsLeft").textContent = 0;

 //deletes board
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";
  board.className = "game-board";

  // Reset ALL game variables
  card1 = null;
  card2 = null;
  lockBoard = false;
  pairs = [];
  matchedPairs = 0;
  TotalPairs = 0;
  TotalMoves = 0;

  alert("Game has been reset.");
});

//back to settings

document.getElementById("backBtn").addEventListener("click", function() {

    window.open("index.html", "_self"); //goes back to settings page
});


function gameAction(message){
  const messageArea = document.getElementById("messageArea");

  messageArea.textContent = message;

};


//game log of what actions have been made

function GameLog(message) {
  const logArea = document.getElementById("logArea");

  const entry = document.createElement("p"); 
  entry.textContent = message; 

  logArea.appendChild(entry); // adds a new line of text
}