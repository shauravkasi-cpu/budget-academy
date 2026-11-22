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

  // the demo starts 2 lessons in with some XP, so you can see what progress looks like
  localStorage.setItem("lessonsDone", 2);
  localStorage.setItem("xp", 60);

  // go to the home page
  window.location.href = "overview.html";
}


// when the form is submitted, run startDemo
document.getElementById("demo-form").addEventListener("submit", startDemo);
