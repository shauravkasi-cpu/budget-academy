// lesson.js
// Runs on the page for ONE lesson (lesson.html).
// Shows the lesson you clicked on, then its quiz.


// which lesson to show (saved by openLesson() in common.js)
// 0 = Lesson 1, 1 = Lesson 2, ...
let lessonNumber = Number(localStorage.getItem("openLesson"));

// if the number is missing or too big, just show Lesson 1
if (lessonNumber < 0 || lessonNumber >= lessons.length) {
  lessonNumber = 0;
}

let lesson = lessons[lessonNumber];

// quiz score
let score = 0;      // how many answers were right
let answered = 0;   // how many questions have been answered


// ---------- 1. The top of the lesson ----------

// fills in the lesson's number, title, and description
function showLessonTop() {
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


// ---------- 2. The lesson itself ----------

// makes a card for each section of the lesson
function showSections() {
  // if this lesson isn't written yet, show "Coming soon" and stop
  if (lesson.sections === undefined) {
    document.getElementById("coming-soon").hidden = false;
    return;
  }

  let box = document.getElementById("lesson-sections");
  box.innerHTML = "";

  for (let i = 0; i < lesson.sections.length; i++) {
    let section = lesson.sections[i];

    box.innerHTML = box.innerHTML +
      '<div class="card">' +
        '<p class="big-text">' + section.heading + '</p>' +
        '<p class="lesson-text">' + section.text + '</p>' +
      '</div>';
  }
}


// ---------- 3. The quiz ----------

// makes a card for each question, with a button for each choice
function showQuiz() {
  // if this lesson has no quiz yet, stop
  if (lesson.quiz === undefined) {
    return;
  }

  document.getElementById("quiz-area").hidden = false;
  let box = document.getElementById("quiz-questions");
  box.innerHTML = "";

  for (let q = 0; q < lesson.quiz.length; q++) {
    let question = lesson.quiz[q];

    let html = '<div class="card">' +
      '<p class="card-label">Question ' + (q + 1) + ' of ' + lesson.quiz.length + '</p>' +
      '<p class="big-text">' + question.question + '</p>';

    // one button for each choice
    // each button gets an id like "q0-c2" (question 0, choice 2)
    for (let c = 0; c < question.choices.length; c++) {
      html = html +
        '<button class="choice" id="q' + q + '-c' + c + '" onclick="checkAnswer(' + q + ', ' + c + ')">' +
          question.choices[c] +
        '</button>';
    }

    // empty spot where "Correct!" or "Not quite." will show up
    html = html + '<p class="feedback" id="feedback-' + q + '"></p>';
    html = html + '</div>';

    box.innerHTML = box.innerHTML + html;
  }
}


// runs when you click a choice
// q = which question, c = which choice you clicked
function checkAnswer(q, c) {
  let question = lesson.quiz[q];

  // lock all the buttons for this question so you can't answer twice
  for (let i = 0; i < question.choices.length; i++) {
    document.getElementById("q" + q + "-c" + i).disabled = true;
  }

  // always turn the right answer green
  document.getElementById("q" + q + "-c" + question.answer).classList.add("choice-right");

  let feedback = document.getElementById("feedback-" + q);

  if (c === question.answer) {
    // right answer
    score = score + 1;
    feedback.textContent = "Correct! " + question.explain;
    feedback.classList.add("feedback-right");
  } else {
    // wrong answer: turn the one they clicked red
    document.getElementById("q" + q + "-c" + c).classList.add("choice-wrong");
    feedback.textContent = "Not quite. " + question.explain;
    feedback.classList.add("feedback-wrong");
  }

  answered = answered + 1;

  // when every question is answered, show the score
  if (answered === lesson.quiz.length) {
    showScore();
  }
}


// shows the score card at the end
function showScore() {
  document.getElementById("quiz-result").hidden = false;
  document.getElementById("quiz-score").textContent = score + " / " + lesson.quiz.length;

  if (score === lesson.quiz.length) {
    document.getElementById("quiz-message").textContent = "Perfect score! You really know this.";
  } else if (score >= lesson.quiz.length / 2) {
    document.getElementById("quiz-message").textContent = "Nice work! Read the answers above to see what you missed.";
  } else {
    document.getElementById("quiz-message").textContent = "Good try! Read the lesson again and look at the answers above.";
  }
}


// runs when you click "Finish lesson"
function finishLesson() {
  // if this was the lesson you were on, move on to the next one
  // (finishing an old lesson again doesn't change anything)
  if (lessonNumber === lessonsDone) {
    localStorage.setItem("lessonsDone", lessonsDone + 1);
  }

  window.location.href = "lessons.html";
}


// ---------- 4. Buttons at the bottom ----------

// go to the lesson before this one
function previousLesson() {
  openLesson(lessonNumber - 1);
}

// go to the lesson after this one
function nextLesson() {
  openLesson(lessonNumber + 1);
}


// ---------- 5. Fill in the page ----------

showLessonTop();
showSections();
showQuiz();
