// lesson.js
// Runs on the page for ONE lesson (lesson.html).
// It shows whichever lesson you clicked on.


// which lesson to show (saved by openLesson() in common.js)
// 0 = Lesson 1, 1 = Lesson 2, ...
let lessonNumber = Number(localStorage.getItem("openLesson"));

// if the number is missing or too big, just show Lesson 1
if (lessonNumber < 0 || lessonNumber >= lessons.length) {
  lessonNumber = 0;
}

let lesson = lessons[lessonNumber];


// fills in the lesson's number, title, and description
function showLesson() {
  document.getElementById("lesson-number").textContent =
    "Lesson " + (lessonNumber + 1) + " of " + lessons.length;
  document.getElementById("lesson-title").textContent = lesson.title;
  document.getElementById("lesson-description").textContent = lesson.description;

  // also show the lesson name on the browser tab
  document.title = "Budget Academy - " + lesson.title;

  // no "Previous" on the first lesson, no "Next" on the last lesson
  if (lessonNumber === 0) {
    document.getElementById("previous-button").hidden = true;
  }
  if (lessonNumber === lessons.length - 1) {
    document.getElementById("next-button").hidden = true;
  }
}


// go to the lesson before this one
function previousLesson() {
  openLesson(lessonNumber - 1);
}


// go to the lesson after this one
function nextLesson() {
  openLesson(lessonNumber + 1);
}


showLesson();
