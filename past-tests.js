// past-tests.js
// Runs on the Past Tests page (past-tests.html).
// Shows every Spending Test you've taken, so you can watch your score go up.
// The tests are saved by spending-test.js in the list "spendingTests".
// Each test looks like { date, income, needs, wants, savings, score } (money in cents)
//
// loadList, saveList, prettyDate are in money-data.js. formatMoney is in money.js


// green for a good score, yellow for okay, red for needs work
// (bar-yellow and bar-red are in style.css)
function scoreColor(score) {
  if (score >= 70) {
    return "";
  } else if (score >= 50) {
    return " bar-yellow";
  }
  return " bar-red";
}


// one number box at the top, like "3 / Tests taken"
function numberBox(bigText, label) {
  return '<div class="calc-box">' +
    '<p class="split-number">' + bigText + '</p>' +
    '<p class="split-label">' + label + '</p>' +
  '</div>';
}


// ---------- 1. Tests taken, best score, last score ----------

function showNumbers(tests) {
  let best = 0;
  for (let i = 0; i < tests.length; i++) {
    if (tests[i].score > best) {
      best = tests[i].score;
    }
  }

  // the last test is the newest one
  let last = tests[tests.length - 1].score;

  // how much your last score changed from the one before it
  let lastLabel = "Last score";
  if (tests.length >= 2) {
    let change = last - tests[tests.length - 2].score;
    if (change > 0) {
      lastLabel = "Last score (up " + change + ")";
    } else if (change < 0) {
      lastLabel = "Last score (down " + (-change) + ")";
    } else {
      lastLabel = "Last score (same)";
    }
  }

  document.getElementById("test-numbers").innerHTML =
    numberBox(tests.length, "Tests taken") +
    numberBox(best, "Best score") +
    numberBox(last, lastLabel);
}


// ---------- 2. The chart ----------
// one bar for each of your last 10 tests, oldest on the left
// a bar is 1.5 pixels tall for every point, so a score of 100 is 150 pixels tall

function showChart(tests) {
  // start 10 from the end (or at the first test, if there are fewer than 10)
  let start = Math.max(0, tests.length - 10);
  let html = '<div class="score-chart">';

  for (let i = start; i < tests.length; i++) {
    let test = tests[i];

    // the date like "Nov 24" (prettyDate gives "Nov 24, 2026", so we cut off the year)
    let date = prettyDate(test.date).split(",")[0];

    html = html +
      '<div class="score-column">' +
        test.score +
        '<div class="score-bar' + scoreColor(test.score) + '" style="height: ' + (test.score * 1.5) + 'px"></div>' +
        '<span class="score-date">' + date + '</span>' +
      '</div>';
  }

  html = html + '</div>';
  document.getElementById("score-chart").innerHTML = html;
}


// ---------- 3. The list of every test ----------

// what percent of the income something was
function percentOf(amount, income) {
  return Math.round(amount / income * 100) + "%";
}

function showList(tests) {
  let html = "";

  // go backwards so the newest test is on top
  for (let i = tests.length - 1; i >= 0; i--) {
    let test = tests[i];

    html = html +
      '<div class="card item-card">' +
        '<div class="item-row">' +
          '<div>' +
            '<p class="item-name">' + prettyDate(test.date) + '</p>' +
            '<p class="small-text">Needs ' + percentOf(test.needs, test.income) +
              '  ·  Wants ' + percentOf(test.wants, test.income) +
              '  ·  Savings ' + percentOf(test.savings, test.income) +
              '  ·  Income ' + formatMoney(test.income) + '</p>' +
          '</div>' +
          '<div class="item-right">' +
            '<span class="item-amount">' + test.score + ' / 100</span>' +
            '<button class="text-button" onclick="deleteTest(' + i + ')">Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  document.getElementById("test-list").innerHTML = html;
}


// removes one test (number is its spot in the list)
function deleteTest(number) {
  let tests = loadList("spendingTests");
  tests.splice(number, 1);   // splice(spot, 1) takes out 1 item at that spot
  saveList("spendingTests", tests);
  showPage();
}


// ---------- 4. Fill in the page ----------

function showPage() {
  let tests = loadList("spendingTests");

  // no tests yet: hide the chart and show a button to take the first one
  let chartSection = document.getElementById("chart-section");
  if (tests.length === 0) {
    document.getElementById("test-numbers").innerHTML = "";
    chartSection.hidden = true;
    document.getElementById("test-list").innerHTML =
      emptyStateHTML("No tests yet.", "Take your first test", "window.location.href = 'spending-test.html'");
    return;
  }

  chartSection.hidden = false;
  showNumbers(tests);
  showChart(tests);
  showList(tests);
}


showPage();
