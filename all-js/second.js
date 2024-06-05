"use strict";
let user = localStorage.getItem("currentUser");
if (!user) {
  window.location.href = "/index.html";
}
user = JSON.parse(user);
let shortName = `${user["firstName"][0]}${user["lastName"][0]}`;
let pointName = document.createElement("div");
let pointDiv = document.querySelector("#point");
pointName.classList.add("point");
pointName.innerText = shortName;
pointDiv.append(pointName);
