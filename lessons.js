// lessons.js
// Runs on the Learn Mode page (lessons.html).
// Shows the lesson you're on, your badges, the exams, and every lesson grouped by unit.


// lessonsDone (how many lessons are finished) comes from common.js


// ---------- 1. The "You're on" card ----------

function showCurrentLesson() {
  // if every lesson is done
  if (lessonsDone === lessons.length) {
    document.getElementById("current-unit").textContent = "All lessons done";
    document.getElementById("resume-button").hidden = true;

    if (finalPassed) {
      document.getElementById("current-lesson").textContent = "Course complete!";
      document.getElementById("current-description").textContent = "You passed the final exam. You're a Money Master!";
    } else {
      document.getElementById("current-lesson").textContent = "Time for the exams!";
      document.getElementById("current-description").textContent = "Pass the unit exams and the final exam below to become a Money Master.";
    }
  } else {
    // lessonsDone is also the spot of the next lesson in the list
    // (lists start at 0, so after 2 lessons, the next one is lessons[2] = Lesson 3)
    let lesson = lessons[lessonsDone];
    document.getElementById("current-unit").textContent =
      "You're on  ·  Unit " + lesson.unit + ": " + units[lesson.unit - 1].title;
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
    lessonsDone + " of " + lessons.length + " lessons completed  ·  Skill level: " + getSkillLevel();
}


// the Resume button opens the lesson you're on
function resumeLesson() {
  openLesson(lessonsDone);
}


// ---------- 2. Your badges ----------

// a small rounded label for each badge you've earned
function showBadges() {
  let box = document.getElementById("badge-list");
  box.innerHTML = "";

  // the final exam badge and unit badges first (they're the big ones), in gold
  if (finalPassed) {
    box.innerHTML = box.innerHTML + '<span class="badge badge-unit">Money Master</span>';
  }
  for (let u = 0; u < unitsPassed; u++) {
    box.innerHTML = box.innerHTML + '<span class="badge badge-unit">' + units[u].badge + '</span>';
  }

  // then one badge for each lesson you finished
  for (let i = 0; i < lessonsDone; i++) {
    box.innerHTML = box.innerHTML + '<span class="badge">' + lessons[i].badge + '</span>';
  }

  if (lessonsDone === 0) {
    box.innerHTML = '<p class="card-text">Finish a lesson to earn your first badge.</p>';
  }
}


// ---------- 3. The exams ----------

// a row for each unit exam, then one for the final exam
function showExams() {
  let box = document.getElementById("exam-list");
  box.innerHTML = "";

  for (let u = 0; u < units.length; u++) {
    let unitNumber = u + 1;
    box.innerHTML = box.innerHTML +
      examRowHTML("unit", unitNumber, "Unit " + unitNumber + " Exam: " + units[u].title, "15 questions");
  }

  box.innerHTML = box.innerHTML + examRowHTML("final", 0, "Final Exam", "40 questions from all 5 units");
}


// the exam buttons call these (openExam is in common.js)
function openUnitExam(unitNumber) {
  openExam("unit", unitNumber);
}

function openFinalExam() {
  openExam("final", 0);
}


// one exam row: the name, if it's passed / ready / locked, and a button
function examRowHTML(examType, number, title, about) {
  let passed = false;
  let ready = false;
  let lockedText = "";

  if (examType === "unit") {
    passed = unitsPassed >= number;
    ready = lessonsDone >= lessonsThroughUnit(number) && unitsPassed >= number - 1;
    lockedText = "Locked: finish the Unit " + number + " lessons first";
  } else {
    passed = finalPassed;
    ready = unitsPassed === units.length;
    lockedText = "Locked: pass all 5 unit exams first";
  }

  // what the button does: openUnitExam(3) or openFinalExam()
  let onclick = "openUnitExam(" + number + ")";
  if (examType === "final") {
    onclick = "openFinalExam()";
  }

  let status = lockedText;
  let button = "";

  if (passed) {
    status = "Passed! Best score: " + bestScore(examType, number) + "%";
    button = '<button class="pill-button small-pill" onclick="' + onclick + '">Retake</button>';
  } else if (ready) {
    status = "Ready to take";
    button = '<button class="pill-button green-pill small-pill" onclick="' + onclick + '">Start</button>';
  }

  return '<div class="exam-row">' +
      '<div>' +
        '<p class="exam-name">' + title + '</p>' +
        '<p class="small-text">' + about + '  ·  ' + status + '</p>' +
      '</div>' +
      button +
    '</div>';
}


// ---------- 4. All the lessons, grouped by unit ----------

// makes a heading for each unit, then a card for each lesson in it
function showAllLessons() {
  let list = document.getElementById("all-lessons");
  list.innerHTML = "";

  for (let u = 0; u < units.length; u++) {
    let unitNumber = u + 1;
    let cards = "";
    let doneInUnit = 0;
    let lessonsInUnit = 0;

    // go through every lesson, and only use the ones in this unit
    for (let i = 0; i < lessons.length; i++) {
      if (lessons[i].unit === unitNumber) {
        cards = cards + lessonCardHTML(i);
        lessonsInUnit = lessonsInUnit + 1;
        if (i < lessonsDone) {
          doneInUnit = doneInUnit + 1;
        }
      }
    }

    list.innerHTML = list.innerHTML +
      '<div class="unit-header">' +
        '<p class="unit-title">Unit ' + unitNumber + ': ' + units[u].title + '</p>' +
        '<p class="unit-progress">' + doneInUnit + ' of ' + lessonsInUnit + ' done</p>' +
      '</div>' +
      '<div class="two-columns">' + cards + '</div>';
  }
}


// one lesson card. Click it to open the lesson.
function lessonCardHTML(i) {
  let lesson = lessons[i];

  // each lesson is either finished, the one you're on, or not started
  let status = "Not started";
  let cardClass = "card lesson-card";

  if (i < lessonsDone) {
    status = "Completed  ·  Quiz best: " + bestScore("lesson", i + 1) + "%";
    cardClass = "card lesson-card lesson-done";
  } else if (i === lessonsDone) {
    status = "You're here";
    cardClass = "card lesson-card lesson-current";
  }

  // lessons that aren't written yet
  if (lesson.steps === undefined) {
    status = "Coming soon";
  }

  return '<div class="' + cardClass + '" onclick="openLesson(' + i + ')">' +
      '<p class="card-label">Lesson ' + (i + 1) + '</p>' +
      '<p class="big-text">' + lesson.title + '</p>' +
      '<p class="lesson-description">' + lesson.description + '</p>' +
      '<p class="lesson-status">' + status + '</p>' +
    '</div>';
}


// shows the lessons if they're hidden, hides them if they're showing
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


// ---------- 5. Fill in the page ----------

showCurrentLesson();
showBadges();
showExams();
showAllLessons();
