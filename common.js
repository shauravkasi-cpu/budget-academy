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

// how many lessons are finished (a lesson is finished when you pass its quiz)
// Number() turns the saved text into a number. If nothing is saved yet, it's 0
let lessonsDone = Number(localStorage.getItem("lessonsDone"));

// how many unit exams you've passed (Unit 1 first, then Unit 2, ...)
let unitsPassed = Number(localStorage.getItem("unitsPassed"));

// did you pass the final exam? (true or false)
let finalPassed = localStorage.getItem("finalPassed") === "yes";

// skill points (XP): 20 per lesson quiz, 50 per unit exam, 100 for the final exam
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


// opens an exam, the same way openLesson does
//   examType is "lesson", "unit", or "final"
//   number is the lesson or unit number (1, 2, 3, ...), and 0 for the final exam
function openExam(examType, number) {
  localStorage.setItem("examType", examType);
  localStorage.setItem("examNumber", number);
  window.location.href = "exam.html";
}


// your best score on an exam, as a percent (-1 if you haven't taken it yet)
// examples: bestScore("lesson", 3), bestScore("unit", 1), bestScore("final", 0)
function bestScore(examType, number) {
  let saved = localStorage.getItem("best-" + examType + "-" + number);
  if (saved === null) {
    return -1;
  }
  return Number(saved);
}


// ---------- Which exams are unlocked ----------
// (these also use "lessons" and "units" from lessons-data.js)

// a lesson quiz unlocks after you go through all of that lesson's steps
// (lesson.js saves "read-lesson-3" = "yes" when you reach the end of Lesson 3)
// lessonNumber starts at 1 here (1 = Lesson 1)
function isQuizUnlocked(lessonNumber) {
  if (lessonNumber <= lessonsDone) {
    return true;   // you already passed this quiz
  }
  return localStorage.getItem("read-lesson-" + lessonNumber) === "yes";
}

// a unit exam unlocks when you've finished all the unit's lessons
// AND passed the unit exam before it
function isUnitExamUnlocked(unitNumber) {
  return lessonsDone >= lessonsThroughUnit(unitNumber) && unitsPassed >= unitNumber - 1;
}

// the final exam unlocks when you've passed every unit exam
function isFinalUnlocked() {
  return unitsPassed === units.length;
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

// your skill level goes up every time you pass a unit exam,
// and passing the final exam makes you a Money Master
function getSkillLevel() {
  if (finalPassed) {
    return "Money Master";
  }
  if (unitsPassed === 0) {
    return "Beginner";
  }
  // units[0] is Unit 1, so the last unit you passed is units[unitsPassed - 1]
  return units[unitsPassed - 1].level;
}


// log out and go back to the Log In page
// this clears everything saved, except light or dark mode
// "async" so it can wait for the last save to finish before clearing everything
async function logOut() {
  await saveToCloud();   // cloud.js (does nothing in the demo)
  await db.auth.signOut();
  startFresh();          // cloud.js
  window.location.href = "index.html";
}


showProfile();
showThemeButton();   // this function is in theme.js

// real accounts: send a copy of your progress to the database now,
// and then every 5 seconds (it only sends when something changed)
if (mode === "account") {
  saveToCloud();
  setInterval(saveToCloud, 5000);
}
