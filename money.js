// money.js
// Helper functions for money.
// We store money in CENTS (whole numbers) so the math is always exact.
// Example: $12.34 is saved as 1234


// turns cents into a dollar string
// example: 124050 -> "$1,240.50"
function formatMoney(cents) {
  let dollars = cents / 100;
  return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
}


// turns what someone typed into cents
// example: "12.34" -> 1234
// returns -1 if it isn't a real money amount (empty, letters, or below zero)
function toCents(text) {
  let number = Number(text);

  if (text === "" || isNaN(number) || number < 0) {
    return -1;
  }

  // Math.round fixes tiny computer math mistakes, like 12.34 * 100 = 1233.9999
  return Math.round(number * 100);
}
