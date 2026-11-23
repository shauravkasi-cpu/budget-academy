// budget.js
// Runs on the Budget page (budget.html).
// Monthly income, a spending limit for each category, and logging purchases.
// (categories, loadBudget, saveBudget, and spentThisMonth are in money-data.js)


// ---------- 1. The totals at the top ----------

function showTotals() {
  let budget = loadBudget();
  let spent = spentThisMonth();   // no category name = everything

  document.getElementById("spent-total").textContent = formatMoney(spent);
  document.getElementById("spent-text").textContent = "Spent this month, out of " + formatMoney(budget.income) + " income";
  document.getElementById("left-total").textContent = formatMoney(budget.income - spent);

  // add up needs and wants separately
  let purchases = loadList("purchases");
  let needs = 0;
  let wants = 0;
  for (let i = 0; i < purchases.length; i++) {
    if (isThisMonth(purchases[i].date)) {
      if (purchases[i].kind === "need") {
        needs = needs + purchases[i].amount;
      } else {
        wants = wants + purchases[i].amount;
      }
    }
  }
  document.getElementById("needs-total").textContent = formatMoney(needs);
  document.getElementById("wants-total").textContent = formatMoney(wants);
}


// ---------- 2. Monthly income ----------

function showIncome() {
  let budget = loadBudget();
  if (budget.income > 0) {
    document.getElementById("income").value = centsToText(budget.income);
  }
}

// saves the income (returns true if it worked)
function saveIncome() {
  let income = toCents(document.getElementById("income").value);
  let error = document.getElementById("income-error");

  if (income <= 0) {
    error.textContent = moneyError;
    return false;
  }
  error.textContent = "";

  let budget = loadBudget();
  budget.income = income;
  saveBudget(budget);
  showPage();
  return true;
}

// fills every category's limit using the 50/30/20 rule
// (each category has a percent in money-data.js: needs add up to 50%, wants to 30%)
function fillWithRule() {
  if (!saveIncome()) {
    return;   // the income was typed wrong
  }

  let budget = loadBudget();
  for (let i = 0; i < categories.length; i++) {
    budget.limits[i] = Math.round(budget.income * categories[i].percent / 100);
  }
  saveBudget(budget);

  let savings = Math.round(budget.income * 20 / 100);
  document.getElementById("rule-text").textContent =
    "Done! 50% went to needs and 30% to wants. The other 20% (" + formatMoney(savings) + ") is for savings, so put it toward your goals.";
  showPage();
}


// ---------- 3. Spending by category ----------

function showCategories() {
  let budget = loadBudget();
  let list = document.getElementById("category-list");
  list.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    let name = categories[i].name;
    let spent = spentThisMonth(name);
    let limit = budget.limits[i];

    // how full the bar is, and its color:
    // green, then yellow at 80% of the limit, then red when you go over
    let percent = 0;
    if (limit > 0) {
      percent = Math.round((spent / limit) * 100);
    }
    let barClass = "bar-fill";
    if (percent > 100) {
      barClass = "bar-fill bar-red";
    } else if (percent >= 80) {
      barClass = "bar-fill bar-yellow";
    }
    let barWidth = percent;
    if (barWidth > 100) {
      barWidth = 100;
    }

    let text = formatMoney(spent) + " of " + formatMoney(limit);
    if (limit === 0) {
      text = formatMoney(spent) + " spent (no limit set)";
    } else if (percent > 100) {
      text = text + "  ·  " + formatMoney(spent - limit) + " over!";
    }

    list.innerHTML = list.innerHTML +
      '<div class="card item-card">' +
        '<div class="item-row">' +
          '<div>' +
            '<p class="item-name">' + name + '</p>' +
            '<p class="small-text">' + categories[i].kind + '</p>' +
          '</div>' +
          '<p class="item-amount">' + text + '</p>' +
        '</div>' +
        '<div class="bar"><div class="' + barClass + '" style="width: ' + barWidth + '%"></div></div>' +
      '</div>';
  }
}


// the form to change each category's limit
function showLimitsForm() {
  let budget = loadBudget();
  let html = "";

  // one box for each category, with an id like "limit-0"
  for (let i = 0; i < categories.length; i++) {
    html = html +
      '<div class="calc-input">' +
        '<label for="limit-' + i + '">' + categories[i].name + ' ($)</label>' +
        '<input type="text" id="limit-' + i + '" value="' + centsToText(budget.limits[i]) + '">' +
      '</div>';
  }

  document.getElementById("limit-inputs").innerHTML = html;
  document.getElementById("limits-error").textContent = "";
  document.getElementById("limits-form").hidden = false;
}

function hideLimitsForm() {
  document.getElementById("limits-form").hidden = true;
}

function saveLimits() {
  let budget = loadBudget();

  // check every box first, then save
  for (let i = 0; i < categories.length; i++) {
    let limit = toCents(document.getElementById("limit-" + i).value);
    if (limit < 0) {
      document.getElementById("limits-error").textContent = categories[i].name + ": " + moneyError;
      return;
    }
    budget.limits[i] = limit;
  }

  saveBudget(budget);
  hideLimitsForm();
  showPage();
}


// ---------- 4. Purchases ----------

function showPurchases() {
  let purchases = loadList("purchases");
  let list = document.getElementById("purchase-list");
  let html = "";

  // newest date first ("2026-11-20" comes after "2026-11-05", like words in a dictionary)
  purchases.sort(function (a, b) {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < purchases.length; i++) {
    let p = purchases[i];
    if (isThisMonth(p.date)) {
      let card = findById(loadList("cards"), p.cardId);
      let cardName = "a deleted card";
      if (card !== null) {
        cardName = card.nickname;
      }

      html = html +
        '<div class="card item-card"><div class="item-row">' +
          '<div>' +
            '<p class="item-name">' + p.category + '</p>' +
            '<p class="small-text">' + prettyDate(p.date) + '  ·  ' + p.kind + '  ·  paid with ' + cardName + '</p>' +
          '</div>' +
          '<div class="item-right">' +
            '<p class="item-amount">' + formatMoney(p.amount) + '</p>' +
            '<button class="text-button" onclick="deletePurchase(' + p.id + ')">Delete</button>' +
          '</div>' +
        '</div></div>';
    }
  }

  if (html === "") {
    list.innerHTML = emptyStateHTML("No purchases logged this month yet. Every time you buy something, log it here.",
      "Log your first purchase", "showPurchaseForm()");
  } else {
    list.innerHTML = html;
  }
}


function showPurchaseForm() {
  document.getElementById("p-amount").value = "";
  document.getElementById("p-category").innerHTML = categoryOptionsHTML("Groceries");
  document.getElementById("p-card").innerHTML = cardOptionsHTML();
  document.getElementById("p-date").value = todayText();
  document.getElementById("purchase-error").textContent = "";
  matchKind();
  document.getElementById("purchase-form").hidden = false;

  if (loadList("cards").length === 0) {
    document.getElementById("purchase-error").textContent = "Add a card on the Cards page first, so you can pick what you paid with.";
  }
}

function hidePurchaseForm() {
  document.getElementById("purchase-form").hidden = true;
}

// when you pick a category, guess if it's a need or a want (you can still change it)
function matchKind() {
  let category = document.getElementById("p-category").value;
  document.getElementById("p-kind").value = categoryKind(category);
}

function savePurchase() {
  let amount = toCents(document.getElementById("p-amount").value);
  let category = document.getElementById("p-category").value;
  let cardId = Number(document.getElementById("p-card").value);
  let date = document.getElementById("p-date").value;
  let kind = document.getElementById("p-kind").value;
  let error = document.getElementById("purchase-error");

  if (amount <= 0) {
    error.textContent = moneyError;
    return;
  }
  if (loadList("cards").length === 0) {
    error.textContent = "Add a card on the Cards page first, so you can pick what you paid with.";
    return;
  }
  if (date === "") {
    error.textContent = "Pick the date you bought it.";
    return;
  }

  let purchases = loadList("purchases");
  purchases.push({ id: newId(), amount: amount, category: category, cardId: cardId, date: date, kind: kind });
  saveList("purchases", purchases);

  spendFromCard(cardId, amount);   // the money comes out of the card

  hidePurchaseForm();
  showPage();
}

// deleting a purchase gives the money back to the card
function deletePurchase(id) {
  if (confirm("Delete this purchase? The money goes back to the card.")) {
    let purchases = loadList("purchases");
    let p = findById(purchases, id);
    spendFromCard(p.cardId, -p.amount);   // a negative amount is a refund
    saveList("purchases", removeById(purchases, id));
    showPage();
  }
}


// ---------- 5. Fill in the page ----------

function showPage() {
  showTotals();
  showCategories();
  showPurchases();
}

showIncome();
showPage();
