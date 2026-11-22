// calculators-page.js
// Runs on the Calculators page (calculators.html).
// Makes a card for every calculator in calculators.js


function showCalculators() {
  let box = document.getElementById("calculator-list");
  box.innerHTML = "";

  for (let i = 0; i < calculators.length; i++) {
    let calc = calculators[i];

    box.innerHTML = box.innerHTML +
      '<div class="card">' +
        '<p class="card-title">' + calc.title + '</p>' +
        '<p class="card-text">' + calc.text + '</p>' +
        calculatorHTML(calc.kind) +
      '</div>';
  }
}


showCalculators();
