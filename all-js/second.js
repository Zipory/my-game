"use strict";
let user = localStorage.getItem("currentUser");
if (!user) {
  window.location.href = "/index.html";
}
user = JSON.parse(user);
let container = document.querySelector(".container");
let shortName = `${user["firstName"][0]}${user["lastName"][0]}`;
let pointName = document.createElement("div");
let pointDiv = document.querySelector("#point");
let logout = document.querySelector(".logout");
pointName.classList.add("point");
pointName.innerText = shortName;
pointDiv.append(pointName);
pointName.addEventListener("click", openLog);
/*--------------------log place------------------------ */
let log = document.querySelector(".log");
pointName.addEventListener("click", openLog);
function openLog() {
  container.style.opacity = 0.5;
  log.style.display = "flex";
}
/*-----------------out from log place------------------------------------- */
document.addEventListener("click", normal);

function normal(event) {
  if (event.target !== pointName) {
    container.style.opacity = 1;
    log.style.display = "none";
  }
}
/*---------------------log out button---------------------------------------- */
logout.addEventListener("click", logOutFunc);
function logOutFunc() {
  localStorage.removeItem("currentUser");
  location.reload();
}
