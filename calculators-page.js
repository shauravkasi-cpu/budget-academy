// calculators-page.js
// Runs on both Calculators pages (calculators.html in Learn Mode, taxes.html in My Money).
// Makes a card for every calculator in calculators.js


function showCalculators() {
  let box = document.getElementById("calculator-list");
  box.innerHTML = "";

  for (let i = 0; i < calculators.length; i++) {
    let calc = calculators[i];

    // the id lets other pages link straight to one calculator, like taxes.html#paycheck-card
    box.innerHTML = box.innerHTML +
      '<div class="card" id="' + calc.kind + '-card">' +
        '<p class="card-title">' + calc.title + '</p>' +
        calculatorHTML(calc.kind) +
      '</div>';
  }
}


showCalculators();
