// exam.js
// Runs on the exam page (exam.html).
// This one page runs all 3 kinds of exams:
//   "lesson" - the 5-question quiz at the end of a lesson
//   "unit"   - the 15-question exam at the end of a unit
//   "final"  - the 40-question final exam (8 random questions from each unit)
// The questions are in exams-data.js


// ---------- 1. Which exam is this? ----------

// saved by openExam() in common.js
let examType = localStorage.getItem("examType");
let examNumber = Number(localStorage.getItem("examNumber"));

// you need 80% or more to pass any exam
let passPercent = 80;

let questions = [];   // the questions for this exam
let current = 0;      // which question you're on (0 = the first one)
let picks = [];       // the answer you picked for each question


// the name of the exam, like "Lesson 3 Quiz"
function examTitle() {
  if (examType === "lesson") {
    return "Lesson " + examNumber + " Quiz: " + lessons[examNumber - 1].title;
  }
  if (examType === "unit") {
    return "Unit " + examNumber + " Exam: " + units[examNumber - 1].title;
  }
  return "Final Exam";
}


// gets the questions for this exam
function getQuestions() {
  // lessonQuizzes[0] is Lesson 1's quiz, so we use examNumber - 1
  if (examType === "lesson") {
    return lessonQuizzes[examNumber - 1];
  }
  if (examType === "unit") {
    return unitExams[examNumber - 1];
  }

  // final exam: 8 random questions from each unit
  // (from that unit's exam AND its lesson quizzes, so it's different every time)
  let list = [];
  for (let u = 0; u < units.length; u++) {
    let pool = unitExams[u];

    // add the quiz questions from every lesson in this unit
    for (let i = 0; i < lessons.length; i++) {
      if (lessons[i].unit === u + 1) {
        pool = pool.concat(lessonQuizzes[i]);
      }
    }

    list = list.concat(pickRandom(pool, 8));
  }
  return list;
}


// picks some questions at random from a list, with no repeats
function pickRandom(pool, howMany) {
  let left = pool.slice();   // a copy, so we don't change the real list
  let picked = [];

  for (let i = 0; i < howMany; i++) {
    let spot = Math.floor(Math.random() * left.length);   // a random spot in the list
    picked.push(left[spot]);
    left.splice(spot, 1);   // take it out, so it can't be picked again
  }
  return picked;
}


// can you take this exam yet?
function isUnlocked() {
  // unit exam: finish all the unit's lessons, and pass the unit before it
  if (examType === "unit") {
    return lessonsDone >= lessonsThroughUnit(examNumber) && unitsPassed >= examNumber - 1;
  }
  // final exam: pass every unit exam
  if (examType === "final") {
    return unitsPassed === units.length;
  }
  // lesson quizzes are always open
  return true;
}


// ---------- 2. The start screen ----------

function showIntro() {
  let howMany = getQuestions().length;
  let needed = Math.ceil(howMany * passPercent / 100);   // how many right answers you need

  let label = "Unit exam";
  if (examType === "lesson") {
    label = "Lesson quiz";
  } else if (examType === "final") {
    label = "Final exam";
  }
  document.getElementById("exam-label").textContent = label;
  document.getElementById("exam-title").textContent = examTitle();
  document.getElementById("exam-bar").style.width = "0%";
  document.getElementById("exam-count").textContent = howMany + " questions";
  document.getElementById("exam-nav").hidden = true;
  document.getElementById("review").innerHTML = "";
  document.title = "Budget Academy - " + examTitle();

  let html = '<div class="step-box">' +
    '<p class="step-tag">Ready?</p>' +
    '<p class="step-heading">' + examTitle() + '</p>' +
    '<p class="point">' + howMany + ' questions</p>' +
    '<p class="point">You need ' + passPercent + '% (' + needed + ' right) to pass</p>' +
    '<p class="point">You\'ll see the right answers at the end</p>';

  // show your best score if you've taken it before
  let best = bestScore(examType, examNumber);
  if (best >= 0) {
    html = html + '<p class="point">Your best score so far: ' + best + '%</p>';
  }

  if (isUnlocked()) {
    html = html + '<button class="resume-button" onclick="startExam()">Start</button>';
  } else if (examType === "unit") {
    html = html + '<p class="feedback feedback-wrong">Finish all the lessons in Unit ' + examNumber +
      ' (and pass the exams before it) to unlock this exam.</p>';
  } else {
    html = html + '<p class="feedback feedback-wrong">Pass all 5 unit exams to unlock the final exam.</p>';
  }

  document.getElementById("stage").innerHTML = html + '</div>';
}


// starts (or restarts) the exam
function startExam() {
  questions = getQuestions();
  current = 0;
  picks = [];
  document.getElementById("review").innerHTML = "";
  showQuestion();
}


// ---------- 3. One question at a time ----------

function showQuestion() {
  let q = questions[current];

  // progress bar and "Question 3 of 15"
  document.getElementById("exam-bar").style.width = (current / questions.length) * 100 + "%";
  document.getElementById("exam-count").textContent = "Question " + (current + 1) + " of " + questions.length;

  let html = '<div class="step-box">' +
    '<p class="step-tag">Question ' + (current + 1) + '</p>' +
    '<p class="step-heading">' + q.question + '</p>';

  // a button for each choice, with an id like "choice-2"
  for (let i = 0; i < q.choices.length; i++) {
    html = html + '<button class="choice" id="choice-' + i + '" onclick="pick(' + i + ')">' +
      q.choices[i] + '</button>';
  }

  document.getElementById("stage").innerHTML = html + '</div>';

  // the Next button stays off until you pick an answer
  document.getElementById("exam-nav").hidden = false;
  document.getElementById("exam-next").disabled = true;
  document.getElementById("exam-hint").textContent = "Pick an answer";

  // on the last question the button says Finish
  if (current === questions.length - 1) {
    document.getElementById("exam-next").innerHTML = "Finish exam &rarr;";
  } else {
    document.getElementById("exam-next").innerHTML = "Next &rarr;";
  }
}


// you clicked choice number c (you can change your mind before pressing Next)
function pick(c) {
  picks[current] = c;

  // only the choice you picked is highlighted
  let q = questions[current];
  for (let i = 0; i < q.choices.length; i++) {
    document.getElementById("choice-" + i).classList.remove("choice-picked");
  }
  document.getElementById("choice-" + c).classList.add("choice-picked");

  document.getElementById("exam-next").disabled = false;
  document.getElementById("exam-hint").textContent = "";
}


function nextQuestion() {
  current = current + 1;

  if (current === questions.length) {
    showResults();
  } else {
    showQuestion();
  }
  window.scrollTo(0, 0);
}


// ---------- 4. Your score ----------

// how many answers were right
function countRight() {
  let right = 0;
  for (let i = 0; i < questions.length; i++) {
    if (picks[i] === questions[i].answer) {
      right = right + 1;
    }
  }
  return right;
}


function showResults() {
  let right = countRight();
  let percent = Math.round((right / questions.length) * 100);
  let passed = percent >= passPercent;

  // save your best score
  if (percent > bestScore(examType, examNumber)) {
    localStorage.setItem("best-" + examType + "-" + examNumber, percent);
  }

  // save your progress and get the rewards to show (only if you passed)
  let rewards = "";
  if (passed) {
    rewards = saveProgress();
  }

  document.getElementById("exam-bar").style.width = "100%";
  document.getElementById("exam-count").textContent = "Done!";
  document.getElementById("exam-nav").hidden = true;

  let html = '<div class="step-box finish">';

  if (passed) {
    html = html +
      '<div class="finish-check">&#10003;</div>' +
      '<p class="huge-text">You passed!</p>';
  } else {
    html = html +
      '<div class="finish-check finish-fail">&#10007;</div>' +
      '<p class="huge-text">Not quite yet</p>';
  }

  html = html +
    '<p class="lesson-description">You got ' + right + ' of ' + questions.length + ' right (' + percent + '%). ' +
    'You need ' + passPercent + '% to pass.</p>' +
    '<div class="reward-row">' + rewards + '</div>' +
    '<div class="button-row finish-buttons">' + resultButtons(passed) + '</div>' +
    '</div>';

  document.getElementById("stage").innerHTML = html;
  showReview();
}


// the buttons under your score
function resultButtons(passed) {
  if (!passed) {
    let buttons = '<button class="pill-button green-pill" onclick="startExam()">Try again</button>';
    // for a lesson quiz, you can go back and review the lesson first
    if (examType === "lesson") {
      buttons = buttons + '<button class="pill-button" onclick="openLesson(' + (examNumber - 1) + ')">Review the lesson</button>';
    }
    return buttons;
  }

  // passed a lesson quiz: go to the next lesson (if there is one)
  if (examType === "lesson" && examNumber < lessons.length) {
    return '<button class="pill-button green-pill" onclick="openLesson(' + examNumber + ')">Next lesson &rarr;</button>' +
      '<a class="pill-button" href="lessons.html">All lessons</a>';
  }
  return '<a class="pill-button green-pill" href="lessons.html">Back to Learn Mode</a>';
}


// one reward box, like "+20 XP" or a badge
function rewardBox(bigText, label, gold) {
  let boxClass = "reward";
  if (gold) {
    boxClass = "reward unit-reward";
  }
  return '<div class="' + boxClass + '"><p class="split-number">' + bigText + '</p><p class="split-label">' + label + '</p></div>';
}


// saves your progress after you pass, and returns the reward boxes to show
// (you only get rewards the FIRST time you pass each exam)
function saveProgress() {
  if (examType === "lesson") {
    let lessonIndex = examNumber - 1;   // lessons[0] is Lesson 1
    let badge = rewardBox(lessons[lessonIndex].badge, "Badge earned", false);

    // only counts if this is the lesson you're on
    if (lessonIndex === lessonsDone) {
      lessonsDone = lessonsDone + 1;
      xp = xp + 20;
      localStorage.setItem("lessonsDone", lessonsDone);
      localStorage.setItem("xp", xp);
      return rewardBox("+20", "XP", false) + badge;
    }
    return badge;
  }

  if (examType === "unit") {
    // only counts if this is the next unit to pass
    if (examNumber === unitsPassed + 1) {
      unitsPassed = unitsPassed + 1;
      xp = xp + 50;
      localStorage.setItem("unitsPassed", unitsPassed);
      localStorage.setItem("xp", xp);
      return rewardBox("+50", "XP", false) +
        rewardBox(units[examNumber - 1].badge, "Unit " + examNumber + " complete!", true) +
        rewardBox(getSkillLevel(), "New skill level", false);
    }
    return rewardBox(units[examNumber - 1].badge, "Unit badge", true);
  }

  // final exam
  if (!finalPassed) {
    finalPassed = true;
    xp = xp + 100;
    localStorage.setItem("finalPassed", "yes");
    localStorage.setItem("xp", xp);
    return rewardBox("+100", "XP", false) + rewardBox("Money Master", "Final exam passed!", true);
  }
  return rewardBox("Money Master", "Final exam passed", true);
}


// ---------- 5. Review every question ----------

function showReview() {
  let html = '<h2 class="review-title">Review your answers</h2>';

  for (let i = 0; i < questions.length; i++) {
    let q = questions[i];
    let gotItRight = picks[i] === q.answer;

    let label = '<p class="card-label review-wrong">Question ' + (i + 1) + ': wrong</p>';
    if (gotItRight) {
      label = '<p class="card-label review-right">Question ' + (i + 1) + ': right</p>';
    }

    html = html + '<div class="card review-card">' + label +
      '<p class="big-text">' + q.question + '</p>' +
      '<p class="review-line">Your answer: <b>' + q.choices[picks[i]] + '</b></p>';

    // only show the right answer if you missed it
    if (!gotItRight) {
      html = html + '<p class="review-line review-right">Right answer: <b>' + q.choices[q.answer] + '</b></p>';
    }

    html = html + '<p class="lesson-description">' + q.explain + '</p></div>';
  }

  document.getElementById("review").innerHTML = html;
}


// ---------- 6. Fill in the page ----------

showIntro();
