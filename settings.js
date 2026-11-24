// settings.js
// Runs on the Settings page (settings.html).
// Light/dark mode is in theme.js. The Supabase code (db, saveToCloud, ...) is in cloud.js


// shows a green (good) or red (problem) message under a form
function showMessage(id, message, good) {
  let box = document.getElementById(id);
  box.textContent = message;
  if (good) {
    box.className = "feedback feedback-right";
  } else {
    box.className = "feedback feedback-wrong";
  }
}


// the demo can only change light/dark mode
function showSettings() {
  if (mode === "demo") {
    document.getElementById("demo-note").hidden = false;
  } else {
    document.getElementById("account-settings").hidden = false;
    document.getElementById("new-name").value = userName;
  }
}


// ---------- change username ----------
// your username is part of your pretend email (see cloud.js),
// so changing it means changing the email Supabase has for you.
// Supabase's normal way of changing an email tries to send an email to the old address,
// and our pretend emails can't get mail. So we use our own database function instead,
// called "change_username" (we made it in the Supabase SQL Editor).
// It answers "ok", "taken", or "bad" (not a good username).
async function changeUsername() {
  let newName = document.getElementById("new-name").value.trim();
  let button = document.getElementById("name-button");

  if (!isGoodUsername(newName)) {
    showMessage("name-message", "Usernames are 3 to 20 letters, numbers, or _ (no spaces).", false);
    return;
  }
  if (newName === userName) {
    showMessage("name-message", "That's already your username.", false);
    return;
  }

  button.disabled = true;
  // db.rpc runs a database function
  let result = await db.rpc("change_username", { new_username: newName });
  button.disabled = false;

  if (result.error !== null) {
    showMessage("name-message", "Something went wrong: " + result.error.message, false);
    return;
  }
  if (result.data === "taken") {
    showMessage("name-message", "That username is taken. Try another one.", false);
    return;
  }
  if (result.data !== "ok") {
    showMessage("name-message", "Usernames are 3 to 20 letters, numbers, or _ (no spaces).", false);
    return;
  }

  // save the new name here and in the database
  localStorage.setItem("name", newName);
  userName = newName;
  showProfile();          // common.js: updates the name at the bottom of the menu
  await saveToCloud();

  showMessage("name-message", "Saved! Log in with " + newName + " from now on.", true);
}


// ---------- change password ----------
async function changePassword() {
  let password = document.getElementById("new-pass").value;
  let password2 = document.getElementById("new-pass2").value;
  let button = document.getElementById("pass-button");

  if (password.length < 6) {
    showMessage("pass-message", "Your password needs at least 6 characters.", false);
    return;
  }
  if (password !== password2) {
    showMessage("pass-message", "The two passwords don't match.", false);
    return;
  }

  button.disabled = true;
  let result = await db.auth.updateUser({ password: password });
  button.disabled = false;

  if (result.error !== null) {
    if (result.error.message.includes("different")) {
      showMessage("pass-message", "That's already your password.", false);
    } else {
      showMessage("pass-message", "Something went wrong: " + result.error.message, false);
    }
    return;
  }

  // empty the boxes
  document.getElementById("new-pass").value = "";
  document.getElementById("new-pass2").value = "";
  showMessage("pass-message", "Saved! Use your new password next time you log in.", true);
}


// ---------- start over ----------
// clears your progress but keeps you logged in
async function startOver() {
  // confirm() shows a pop up with OK and Cancel. It gives true if they click OK
  if (!confirm("This clears all your lessons, XP, cards, bills, budget, and goals. Are you sure?")) {
    return;
  }

  // first make a list of what to remove, then remove it
  // keep: your name, that you're logged in, the theme, and Supabase's login info ("sb-...")
  let toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key !== "name" && key !== "mode" && key !== "theme" && !key.startsWith("sb-")) {
      toRemove.push(key);
    }
  }
  for (let i = 0; i < toRemove.length; i++) {
    localStorage.removeItem(toRemove[i]);
  }

  await saveToCloud();
  window.location.href = "overview.html";
}


showSettings();
