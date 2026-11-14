// common.js
// Code that EVERY page after logging in needs.
// Put this file first, before the page's own .js file.


// who is using the app (saved when they log in or start the demo)
let userName = localStorage.getItem("name");
let mode = localStorage.getItem("mode");

// if nobody is logged in, go back to the Log In page
if (userName === null) {
  window.location.href = "index.html";
}


// shows the user's name in the top right corner
function showProfile() {
  document.getElementById("profile-name").textContent = userName;
}


// opens a lesson
// lessonNumber starts at 0 (0 = Lesson 1, 1 = Lesson 2, ...)
// we save which lesson to open, then the lesson page reads it
function openLesson(lessonNumber) {
  localStorage.setItem("openLesson", lessonNumber);
  window.location.href = "lesson.html";
}


// log out and go back to the Log In page
function logOut() {
  localStorage.removeItem("name");
  localStorage.removeItem("mode");
  window.location.href = "index.html";
}


showProfile();
