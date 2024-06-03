"use strict";

/*--------------------starter------------------------------------- */
let theGame = document.querySelector(".game");
let startButton = document.querySelector(".start-button");
let textStart = document.querySelector(".starter");

startButton.addEventListener("click", startTheGame);

function startTheGame() {
  textStart.style.display = "none";
  theGame.style.display = "flex";
}

/*--------------------------------------------------------- */
/*--------------------------the game------------------------------- */
let theBoard = document.querySelector(".board");
let theRow = 30;
let theColumn = 30;
let arrBoxes = [];
for (let i = 0; i < theRow; i++) {
  arrBoxes.push([]);
  for (let j = 0; j < theColumn; j++) {
    let div = document.createElement("div");
    div.classList.add("box");
    arrBoxes[i].push(div);
    theBoard.append(div);
  }
}
let player = document.querySelector(".player");
arrBoxes[0][0].append(player);

document.addEventListener("");
