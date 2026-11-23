// bills.js
// Runs on the Bills page (bills.html).
// Add, edit, delete, and pay bills. Paying a bill takes the money out of a card.


let editingId = null;   // null = adding a new bill, a number = editing that bill
let payingId = null;    // the bill you clicked "Mark paid" on (null = none)


// ---------- 1. Show the bills ----------

function showBills() {
  let unpaid = unpaidBillsSorted();   // soonest first (money-data.js)

  // the totals at the top
  let weekTotal = 0;
  for (let i = 0; i < unpaid.length; i++) {
    if (daysUntil(unpaid[i].dueDate) <= 7) {
      weekTotal = weekTotal + unpaid[i].amount;
    }
  }
  document.getElementById("week-total").textContent = formatMoney(weekTotal);
  document.getElementById("unpaid-count").textContent = unpaid.length;

  // the list
  let list = document.getElementById("bill-list");
  if (unpaid.length === 0) {
    list.innerHTML = emptyStateHTML("No bills to pay right now. Add bills like rent, your phone, or streaming so you never miss one.",
      "Add your first bill", "showForm()");
  } else {
    list.innerHTML = "";
    for (let i = 0; i < unpaid.length; i++) {
      list.innerHTML = list.innerHTML + billHTML(unpaid[i]);
    }
  }

  showPaidBills();
}


// one bill's box
function billHTML(bill) {
  let days = daysUntil(bill.dueDate);

  // yellow if due in 3 days or less, red if overdue
  let chipClass = "chip";
  if (days < 0) {
    chipClass = "chip chip-overdue";
  } else if (days <= 3) {
    chipClass = "chip chip-soon";
  }

  // the buttons, or the "pay with which card?" box if you're paying this bill
  let bottom = "";
  if (payingId === bill.id) {
    bottom = payBoxHTML(bill);
  }

  return '<div class="card item-card">' +
      '<div class="item-row">' +
        '<div>' +
          '<p class="item-name">' + bill.name + '</p>' +
          '<p class="small-text">' + bill.category + '  ·  ' + repeatName(bill.repeat) + '  ·  ' + prettyDate(bill.dueDate) + '</p>' +
        '</div>' +
        '<div class="item-right">' +
          '<span class="' + chipClass + '">' + dueText(days) + '</span>' +
          '<p class="item-amount">' + formatMoney(bill.amount) + '</p>' +
          '<button class="pill-button green-pill small-pill" onclick="startPaying(' + bill.id + ')">Mark paid</button>' +
          '<button class="text-button" onclick="editBill(' + bill.id + ')">Edit</button>' +
          '<button class="text-button" onclick="deleteBill(' + bill.id + ')">Delete</button>' +
        '</div>' +
      '</div>' +
      bottom +
    '</div>';
}


// how often a bill repeats, in words
function repeatName(repeat) {
  if (repeat === "monthly") {
    return "Every month";
  }
  if (repeat === "weekly") {
    return "Every week";
  }
  return "One time";
}


// the one-time bills you already paid
function showPaidBills() {
  let bills = loadList("bills");
  let html = "";

  for (let i = 0; i < bills.length; i++) {
    if (bills[i].paid === true) {
      html = html + '<div class="card item-card"><div class="item-row">' +
          '<p class="item-name">' + bills[i].name + '</p>' +
          '<div class="item-right">' +
            '<span class="chip">Paid</span>' +
            '<p class="item-amount">' + formatMoney(bills[i].amount) + '</p>' +
            '<button class="text-button" onclick="deleteBill(' + bills[i].id + ')">Delete</button>' +
          '</div>' +
        '</div></div>';
    }
  }

  if (html === "") {
    document.getElementById("paid-list").innerHTML = "";
  } else {
    document.getElementById("paid-list").innerHTML =
      '<div class="section-header"><p class="section-title">Paid one-time bills</p></div>' + html;
  }
}


// ---------- 2. Paying a bill ----------

// shows the "pay with which card?" box under a bill
function startPaying(id) {
  payingId = id;
  showBills();
}

function cancelPaying() {
  payingId = null;
  showBills();
}

// the "pay with which card?" box
function payBoxHTML(bill) {
  // you need a card to pay with
  if (loadList("cards").length === 0) {
    return '<p class="feedback feedback-wrong">Add a card on the <a href="cards.html">Cards page</a> first, so you can pick which one pays this bill.</p>' +
      '<button class="text-button" onclick="cancelPaying()">Cancel</button>';
  }

  return '<div class="pay-box">' +
      '<label for="pay-card">Pay ' + formatMoney(bill.amount) + ' with</label>' +
      '<select id="pay-card">' + cardOptionsHTML() + '</select>' +
      '<button class="pill-button green-pill small-pill" onclick="payBill()">Pay it</button>' +
      '<button class="text-button" onclick="cancelPaying()">Cancel</button>' +
    '</div>';
}

// pays the bill: the money comes out of the card,
// and a repeating bill moves to its next due date
function payBill() {
  let cardId = Number(document.getElementById("pay-card").value);   // the dropdown gives text, so make it a number
  let bills = loadList("bills");
  let bill = findById(bills, payingId);

  spendFromCard(cardId, bill.amount);   // money-data.js

  // also save it as a purchase, so the Budget page counts it as spending
  let purchases = loadList("purchases");
  purchases.push({ id: newId(), amount: bill.amount, category: bill.category, cardId: cardId,
    date: todayText(), kind: categoryKind(bill.category) });
  saveList("purchases", purchases);

  if (bill.repeat === "monthly") {
    bill.dueDate = addMonths(bill.dueDate, 1);
  } else if (bill.repeat === "weekly") {
    bill.dueDate = addDays(bill.dueDate, 7);
  } else {
    bill.paid = true;   // a one-time bill is done
  }

  saveList("bills", bills);
  payingId = null;
  showBills();
}


// ---------- 3. The add / edit form ----------

function showForm() {
  editingId = null;
  document.getElementById("form-title").textContent = "Add a bill";
  document.getElementById("bill-name").value = "";
  document.getElementById("bill-amount").value = "";
  document.getElementById("bill-date").value = todayText();
  document.getElementById("bill-repeat").value = "monthly";
  document.getElementById("bill-category").innerHTML = categoryOptionsHTML("Utilities");
  document.getElementById("form-error").textContent = "";
  document.getElementById("bill-form").hidden = false;
}

function editBill(id) {
  let bill = findById(loadList("bills"), id);
  editingId = id;
  document.getElementById("form-title").textContent = "Edit " + bill.name;
  document.getElementById("bill-name").value = bill.name;
  document.getElementById("bill-amount").value = centsToText(bill.amount);
  document.getElementById("bill-date").value = bill.dueDate;
  document.getElementById("bill-repeat").value = bill.repeat;
  document.getElementById("bill-category").innerHTML = categoryOptionsHTML(bill.category);
  document.getElementById("form-error").textContent = "";
  document.getElementById("bill-form").hidden = false;
  window.scrollTo(0, 0);
}

function hideForm() {
  document.getElementById("bill-form").hidden = true;
}

// checks the form, then adds or updates the bill
function saveBill() {
  let name = document.getElementById("bill-name").value.trim();
  let amount = toCents(document.getElementById("bill-amount").value);
  let dueDate = document.getElementById("bill-date").value;
  let repeat = document.getElementById("bill-repeat").value;
  let category = document.getElementById("bill-category").value;
  let error = document.getElementById("form-error");

  if (name === "") {
    error.textContent = "Give the bill a name, like \"Phone\".";
    return;
  }
  if (amount <= 0) {
    error.textContent = moneyError;
    return;
  }
  if (dueDate === "") {
    error.textContent = "Pick the date the bill is due.";
    return;
  }

  let bills = loadList("bills");

  if (editingId === null) {
    bills.push({ id: newId(), name: name, amount: amount, dueDate: dueDate, repeat: repeat, category: category, paid: false });
  } else {
    let bill = findById(bills, editingId);
    bill.name = name;
    bill.amount = amount;
    bill.dueDate = dueDate;
    bill.repeat = repeat;
    bill.category = category;
    bill.paid = false;
  }

  saveList("bills", bills);
  hideForm();
  showBills();
}


// ---------- 4. Delete ----------

function deleteBill(id) {
  if (confirm("Delete this bill?")) {
    saveList("bills", removeById(loadList("bills"), id));
    showBills();
  }
}


// ---------- 5. Fill in the page ----------

showBills();
