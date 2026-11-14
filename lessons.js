// lessons.js
// Runs on the Learn Mode page (lessons.html).
// Shows the lesson you're on, and a card for every lesson.


// how many lessons are finished
// a new account has finished 0, the demo uses the number in demo-data.js
let lessonsDone = 0;
if (mode === "demo") {
  lessonsDone = demoLessonsDone;
}


// ---------- 1. The "You're on" card ----------

function showCurrentLesson() {
  // if every lesson is done
  if (lessonsDone === lessons.length) {
    document.getElementById("current-lesson").textContent = "Course complete!";
    document.getElementById("current-description").textContent = "You finished every lesson. Great job!";
    document.getElementById("resume-button").hidden = true;
  } else {
    // lessonsDone is also the spot of the next lesson in the list
    // (lists start at 0, so after 2 lessons, the next one is lessons[2] = Lesson 3)
    let lesson = lessons[lessonsDone];
    document.getElementById("current-lesson").textContent = "Lesson " + (lessonsDone + 1) + ": " + lesson.title;
    document.getElementById("current-description").textContent = lesson.description;
  }

  // a brand new account hasn't started yet, so the button says Start
  if (lessonsDone === 0) {
    document.getElementById("resume-button").textContent = "Start";
  }

  // progress bar for the whole course
  let percent = (lessonsDone / lessons.length) * 100;
  document.getElementById("course-bar").style.width = percent + "%";
  document.getElementById("course-progress").textContent =
    lessonsDone + " of " + lessons.length + " lessons completed";
}


// the Resume button opens the lesson you're on
function resumeLesson() {
  openLesson(lessonsDone);
}


// ---------- 2. All the lesson cards ----------

// makes a card for every lesson. Click a card to open that lesson.
function showAllLessons() {
  let list = document.getElementById("all-lessons");
  list.innerHTML = "";

  for (let i = 0; i < lessons.length; i++) {
    let lesson = lessons[i];
    let number = i + 1;

    // each lesson is either finished, the one you're on, or not started
    let status = "Not started";
    let cardClass = "card lesson-card";

    if (i < lessonsDone) {
      status = "Completed";
      cardClass = "card lesson-card lesson-done";
    } else if (i === lessonsDone) {
      status = "You're here";
      cardClass = "card lesson-card lesson-current";
    }

    list.innerHTML = list.innerHTML +
      '<div class="' + cardClass + '" onclick="openLesson(' + i + ')">' +
        '<p class="card-label">Lesson ' + number + '</p>' +
        '<p class="big-text">' + lesson.title + '</p>' +
        '<p class="lesson-description">' + lesson.description + '</p>' +
        '<p class="lesson-status">' + status + '</p>' +
      '</div>';
  }
}


// shows the cards if they're hidden, hides them if they're showing
function toggleAllLessons() {
  let list = document.getElementById("all-lessons");
  let button = document.getElementById("all-button");

  if (list.hidden === true) {
    list.hidden = false;
    button.textContent = "Hide all courses";
  } else {
    list.hidden = true;
    button.textContent = "See all courses";
  }
}


// ---------- 3. Fill in the page ----------

showCurrentLesson();
showAllLessons();
