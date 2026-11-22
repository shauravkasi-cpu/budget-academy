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

// how many lessons are finished (saved when you finish a lesson)
// Number() turns the saved text into a number. If nothing is saved yet, it's 0
let lessonsDone = Number(localStorage.getItem("lessonsDone"));

// skill points (XP), you get 20 for each lesson you finish
let xp = Number(localStorage.getItem("xp"));


// shows the user's name and first letter at the bottom of the menu
function showProfile() {
  document.getElementById("profile-name").textContent = userName;
  document.getElementById("avatar").textContent = userName.charAt(0).toUpperCase();
}


// opens a lesson
// lessonNumber starts at 0 (0 = Lesson 1, 1 = Lesson 2, ...)
// we save which lesson to open, then the lesson page reads it
function openLesson(lessonNumber) {
  localStorage.setItem("openLesson", lessonNumber);
  window.location.href = "lesson.html";
}


// ---------- Units and skill levels ----------
// (these use "lessons" and "units" from lessons-data.js,
//  so only call them on pages that load lessons-data.js)

// how many lessons there are from Unit 1 up to this unit
// example: lessonsThroughUnit(1) = 5, because Unit 1 has 5 lessons
function lessonsThroughUnit(unitNumber) {
  let count = 0;
  for (let i = 0; i < lessons.length; i++) {
    if (lessons[i].unit <= unitNumber) {
      count = count + 1;
    }
  }
  return count;
}

// your skill level goes up every time you finish a whole unit
function getSkillLevel() {
  let level = "Beginner";
  for (let i = 0; i < units.length; i++) {
    // units[0] is Unit 1, so the unit number is i + 1
    if (lessonsDone >= lessonsThroughUnit(i + 1)) {
      level = units[i].level;
    }
  }
  return level;
}


// log out and go back to the Log In page
function logOut() {
  localStorage.removeItem("name");
  localStorage.removeItem("mode");
  localStorage.removeItem("lessonsDone");
  localStorage.removeItem("xp");
  window.location.href = "index.html";
}


showProfile();
showThemeButton();   // this function is in theme.js
