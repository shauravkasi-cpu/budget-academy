// lesson.js
// Runs on the page for ONE lesson (lesson.html).
// The lesson is shown one step at a time, with Back and Next buttons.
// The steps come from lessons-data.js


// ---------- 1. Which lesson, and which step ----------

// which lesson to show (saved by openLesson() in common.js)
// 0 = Lesson 1, 1 = Lesson 2, ...
let lessonNumber = Number(localStorage.getItem("openLesson"));

// if the number is missing or too big, just show Lesson 1
if (lessonNumber < 0 || lessonNumber >= lessons.length) {
  lessonNumber = 0;
}

let lesson = lessons[lessonNumber];

// which step we're on (0 = the first step)
let step = 0;

// the answers you picked, saved by step number
// example: answers[2] = 0 means on step 2 you clicked the first choice
// for "sort" steps, answers[step] is a list with one answer for each item
let answers = [];


// ---------- 2. The top of the page ----------

function showLessonTop() {
  // "Unit 1: Budgeting Basics  ·  Lesson 3 of 25"
  // (units[0] is Unit 1, so we use lesson.unit - 1)
  document.getElementById("lesson-number").textContent =
    "Unit " + lesson.unit + ": " + units[lesson.unit - 1].title +
    "  ·  Lesson " + (lessonNumber + 1) + " of " + lessons.length;
  document.getElementById("lesson-title").textContent = lesson.title;

  // also show the lesson name on the browser tab
  document.title = "Budget Academy - " + lesson.title;
}


// ---------- 3. Show the step you're on ----------

function showStep() {
  let stage = document.getElementById("stage");

  // lessons that aren't written yet
  if (lesson.steps === undefined) {
    stage.innerHTML =
      '<p class="step-tag">Coming soon</p>' +
      '<p class="step-heading">This lesson is still being written.</p>' +
      '<p class="lesson-text">Check back soon!</p>';
    document.getElementById("step-nav").hidden = true;
    document.getElementById("step-bar").style.width = "0%";
    return;
  }

  // after the last step, show the "Lesson complete!" screen
  if (step === lesson.steps.length) {
    showFinish();
    return;
  }

  // progress bar and "Step 3 of 13"
  let percent = (step / lesson.steps.length) * 100;
  document.getElementById("step-bar").style.width = percent + "%";
  document.getElementById("step-count").textContent =
    "Step " + (step + 1) + " of " + lesson.steps.length;

  // make the HTML for this kind of step
  let s = lesson.steps[step];
  let html = "";

  if (s.type === "story") {
    html = storyHTML(s);
  } else if (s.type === "text") {
    html = textHTML(s);
  } else if (s.type === "question") {
    html = questionHTML(s);
  } else if (s.type === "sort") {
    html = sortHTML(s);
  } else if (s.type === "choice") {
    html = choiceHTML(s);
  } else if (s.type === "calculator") {
    html = calculatorStepHTML(s);
  }

  // the step-box div fades in (see .step-box in style.css)
  stage.innerHTML = '<div class="step-box">' + html + '</div>';

  // if you already answered this step (and came back with Back), show your answer again
  if (answers[step] !== undefined) {
    if (s.type === "question") {
      markQuestion();
    } else if (s.type === "choice") {
      markChoice();
    } else if (s.type === "sort") {
      for (let i = 0; i < s.items.length; i++) {
        if (answers[step][i] !== undefined) {
          markSort(i);
        }
      }
    }
  }

  updateButtons();
}


// ---------- 4. The HTML for each kind of step ----------

// Jordan talking, in a speech bubble
function storyHTML(s) {
  return '<p class="step-tag">Story</p>' +
    '<p class="step-heading">' + s.heading + '</p>' +
    '<div class="story">' +
      '<div class="jordan">J</div>' +
      '<div class="speech">' +
        '<p class="speech-name">Jordan</p>' +
        '<p class="lesson-text">' + s.text + '</p>' +
      '</div>' +
    '</div>';
}


// an explanation, with a list of points if the step has them
function textHTML(s) {
  let html = '<p class="step-tag">Learn</p>' +
    '<p class="step-heading">' + s.heading + '</p>' +
    '<p class="lesson-text">' + s.text + '</p>';

  if (s.points !== undefined) {
    for (let i = 0; i < s.points.length; i++) {
      html = html + '<p class="point">' + s.points[i] + '</p>';
    }
  }

  return html;
}


// a quick check question with a button for each choice
function questionHTML(s) {
  let html = '<p class="step-tag">Quick check</p>' +
    '<p class="step-heading">' + s.question + '</p>';

  // each button gets an id like "choice-2"
  for (let i = 0; i < s.choices.length; i++) {
    html = html + '<button class="choice" id="choice-' + i + '" onclick="pickAnswer(' + i + ')">' +
      s.choices[i] + '</button>';
  }

  // empty spot where "Correct!" or "Not quite." will show up
  return html + '<p class="feedback" id="feedback"></p>';
}


// a row for each item, with a button for each bucket (Need / Want)
function sortHTML(s) {
  let html = '<p class="step-tag">Sort it</p>' +
    '<p class="step-heading">' + s.heading + '</p>' +
    '<p class="lesson-text">' + s.text + '</p>';

  for (let i = 0; i < s.items.length; i++) {
    html = html + '<div class="sort-row">' +
      '<span class="sort-name">' + s.items[i].name + '</span>';

    // each button gets an id like "sort-3-1" (item 3, bucket 1)
    for (let b = 0; b < s.buckets.length; b++) {
      html = html + '<button class="sort-button" id="sort-' + i + '-' + b + '" onclick="pickSort(' + i + ', ' + b + ')">' +
        s.buckets[b] + '</button>';
    }

    html = html + '<span class="sort-result" id="sort-result-' + i + '"></span></div>';
  }

  return html + '<p class="feedback" id="feedback"></p>';
}


// "what would you do?" with a button for each choice
function choiceHTML(s) {
  let html = '<p class="step-tag">What would you do?</p>' +
    '<p class="step-heading">' + s.heading + '</p>' +
    '<div class="story">' +
      '<div class="jordan">J</div>' +
      '<div class="speech"><p class="lesson-text">' + s.text + '</p></div>' +
    '</div>';

  for (let i = 0; i < s.choices.length; i++) {
    html = html + '<button class="choice" id="choice-' + i + '" onclick="pickChoice(' + i + ')">' +
      s.choices[i].text + '</button>';
  }

  return html + '<p class="feedback" id="feedback"></p>';
}


// a calculator (the calculators are in calculators.js)
function calculatorStepHTML(s) {
  return '<p class="step-tag">Try it</p>' +
    '<p class="step-heading">' + s.heading + '</p>' +
    '<p class="lesson-text">' + s.text + '</p>' +
    calculatorHTML(s.kind, s.values);
}


// ---------- 5. When you click an answer ----------

// quick check: you clicked choice number c
function pickAnswer(c) {
  answers[step] = c;
  markQuestion();
  updateButtons();
}

// colors the buttons and shows if you were right
function markQuestion() {
  let s = lesson.steps[step];
  let picked = answers[step];

  // lock all the buttons so you can't answer twice
  for (let i = 0; i < s.choices.length; i++) {
    document.getElementById("choice-" + i).disabled = true;
  }

  // the right answer always turns green
  document.getElementById("choice-" + s.answer).classList.add("choice-right");

  let feedback = document.getElementById("feedback");
  if (picked === s.answer) {
    feedback.textContent = "Correct! " + s.explain;
    feedback.classList.add("feedback-right");
  } else {
    // the wrong one you picked turns red
    document.getElementById("choice-" + picked).classList.add("choice-wrong");
    feedback.textContent = "Not quite. " + s.explain;
    feedback.classList.add("feedback-wrong");
  }
}


// sort: for item number i, you clicked bucket number b
function pickSort(i, b) {
  // the first time, make an empty list to hold the answers for this step
  if (answers[step] === undefined) {
    answers[step] = [];
  }

  answers[step][i] = b;
  markSort(i);
  updateButtons();
}

// colors one sort row and shows a check or an X
function markSort(i) {
  let s = lesson.steps[step];
  let item = s.items[i];
  let picked = answers[step][i];

  // lock this row's buttons
  for (let b = 0; b < s.buckets.length; b++) {
    document.getElementById("sort-" + i + "-" + b).disabled = true;
  }

  // the right bucket turns green
  document.getElementById("sort-" + i + "-" + item.answer).classList.add("choice-right");

  let result = document.getElementById("sort-result-" + i);
  if (picked === item.answer) {
    result.innerHTML = "&#10003;";   // check mark
    result.classList.add("feedback-right");
  } else {
    document.getElementById("sort-" + i + "-" + picked).classList.add("choice-wrong");
    result.innerHTML = "&#10007;";   // X mark
    result.classList.add("feedback-wrong");
  }

  // when every item is sorted, show the score for this step
  if (countSorted() === s.items.length) {
    let right = 0;
    for (let j = 0; j < s.items.length; j++) {
      if (answers[step][j] === s.items[j].answer) {
        right = right + 1;
      }
    }
    document.getElementById("feedback").textContent =
      "You sorted " + right + " of " + s.items.length + " right!";
    document.getElementById("feedback").classList.add("feedback-right");
  }
}

// how many items on this sort step have an answer
function countSorted() {
  if (answers[step] === undefined) {
    return 0;
  }

  let count = 0;
  for (let i = 0; i < answers[step].length; i++) {
    if (answers[step][i] !== undefined) {
      count = count + 1;
    }
  }
  return count;
}


// what would you do: you clicked choice number c
function pickChoice(c) {
  answers[step] = c;
  markChoice();
  updateButtons();
}

// shows what happens because of your choice
function markChoice() {
  let s = lesson.steps[step];
  let picked = s.choices[answers[step]];

  for (let i = 0; i < s.choices.length; i++) {
    document.getElementById("choice-" + i).disabled = true;
  }

  let feedback = document.getElementById("feedback");
  feedback.textContent = picked.result;

  // good choices are green, bad choices are red
  if (picked.good === true) {
    document.getElementById("choice-" + answers[step]).classList.add("choice-right");
    feedback.classList.add("feedback-right");
  } else {
    document.getElementById("choice-" + answers[step]).classList.add("choice-wrong");
    feedback.classList.add("feedback-wrong");
  }
}


// ---------- 6. Back and Next ----------

// can you go to the next step yet?
// (you have to answer questions first, everything else is fine)
function canGoNext() {
  let s = lesson.steps[step];

  if (s.type === "question" || s.type === "choice") {
    return answers[step] !== undefined;
  }
  if (s.type === "sort") {
    return countSorted() === s.items.length;
  }
  return true;
}

// turns the buttons on or off, and changes their words
function updateButtons() {
  // no Back button on the first step
  document.getElementById("back-button").hidden = (step === 0);

  let next = document.getElementById("next-button");
  let hint = document.getElementById("step-hint");

  if (canGoNext()) {
    next.disabled = false;
    hint.textContent = "";
  } else {
    next.disabled = true;
    hint.textContent = "Answer to keep going";
  }

  // on the last step the button says Finish
  if (step === lesson.steps.length - 1) {
    next.innerHTML = "Finish &rarr;";
  } else {
    next.innerHTML = "Next &rarr;";
  }
}

function nextStep() {
  step = step + 1;
  showStep();
  window.scrollTo(0, 0);
}

function previousStep() {
  step = step - 1;
  showStep();
  window.scrollTo(0, 0);
}


// ---------- 7. The end of the lesson ----------

// how many quick check questions you got right
function countRight() {
  let right = 0;
  for (let i = 0; i < lesson.steps.length; i++) {
    let s = lesson.steps[i];
    if (s.type === "question" && answers[i] === s.answer) {
      right = right + 1;
    }
  }
  return right;
}

// how many quick check questions there are
function countQuestions() {
  let total = 0;
  for (let i = 0; i < lesson.steps.length; i++) {
    if (lesson.steps[i].type === "question") {
      total = total + 1;
    }
  }
  return total;
}

// the end of the lesson: now take the 5-question quiz
// (passing the quiz is what completes the lesson, see exam.js)
function showFinish() {
  document.getElementById("step-bar").style.width = "100%";
  document.getElementById("step-count").textContent = "Done!";
  document.getElementById("step-nav").hidden = true;

  // remember that you went through the whole lesson, so its quiz unlocks
  localStorage.setItem("read-lesson-" + (lessonNumber + 1), "yes");

  // if you already took this lesson's quiz, show your best score
  let quizText = "Pass the 5-question quiz (4 right) to complete the lesson and earn the \"" + lesson.badge + "\" badge.";
  let best = bestScore("lesson", lessonNumber + 1);
  if (best >= 0) {
    quizText = quizText + " Your best score so far: " + best + "%.";
  }

  document.getElementById("stage").innerHTML =
    '<div class="step-box finish">' +
      '<div class="finish-check">&#10003;</div>' +
      '<p class="huge-text">Nice work!</p>' +
      '<p class="lesson-description">You got ' + countRight() + ' of ' + countQuestions() + ' quick checks right. ' + quizText + '</p>' +
      '<div class="button-row finish-buttons">' +
        '<button class="pill-button green-pill" onclick="takeQuiz()">Take the quiz &rarr;</button>' +
        '<button class="pill-button" onclick="reviewLesson()">Review lesson</button>' +
      '</div>' +
    '</div>';
}

// opens this lesson's quiz (lessonNumber starts at 0, but quizzes start at Lesson 1)
function takeQuiz() {
  openExam("lesson", lessonNumber + 1);
}

// start the lesson over from step 1
function reviewLesson() {
  step = 0;
  answers = [];
  document.getElementById("step-nav").hidden = false;
  showStep();
}


// ---------- 8. Fill in the page ----------

showLessonTop();
showStep();
