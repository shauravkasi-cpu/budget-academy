// demo.js
// Runs on the demo name page (demo.html).


// runs when the demo form is submitted
function startDemo(event) {
  // stop the page from reloading
  event.preventDefault();

  // get the name they typed
  let name = document.getElementById("demo-name").value;

  // remember the name and that this is the demo
  localStorage.setItem("name", name);
  localStorage.setItem("mode", "demo");

  // start fresh: clear all saved progress (lessons, exams, XP),
  // but keep light or dark mode
  // (once real accounts are built, each account will keep its own progress)
  let theme = localStorage.getItem("theme");
  localStorage.clear();
  if (theme !== null) {
    localStorage.setItem("theme", theme);
  }

  // go to the home page
  window.location.href = "overview.html";
}


// when the form is submitted, run startDemo
document.getElementById("demo-form").addEventListener("submit", startDemo);
