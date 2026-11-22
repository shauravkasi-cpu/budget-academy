// login.js
// Runs on the Log In page (index.html).


// runs when the Log In form is submitted
function logIn(event) {
  // stop the page from reloading
  event.preventDefault();

  // get the username they typed
  let username = document.getElementById("username").value;

  // start fresh: clear all saved progress (lessons, exams, XP),
  // but keep light or dark mode
  // (once real accounts are built, each account will keep its own progress)
  let theme = localStorage.getItem("theme");
  localStorage.clear();
  if (theme !== null) {
    localStorage.setItem("theme", theme);
  }

  // remember who is using the app
  // (for now any username works, real accounts come later with Sign up)
  localStorage.setItem("name", username);
  localStorage.setItem("mode", "account");

  // go to the home page
  window.location.href = "overview.html";
}


// when the form is submitted, run logIn
document.getElementById("login-form").addEventListener("submit", logIn);
