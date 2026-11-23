// cards.js
// Runs on the Cards page (cards.html).
// Add, edit, and delete money accounts. The list is saved with loadList / saveList (money-data.js).


// null means the form is adding a NEW card, a number means it's editing that card
let editingId = null;


// ---------- 1. Show the cards ----------

function showCards() {
  let cards = loadList("cards");

  document.getElementById("total").textContent = formatMoney(totalMoney(cards));
  document.getElementById("card-count").textContent = cards.length;

  let list = document.getElementById("card-list");

  if (cards.length === 0) {
    list.innerHTML = emptyStateHTML("You don't have any cards yet. Add your checking account, savings, credit card, or cash.",
      "Add your first card", "showForm()");
    return;
  }

  list.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    list.innerHTML = list.innerHTML + cardHTML(cards[i]);
  }
}


// one card's box
function cardHTML(card) {
  let amountLabel = "balance";
  let extra = "";

  // credit cards show how much of the limit is used
  if (card.type === "credit") {
    amountLabel = "owed";

    let percent = 0;
    if (card.limit > 0) {
      percent = Math.round((card.balance / card.limit) * 100);
    }

    let barWidth = percent;
    if (barWidth > 100) {
      barWidth = 100;
    }

    // over 30% used turns the bar red and shows a warning
    let barClass = "bar-fill";
    let warning = "";
    if (percent > 30) {
      barClass = "bar-fill bar-red";
      warning = '<p class="feedback feedback-wrong">Over 30% of your limit is used. Paying it down can help your credit score.</p>';
    }

    extra = '<div class="bar"><div class="' + barClass + '" style="width: ' + barWidth + '%"></div></div>' +
      '<p class="small-text">' + percent + '% of your ' + formatMoney(card.limit) + ' limit used</p>' +
      warning;
  }

  return '<div class="card item-card">' +
      '<div class="item-row">' +
        '<div>' +
          '<p class="item-name">' + card.nickname + '</p>' +
          '<p class="small-text">' + cardTypeName(card.type) + '</p>' +
        '</div>' +
        '<div class="item-right">' +
          '<p class="item-amount">' + formatMoney(card.balance) + ' <span class="grey">' + amountLabel + '</span></p>' +
          '<button class="text-button" onclick="editCard(' + card.id + ')">Edit</button>' +
          '<button class="text-button" onclick="deleteCard(' + card.id + ')">Delete</button>' +
        '</div>' +
      '</div>' +
      extra +
    '</div>';
}


// ---------- 2. The form ----------

// opens an empty form to add a new card
function showForm() {
  editingId = null;
  document.getElementById("form-title").textContent = "Add a card";
  document.getElementById("nickname").value = "";
  document.getElementById("type").value = "checking";
  document.getElementById("balance").value = "";
  document.getElementById("limit").value = "";
  document.getElementById("form-error").textContent = "";
  document.getElementById("card-form").hidden = false;
  showLimitBox();
}

// opens the form with a card's info filled in
function editCard(id) {
  let card = findById(loadList("cards"), id);
  editingId = id;
  document.getElementById("form-title").textContent = "Edit " + card.nickname;
  document.getElementById("nickname").value = card.nickname;
  document.getElementById("type").value = card.type;
  document.getElementById("balance").value = centsToText(card.balance);
  document.getElementById("limit").value = centsToText(card.limit);
  document.getElementById("form-error").textContent = "";
  document.getElementById("card-form").hidden = false;
  showLimitBox();
  window.scrollTo(0, 0);
}

function hideForm() {
  document.getElementById("card-form").hidden = true;
}

// only credit cards have a limit, and for them the balance is what you owe
function showLimitBox() {
  let type = document.getElementById("type").value;

  if (type === "credit") {
    document.getElementById("limit-box").hidden = false;
    document.getElementById("balance-label").textContent = "Amount you owe ($)";
  } else {
    document.getElementById("limit-box").hidden = true;
    document.getElementById("balance-label").textContent = "Balance ($)";
  }
}


// checks the form, then adds or updates the card
function saveCard() {
  let nickname = document.getElementById("nickname").value.trim();   // trim() removes extra spaces
  let type = document.getElementById("type").value;
  let balance = toCents(document.getElementById("balance").value);
  let limit = 0;
  let error = document.getElementById("form-error");

  // check what was typed before saving anything
  if (nickname === "") {
    error.textContent = "Give the card a nickname, like \"Everyday Checking\".";
    return;
  }
  if (balance < 0) {
    error.textContent = moneyError;
    return;
  }
  if (type === "credit") {
    limit = toCents(document.getElementById("limit").value);
    if (limit <= 0) {
      error.textContent = "Type the credit limit, like 1000.";
      return;
    }
  }

  let cards = loadList("cards");

  if (editingId === null) {
    // a new card
    cards.push({ id: newId(), nickname: nickname, type: type, balance: balance, limit: limit });
  } else {
    // change the card we're editing
    let card = findById(cards, editingId);
    card.nickname = nickname;
    card.type = type;
    card.balance = balance;
    card.limit = limit;
  }

  saveList("cards", cards);
  hideForm();
  showCards();
}


// ---------- 3. Delete ----------

function deleteCard(id) {
  // confirm() shows the browser's OK / Cancel box
  if (confirm("Delete this card?")) {
    saveList("cards", removeById(loadList("cards"), id));
    showCards();
  }
}


// ---------- 4. Fill in the page ----------

showCards();
