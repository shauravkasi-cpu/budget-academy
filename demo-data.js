// demo-data.js
// Sample data for the demo version ("Continue without account").
// All money is in cents. Example: 98050 = $980.50


// the demo person's bank accounts and cards
const demoCards = [
  { name: "Checking (Debit)", balance: 98050 },
  { name: "Savings", balance: 26000 }
];

// bills that are coming up
// dueInDays = how many days from today the bill is due
const demoBills = [
  { name: "Electric", amount: 8500, dueInDays: 2 },
  { name: "Phone", amount: 4500, dueInDays: 5 },
  { name: "Internet", amount: 6000, dueInDays: 12 }
];

// savings goals
const demoGoals = [
  { name: "Car", saved: 93000, target: 150000 }
];

// skill points earned so far
const demoXP = 60;
