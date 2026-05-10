// 25301714_WEBA262_26_S1_SS2 - Number Pair Game


let backupplayername; //used for incase player does not enter their name.


//Opens Game
document.getElementById("openGameBtn").addEventListener("click", function() { 

  //sets the values down as constants that are taken from user's input
  const playerName = document.getElementById("playerName").value;
  const boardSize = document.getElementById("boardSize").value;
  const difficulty = document.getElementById("difficulty").value;
  const pairType = document.querySelector('input[name="pairType"]:checked');
  const timershow = document.getElementById("showTimer").checked;
  const hints = document.getElementById("enableHints").checked;
  const animations = document.getElementById("shuffleAnimation").checked;
  

  // Store in session storage
  // https://www.w3schools.com/jsref/prop_win_sessionstorage.asp
  sessionStorage.setItem("playerName", playerName);
  sessionStorage.setItem("boardSize", boardSize);
  sessionStorage.setItem("difficulty", difficulty);
  sessionStorage.setItem("pairType", pairType.value);
  sessionStorage.setItem("timershow", timershow);
  sessionStorage.setItem("hints", hints);
  sessionStorage.setItem("animations", animations);

  
  //if name was blank, it gives a prompt
  if (playerName === "") {
   backupplayername = prompt("Please Enter your Name:")
   sessionStorage.setItem("playerName", backupplayername);
  }

  //if name STILL not entered, then returns back to form
  if (playerName === "" && backupplayername === "") {
      alert("Name was not entered, please enter name.")
       return;
  }

  alert("Game settings saved! Starting game...");
  //opens game in the same tab
  window.open("game.html", "_self");
});

// Save settings button
document.getElementById("saveSettingsBtn").addEventListener("click", function() { 

  const playerName = document.getElementById("playerName").value;
  const boardSize = document.getElementById("boardSize").value;
  const difficulty = document.getElementById("difficulty").value;
  const pairType = document.querySelector('input[name="pairType"]:checked');
  const timershow = document.getElementById("showTimer").checked;
  const hints = document.getElementById("enableHints").checked;
  const animations = document.getElementById("shuffleAnimation").checked;

  // Store in session storage
  // https://www.w3schools.com/jsref/prop_win_sessionstorage.asp
  sessionStorage.setItem("playerName", playerName);
  sessionStorage.setItem("boardSize", boardSize);
  sessionStorage.setItem("difficulty", difficulty);
  sessionStorage.setItem("pairType", pairType.value);
  sessionStorage.setItem("timershow", timershow);
  sessionStorage.setItem("hints", hints);
  sessionStorage.setItem("animations", animations);
  
  alert("Game settings saved!");
});

// Loads setting 
//// https://www.w3schools.com/jsref/prop_win_sessionstorage.asp
document.getElementById("loadSettingsBtn").addEventListener("click", function() {
  const playerName = sessionStorage.getItem("playerName");
  const boardSize = sessionStorage.getItem("boardSize");
  const difficulty = sessionStorage.getItem("difficulty");
  const pairType = sessionStorage.getItem("pairType");
  const timershow = sessionStorage.getItem("timershow") === "true";
  const hints = sessionStorage.getItem("hints") === "true";
  const animations = sessionStorage.getItem("animations") === "true";

  document.getElementById("playerName").value = playerName; //loads the values
  document.getElementById("boardSize").value = boardSize;
  document.getElementById("difficulty").value = difficulty;
  if (pairType) {
    document.querySelectorAll('input[name="pairType"]').forEach(radio => {
      radio.checked = radio.value === pairType;
    });
  }
  document.getElementById("showTimer").checked = timershow;
  document.getElementById("enableHints").checked = hints;
  document.getElementById("shuffleAnimation").checked = animations;

  updateLivePreview();
  alert("Settings loaded!");
});

// Resets all settings back
document.getElementById("resetSettingsBtn").addEventListener("click", function() {

  const confirmReset = confirm("Are you sure you want to reset all the settings?");

  if (!confirmReset) return;

  document.getElementById("playerName").value = "";
  document.getElementById("boardSize").value = "4x4";
  document.getElementById("difficulty").value = "medium";

  document.querySelectorAll('input[name="pairType"]').forEach(radio => {
    radio.checked = false;
  });
  document.querySelector('input[name="pairType"][value="numbers"]').checked = true;

  document.getElementById("showTimer").checked = true;
  document.getElementById("enableHints").checked = false;
  document.getElementById("shuffleAnimation").checked = true;

  //clears previous saved data
  sessionStorage.clear();
  updateLivePreview();

  alert("Settings reset!");
});

//live preview

function updateLivePreview() {

  const playerName = document.getElementById("playerName").value;
  const boardSize = document.getElementById("boardSize").value;
  const difficulty = document.getElementById("difficulty").value;

  const pairType = document.querySelector('input[name="pairType"]:checked');
  const timershow = document.getElementById("showTimer").checked;
  const hints = document.getElementById("enableHints").checked;
  const animations = document.getElementById("shuffleAnimation").checked;

  const previewArea = document.getElementById("previewText");

  previewArea.innerHTML = 
     `${playerName} ||${boardSize} || ${difficulty} || ${pairType ? pairType.value: "Not selected"} || Timer: ${timershow ? "Shown" : "Hidden"} || Hints: ${hints ? "Enabled" : "Disabled"} || Animation: ${animations ? "On" : "Off"} `;

};

// update preview when anything changes
// //https://www.w3schools.com/jsref/met_document_queryselectorall.asp
document.querySelectorAll("input, select").forEach(element => {
  element.addEventListener("input", updateLivePreview);
  element.addEventListener("change", updateLivePreview);
});


