"use strict";

/*--------------------verify user------------------------------------- */
let userStr = localStorage.getItem("currentUser");
if (!userStr) {
  window.location.href = "/index.html";
}
let user = JSON.parse(userStr);
let shortName = `${user["firstName"][0]}${user["lastName"][0]}`;
let pointName = document.createElement("div");
let pointDiv = document.querySelector("#point");
pointName.classList.add("point");
pointName.innerText = shortName;
pointDiv.append(pointName);

/*-------------------------score && couter----------------------- */
let score = user["score"] ? user["score"] : 0;
let counter = user["counter"] ? user["counter"] : 0;

/*--------------------creat alements------------------------------------- */
let theGame = document.querySelector(".game");
let startButton = document.querySelector(".start-button");
let textStart = document.querySelector(".starter");
let colection = document.querySelector(".colection");
let mission = document.querySelector(".mission");
let textGameOver = document.querySelector(".game-over");
let textVictory = document.querySelector(".victory");
let nickName = document.querySelector("#nikeName");
let scorePlace = document.querySelector("#score");
let arrGoback = document.querySelectorAll(".goback");
let logout = document.querySelector(".logout");
let replay = document.querySelectorAll(".replay");

/*--------------------starter------------------------------------- */
startButton.addEventListener("click", startTheGame);

function startTheGame() {
  textStart.style.display = "none";
  theGame.style.display = "flex";
  nickName.append(pointName);
}
/*--------------------------go back----------------------- */
arrGoback.forEach((element) => {
  element.addEventListener("click", goBackFunc);
});
function goBackFunc() {
  location.href = "/all-html/second-page.html";
}
/*-----------------------log out from the user----------------------- */
logout.addEventListener("click", logOutFunc);
function logOutFunc() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}

/*--------------------------creat the game----------------------------- */
let theBoard = document.querySelector(".board");
let theRow = 15;
let theColumn = 15;
let arrBoxes = [];
// let counter = 0;
for (let i = 0; i < theRow; i++) {
  arrBoxes.push([]);
  for (let j = 0; j < theColumn; j++) {
    let div = document.createElement("div");
    div.classList.add("box");
    arrBoxes[i].push(div);
    theBoard.append(div);
  }
}

/*---------------------------the player---------------------------------*/
let player = document.createElement("img");
player.setAttribute("src", "../pictures/rabi.png");
player.classList.add("player");
let y = 0;
let x = 0;
scorePlace.innerText = `score: ${score}`;
function move(event) {
  if (event.key === "ArrowLeft" && x > 0) {
    x--;
  } else if (event.key === "ArrowRight" && x < theRow - 1) {
    x++;
  } else if (event.key === "ArrowUp" && y > 0) {
    y--;
  } else if (event.key === "ArrowDown" && y < theColumn - 1) {
    y++;
  }
  arrBoxes[y][x].append(player);
  gameOver(arrBoxes[y][x]);
  levelUp(arrBoxes[y][x]);
}

/*--------------------------events on the board---------------------------------*/
let arrEvents = [];
let arrGoods = [];
let bomb = document.createElement("img");
bomb.setAttribute("src", "../pictures/bomb.png");
let books = document.createElement("img");
books.setAttribute("src", "../pictures/books.png");
let car = document.createElement("img");
car.setAttribute("src", "../pictures/car.png");
car.style.width = "50px";
car.style.height = "45px";
let clever = document.createElement("img");
clever.setAttribute("src", "../pictures/clever.png");
let computer = document.createElement("img");
computer.setAttribute("src", "../pictures/computer.png");
let grass = document.createElement("img");
grass.setAttribute("src", "../pictures/grass.png");
let lain = document.createElement("img");
lain.setAttribute("src", "../pictures/lain.png");
let noSmoke = document.createElement("img");
noSmoke.setAttribute("src", "../pictures/no-smoke.png");
let parrtyHat = document.createElement("img");
parrtyHat.setAttribute("src", "../pictures/parrty-hat.png");
parrtyHat.style.width = "30px";
parrtyHat.style.height = "40px";
let python = document.createElement("img");
python.setAttribute("src", "../pictures/python.png");
let whiteShirt = document.createElement("img");
whiteShirt.setAttribute("src", "../pictures/white-shirt.png");
let soldier = document.createElement("img");
soldier.setAttribute("src", "../pictures/soldier.png");

arrEvents.push(bomb);
arrEvents.push(car);
arrEvents.push(grass);
arrEvents.push(lain);
arrEvents.push(parrtyHat);

arrGoods.push(noSmoke);
arrGoods.push(books);
arrGoods.push(whiteShirt);
arrGoods.push(computer);
arrGoods.push(clever);
arrGoods.push(python);
arrGoods.push(soldier);

// creat all the event on the board.
function onTheBoard() {
  arrBoxes[0][0].append(player);
  for (let i of arrEvents) {
    let x_y = emptyPlace();
    arrBoxes[x_y[0]][x_y[1]].append(i);
  }
}

/*---------------------------text missions------------------------------ */
let arrMissions = [];
arrMissions.push(`first you need stop smoking !!!`);
arrMissions.push(`you need to learn some 'gmore'`);
arrMissions.push(`you need to change the shirt to white-shirt`);
arrMissions.push(`you need to achieve a computer`);
arrMissions.push(`you need to improve your skilles`);
arrMissions.push(`now is the important thing, learing python`);
arrMissions.push(`the last thing is to get trough the Recruits in the army`);

/*--------------------function to find empty place:----------------- */
function emptyPlace() {
  while (true) {
    let x = Math.floor(Math.random() * theRow);
    let y = Math.floor(Math.random() * theColumn);
    if (!arrBoxes[y][x].hasChildNodes()) {
      return [y, x];
    }
  }
}
/*--------------------------log------------------------------- */
let log = document.querySelector(".log");
pointName.addEventListener("click", openLog);
function openLog() {
  theGame.style.opacity = 0.5;
  textStart.style.opacity = 0.5;
  log.style.display = "flex";
}
/*--------------------out from the log position---------------------- */
theGame.addEventListener("click", normal);
textStart.addEventListener("click", normal);
function normal(event) {
  if (event.target !== pointName) {
    theGame.style.opacity = 1;
    textStart.style.opacity = 1;
    log.style.display = "none";
  }
}
/*----------------------game over:----------------------------------*/
function gameOver(box) {
  if (box.childElementCount > 1) {
    // console.log(box);
    let node = box.childNodes;
    for (let i of node) {
      if (arrEvents.includes(i)) {
        console.log("game over");
        textGameOver.style.display = "block";
        user.counter = 0;
        userStr = JSON.stringify(user);
        localStorage.setItem(`${user["email"]}`, userStr);
        localStorage.setItem("currentUser", userStr);
        document.removeEventListener("keyup", move);
      }
    }
  }
}

/*---------------------level:----------------------------------*/
// placing the goods on the board.
function goodOnTHeBoard(level) {
  let x_y = emptyPlace();
  arrBoxes[x_y[0]][x_y[1]].append(arrGoods[level]);
}

//checking if the player end the level.
function levelUp(box) {
  if (box.childElementCount > 1) {
    let node = box.childNodes;
    for (let i of node) {
      if (arrGoods.includes(i)) {
        console.log("level up");
        document.removeEventListener("keyup", move);
        colection.append(arrGoods[counter]);
        counter++;
        user.counter = counter;
        if (counter < arrGoods.length) {
          x = 0;
          y = 0;
          setTimeout(gameInLoop, 2000);
        } else {
          /*------------------ if the game finished-------------------------------*/
          textVictory.style.display = "block";
          score++;
          user.score = score;
          user.counter = 0;
          userStr = JSON.stringify(user);
          localStorage.setItem(`${user["email"]}`, userStr);
          localStorage.setItem("currentUser", userStr);
        }
      }
    }
  }
}
console.log();
/*---------------------------to input the goods auto to the colection-------------------------------- */
function inputColection() {
  for (let i = 0; i < counter; i++) {
    colection.append(arrGoods[i]);
  }
}

/*----------------------------play again--------------------------------- */
replay.forEach((element) => {
  element.addEventListener("click", playAgain);
});

function playAgain() {
  location.reload();
}

/*-------------------------loop of the game---------------------------------- */
function gameInLoop() {
  if (counter) {
    inputColection();
  }
  userStr = JSON.stringify(user);
  localStorage.setItem(`${user["email"]}`, userStr);
  localStorage.setItem("currentUser", userStr);
  mission.innerText = `Level ${counter + 1}: ${arrMissions[counter]}`;
  onTheBoard();
  goodOnTHeBoard(counter);
  document.addEventListener("keyup", move);
}

gameInLoop();
