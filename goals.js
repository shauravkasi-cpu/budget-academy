// goals.js
// Runs on the Goals page (goals.html).
// Add, edit, and delete savings goals, and move money from a card into a goal.
// The "save $X a week" math is savePerWeek() in calculators.js, the same math as the Savings Goal calculator.


let editingId = null;   // null = adding a new goal, a number = editing that goal
let addingId = null;    // the goal you clicked "Add money" on (null = none)


// ---------- 1. Show the goals ----------

function showGoals() {
  let goals = loadList("goals");
  let list = document.getElementById("goal-list");

  // suggest an emergency fund if there isn't one yet
  document.getElementById("suggestion").hidden = hasEmergencyFund(goals);

  if (goals.length === 0) {
    list.innerHTML = emptyStateHTML("No goals yet. What are you saving for? A car, a trip, a new phone?",
      "Add your first goal", "showForm()");
    return;
  }

  list.innerHTML = "";
  for (let i = 0; i < goals.length; i++) {
    list.innerHTML = list.innerHTML + goalHTML(goals[i]);
  }
}


// is there a goal with "emergency" in its name?
function hasEmergencyFund(goals) {
  for (let i = 0; i < goals.length; i++) {
    // toLowerCase() so "Emergency" and "emergency" both count
    if (goals[i].name.toLowerCase().includes("emergency")) {
      return true;
    }
  }
  return false;
}


// one goal's box
function goalHTML(goal) {
  let percent = Math.round((goal.saved / goal.target) * 100);
  if (percent > 100) {
    percent = 100;
  }

  // the add money box, if you clicked "Add money" on this goal
  let bottom = "";
  if (addingId === goal.id) {
    bottom = addMoneyBoxHTML(goal);
  }

  return '<div class="card item-card">' +
      '<div class="item-row">' +
        '<div>' +
          '<p class="item-name">' + goal.name + '</p>' +
          '<p class="small-text">' + formatMoney(goal.saved) + ' of ' + formatMoney(goal.target) + ' saved  ·  ' + percent + '%</p>' +
        '</div>' +
        '<div class="item-right">' +
          '<button class="pill-button green-pill small-pill" onclick="startAdding(' + goal.id + ')">Add money</button>' +
          '<button class="text-button" onclick="editGoal(' + goal.id + ')">Edit</button>' +
          '<button class="text-button" onclick="deleteGoal(' + goal.id + ')">Delete</button>' +
        '</div>' +
      '</div>' +
      '<div class="bar"><div class="bar-fill" style="width: ' + percent + '%"></div></div>' +
      '<p class="goal-plan">' + goalPlan(goal) + '</p>' +
      bottom +
    '</div>';
}


// the sentence under a goal, like "Save $25 a week to reach this by March 1."
function goalPlan(goal) {
  let left = goal.target - goal.saved;

  if (left <= 0) {
    return "You reached this goal! Great job.";
  }

  let days = daysUntil(goal.targetDate);
  if (days <= 0) {
    return "The target date has passed. You still need " + formatMoney(left) + ". Try picking a new date.";
  }

  // weeks left until the date (rounded up), then how much each week
  let weeks = Math.ceil(days / 7);
  let perWeek = savePerWeek(left, weeks);   // calculators.js

  let date = dateFromText(goal.targetDate).toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return "Save " + formatMoney(perWeek) + " a week to reach this by " + date + ".";
}


// ---------- 2. Adding money to a goal ----------

function startAdding(id) {
  addingId = id;
  showGoals();
}

function cancelAdding() {
  addingId = null;
  showGoals();
}

// the "add money from which card?" box under a goal
function addMoneyBoxHTML(goal) {
  if (loadList("cards").length === 0) {
    return '<p class="feedback feedback-wrong">Add a card on the <a href="cards.html">Cards page</a> first, so you can pick where the money comes from.</p>' +
      '<button class="text-button" onclick="cancelAdding()">Cancel</button>';
  }

  return '<div class="pay-box">' +
      '<label for="add-amount">Add</label>' +
      '<input type="text" id="add-amount" placeholder="25" class="small-input">' +
      '<label for="add-card">from</label>' +
      '<select id="add-card">' + cardOptionsHTML() + '</select>' +
      '<button class="pill-button green-pill small-pill" onclick="addMoney()">Add it</button>' +
      '<button class="text-button" onclick="cancelAdding()">Cancel</button>' +
    '</div>' +
    '<p class="feedback feedback-wrong" id="add-error"></p>';
}

// takes the money out of the card and puts it in the goal
function addMoney() {
  let amount = toCents(document.getElementById("add-amount").value);
  let cardId = Number(document.getElementById("add-card").value);

  if (amount <= 0) {
    document.getElementById("add-error").textContent = moneyError;
    return;
  }

  spendFromCard(cardId, amount);   // money-data.js

  let goals = loadList("goals");
  let goal = findById(goals, addingId);
  goal.saved = goal.saved + amount;
  saveList("goals", goals);

  addingId = null;
  showGoals();
}


// ---------- 3. The add / edit form ----------

function showForm() {
  editingId = null;
  document.getElementById("form-title").textContent = "Add a goal";
  document.getElementById("goal-name").value = "";
  document.getElementById("goal-target").value = "";
  document.getElementById("goal-saved").value = "0";
  document.getElementById("goal-date").value = addMonths(todayText(), 6);
  document.getElementById("form-error").textContent = "";
  document.getElementById("goal-form").hidden = false;
}

// the suggestion button: a form already filled in for an emergency fund
function addEmergencyFund() {
  showForm();
  document.getElementById("goal-name").value = "Emergency Fund";
  document.getElementById("goal-target").value = "1000";
}

function editGoal(id) {
  let goal = findById(loadList("goals"), id);
  editingId = id;
  document.getElementById("form-title").textContent = "Edit " + goal.name;
  document.getElementById("goal-name").value = goal.name;
  document.getElementById("goal-target").value = centsToText(goal.target);
  document.getElementById("goal-saved").value = centsToText(goal.saved);
  document.getElementById("goal-date").value = goal.targetDate;
  document.getElementById("form-error").textContent = "";
  document.getElementById("goal-form").hidden = false;
  window.scrollTo(0, 0);
}

function hideForm() {
  document.getElementById("goal-form").hidden = true;
}

function saveGoal() {
  let name = document.getElementById("goal-name").value.trim();
  let target = toCents(document.getElementById("goal-target").value);
  let saved = toCents(document.getElementById("goal-saved").value);
  let targetDate = document.getElementById("goal-date").value;
  let error = document.getElementById("form-error");

  if (name === "") {
    error.textContent = "Give the goal a name, like \"New laptop\".";
    return;
  }
  if (target <= 0 || saved < 0) {
    error.textContent = moneyError;
    return;
  }
  if (targetDate === "") {
    error.textContent = "Pick the date you want to reach this goal.";
    return;
  }

  let goals = loadList("goals");

  if (editingId === null) {
    goals.push({ id: newId(), name: name, target: target, saved: saved, targetDate: targetDate });
  } else {
    let goal = findById(goals, editingId);
    goal.name = name;
    goal.target = target;
    goal.saved = saved;
    goal.targetDate = targetDate;
  }

  saveList("goals", goals);
  hideForm();
  showGoals();
}


// ---------- 4. Delete ----------

function deleteGoal(id) {
  if (confirm("Delete this goal?")) {
    saveList("goals", removeById(loadList("goals"), id));
    showGoals();
  }
}


// ---------- 5. Fill in the page ----------

showGoals();
