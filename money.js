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
