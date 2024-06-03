"use strict";
let field1 = document.querySelector(".field1");
let field2 = document.querySelector(".field2");
let field3 = document.querySelector(".field3");
let buttonRegistered = document.querySelector("#button-registered");
let buttonNewAccount = document.querySelector("#button-new-account");
let submitNewUser = document.querySelector(".submit-new-user");
let submitRegistered = document.querySelector(".submit-registred");
let inputVerify = document.querySelector("#verify");
let arrContent = {
  /* firstName: null,
    lastName: null,
    age: null,
    email: null,
    password: null,*/
};
// let password1 = document.querySelector("#password").value;
// let password2 = document.querySelector("#verify").value;
let worning = document.createElement("p");
// let strLocalStorage = JSON.stringify(counterLocalStorage);
// localStorage.setItem("0", strLocalStorage);

buttonRegistered.addEventListener("click", clickRegistered);
buttonNewAccount.addEventListener("click", clickNewAccount);
field2.addEventListener("input", creatUser);
field3.addEventListener("input", creatUser);
inputVerify.addEventListener("input", checkCorectPassword);
submitNewUser.addEventListener("click", creatNewUser);
submitRegistered.addEventListener("click", checkRegistredUser);
// creat a regitred form.
function clickRegistered(event) {
  field1.style.display = "none";
  field2.style.display = "inline";
  field2.append(worning);
}

//creat a new account form
function clickNewAccount(event) {
  field1.style.display = "none";
  field3.style.display = "inline";
  field3.append(worning);
}

//checking if the password is corect.
function checkCorectPassword() {
  let password1 = document.querySelector("#password").value;
  let password2 = document.querySelector("#verify").value;
  if (password1 !== password2) {
    worning.innerText = "The verify is not correct!!";
    // field3.append(worning);
    return false;
  } else {
    worning.innerText = "";
    return true;
  }
}

// saving the inputs in an array.
function creatUser(event) {
  let choose = event.target.id;
  arrContent[choose] = event.target.value;
}

// replacing the submit default propertis.
function creatNewUser(event) {
  event.preventDefault();
  if (checkCorectPassword()) {
    if (arrContent["password"].length < 4) {
      worning.innerText = "the password it too short";
    } else {
      if (checkLocalStorage()) {
        worning.innerText = "the email is already used.";
      } else {
        worning.innerText = "";
        let profileStr = JSON.stringify(arrContent);
        localStorage.setItem(`${arrContent["email"]}`, profileStr);
        window.location.href = "/all-html/second-page.html";
      }
    }
  }
}

function checkLocalStorage() {
  return localStorage.getItem(arrContent["email"]);
}

function checkRegistredUser(event) {
  event.preventDefault();
  let user = checkLocalStorage();
  if (!user) {
    worning.innerText =
      "There is no registered user in that email.\n\n try again.";
  } else {
    let userContant = JSON.parse(user);
    if (arrContent["password"] !== userContant["password"]) {
      worning.innerText = "wrong password.\n\n try again.";
    } else {
      worning.innerText = "";
      window.location.href = "/all-html/second-page.html";
    }
  }
}
