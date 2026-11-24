// signup.js
// Runs on the Sign Up page (signup.html).
// The Supabase code (db, startFresh, saveToCloud, usernameToEmail, isGoodUsername) is in cloud.js


// shows a red message under the form
function showSignupError(message) {
  let box = document.getElementById("signup-error");
  box.textContent = message;
  box.hidden = false;
}


// runs when the Sign Up form is submitted
async function signUp(event) {
  event.preventDefault();

  let username = document.getElementById("new-username").value.trim();
  let password = document.getElementById("new-password").value;
  let password2 = document.getElementById("new-password2").value;
  let button = document.getElementById("signup-button");

  // check what they typed first
  if (!isGoodUsername(username)) {
    showSignupError("Usernames are 3 to 20 letters, numbers, or _ (no spaces).");
    return;
  }
  if (password.length < 6) {
    showSignupError("Your password needs at least 6 characters.");
    return;
  }
  if (password !== password2) {
    showSignupError("The two passwords don't match.");
    return;
  }

  button.textContent = "Making your account...";
  button.disabled = true;

  // start fresh, so the last person's stuff doesn't mix with yours
  startFresh();

  // ask Supabase to make the account
  let result = await db.auth.signUp({
    email: usernameToEmail(username),
    password: password
  });

  if (result.error !== null) {
    if (result.error.message.includes("already")) {
      showSignupError("That username is taken. Try another one.");
    } else {
      showSignupError("Something went wrong: " + result.error.message);
    }
    button.textContent = "Sign Up";
    button.disabled = false;
    return;
  }

  // this only happens if "Confirm email" is still turned on in Supabase
  if (result.data.session === null) {
    showSignupError("Sign up isn't ready yet. Turn off \"Confirm email\" in Supabase.");
    button.textContent = "Sign Up";
    button.disabled = false;
    return;
  }

  // a new account starts with nothing done
  localStorage.setItem("name", username);
  localStorage.setItem("mode", "account");

  // make this account's row in the database
  await saveToCloud();

  // go to the home page
  window.location.href = "overview.html";
}


document.getElementById("signup-form").addEventListener("submit", signUp);
