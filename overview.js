// overview.js
// Runs on the home page (overview.html).
// The money numbers come from the Cards, Bills, Budget, and Goals pages (money-data.js).


// userName, mode, lessonsDone, and xp come from common.js


// ---------- 1. Pick the data ----------

// your cards, and the bills you still have to pay (soonest first)
let cards = loadList("cards");
let bills = unpaidBillsSorted();

// tips for "Tip of the day"
let tips = [
  "Pay yourself first: put money in savings before you spend.",
  "Write down every purchase for one week. You'll be surprised where your money goes.",
  "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
  "Wait 24 hours before buying something you want but don't need.",
  "Set up reminders so you never pay a late fee on a bill.",
  "A small emergency fund, even $500, can keep a surprise from becoming debt.",
  "Pay off your credit card in full each month to avoid paying interest."
];


// ---------- 2. Functions that fill in the page ----------

// "Good afternoon, Alex" at the top
function showGreeting() {
  // getHours() gives the hour from 0 to 23
  let hour = new Date().getHours();
  let greeting = "Good evening";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }

  document.getElementById("greeting-time").textContent = greeting;
  document.getElementById("greeting-name").textContent = userName;

  // the yellow banner only shows in the demo and in test mode
  if (mode === "demo") {
    document.getElementById("demo-banner").hidden = false;
  }
  if (mode === "test") {
    let banner = document.getElementById("demo-banner");
    banner.innerHTML = 'You\'re in test mode, so nothing is saved. <a href="signup.html">Sign up</a> to keep your progress.';
    banner.hidden = false;
  }
}


// the 3 small boxes in the top right
function showStatBoxes() {
  document.getElementById("box-lessons").textContent = lessonsDone;
  document.getElementById("box-xp").textContent = xp;
  document.getElementById("box-bills").textContent = countBillsDue();
}


// how many bills are due in the next 7 days (overdue ones count too)
function countBillsDue() {
  let count = 0;
  for (let i = 0; i < bills.length; i++) {
    if (daysUntil(bills[i].dueDate) <= 7) {
      count = count + 1;
    }
  }
  return count;
}


// the name of the next lesson
// lessons come from lessons-data.js
function showNextLesson() {
  let title = document.getElementById("next-lesson");

  // if every lesson is done
  if (lessonsDone === lessons.length) {
    title.textContent = "You finished every lesson!";
    document.getElementById("next-lesson-button").hidden = true;
    document.getElementById("resume-button").hidden = true;
    return;
  }

  // lessonsDone is also the spot of the next lesson in the list
  // (lists start at 0, so after 2 lessons, the next one is lessons[2] = Lesson 3)
  let next = lessons[lessonsDone];
  title.textContent = "Lesson " + (lessonsDone + 1) + ": " + next.title;

  // a brand new account hasn't started yet, so the buttons say Start
  if (lessonsDone === 0) {
    document.getElementById("resume-button").textContent = "Start first lesson";
    document.getElementById("next-lesson-button").textContent = "Start";
  }
}


// the next 5 bills to pay
function showBillList() {
  let list = document.getElementById("bill-list");

  if (bills.length === 0) {
    list.innerHTML = '<div class="bill-row"><span class="bill-name grey">No bills yet. <a href="bills.html">Add one</a></span></div>';
    return;
  }

  list.innerHTML = "";
  for (let i = 0; i < bills.length && i < 5; i++) {
    let bill = bills[i];
    let days = daysUntil(bill.dueDate);   // money-data.js

    // yellow if due in 3 days or less, red if overdue
    let chipClass = "chip";
    if (days < 0) {
      chipClass = "chip chip-overdue";
    } else if (days <= 3) {
      chipClass = "chip chip-soon";
    }

    list.innerHTML = list.innerHTML +
      '<div class="bill-row">' +
        '<span class="bill-name">' + bill.name + '</span>' +
        '<span>' + formatMoney(bill.amount) + '</span>' +
        '<span class="' + chipClass + '">' + dueText(days) + '</span>' +
      '</div>';
  }
}


// total balance, and how much is due this week
function showMoney() {
  // what you have, minus what you owe on credit cards (money-data.js)
  document.getElementById("balance").textContent = formatMoney(totalMoney(cards));

  if (cards.length === 0) {
    document.getElementById("balance-text").textContent = "Add a card to see your balance";
  } else {
    document.getElementById("balance-text").textContent = "Total balance";
  }

  // add up the bills due in the next 7 days
  let billsTotal = 0;
  for (let i = 0; i < bills.length; i++) {
    if (daysUntil(bills[i].dueDate) <= 7) {
      billsTotal = billsTotal + bills[i].amount;
    }
  }

  document.getElementById("bills-total").textContent = formatMoney(billsTotal);
}


// the goal you're closest to finishing
function showTopGoal() {
  let goals = loadList("goals");
  let box = document.getElementById("top-goal");

  if (goals.length === 0) {
    box.innerHTML = '<p class="card-text">No goals yet. <a href="goals.html">Add your first goal</a></p>';
    return;
  }

  // find the goal with the highest percent saved (that isn't finished yet)
  let top = goals[0];
  for (let i = 0; i < goals.length; i++) {
    let percent = goals[i].saved / goals[i].target;
    let topPercent = top.saved / top.target;
    if (percent < 1 && (percent > topPercent || topPercent >= 1)) {
      top = goals[i];
    }
  }

  let percent = Math.round((top.saved / top.target) * 100);
  if (percent > 100) {
    percent = 100;
  }

  box.innerHTML =
    '<p class="big-text">' + top.name + '</p>' +
    '<div class="bar"><div class="bar-fill" style="width: ' + percent + '%"></div></div>' +
    '<p class="small-text">' + formatMoney(top.saved) + ' of ' + formatMoney(top.target) + ' saved  \u00B7  ' + percent + '%</p>';
}


// this month's spending compared to your income
function showMonthBudget() {
  let budget = loadBudget();          // money-data.js
  let spent = spentThisMonth();       // money-data.js
  let box = document.getElementById("month-budget");

  if (budget.income === 0) {
    box.innerHTML = '<p class="card-text">No budget yet. <a href="budget.html">Set your monthly income</a></p>';
    return;
  }

  let percent = Math.round((spent / budget.income) * 100);
  let barWidth = percent;
  if (barWidth > 100) {
    barWidth = 100;
  }

  // yellow when you've spent 80% of your income, red when you go over
  let barClass = "bar-fill";
  if (percent > 100) {
    barClass = "bar-fill bar-red";
  } else if (percent >= 80) {
    barClass = "bar-fill bar-yellow";
  }

  box.innerHTML =
    '<p class="big-text">' + formatMoney(spent) + ' spent</p>' +
    '<div class="bar"><div class="' + barClass + '" style="width: ' + barWidth + '%"></div></div>' +
    '<p class="small-text">' + percent + '% of your ' + formatMoney(budget.income) + ' income  \u00B7  ' +
      formatMoney(budget.income - spent) + ' left</p>';
}


// skill level, and what you need to do to reach the next one
// (getSkillLevel and lessonsThroughUnit are in common.js)
// you level up by PASSING unit exams, and the final exam makes you a Money Master
function showSkillLevel() {
  let level = getSkillLevel();
  document.getElementById("level-name").textContent = level;
  document.getElementById("level-name-big").textContent = level;

  let bar = document.getElementById("xp-bar");
  let text = document.getElementById("xp-text");

  // passed everything
  if (finalPassed) {
    bar.style.width = "100%";
    text.textContent = "Final exam passed";
    return;
  }

  // passed every unit exam, only the final is left
  if (unitsPassed === units.length) {
    bar.style.width = "100%";
    text.textContent = "Final exam is ready";
    return;
  }

  // the next unit to pass
  let unitNumber = unitsPassed + 1;

  // how many lessons are in this unit, and how many you've done in it
  let lessonsInUnit = lessonsThroughUnit(unitNumber) - lessonsThroughUnit(unitNumber - 1);
  let doneInUnit = lessonsDone - lessonsThroughUnit(unitNumber - 1);
  if (doneInUnit > lessonsInUnit) {
    doneInUnit = lessonsInUnit;   // you may have done lessons in later units already
  }

  let percent = (doneInUnit / lessonsInUnit) * 100;
  bar.style.width = percent + "%";

  if (doneInUnit < lessonsInUnit) {
    text.textContent = doneInUnit + " of " + lessonsInUnit + " lessons done in Unit " + unitNumber;
  } else {
    text.textContent = "Unit " + unitNumber + " exam is ready";
  }
}


// picks a tip based on the day of the month, so it changes every day
function showTip() {
  let day = new Date().getDate();
  let tip = tips[day % tips.length];
  document.getElementById("tip").textContent = tip;
}


// ---------- 3. Fill in the page ----------

showGreeting();
showStatBoxes();
showNextLesson();
showBillList();
showMoney();
showTopGoal();
showMonthBudget();
showSkillLevel();
showTip();
