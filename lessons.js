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


// one exam row in the Exams card: the name, if it's passed / ready / locked, and a button
// (isUnitExamUnlocked and isFinalUnlocked are in common.js)
function examRowHTML(examType, number, title, about) {
  let passed = false;
  let ready = false;
  let lockedText = "";
  let onclick = "";

  if (examType === "unit") {
    passed = unitsPassed >= number;
    ready = isUnitExamUnlocked(number);
    lockedText = "Locked: finish the Unit " + number + " lessons first";
    onclick = "clickUnitExam(" + number + ")";
  } else {
    passed = finalPassed;
    ready = isFinalUnlocked();
    lockedText = "Locked: pass all 5 unit exams first";
    onclick = "clickFinalExam()";
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
// Under each lesson there's a quiz bar, after each unit there's a unit exam bar,
// and after the last unit there's the final exam bar.

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

    // the bar for this unit's exam, right after its lessons
    let unitExamBar = examBarHTML(
      "Unit " + unitNumber + " Exam", "15 questions",
      unitsPassed >= unitNumber, isUnitExamUnlocked(unitNumber),
      "clickUnitExam(" + unitNumber + ")", "unit", unitNumber, true);

    list.innerHTML = list.innerHTML +
      '<div class="unit-header">' +
        '<p class="unit-title">Unit ' + unitNumber + ': ' + units[u].title + '</p>' +
        '<p class="unit-progress">' + doneInUnit + ' of ' + lessonsInUnit + ' done</p>' +
      '</div>' +
      '<div class="two-columns">' + cards + '</div>' +
      unitExamBar;
  }

  // the final exam bar, after the last unit
  list.innerHTML = list.innerHTML +
    '<div class="unit-header"><p class="unit-title">Final Exam</p></div>' +
    examBarHTML("Final Exam", "40 questions from all 5 units",
      finalPassed, isFinalUnlocked(), "clickFinalExam()", "final", 0, true);
}


// one lesson card (click it to open the lesson), with its quiz bar under it
function lessonCardHTML(i) {
  let lesson = lessons[i];
  let lessonNumber = i + 1;   // lessons[0] is Lesson 1

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

  let card = '<div class="' + cardClass + '" onclick="openLesson(' + i + ')">' +
      '<p class="card-label">Lesson ' + lessonNumber + '</p>' +
      '<p class="big-text">' + lesson.title + '</p>' +
      '<p class="lesson-description">' + lesson.description + '</p>' +
      '<p class="lesson-status">' + status + '</p>' +
    '</div>';

  let quizBar = examBarHTML(
    "Lesson " + lessonNumber + " Quiz", "5 questions",
    i < lessonsDone, isQuizUnlocked(lessonNumber),
    "clickQuiz(" + lessonNumber + ")", "lesson", lessonNumber, false);

  // the card and its quiz bar stay together in one box of the grid
  return '<div>' + card + quizBar + '</div>';
}


// a bar you can click to take an exam
//   passed / unlocked: true or false
//   onclick: what happens when you click it, like "clickQuiz(3)"
//   big: true for unit exams and the final exam (they're bigger bars)
function examBarHTML(title, about, passed, unlocked, onclick, examType, number, big) {
  let status = "Locked";
  let barClass = "exam-bar exam-bar-locked";

  if (passed) {
    status = "Passed · Best: " + bestScore(examType, number) + "%";
    barClass = "exam-bar exam-bar-passed";
  } else if (unlocked) {
    status = "Ready to take";
    barClass = "exam-bar";
  }

  if (big) {
    barClass = barClass + " exam-bar-big";
  }

  return '<div class="' + barClass + '" onclick="' + onclick + '">' +
      '<span class="exam-bar-name">' + title + '</span>' +
      '<span class="exam-bar-status">' + about + '  ·  ' + status + '</span>' +
    '</div>';
}


// ---------- 5. Clicking an exam ----------
// If the exam is unlocked, open it. If it's locked, show a popup that says why.

function clickQuiz(lessonNumber) {
  if (isQuizUnlocked(lessonNumber)) {
    openExam("lesson", lessonNumber);
  } else {
    showPopup("Lesson " + lessonNumber + " Quiz is locked",
      "Please complete Lesson " + lessonNumber + " first. Go through all of its steps, then you can take the quiz.");
  }
}

function clickUnitExam(unitNumber) {
  if (isUnitExamUnlocked(unitNumber)) {
    openExam("unit", unitNumber);
  } else if (lessonsDone < lessonsThroughUnit(unitNumber)) {
    showPopup("Unit " + unitNumber + " Exam is locked",
      "Please complete all the lessons in Unit " + unitNumber + " first. (A lesson is complete when you pass its quiz.)");
  } else {
    showPopup("Unit " + unitNumber + " Exam is locked",
      "Please pass the Unit " + (unitNumber - 1) + " exam first.");
  }
}

function clickFinalExam() {
  if (isFinalUnlocked()) {
    openExam("final", 0);
  } else {
    showPopup("The Final Exam is locked",
      "Please pass all 5 unit exams first. Then you can take the final exam and become a Money Master!");
  }
}


// ---------- 6. The popup ----------

function showPopup(title, text) {
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-text").textContent = text;
  document.getElementById("popup").hidden = false;
}

function closePopup() {
  document.getElementById("popup").hidden = true;
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


// ---------- 7. Fill in the page ----------

showCurrentLesson();
showBadges();
showExams();
showAllLessons();
