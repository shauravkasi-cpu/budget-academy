// spending-test.js
// Runs on the Spending Test page (spending-test.html).
// Each test picks one money situation from spending-test-data.js.
// The situation stays the same, and you answer 8 multiple choice questions about it.
// Your score is saved in the list "spendingTests" so the Past Tests page can show it.
//
// loadList, saveList, todayText are in money-data.js. formatMoney is in money.js
// lessons is in lessons-data.js, and openLesson is in common.js


// ---------- 1. Pick a situation ----------

let scenario;       // the situation for this test
let current = 0;    // which question you're on (0 = the first one)
let right = 0;      // how many you got right
let missed = [];    // the lesson numbers for questions you got wrong


// picks a random situation, but not the same one as last time
function pickScenario() {
  let number = Math.floor(Math.random() * scenarios.length);

  let last = Number(localStorage.getItem("lastScenario"));
  if (number === last) {
    number = (number + 1) % scenarios.length;   // % wraps back to 0 after the last one
  }

  localStorage.setItem("lastScenario", number);
  scenario = scenarios[number];
}


// the box at the top: who it is, their pay, and their bills
function showSituation() {
  let html =
    '<p class="card-label">Your situation</p>' +
    '<p class="card-title">' + scenario.title + '</p>' +
    '<p class="card-text">' + scenario.about + '</p>' +
    '<div class="bill-row"><span class="bill-name">Take-home pay each month</span>' +
      '<span>' + formatMoney(scenario.pay) + '</span></div>';

  for (let i = 0; i < scenario.bills.length; i++) {
    html = html +
      '<div class="bill-row"><span class="bill-name grey">' + scenario.bills[i].name + '</span>' +
      '<span>' + formatMoney(scenario.bills[i].amount) + '</span></div>';
  }

  // the extra facts, like "$300 in savings"
  html = html + '<p class="small-text">' + scenario.facts.join("  ·  ") + '</p>';

  document.getElementById("situation").innerHTML = html;
}


// ---------- 2. One question at a time ----------

function showQuestion() {
  let q = scenario.questions[current];
  let total = scenario.questions.length;

  // progress bar and "Question 3 of 8"
  document.getElementById("test-bar").style.width = (current / total) * 100 + "%";
  document.getElementById("test-count").textContent = "Question " + (current + 1) + " of " + total;

  let html = '<div class="step-box">' +
    '<p class="step-tag">Question ' + (current + 1) + '</p>' +
    '<p class="step-heading">' + q.question + '</p>';

  // a button for each choice, with an id like "choice-2"
  for (let i = 0; i < q.choices.length; i++) {
    html = html + '<button class="choice" id="choice-' + i + '" onclick="pick(' + i + ')">' +
      q.choices[i] + '</button>';
  }

  // the explanation shows up here after you answer
  html = html + '<p class="feedback" id="test-feedback"></p></div>';
  document.getElementById("stage").innerHTML = html;

  // the Next button stays off until you answer
  document.getElementById("test-next").disabled = true;
  document.getElementById("test-hint").textContent = "Pick an answer";

  // on the last question the button says Finish
  if (current === total - 1) {
    document.getElementById("test-next").innerHTML = "Finish &rarr;";
  } else {
    document.getElementById("test-next").innerHTML = "Next &rarr;";
  }
}


// you clicked choice number c
function pick(c) {
  let q = scenario.questions[current];

  // lock every button so you can't change your answer
  for (let i = 0; i < q.choices.length; i++) {
    document.getElementById("choice-" + i).disabled = true;
  }

  // the right answer turns green. If you picked a wrong one, it turns red
  document.getElementById("choice-" + q.answer).classList.add("choice-right");
  let feedback = document.getElementById("test-feedback");

  if (c === q.answer) {
    right = right + 1;
    feedback.textContent = "Right! " + q.explain;
    feedback.className = "feedback feedback-right";
  } else {
    document.getElementById("choice-" + c).classList.add("choice-wrong");
    missed.push(q.lesson);
    feedback.textContent = "Not quite. " + q.explain;
    feedback.className = "feedback feedback-wrong";
  }

  document.getElementById("test-next").disabled = false;
  document.getElementById("test-hint").textContent = "";
}


// we don't jump back to the top, so on a phone you stay where the Next button is
function nextQuestion() {
  current = current + 1;

  if (current === scenario.questions.length) {
    showResults();
  } else {
    showQuestion();
  }
}


// ---------- 3. Your score ----------

// a word for the score
function scoreName(score) {
  if (score >= 90) {
    return "Excellent";
  } else if (score >= 70) {
    return "Good";
  } else if (score >= 50) {
    return "Okay";
  }
  return "Needs work";
}

function showResults() {
  let total = scenario.questions.length;
  let score = Math.round(right / total * 100);

  // save it for the Past Tests page
  let tests = loadList("spendingTests");
  tests.push({ date: todayText(), scenario: scenario.title, right: right, total: total, score: score });
  saveList("spendingTests", tests);

  document.getElementById("test-bar").style.width = "100%";
  document.getElementById("test-count").textContent = "Done!";
  document.getElementById("test-nav").hidden = true;

  let html =
    '<p class="card-label">Your score</p>' +
    '<p class="huge-text">' + score + ' / 100</p>' +
    '<p class="big-text">' + scoreName(score) + '  ·  ' + right + ' of ' + total + ' right</p>';

  // a button for each lesson to review (only once, even if you missed 2 questions from it)
  if (missed.length > 0) {
    html = html + '<p class="section-title test-row">Lessons to review</p><div class="button-row">';
    let shown = [];
    for (let i = 0; i < missed.length; i++) {
      let n = missed[i];
      if (!shown.includes(n)) {
        shown.push(n);
        html = html + '<button class="pill-button small-pill" onclick="openLesson(' + n + ')">' +
          'Lesson ' + (n + 1) + ': ' + lessons[n].title + '</button>';
      }
    }
    html = html + '</div>';
  }

  html = html +
    '<div class="button-row test-row">' +
      '<button class="pill-button green-pill" onclick="window.location.reload()">Take another test</button>' +
      '<a class="pill-button" href="past-tests.html">See past tests</a>' +
    '</div>';

  document.getElementById("stage").innerHTML = html;

  // scroll so your score is at the top of the screen
  document.getElementById("stage").scrollIntoView();
}


// ---------- 4. Start ----------

pickScenario();
showSituation();
showQuestion();
