// overview.js
// Runs on the home page (overview.html).
// The demo and a real account use the SAME code.
// The only difference: the demo starts with sample data, a new account starts empty.


// userName and mode come from common.js


// ---------- 1. Pick the data ----------

// a new account starts with nothing
let cards = [];
let bills = [];
let xp = 0;
let lessonsDone = 0;

// the demo uses the sample data from demo-data.js
if (mode === "demo") {
  cards = demoCards;
  bills = demoBills;
  xp = demoXP;
  lessonsDone = demoLessonsDone;
}

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

// "Welcome, Alex!" at the top
function showWelcome() {
  if (mode === "demo") {
    document.getElementById("welcome").textContent = "Welcome, " + userName + "!";
    document.getElementById("demo-banner").hidden = false;
  } else {
    document.getElementById("welcome").textContent = "Welcome back, " + userName + "!";
  }
}


// total balance = all card balances added up
function showBalance() {
  let total = 0;
  for (let i = 0; i < cards.length; i++) {
    total = total + cards[i].balance;
  }

  document.getElementById("balance").textContent = formatMoney(total);

  if (cards.length === 0) {
    document.getElementById("balance-text").textContent = "Add a card to see your balance";
  } else {
    document.getElementById("balance-text").textContent = "across " + cards.length + " accounts";
  }
}


// how many bills are due in the next 7 days, and how much they cost
function showBillsDue() {
  let count = 0;
  let total = 0;

  for (let i = 0; i < bills.length; i++) {
    if (bills[i].dueInDays <= 7) {
      count = count + 1;
      total = total + bills[i].amount;
    }
  }

  document.getElementById("bills-due").textContent = count;

  if (count === 0) {
    document.getElementById("bills-due-text").textContent = "Nothing due this week";
  } else {
    document.getElementById("bills-due-text").textContent = formatMoney(total) + " total";
  }
}


// skill level and XP bar
// Beginner: 0-99 XP, Budget Builder: 100-299 XP, Money Master: 300+ XP
function showSkillLevel() {
  let level = "Beginner";
  let nextLevelXP = 100;

  if (xp >= 300) {
    level = "Money Master";
    nextLevelXP = 300;
  } else if (xp >= 100) {
    level = "Budget Builder";
    nextLevelXP = 300;
  }

  // how full the bar is, as a percent
  let percent = (xp / nextLevelXP) * 100;
  if (percent > 100) {
    percent = 100;
  }

  document.getElementById("level-name").textContent = level;
  document.getElementById("xp-bar").style.width = percent + "%";
  document.getElementById("xp-text").textContent = xp + " / " + nextLevelXP + " XP";
}


// the next lesson (the first one that isn't finished)
// lessons come from lessons-data.js
function showNextLesson() {
  if (lessonsDone === lessons.length) {
    document.getElementById("next-lesson").textContent = "You finished every lesson!";
    return;
  }

  // lessonsDone is also the spot of the next lesson in the list
  // (lists start at 0, so after 2 lessons, the next one is lessons[2] = Lesson 3)
  let next = lessons[lessonsDone];
  document.getElementById("next-lesson").textContent = "Lesson " + (lessonsDone + 1) + ": " + next.title;
}


// picks a tip based on the day of the month, so it changes every day
function showTip() {
  let day = new Date().getDate();
  let tip = tips[day % tips.length];
  document.getElementById("tip").textContent = tip;
}


// ---------- 3. Fill in the page ----------

showWelcome();
showBalance();
showBillsDue();
showSkillLevel();
showNextLesson();
showTip();
