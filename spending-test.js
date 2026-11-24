// spending-test.js
// Runs on the Spending Test page (spending-test.html).
// You type what you make and what you spend in a month, and you get a score out of 100
// based on the 50/30/20 rule: 50% needs, 30% wants, 20% savings.
// Every result is saved in the list "spendingTests" so the Past Tests page can show it.
//
// categories, loadBudget, spentThisMonth, loadList, saveList, todayText are in money-data.js
// toCents and formatMoney are in money.js. lessons is in lessons-data.js


// ---------- 1. Make a box for each category ----------

function showBoxes() {
  let needHTML = "";
  let wantHTML = "";

  for (let i = 0; i < categories.length; i++) {
    // every box id is "test-" plus the category's spot in the list, like "test-0"
    let box =
      '<div class="calc-input">' +
        '<label for="test-' + i + '">' + categories[i].name + ' ($)</label>' +
        '<input type="text" id="test-' + i + '" placeholder="0">' +
      '</div>';

    if (categories[i].kind === "need") {
      needHTML = needHTML + box;
    } else {
      wantHTML = wantHTML + box;
    }
  }

  document.getElementById("need-boxes").innerHTML = needHTML;
  document.getElementById("want-boxes").innerHTML = wantHTML;
}


// fills the boxes with your income and this month's purchases from the Budget page
function useMyBudget() {
  let income = loadBudget().income;
  if (income > 0) {
    document.getElementById("test-income").value = centsToText(income);
  }

  for (let i = 0; i < categories.length; i++) {
    document.getElementById("test-" + i).value = centsToText(spentThisMonth(categories[i].name));
  }
}


// ---------- 2. Read what was typed ----------

// reads one box in cents. An empty box counts as $0.
// gives -1 if it isn't a real amount (like letters)
function readBox(id) {
  let text = document.getElementById(id).value.trim();
  if (text === "") {
    return 0;
  }
  return toCents(text);
}


// ---------- 3. The score ----------
// Needs:   40 points if 50% of your income or less. Lose 2 points for every 1% over.
// Wants:   30 points if 30% of your income or less. Lose 2 points for every 1% over.
// Savings: 30 points if you save 20% or more. Less saved = fewer points.
//          If you spend more than you make, you get 0 savings points
//          (you'd be saving money you borrowed).

function needsPoints(needsPercent) {
  if (needsPercent <= 50) {
    return 40;
  }
  return Math.max(0, 40 - (needsPercent - 50) * 2);   // Math.max(0, x) never goes below 0
}

function wantsPoints(wantsPercent) {
  if (wantsPercent <= 30) {
    return 30;
  }
  return Math.max(0, 30 - (wantsPercent - 30) * 2);
}

function savingsPoints(savingsPercent, overspent) {
  if (overspent) {
    return 0;
  }
  if (savingsPercent >= 20) {
    return 30;
  }
  return Math.round(savingsPercent / 20 * 30);
}

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


// ---------- 4. Grade the test ----------

function gradeTest() {
  let error = document.getElementById("test-error");
  error.textContent = "";

  let income = readBox("test-income");
  let savings = readBox("test-savings");

  if (income <= 0) {
    error.textContent = "Type your monthly take-home pay, like 2000.";
    return;
  }
  if (savings < 0) {
    error.textContent = "Type a real amount for savings, like 200, or leave it empty.";
    return;
  }

  // add up needs and wants, and remember the biggest want
  let needs = 0;
  let wants = 0;
  let biggestWant = "";
  let biggestWantAmount = 0;

  for (let i = 0; i < categories.length; i++) {
    let amount = readBox("test-" + i);
    if (amount < 0) {
      error.textContent = "Type a real amount for " + categories[i].name + ", or leave it empty.";
      return;
    }

    if (categories[i].kind === "need") {
      needs = needs + amount;
    } else {
      wants = wants + amount;
      if (amount > biggestWantAmount) {
        biggestWant = categories[i].name;
        biggestWantAmount = amount;
      }
    }
  }

  // percent of your income that went to each part
  let needsPercent = Math.round(needs / income * 100);
  let wantsPercent = Math.round(wants / income * 100);
  let savingsPercent = Math.round(savings / income * 100);
  let overspent = needs + wants + savings > income;

  let points1 = needsPoints(needsPercent);
  let points2 = wantsPoints(wantsPercent);
  let points3 = savingsPoints(savingsPercent, overspent);
  let score = points1 + points2 + points3;

  // save it for the Past Tests page
  let tests = loadList("spendingTests");
  tests.push({
    date: todayText(),
    income: income,
    needs: needs,
    wants: wants,
    savings: savings,
    score: score
  });
  saveList("spendingTests", tests);

  showResults(score, needsPercent, wantsPercent, savingsPercent, points1, points2, points3,
    overspent, biggestWant, needs + wants + savings - income);
}


// ---------- 5. Show the score and advice ----------

// one row: name, a bar, and the percent compared to the goal
function resultRow(name, percent, goalText, points, maxPoints, barClass) {
  let width = Math.min(percent, 100);   // the bar can't be wider than the box
  return '<div class="test-row">' +
    '<p class="item-name">' + name + ': ' + percent + '% of your income</p>' +
    '<div class="bar"><div class="' + barClass + '" style="width: ' + width + '%"></div></div>' +
    '<p class="small-text">Goal: ' + goalText + '  ·  ' + points + ' of ' + maxPoints + ' points</p>' +
  '</div>';
}

// one piece of advice, with a button to the lesson that helps
// (lessons[n] is Lesson n + 1, and openLesson is in common.js)
function adviceHTML(text, lessonNumber) {
  return '<div class="item-card card">' +
    '<p class="card-text">' + text + '</p>' +
    '<button class="pill-button small-pill" onclick="openLesson(' + lessonNumber + ')">' +
      'Lesson ' + (lessonNumber + 1) + ': ' + lessons[lessonNumber].title + '</button>' +
  '</div>';
}

function showResults(score, needsPercent, wantsPercent, savingsPercent, points1, points2, points3,
  overspent, biggestWant, overBy) {

  // red bar if you went over the goal, yellow if you saved less than 20%
  let needsBar = "bar-fill";
  if (needsPercent > 50) {
    needsBar = "bar-fill bar-red";
  }
  let wantsBar = "bar-fill";
  if (wantsPercent > 30) {
    wantsBar = "bar-fill bar-red";
  }
  let savingsBar = "bar-fill";
  if (savingsPercent < 20) {
    savingsBar = "bar-fill bar-yellow";
  }

  let html =
    '<p class="card-label">Your score</p>' +
    '<p class="huge-text">' + score + ' / 100</p>' +
    '<p class="big-text">' + scoreName(score) + '</p>' +
    resultRow("Needs", needsPercent, "50% or less", points1, 40, needsBar) +
    resultRow("Wants", wantsPercent, "30% or less", points2, 30, wantsBar) +
    resultRow("Savings", savingsPercent, "20% or more", points3, 30, savingsBar);

  // advice for each weak spot
  let advice = "";
  if (overspent) {
    advice = advice + adviceHTML("You spent " + formatMoney(overBy) + " more than you made. " +
      "That money usually ends up on a credit card. Start with a plan for every dollar.", 3);
  }
  if (needsPercent > 50) {
    advice = advice + adviceHTML("Your needs are more than half your income. " +
      "Rent is usually the biggest one, so it's worth checking.", 16);
  }
  if (wantsPercent > 30) {
    if (biggestWant === "Eating Out") {
      advice = advice + adviceHTML("Eating Out was your biggest want. Cooking at home more is an easy place to save.", 4);
    } else {
      advice = advice + adviceHTML("Your wants are over 30%. " + biggestWant + " was your biggest one.", 1);
    }
  }
  if (savingsPercent < 20 && !overspent) {
    advice = advice + adviceHTML("Try to save 20% of what you make. Saving first, before you spend, makes it easier.", 6);
  }
  if (advice === "") {
    advice = adviceHTML("You hit every goal! The next step is making your savings grow.", 19);
  }

  html = html +
    '<p class="section-title test-row">What to work on</p>' + advice +
    '<div class="button-row">' +
      '<a class="pill-button green-pill" href="past-tests.html">See past tests</a>' +
    '</div>';

  let box = document.getElementById("test-results");
  box.innerHTML = html;
  box.hidden = false;
  box.scrollIntoView();
}


showBoxes();
