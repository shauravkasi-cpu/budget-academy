// taxes.js
// Runs on the My Money Calculators page (taxes.html).
// The calculators are in calculators.js and calculators-page.js. This file adds the "Can I afford it?" check.


// does the mortgage payment fit within 28% of your monthly income?
function checkAfford() {
  let box = document.getElementById("afford-result");
  let income = loadBudget().income;   // from the Budget page (money-data.js)

  if (income <= 0) {
    box.innerHTML = '<p class="feedback feedback-wrong">Add your monthly income on the <a href="budget.html">Budget page</a> first.</p>';
    return;
  }

  // run the mortgage calculator first, so we know the numbers were typed right
  calculate("mortgage");
  if (document.getElementById("calc-mortgage-results").innerHTML === "") {
    box.innerHTML = '<p class="feedback feedback-wrong">Fix the mortgage numbers above first.</p>';
    return;
  }

  // the same math as the mortgage calculator (calculators.js)
  let loan = readMoney("mortgage", 0) - readMoney("mortgage", 1);
  let payment = mortgagePayment(loan, readNumber("mortgage", 2), readNumber("mortgage", 3));
  let maxPayment = Math.round(income * 28 / 100);   // 28% of your income
  let percent = Math.round((payment / income) * 100);

  let html = '<div class="calc-results">' +
    resultBox(formatMoney(payment), "monthly payment") +
    resultBox(formatMoney(maxPayment), "28% of your " + formatMoney(income) + " income") +
    resultBox(percent + "%", "of your income") +
    '</div>';

  if (payment <= maxPayment) {
    html = html + '<p class="feedback feedback-right">Yes! This payment fits within 28% of your income.</p>';
  } else {
    html = html + '<p class="feedback feedback-wrong">This payment is more than 28% of your income. ' +
      'Try a cheaper home, a bigger down payment, or a longer loan.</p>';
  }

  box.innerHTML = html;
}

