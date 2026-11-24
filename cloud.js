// cloud.js
// Saves each account's progress in our online database (Supabase),
// so you can log in from any computer and your stuff is still there.
//
// How it works:
//   - The site still saves everything in localStorage, like before.
//   - Every few seconds we send a copy of it to Supabase (saveToCloud).
//   - When you log in, we copy your saved stuff back into localStorage (loadFromCloud).
//
// The Supabase table is called "user_data". Each account has ONE row:
//   id       = the account's id from Supabase
//   username = the name you signed up with
//   data     = everything from localStorage, as one big object
//
// Load the Supabase library BEFORE this file (the <script> tag from cdn.jsdelivr.net).


// our Supabase project
// (this key is safe to put in a website: Supabase only lets each person
//  read and change their own row, because of the rules we set up)
let SUPABASE_URL = "https://qzvfmbnzgeufeivtimcv.supabase.co";
let SUPABASE_KEY = "sb_publishable_Y-_cVm3vfmdPKCtDATaKGQ_w9dYuYcy";

// "db" is how we talk to Supabase
let db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// Supabase needs an email to make an account, but we only ask for a username.
// So we turn the username into a pretend email that nobody ever sees.
// "Alex" -> "alex@budgetacademy.app"
function usernameToEmail(username) {
  return username.toLowerCase() + "@budgetacademy.app";
}


// clears all saved progress, but keeps light or dark mode
// (used when you log in, sign up, start the demo, or log out)
function startFresh() {
  let theme = localStorage.getItem("theme");
  localStorage.clear();
  if (theme !== null) {
    localStorage.setItem("theme", theme);
  }
}


// sends a copy of everything in localStorage to Supabase
// (only for real accounts, never the demo)
// "async" means this function waits for the internet, using "await"
async function saveToCloud() {
  if (localStorage.getItem("mode") !== "account") {
    return;
  }

  // put every saved item into one object, like { name: "Alex", xp: "40", ... }
  let data = {};
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    // skip: the theme (that's per computer), our "last copy" below,
    // and Supabase's own login info (its names start with "sb-")
    if (key !== "theme" && key !== "cloudSaved" && !key.startsWith("sb-")) {
      data[key] = localStorage.getItem(key);
    }
  }

  // if nothing changed since the last copy we sent, don't send it again
  let text = JSON.stringify(data);
  if (text === localStorage.getItem("cloudSaved")) {
    return;
  }

  // who is logged in?
  let result = await db.auth.getSession();
  let session = result.data.session;
  if (session === null) {
    return;
  }

  // "upsert" = add the row if it's not there yet, or update it if it is
  let saved = await db.from("user_data").upsert({
    id: session.user.id,
    username: localStorage.getItem("name"),
    data: data,
    updated_at: new Date()
  });

  if (saved.error === null) {
    localStorage.setItem("cloudSaved", text);
  } else {
    console.log("Couldn't save to the cloud: " + saved.error.message);
  }
}


// copies an account's saved stuff from Supabase into localStorage
async function loadFromCloud(userId) {
  let result = await db.from("user_data").select("data").eq("id", userId);

  // a brand new account might not have a row yet
  if (result.error !== null || result.data.length === 0) {
    return;
  }

  let data = result.data[0].data;
  for (let key in data) {
    localStorage.setItem(key, data[key]);
  }
}
