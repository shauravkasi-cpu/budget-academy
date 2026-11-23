// money-data.js
// Everything the My Money pages share: cards, bills, budget, purchases, and goals.
// Load it AFTER common.js and money.js.
//
// All money is in CENTS (see money.js). Example: $12.34 is saved as 1234
// Every list is saved in localStorage as text using JSON:
//   JSON.stringify(list) turns a list into text   (like json.dumps in Python)
//   JSON.parse(text)     turns the text back into a list   (like json.loads)


// ---------- 1. Saving and loading lists ----------

// gets a saved list, like loadList("cards"). If nothing is saved yet, it's an empty list.
function loadList(name) {
  let text = localStorage.getItem(name);
  if (text === null) {
    return [];
  }
  return JSON.parse(text);
}

// saves a list, like saveList("cards", cards)
function saveList(name, list) {
  localStorage.setItem(name, JSON.stringify(list));
}

// finds the item with this id in a list (or null if it isn't there)
function findById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
}

// makes a new list without the item that has this id
function removeById(list, id) {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].id !== id) {
      newList.push(list[i]);
    }
  }
  return newList;
}

// a new id number for a new item (the time right now, so it's always different)
function newId() {
  return Date.now();
}


// the friendly message a page shows when there's nothing in a list yet,
// with a button to add the first item
//   onclick is what the button does, like "showForm()"
function emptyStateHTML(message, buttonText, onclick) {
  return '<div class="card empty-state">' +
      '<p class="card-text">' + message + '</p>' +
      '<button class="pill-button green-pill" onclick="' + onclick + '">' + buttonText + '</button>' +
    '</div>';
}

// the error message for a money box that was typed wrong
let moneyError = "Type a money amount like 250 or 99.50 (no letters, no minus sign).";


// ---------- 2. Spending categories ----------
// kind is "need" or "want"
// percent is how much of your income the 50/30/20 rule gives it
//   (the needs add up to 50%, the wants add up to 30%, and the other 20% is savings)

const categories = [
  { name: "Housing", kind: "need", percent: 25 },
  { name: "Groceries", kind: "need", percent: 10 },
  { name: "Transportation", kind: "need", percent: 7 },
  { name: "Utilities", kind: "need", percent: 5 },
  { name: "Health", kind: "need", percent: 3 },
  { name: "Eating Out", kind: "want", percent: 10 },
  { name: "Fun", kind: "want", percent: 10 },
  { name: "Shopping", kind: "want", percent: 7 },
  { name: "Other", kind: "want", percent: 3 }
];

// is this category a "need" or a "want"?
function categoryKind(name) {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].name === name) {
      return categories[i].kind;
    }
  }
  return "want";
}

// the <option> list for a category dropdown
function categoryOptionsHTML(selected) {
  let html = "";
  for (let i = 0; i < categories.length; i++) {
    let name = categories[i].name;
    if (name === selected) {
      html = html + '<option selected>' + name + '</option>';
    } else {
      html = html + '<option>' + name + '</option>';
    }
  }
  return html;
}


// ---------- 3. Cards (money accounts) ----------
// a card looks like { id, nickname, type, balance, limit }
//   type is "checking", "savings", "credit", or "cash"
//   for a credit card, balance is how much you OWE, and limit is the most you can borrow

// the name people see for each type
function cardTypeName(type) {
  if (type === "checking") {
    return "Checking";
  }
  if (type === "savings") {
    return "Savings";
  }
  if (type === "credit") {
    return "Credit card";
  }
  return "Cash";
}

// the <option> list for a "which card?" dropdown
function cardOptionsHTML(selectedId) {
  let cards = loadList("cards");
  let html = "";
  for (let i = 0; i < cards.length; i++) {
    let selected = "";
    if (cards[i].id === selectedId) {
      selected = " selected";
    }
    html = html + '<option value="' + cards[i].id + '"' + selected + '>' +
      cards[i].nickname + ' (' + cardTypeName(cards[i].type) + ')</option>';
  }
  return html;
}

// pays for something with a card
//   a normal card loses the money, a credit card OWES more
//   (a negative amount does the opposite, like a refund)
function spendFromCard(cardId, cents) {
  let cards = loadList("cards");
  let card = findById(cards, cardId);
  if (card === null) {
    return;
  }

  if (card.type === "credit") {
    card.balance = card.balance + cents;
  } else {
    card.balance = card.balance - cents;
  }
  saveList("cards", cards);
}

// your total money: everything you have, minus what you owe on credit cards
function totalMoney(cards) {
  let total = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].type === "credit") {
      total = total - cards[i].balance;
    } else {
      total = total + cards[i].balance;
    }
  }
  return total;
}


// ---------- 4. Dates ----------
// dates are saved as text like "2026-11-23" (year-month-day),
// which is what <input type="date"> gives us

// today as text, like "2026-11-23"
function todayText() {
  return dateToText(new Date());
}

// turns a Date into text like "2026-11-23"
function dateToText(date) {
  let month = date.getMonth() + 1;   // getMonth() starts at 0 for January
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return date.getFullYear() + "-" + month + "-" + day;
}

// turns text like "2026-11-23" into a Date (at midnight)
function dateFromText(text) {
  let parts = text.split("-");   // ["2026", "11", "23"]
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

// how many days from today until this date (negative if it already passed)
function daysUntil(text) {
  let today = dateFromText(todayText());
  let date = dateFromText(text);
  let oneDay = 24 * 60 * 60 * 1000;   // milliseconds in one day
  return Math.round((date - today) / oneDay);
}

// a number of days in words, like "Due in 3 days"
function dueText(days) {
  if (days < -1) {
    return "Overdue by " + (-days) + " days";
  }
  if (days === -1) {
    return "Overdue by 1 day";
  }
  if (days === 0) {
    return "Due today";
  }
  if (days === 1) {
    return "Due tomorrow";
  }
  return "Due in " + days + " days";
}

// a date that's easy to read, like "Mar 1, 2027"
function prettyDate(text) {
  return dateFromText(text).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// adds days to a date, like addDays("2026-11-23", 7) = "2026-11-30"
function addDays(text, days) {
  let date = dateFromText(text);
  date.setDate(date.getDate() + days);
  return dateToText(date);
}

// adds months to a date, like addMonths("2026-11-23", 1) = "2026-12-23"
function addMonths(text, months) {
  let date = dateFromText(text);
  date.setMonth(date.getMonth() + months);
  return dateToText(date);
}

// is this date in the current month?
function isThisMonth(text) {
  return text.substring(0, 7) === todayText().substring(0, 7);   // compares "2026-11"
}


// ---------- 5. Budget and purchases ----------
// the budget looks like { income, limits }
//   income is how much you take home each month
//   limits is a list of spending limits, in the same order as the categories list
// a purchase looks like { id, amount, category, cardId, date, kind }   (kind is "need" or "want")

function loadBudget() {
  let text = localStorage.getItem("budget");
  if (text === null) {
    // no budget yet: no income and a limit of $0 for every category
    let limits = [];
    for (let i = 0; i < categories.length; i++) {
      limits.push(0);
    }
    return { income: 0, limits: limits };
  }
  return JSON.parse(text);
}

function saveBudget(budget) {
  localStorage.setItem("budget", JSON.stringify(budget));
}

// how much you spent this month (all categories, or just one if you give a name)
function spentThisMonth(categoryName) {
  let purchases = loadList("purchases");
  let total = 0;
  for (let i = 0; i < purchases.length; i++) {
    let p = purchases[i];
    if (isThisMonth(p.date) && (categoryName === undefined || p.category === categoryName)) {
      total = total + p.amount;
    }
  }
  return total;
}


// ---------- 6. Bills ----------
// a bill looks like { id, name, amount, dueDate, repeat, category, paid }
//   repeat is "monthly", "weekly", or "once"

// the bills you still have to pay, soonest first
function unpaidBillsSorted() {
  let bills = loadList("bills");
  let unpaid = [];
  for (let i = 0; i < bills.length; i++) {
    if (bills[i].paid !== true) {
      unpaid.push(bills[i]);
    }
  }

  // sort by due date ("2026-11-05" comes before "2026-11-20", just like words in a dictionary)
  unpaid.sort(function (a, b) {
    if (a.dueDate < b.dueDate) {
      return -1;
    }
    if (a.dueDate > b.dueDate) {
      return 1;
    }
    return 0;
  });
  return unpaid;
}


// ---------- 7. Sample data for the demo ----------
// The demo ("Continue without account") gets realistic sample data the first time.
// Real accounts start empty.

// a date this month, a few days ago (but never last month)
function daysAgoThisMonth(days) {
  let date = addDays(todayText(), -days);
  if (!isThisMonth(date)) {
    date = todayText().substring(0, 8) + "01";   // the 1st of this month
  }
  return date;
}

function fillDemoData() {
  let today = todayText();

  saveList("cards", [
    { id: 1, nickname: "Everyday Checking", type: "checking", balance: 142050, limit: 0 },
    { id: 2, nickname: "Savings", type: "savings", balance: 265000, limit: 0 },
    { id: 3, nickname: "Student Credit Card", type: "credit", balance: 38000, limit: 100000 }
  ]);

  saveList("bills", [
    { id: 11, name: "Internet", amount: 5000, dueDate: addDays(today, -1), repeat: "monthly", category: "Utilities", paid: false },
    { id: 12, name: "Streaming", amount: 1500, dueDate: addDays(today, 1), repeat: "monthly", category: "Fun", paid: false },
    { id: 13, name: "Phone", amount: 4000, dueDate: addDays(today, 3), repeat: "monthly", category: "Utilities", paid: false },
    { id: 14, name: "Rent", amount: 80000, dueDate: addDays(today, 6), repeat: "monthly", category: "Housing", paid: false },
    { id: 15, name: "Car insurance", amount: 12000, dueDate: addDays(today, 16), repeat: "monthly", category: "Transportation", paid: false }
  ]);

  // a $2,500 take-home income with limits from the 50/30/20 rule
  let budget = { income: 250000, limits: [] };
  for (let i = 0; i < categories.length; i++) {
    budget.limits.push(Math.round(budget.income * categories[i].percent / 100));
  }
  saveBudget(budget);

  saveList("purchases", [
    { id: 21, amount: 8640, category: "Groceries", cardId: 1, date: daysAgoThisMonth(2), kind: "need" },
    { id: 22, amount: 4500, category: "Transportation", cardId: 3, date: daysAgoThisMonth(4), kind: "need" },
    { id: 23, amount: 2450, category: "Eating Out", cardId: 3, date: daysAgoThisMonth(1), kind: "want" },
    { id: 24, amount: 1800, category: "Fun", cardId: 1, date: daysAgoThisMonth(6), kind: "want" },
    { id: 25, amount: 6000, category: "Shopping", cardId: 3, date: daysAgoThisMonth(8), kind: "want" },
    { id: 26, amount: 7215, category: "Groceries", cardId: 1, date: daysAgoThisMonth(9), kind: "need" }
  ]);

  saveList("goals", [
    { id: 31, name: "Emergency Fund", target: 100000, saved: 65000, targetDate: addMonths(today, 4) },
    { id: 32, name: "New Laptop", target: 90000, saved: 30000, targetDate: addMonths(today, 6) }
  ]);

  localStorage.setItem("demoFilled", "yes");
}

// fill the demo data once (mode comes from common.js)
if (mode === "demo" && localStorage.getItem("demoFilled") !== "yes") {
  fillDemoData();
}
