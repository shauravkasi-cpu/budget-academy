// login.js
// Runs on the Log In page (index.html).
// The Supabase code (db, startFresh, loadFromCloud, usernameToEmail) is in cloud.js


// shows a red message under the form
function showLoginError(message) {
  let box = document.getElementById("login-error");
  box.textContent = message;
  box.hidden = false;
}


// runs when the Log In form is submitted
// "async" so it can wait for Supabase to answer
async function logIn(event) {
  // stop the page from reloading
  event.preventDefault();

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;
  let button = document.getElementById("login-button");

  // show that something is happening while we wait for the internet
  button.textContent = "Logging in...";
  button.disabled = true;

  // start fresh, so the last person's stuff doesn't mix with yours
  startFresh();

  // ask Supabase if the username and password are right
  let result = await db.auth.signInWithPassword({
    email: usernameToEmail(username),
    password: password
  });

  if (result.error !== null) {
    showLoginError("Wrong username or password.");
    button.textContent = "Log In";
    button.disabled = false;
    return;
  }

  // copy your saved progress into this computer
  await loadFromCloud(result.data.user.id);

  // remember who is using the app
  // (your name was saved when you signed up, this is just in case)
  if (localStorage.getItem("name") === null) {
    localStorage.setItem("name", username);
  }
  localStorage.setItem("mode", "account");

  // go to the home page
  window.location.href = "overview.html";
}


// test mode: go into the site without logging in
// it's a brand new, empty account named "Test", and nothing is saved to the database
// (cloud.js only saves when mode is "account")
function enterTestMode() {
  startFresh();
  localStorage.setItem("name", "Test");
  localStorage.setItem("mode", "test");
  window.location.href = "overview.html";
}


// when the form is submitted, run logIn
document.getElementById("login-form").addEventListener("submit", logIn);
