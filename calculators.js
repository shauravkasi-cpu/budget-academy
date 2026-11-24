// calculators.js
// All the money calculators.
// They're used inside lessons AND on the Calculators page.
// All money math is done in CENTS so it's exact (see money.js).


// ---------- 1. The list of calculators ----------
// kind   - a short name we use in the code
// title  - the name people see
// inputs - the boxes you type in (label, and the number already in the box)

const calculators = [
  {
    kind: "paycheck",
    title: "Paycheck After Taxes",
    inputs: [
      { label: "Pay before taxes ($)", value: "1000" }
    ]
  },
  {
    kind: "hourly",
    title: "Hourly Pay",
    inputs: [
      { label: "Pay per hour ($)", value: "15" },
      { label: "Hours each week", value: "20" }
    ]
  },
  {
    kind: "budget",
    title: "50/30/20 Budget",
    inputs: [
      { label: "Monthly income ($)", value: "1000" }
    ]
  },
  {
    kind: "goal",
    title: "Savings Goal",
    inputs: [
      { label: "Price of your goal ($)", value: "600" },
      { label: "Saved each week ($)", value: "20" }
    ]
  },
  {
    kind: "emergency",
    title: "Emergency Fund",
    inputs: [
      { label: "Your monthly expenses ($)", value: "800" }
    ]
  },
  {
    kind: "credit",
    title: "Credit Card Payoff",
    inputs: [
      { label: "Card balance ($)", value: "1000" },
      { label: "Interest rate, APR (%)", value: "24" },
      { label: "Paid each month ($)", value: "50" }
    ]
  },
  {
    kind: "compound",
    title: "Compound Interest",
    inputs: [
      { label: "Added each month ($)", value: "100" },
      { label: "Years", value: "40" },
      { label: "Yearly growth (%)", value: "7" }
    ]
  },
  {
    kind: "car",
    title: "Car Loan",
    inputs: [
      { label: "Car price ($)", value: "20000" },
      { label: "Down payment ($)", value: "2000" },
      { label: "Interest rate (%)", value: "7" },
      { label: "Years", value: "5" }
    ]
  },
  {
    kind: "mortgage",
    title: "Mortgage",
    inputs: [
      { label: "Home price ($)", value: "250000" },
      { label: "Down payment ($)", value: "25000" },
      { label: "Interest rate (%)", value: "6.5" },
      { label: "Years", value: "30" }
    ]
  }

];


// ---------- 2. Making the calculator HTML ----------

// finds a calculator in the list by its kind
function findCalculator(kind) {
  for (let i = 0; i < calculators.length; i++) {
    if (calculators[i].kind === kind) {
      return calculators[i];
    }
  }
}

// makes the input boxes, the button, and an empty spot for the answers
// every id starts with the kind, like "calc-goal-0", so two calculators on one page don't mix up
// values is optional: a lesson can send its own starting numbers, like ["50", "5", "4"]
function calculatorHTML(kind, values) {
  let calc = findCalculator(kind);
  let html = '<div class="calc-inputs">';

  for (let i = 0; i < calc.inputs.length; i++) {
    let id = "calc-" + kind + "-" + i;

    // use the lesson's number if it gave one, otherwise the normal one
    let value = calc.inputs[i].value;
    if (values !== undefined) {
      value = values[i];
    }

    html = html +
      '<div class="calc-input">' +
        '<label for="' + id + '">' + calc.inputs[i].label + '</label>' +
        '<input type="text" id="' + id + '" value="' + value + '">' +
      '</div>';
  }

  html = html + '</div>' +
    '<button class="pill-button green-pill" onclick="calculate(\'' + kind + '\')">Calculate</button>' +
    '<p class="feedback feedback-wrong" id="calc-' + kind + '-error"></p>' +
    '<div class="calc-results" id="calc-' + kind + '-results"></div>';

  return html;
}


// ---------- 3. Reading what someone typed ----------

// reads a money box and turns it into cents (-1 if it isn't a real amount)
function readMoney(kind, i) {
  return toCents(document.getElementById("calc-" + kind + "-" + i).value);
}

// reads a plain number box, like years or a percent (-1 if it isn't a real number)
function readNumber(kind, i) {
  let text = document.getElementById("calc-" + kind + "-" + i).value;
  let number = Number(text);

  if (text === "" || isNaN(number) || number < 0) {
    return -1;
  }
  return number;
}

// shows a red message under the calculator
function showCalcError(kind, message) {
  document.getElementById("calc-" + kind + "-error").textContent = message;
}

// one answer box: a big number with a small label under it
function resultBox(bigText, label) {
  return '<div class="calc-box">' +
    '<p class="split-number">' + bigText + '</p>' +
    '<p class="split-label">' + label + '</p>' +
  '</div>';
}


// ---------- 4. The Calculate button ----------

// runs the right math for this calculator and shows the answers
function calculate(kind) {
  showCalcError(kind, "");
  let html = "";

  if (kind === "budget") {
    html = budgetResults();
  } else if (kind === "goal") {
    html = goalResults();
  } else if (kind === "emergency") {
    html = emergencyResults();
  } else if (kind === "compound") {
    html = compoundResults();
  } else if (kind === "credit") {
    html = creditResults();
  } else if (kind === "paycheck") {
    html = paycheckResults();
  } else if (kind === "mortgage") {
    html = mortgageResults();
  } else if (kind === "hourly") {
    html = hourlyResults();
  } else if (kind === "car") {
    html = carResults();
  }

  // if something was typed wrong, html is "" and the answers stay empty
  document.getElementById("calc-" + kind + "-results").innerHTML = html;
}


// ---------- 5. The math for each calculator ----------
// each one returns the answer boxes, or "" if something was typed wrong

// 50/30/20: needs, wants, and savings
function budgetResults() {
  let income = readMoney("budget", 0);

  if (income <= 0) {
    showCalcError("budget", "Type an income bigger than 0, like 1000 or 850.50");
    return "";
  }

  let needs = Math.round(income * 0.5);
  let wants = Math.round(income * 0.3);
  let savings = income - needs - wants;   // whatever is left, so the 3 parts always add up exactly

  return resultBox(formatMoney(needs), "50% needs") +
    resultBox(formatMoney(wants), "30% wants") +
    resultBox(formatMoney(savings), "20% savings");
}


// ---- savings goal math (the Goals page uses these too) ----

// how many weeks it takes to save up, saving the same amount every week
// Math.ceil rounds UP, because you need a full extra week to finish
function weeksToSave(price, weekly) {
  return Math.ceil(price / weekly);
}

// how much to save each week to reach a goal in a certain number of weeks
function savePerWeek(amountLeft, weeks) {
  return Math.ceil(amountLeft / weeks);
}

// savings goal: how many weeks until you can afford it
function goalResults() {
  let price = readMoney("goal", 0);
  let weekly = readMoney("goal", 1);

  if (price <= 0 || weekly <= 0) {
    showCalcError("goal", "Type amounts bigger than 0 in both boxes");
    return "";
  }

  let weeks = weeksToSave(price, weekly);

  // the date you'll reach your goal: today + (weeks x 7 days)
  let date = new Date();
  date.setDate(date.getDate() + weeks * 7);
  let dateText = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return resultBox(weeks + " weeks", "to reach your goal") +
    resultBox(dateText, "you'll have it around") +
    resultBox(formatMoney(price), "your goal");
}


// emergency fund: a starter fund, then 3 and 6 months of expenses
function emergencyResults() {
  let monthly = readMoney("emergency", 0);

  if (monthly <= 0) {
    showCalcError("emergency", "Type your monthly expenses, like 800");
    return "";
  }

  return resultBox(formatMoney(50000), "first goal: starter fund") +
    resultBox(formatMoney(monthly * 3), "good: 3 months") +
    resultBox(formatMoney(monthly * 6), "great: 6 months");
}


// compound interest: add money every month, and it grows a little every month
function compoundResults() {
  let monthly = readMoney("compound", 0);
  let years = readNumber("compound", 1);
  let rate = readNumber("compound", 2);

  if (monthly <= 0 || years <= 0 || years > 60 || rate < 0 || rate > 30) {
    showCalcError("compound", "Use an amount bigger than 0, 1 to 60 years, and a growth rate from 0 to 30%");
    return "";
  }

  let months = Math.round(years * 12);
  let monthlyRate = rate / 100 / 12;   // a yearly 7% is about 0.58% each month
  let balance = 0;

  // each month: add your money, then it grows a little
  for (let m = 0; m < months; m++) {
    balance = balance + monthly;
    balance = Math.round(balance * (1 + monthlyRate));
  }

  let putIn = monthly * months;   // the money you added yourself
  let growth = balance - putIn;   // the money that came from growth

  return resultBox(formatMoney(balance), "total after " + years + " years") +
    resultBox(formatMoney(putIn), "money you put in") +
    resultBox(formatMoney(growth), "growth you earned");
}


// credit card: how long to pay it off, and how much interest it costs
function creditResults() {
  let balance = readMoney("credit", 0);
  let apr = readNumber("credit", 1);
  let payment = readMoney("credit", 2);

  if (balance <= 0 || apr < 0 || apr > 100 || payment <= 0) {
    showCalcError("credit", "Use a balance bigger than 0, an APR from 0 to 100%, and a payment bigger than 0");
    return "";
  }

  // if the payment is smaller than the first month's interest, the debt never goes away
  let firstInterest = Math.round(balance * apr / 100 / 12);
  if (payment <= firstInterest) {
    showCalcError("credit", "That payment is too small. The interest grows faster than you pay it, so the debt would never go away!");
    return "";
  }

  let startBalance = balance;
  let months = 0;
  let totalInterest = 0;

  // each month: interest gets added, then your payment comes off
  while (balance > 0) {
    let interest = Math.round(balance * apr / 100 / 12);
    totalInterest = totalInterest + interest;
    balance = balance + interest - payment;
    months = months + 1;
  }

  return resultBox(months + " months", "to pay it off") +
    resultBox(formatMoney(totalInterest), "paid in interest") +
    resultBox(formatMoney(startBalance + totalInterest), "total you pay");
}


// paycheck: a ROUGH guess at taxes
// real taxes depend on where you live and how much you make
//   federal income tax: about 10%
//   Social Security: 6.2%
//   Medicare: 1.45%
//   state tax: about 4%
function paycheckResults() {
  let pay = readMoney("paycheck", 0);

  if (pay <= 0) {
    showCalcError("paycheck", "Type your pay before taxes, like 1000");
    return "";
  }

  let federal = Math.round(pay * 0.10);
  let socialSecurity = Math.round(pay * 0.062);
  let medicare = Math.round(pay * 0.0145);
  let state = Math.round(pay * 0.04);

  let taxes = federal + socialSecurity + medicare + state;
  let takeHome = pay - taxes;
  let percentKept = Math.round((takeHome / pay) * 100);

  return resultBox(formatMoney(takeHome), "take-home pay (about)") +
    resultBox(formatMoney(taxes), "taxes taken out") +
    resultBox(percentKept + "%", "of your pay you keep");
}


// mortgage: the monthly payment on a home loan, and the total interest
function mortgageResults() {
  let price = readMoney("mortgage", 0);
  let down = readMoney("mortgage", 1);
  let rate = readNumber("mortgage", 2);
  let years = readNumber("mortgage", 3);

  if (price <= 0 || down < 0 || down >= price) {
    showCalcError("mortgage", "Type a home price, and a down payment that's smaller than the price.");
    return "";
  }
  if (rate < 0 || rate > 20 || years < 1 || years > 40) {
    showCalcError("mortgage", "Use an interest rate from 0 to 20%, and 1 to 40 years.");
    return "";
  }

  let loan = price - down;   // you borrow the price minus your down payment
  let payment = mortgagePayment(loan, rate, years);
  let months = Math.round(years * 12);
  let totalInterest = payment * months - loan;

  return resultBox(formatMoney(payment), "monthly payment") +
    resultBox(formatMoney(totalInterest), "total interest") +
    resultBox(formatMoney(loan), "amount you borrow");
}


// hourly pay: how much you make each week, month, and year (before taxes)
function hourlyResults() {
  let hourly = readMoney("hourly", 0);
  let hours = readNumber("hourly", 1);

  if (hourly <= 0) {
    showCalcError("hourly", "Type your pay per hour, like 15 or 12.50");
    return "";
  }
  if (hours <= 0 || hours > 80) {
    showCalcError("hourly", "Type the hours you work each week, from 1 to 80.");
    return "";
  }

  let weekly = Math.round(hourly * hours);
  let yearly = weekly * 52;                // 52 weeks in a year
  let monthly = Math.round(yearly / 12);

  return resultBox(formatMoney(weekly), "each week") +
    resultBox(formatMoney(monthly), "each month") +
    resultBox(formatMoney(yearly), "each year (before taxes)");
}


// car loan: works just like a mortgage, only smaller and shorter
function carResults() {
  let price = readMoney("car", 0);
  let down = readMoney("car", 1);
  let rate = readNumber("car", 2);
  let years = readNumber("car", 3);

  if (price <= 0 || down < 0 || down >= price) {
    showCalcError("car", "Type a car price, and a down payment that's smaller than the price.");
    return "";
  }
  if (rate < 0 || rate > 30 || years < 1 || years > 8) {
    showCalcError("car", "Use an interest rate from 0 to 30%, and 1 to 8 years.");
    return "";
  }

  let loan = price - down;
  let payment = mortgagePayment(loan, rate, years);   // the same loan math as a mortgage
  let totalInterest = payment * Math.round(years * 12) - loan;

  return resultBox(formatMoney(payment), "monthly payment") +
    resultBox(formatMoney(totalInterest), "total interest") +
    resultBox(formatMoney(loan), "amount you borrow");
}


// the monthly payment for a loan (in cents)
// This is the standard loan formula:
//   payment = loan x r / (1 - (1 + r) to the power of -months)
//   where r is the interest rate for ONE month
// Math.pow(a, b) means "a to the power of b"
function mortgagePayment(loan, rate, years) {
  let months = Math.round(years * 12);
  let r = rate / 100 / 12;

  // with 0% interest, you just split the loan evenly
  if (r === 0) {
    return Math.round(loan / months);
  }

  return Math.round(loan * r / (1 - Math.pow(1 + r, -months)));
}
