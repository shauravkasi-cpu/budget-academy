// login.js
// Runs on the Log In page (index.html).


// runs when the Log In form is submitted
function logIn(event) {
  // stop the page from reloading
  event.preventDefault();

  // get the username they typed
  let username = document.getElementById("username").value;

  // if the demo was used before, clear the demo's lesson progress
  if (localStorage.getItem("mode") === "demo") {
    localStorage.removeItem("lessonsDone");
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
