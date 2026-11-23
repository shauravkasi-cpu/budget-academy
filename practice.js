// practice.js
// Runs on the Practice Month page (practice.html).
// A pretend month with a $2,000 paycheck:
//   1. you split it into needs, wants, and savings
//   2. four weeks happen, each with one random event and a choice
//   3. your bills get paid, and you get a score out of 100
// No real money is used. All money here is in cents, like the rest of the app.


// ---------- 1. The month's money ----------

let paycheck = 200000;   // $2,000
let billsTotal = 110000; // $1,100 of bills (rent, groceries, bus pass, phone, utilities)

let needs = 0;     // money for bills
let wants = 0;     // fun money
let savings = 0;   // savings
let debt = 0;      // what you owe on your credit card
let billsShort = 0;   // how much you were short when the bills came

let week = 0;          // which week you're on (0 = the first week)
let monthEvents = [];  // the 4 random events for this month


// ---------- 2. The events ----------
// Each choice has:
//   text   - what the button says
//   from   - where the money comes from: "needs", "wants", "savings", "credit", or "none"
//   amount - how much it costs (a NEGATIVE amount means you GET money)
//   result - what happens because of your choice

let events = [
  {
    title: "Car trouble",
    text: "Your car needs a $250 repair, and you need it to get to work.",
    choices: [
      { text: "Pay with savings", from: "savings", amount: 25000, result: "You paid with savings. No debt, and you still get to work!" },
      { text: "Put it on your credit card", from: "credit", amount: 25000, result: "Now you owe $250 on your credit card, and interest can make it cost even more." },
      { text: "Skip the repair", from: "needs", amount: 15000, result: "You couldn't get to work for two shifts and lost $150 of pay." }
    ]
  },
  {
    title: "Birthday party",
    text: "Your friend invites you to a birthday dinner. Your share would be about $60.",
    choices: [
      { text: "Go to the dinner", from: "wants", amount: 6000, result: "You had a great time, and it came out of your fun money." },
      { text: "Suggest a picnic instead", from: "wants", amount: 1500, result: "Everyone loved the picnic, and you only spent $15!" },
      { text: "Skip it", from: "none", amount: 0, result: "You stayed home. Saving money is good, but it's okay to have fun sometimes too." }
    ]
  },
  {
    title: "Big sale",
    text: "Shoes you've been wanting are on sale for $90. Your old shoes still work fine.",
    choices: [
      { text: "Buy them with fun money", from: "wants", amount: 9000, result: "New shoes! That was a big chunk of your fun money, though." },
      { text: "Put them on your credit card", from: "credit", amount: 9000, result: "You got the shoes, but now you owe $90 for something you didn't need." },
      { text: "Wait 24 hours and skip it", from: "none", amount: 0, result: "The next day, you didn't even want them anymore. Nice!" }
    ]
  },
  {
    title: "Cracked phone",
    text: "You dropped your phone, and the screen cracked. The repair costs $120.",
    choices: [
      { text: "Pay with savings", from: "savings", amount: 12000, result: "Fixed, with no debt. This is what savings is for." },
      { text: "Pay with fun money", from: "wants", amount: 12000, result: "Fixed, but there's less fun money left for the rest of the month." },
      { text: "Put it on your credit card", from: "credit", amount: 12000, result: "Fixed, but now you owe $120 on your credit card." }
    ]
  },
  {
    title: "Extra shift",
    text: "Your boss asks you to work an extra shift. You earn an extra $150!",
    choices: [
      { text: "Put it in savings", from: "savings", amount: -15000, result: "Your savings grew by $150. Future you says thanks!" },
      { text: "Add it to fun money", from: "wants", amount: -15000, result: "You have $150 more to spend on fun this month." }
    ]
  },
  {
    title: "A friend needs money",
    text: "A friend asks to borrow $100 and says they'll pay you back \"soon.\"",
    choices: [
      { text: "Lend it from fun money", from: "wants", amount: 10000, result: "You helped your friend, using money you could afford to lose." },
      { text: "Kindly say no", from: "none", amount: 0, result: "You said no kindly. It's okay to protect your budget." },
      { text: "Lend it from bill money", from: "needs", amount: 10000, result: "You lent money that was meant for your bills. That could be a problem later." }
    ]
  },
  {
    title: "Concert tickets",
    text: "Your favorite band is in town! Tickets cost $80.",
    choices: [
      { text: "Buy with fun money", from: "wants", amount: 8000, result: "Best night ever, and you paid with money set aside for fun." },
      { text: "Put them on your credit card", from: "credit", amount: 8000, result: "Great show, but you'll be paying for it later, maybe with interest." },
      { text: "Skip this one", from: "none", amount: 0, result: "You'll catch them next time. Your budget is safe." }
    ]
  },
  {
    title: "Doctor visit",
    text: "You feel sick and need to see a doctor. Your copay is $40.",
    choices: [
      { text: "Pay with savings", from: "savings", amount: 4000, result: "You got better, and you didn't go into debt." },
      { text: "Put it on your credit card", from: "credit", amount: 4000, result: "You got better, but now you owe $40." }
    ]
  },
  {
    title: "Free trial ends",
    text: "A streaming free trial is ending. After today, it costs $15 a month.",
    choices: [
      { text: "Cancel it", from: "none", amount: 0, result: "Canceled before you paid a cent. Smart!" },
      { text: "Keep it", from: "wants", amount: 1500, result: "You kept it. Make sure it's worth $15 every month." }
    ]
  },
  {
    title: "Lucky find",
    text: "You find $20 in an old jacket pocket!",
    choices: [
      { text: "Put it in savings", from: "savings", amount: -2000, result: "Every little bit helps. Your savings grew by $20." },
      { text: "Add it to fun money", from: "wants", amount: -2000, result: "Free money for something fun!" }
    ]
  }
];


// picks 4 different random events for the month
function pickEvents() {
  let left = events.slice();   // a copy, so we don't change the real list
  monthEvents = [];

  for (let i = 0; i < 4; i++) {
    let spot = Math.floor(Math.random() * left.length);
    monthEvents.push(left[spot]);
    left.splice(spot, 1);   // take it out so it can't come up twice
  }
}


// ---------- 3. Moving money ----------

// takes money out of one bucket
// if that bucket runs out, the rest goes on your credit card
function takeMoney(from, amount) {
  if (from === "credit") {
    debt = debt + amount;
  } else if (from === "needs") {
    needs = needs - amount;
    if (needs < 0) {
      debt = debt - needs;   // needs is negative here, so this ADDS the missing amount to debt
      needs = 0;
    }
  } else if (from === "wants") {
    wants = wants - amount;
    if (wants < 0) {
      debt = debt - wants;
      wants = 0;
    }
  } else if (from === "savings") {
    savings = savings - amount;
    if (savings < 0) {
      debt = debt - savings;
      savings = 0;
    }
  }
  // "none" doesn't move any money
}


// the 4 boxes that show your money
function moneyBoxesHTML() {
  return '<div class="calc-results">' +
      '<div class="calc-box"><p class="split-number">' + formatMoney(needs) + '</p><p class="split-label">Needs (bill money)</p></div>' +
      '<div class="calc-box"><p class="split-number">' + formatMoney(wants) + '</p><p class="split-label">Wants (fun money)</p></div>' +
      '<div class="calc-box"><p class="split-number">' + formatMoney(savings) + '</p><p class="split-label">Savings</p></div>' +
    '</div>' +
    '<p class="practice-debt">Credit card debt: <b>' + formatMoney(debt) + '</b></p>';
}


// ---------- 4. The start screen: split your paycheck ----------

function showStart() {
  document.getElementById("practice-count").textContent = "Start of the month";
  document.getElementById("practice-bar").style.width = "0%";

  document.getElementById("stage").innerHTML =
    '<div class="step-box">' +
      '<p class="step-tag">Payday</p>' +
      '<p class="step-heading">You got paid $2,000!</p>' +
      '<p class="lesson-text">Split it into needs, wants, and savings. Your bills this month cost $1,100:</p>' +
      '<p class="point">Rent $700  ·  Groceries $250  ·  Bus pass $80  ·  Phone $40  ·  Utilities $30</p>' +
      '<p class="lesson-text practice-hint">Four weeks are coming, and each one has a surprise. If a bucket runs out, the rest goes on your credit card.</p>' +
      '<div class="calc-inputs">' +
        '<div class="calc-input"><label for="split-needs">Needs ($)</label><input type="text" id="split-needs" placeholder="1100"></div>' +
        '<div class="calc-input"><label for="split-wants">Wants ($)</label><input type="text" id="split-wants" placeholder="500"></div>' +
        '<div class="calc-input"><label for="split-savings">Savings ($)</label><input type="text" id="split-savings" placeholder="400"></div>' +
      '</div>' +
      '<p class="feedback feedback-wrong" id="split-error"></p>' +
      '<button class="resume-button" onclick="startMonth()">Start the month</button>' +
    '</div>';
}


// checks your split, then starts week 1
function startMonth() {
  let n = toCents(document.getElementById("split-needs").value);
  let w = toCents(document.getElementById("split-wants").value);
  let s = toCents(document.getElementById("split-savings").value);
  let error = document.getElementById("split-error");

  if (n < 0 || w < 0 || s < 0) {
    error.textContent = "Type an amount in all 3 boxes, like 1100 (no letters, no minus sign). Use 0 for none.";
    return;
  }
  if (n + w + s !== paycheck) {
    error.textContent = "Your 3 amounts add up to " + formatMoney(n + w + s) + ". They need to add up to exactly $2,000.";
    return;
  }

  needs = n;
  wants = w;
  savings = s;
  debt = 0;
  billsShort = 0;
  week = 0;
  pickEvents();
  showWeek();
}


// ---------- 5. Each week ----------

function showWeek() {
  let e = monthEvents[week];

  document.getElementById("practice-count").textContent = "Week " + (week + 1) + " of 4";
  document.getElementById("practice-bar").style.width = (week / 4) * 100 + "%";

  // a button for each choice, like pickChoice(0)
  let buttons = "";
  for (let i = 0; i < e.choices.length; i++) {
    buttons = buttons + '<button class="choice" id="choice-' + i + '" onclick="pickChoice(' + i + ')">' +
      e.choices[i].text + '</button>';
  }

  document.getElementById("stage").innerHTML =
    '<div class="step-box">' +
      '<div id="money-boxes">' + moneyBoxesHTML() + '</div>' +
      '<p class="step-tag">Week ' + (week + 1) + '</p>' +
      '<p class="step-heading">' + e.title + '</p>' +
      '<p class="lesson-text practice-hint">' + e.text + '</p>' +
      buttons +
      '<p class="feedback" id="feedback"></p>' +
      '<div id="next-area"></div>' +
    '</div>';
}


// you clicked choice number c
function pickChoice(c) {
  let choice = monthEvents[week].choices[c];
  takeMoney(choice.from, choice.amount);

  // lock the buttons and highlight the one you picked
  for (let i = 0; i < monthEvents[week].choices.length; i++) {
    document.getElementById("choice-" + i).disabled = true;
  }
  document.getElementById("choice-" + c).classList.add("choice-picked");

  document.getElementById("feedback").textContent = choice.result;

  // the next button
  let nextText = "Next week →";
  if (week === 3) {
    nextText = "Pay bills and see your score →";
  }
  document.getElementById("next-area").innerHTML =
    '<button class="resume-button" onclick="nextWeek()">' + nextText + '</button>';

  // update the money boxes at the top, now that money moved
  document.getElementById("money-boxes").innerHTML = moneyBoxesHTML();
}


function nextWeek() {
  week = week + 1;
  if (week === 4) {
    showEnd();
  } else {
    showWeek();
  }
  window.scrollTo(0, 0);
}


// ---------- 6. The end of the month ----------

function showEnd() {
  document.getElementById("practice-count").textContent = "End of the month";
  document.getElementById("practice-bar").style.width = "100%";

  // pay the $1,100 of bills from your needs money
  if (needs < billsTotal) {
    billsShort = billsTotal - needs;
    debt = debt + billsShort;   // the missing money goes on the credit card
    needs = 0;
  } else {
    needs = needs - billsTotal;
  }

  // any bill money left over moves to savings
  savings = savings + needs;
  needs = 0;

  let score = getScore();
  let review = reviewLesson();

  document.getElementById("stage").innerHTML =
    '<div class="step-box finish">' +
      '<p class="step-tag">Month complete</p>' +
      '<p class="huge-text">' + score + ' / 100</p>' +
      '<p class="lesson-description">' + scoreMessage(score) + '</p>' +
      '<div class="calc-results">' +
        '<div class="calc-box"><p class="split-number">' + formatMoney(debt) + '</p><p class="split-label">Credit card debt</p></div>' +
        '<div class="calc-box"><p class="split-number">' + billsText() + '</p><p class="split-label">Bills</p></div>' +
        '<div class="calc-box"><p class="split-number">' + formatMoney(savings) + '</p><p class="split-label">Saved by the end</p></div>' +
      '</div>' +
      '<p class="point practice-tip">' + review.tip + '</p>' +
      '<div class="button-row finish-buttons">' +
        '<button class="pill-button green-pill" onclick="showStart()">Play again</button>' +
        '<button class="pill-button" onclick="openLesson(' + review.lessonIndex + ')">Review Lesson ' + (review.lessonIndex + 1) + ': ' + lessons[review.lessonIndex].title + '</button>' +
      '</div>' +
    '</div>';
}


// the score out of 100:
//   up to 40 for staying out of debt
//   30 for paying your bills without borrowing
//   up to 30 for how much you saved
function getScore() {
  let score = 0;

  if (debt === 0) {
    score = score + 40;
  } else if (debt <= 20000) {   // $200 or less
    score = score + 20;
  }

  if (billsShort === 0) {
    score = score + 30;
  }

  if (savings >= 40000) {         // $400 or more
    score = score + 30;
  } else if (savings >= 20000) {  // $200 or more
    score = score + 20;
  } else if (savings > 0) {
    score = score + 10;
  }

  return score;
}


function scoreMessage(score) {
  if (score >= 90) {
    return "Amazing! You handled every surprise like a pro.";
  }
  if (score >= 70) {
    return "Nice work! You made it through the month in good shape.";
  }
  if (score >= 40) {
    return "Not bad! A few choices cost you this month.";
  }
  return "That was a tough month. Try again with a different plan!";
}


function billsText() {
  if (billsShort === 0) {
    return "All paid";
  }
  return formatMoney(billsShort) + " short";
}


// picks a tip and the lesson to review, based on what went wrong
// (lessonIndex starts at 0, so 3 means Lesson 4)
function reviewLesson() {
  if (billsShort > 0) {
    return { lessonIndex: 3, tip: "You didn't have enough for your bills, so you had to borrow. Always plan for your needs first. Your bills cost $1,100, so at least that much should go to needs." };
  }
  if (debt > 0) {
    return { lessonIndex: 7, tip: "Some surprises went on your credit card. An emergency fund in savings lets you pay for surprises without going into debt." };
  }
  if (savings < 40000) {
    return { lessonIndex: 6, tip: "You stayed out of debt, but you didn't save much. Try paying yourself first: put money into savings before you spend." };
  }
  return { lessonIndex: 20, tip: "You stayed out of debt, paid every bill, and saved! Next, see how your savings can grow over time." };
}


// ---------- 7. Fill in the page ----------

showStart();
