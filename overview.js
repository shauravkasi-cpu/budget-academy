// overview.js
// Runs on the home page (overview.html).
// The demo and a real account use the SAME code, and both start empty.


// userName, mode, lessonsDone, and xp come from common.js


// ---------- 1. Pick the data ----------

// everyone starts with no cards and no bills
// (these lists will fill up once the Cards and Bills pages are built)
let cards = [];
let bills = [];

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

  // the yellow banner only shows in the demo
  if (mode === "demo") {
    document.getElementById("demo-banner").hidden = false;
  }
}


// the 3 small boxes in the top right
function showStatBoxes() {
  document.getElementById("box-lessons").textContent = lessonsDone;
  document.getElementById("box-xp").textContent = xp;
  document.getElementById("box-bills").textContent = countBillsDue();
}


// how many bills are due in the next 7 days
function countBillsDue() {
  let count = 0;
  for (let i = 0; i < bills.length; i++) {
    if (bills[i].dueInDays <= 7) {
      count = count + 1;
    }
  }
  return count;
}


// the next lesson, with a check mark line for each part of it
// lessons come from lessons-data.js
function showNextLesson() {
  let title = document.getElementById("next-lesson");
  let points = document.getElementById("next-lesson-points");

  // if every lesson is done
  if (lessonsDone === lessons.length) {
    title.textContent = "You finished every lesson!";
    points.innerHTML = "";
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

  // if the lesson isn't written yet, just show its description
  if (next.steps === undefined) {
    points.innerHTML = '<p class="check-item">' + next.description + '</p>';
    return;
  }

  // show the headings of the first 3 "text" steps with check marks
  points.innerHTML = "";
  let shown = 0;
  for (let i = 0; i < next.steps.length; i++) {
    if (next.steps[i].type === "text" && shown < 3) {
      points.innerHTML = points.innerHTML +
        '<p class="check-item"><span class="check">&#10003;</span>' + next.steps[i].heading + '</p>';
      shown = shown + 1;
    }
  }
}


// the list of upcoming bills
function showBillList() {
  let list = document.getElementById("bill-list");

  if (bills.length === 0) {
    list.innerHTML = '<div class="bill-row"><span class="bill-name grey">No bills yet</span></div>';
    return;
  }

  list.innerHTML = "";
  for (let i = 0; i < bills.length; i++) {
    let bill = bills[i];

    // bills due in 3 days or less get a yellow label
    let chipClass = "chip";
    if (bill.dueInDays <= 3) {
      chipClass = "chip chip-soon";
    }

    list.innerHTML = list.innerHTML +
      '<div class="bill-row">' +
        '<span class="bill-name">' + bill.name + '</span>' +
        '<span>' + formatMoney(bill.amount) + '</span>' +
        '<span class="' + chipClass + '">' + dueText(bill.dueInDays) + '</span>' +
      '</div>';
  }
}


// turns a number of days into words
// example: 2 -> "Due in 2 days"
function dueText(days) {
  if (days === 0) {
    return "Due today";
  }
  if (days === 1) {
    return "Due tomorrow";
  }
  return "Due in " + days + " days";
}


// total balance, and how much is due this week
function showMoney() {
  // add up all the card balances
  let total = 0;
  for (let i = 0; i < cards.length; i++) {
    total = total + cards[i].balance;
  }

  document.getElementById("balance").textContent = formatMoney(total);

  if (cards.length === 0) {
    document.getElementById("balance-text").textContent = "Add a card to see your balance";
  } else {
    document.getElementById("balance-text").textContent = "Total balance";
  }

  // add up the bills due in the next 7 days
  let billsTotal = 0;
  for (let i = 0; i < bills.length; i++) {
    if (bills[i].dueInDays <= 7) {
      billsTotal = billsTotal + bills[i].amount;
    }
  }

  document.getElementById("bills-total").textContent = formatMoney(billsTotal);
}


// skill level, and how far you are through your current unit
// (getSkillLevel and lessonsThroughUnit are in common.js)
function showSkillLevel() {
  let level = getSkillLevel();
  document.getElementById("level-name").textContent = level;
  document.getElementById("level-name-big").textContent = level;

  // if every lesson is done
  if (lessonsDone === lessons.length) {
    document.getElementById("xp-bar").style.width = "100%";
    document.getElementById("xp-text").textContent = "You finished every unit! " + xp + " XP";
    return;
  }

  // the unit you're working on now
  let unitNumber = lessons[lessonsDone].unit;
  let unit = units[unitNumber - 1];

  // how many lessons are in this unit, and how many you've done in it
  let lessonsInUnit = lessonsThroughUnit(unitNumber) - lessonsThroughUnit(unitNumber - 1);
  let doneInUnit = lessonsDone - lessonsThroughUnit(unitNumber - 1);

  let percent = (doneInUnit / lessonsInUnit) * 100;
  document.getElementById("xp-bar").style.width = percent + "%";
  document.getElementById("xp-text").textContent =
    doneInUnit + " of " + lessonsInUnit + " lessons done in Unit " + unitNumber + ": " + unit.title +
    ". Finish it to become a " + unit.level + "!";
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
showSkillLevel();
showTip();
