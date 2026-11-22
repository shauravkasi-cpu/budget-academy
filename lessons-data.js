// lessons-data.js
// The list of all lessons.
// To add a lesson, just add another { } to the list.
//
// Each lesson can have:
//   title        - the name of the lesson
//   description  - one short sentence about it
//   sections     - the lesson itself: a list of { heading, text }
//   quiz         - the questions at the end: a list of
//                  { question, choices, answer, explain }
//                  answer is the spot of the right choice (0 = first choice)
//
// Lessons without sections or a quiz show "Coming soon".

const lessons = [
  {
    title: "What Is a Budget?",
    description: "Learn what a budget is and why it helps you control your money.",

    sections: [
      {
        heading: "A budget is a plan for your money",
        text: "A budget shows how much money comes in and where it goes. The important part is that you make the plan BEFORE you spend, not after. That way you decide where your money goes, instead of wondering where it went."
      },
      {
        heading: "Why make a budget?",
        text: "Without a plan, money disappears on small things you don't even remember buying. A budget helps you pay your bills on time, stay out of debt, and save up for things you really want, like a car or a trip."
      },
      {
        heading: "The 3 parts of a budget",
        text: "Income is the money you earn, like a paycheck. Expenses are the money you spend. Some expenses are needs (rent, groceries, bills) and some are wants (eating out, movies, games). Savings is the money you keep for later."
      },
      {
        heading: "An easy rule to start with: 50/30/20",
        text: "Put 50% of your income toward needs, 30% toward wants, and 20% into savings. For example, if you make $1,000 a month, that's $500 for needs, $300 for wants, and $200 for savings."
      },
      {
        heading: "How to make your first budget",
        text: "First, write down how much money you get each month. Next, list everything you spend money on. Then subtract your spending from your income. If you're spending more than you make, cut back on wants first, because needs like rent can't wait."
      }
    ],

    quiz: [
      {
        question: "What is a budget?",
        choices: [
          "A plan for how you will use your money",
          "A list of things you bought last year",
          "A type of bank account",
          "A loan from a bank"
        ],
        answer: 0,
        explain: "A budget is a plan you make before you spend."
      },
      {
        question: "Which one of these is a NEED?",
        choices: [
          "Concert tickets",
          "Rent",
          "A new video game",
          "Eating out with friends"
        ],
        answer: 1,
        explain: "Rent is a need because you have to have a place to live. The others are wants."
      },
      {
        question: "What is income?",
        choices: [
          "Money you spend",
          "Money you owe",
          "Money you earn",
          "Money you lost"
        ],
        answer: 2,
        explain: "Income is the money coming in, like a paycheck."
      },
      {
        question: "You make $1,000 a month. Using the 50/30/20 rule, how much should you save?",
        choices: [
          "$500",
          "$300",
          "$20",
          "$200"
        ],
        answer: 3,
        explain: "20% of $1,000 is $200."
      },
      {
        question: "You're spending more than you make. What should you cut first?",
        choices: [
          "Rent",
          "Wants, like eating out",
          "Groceries",
          "Your electric bill"
        ],
        answer: 1,
        explain: "Cut wants first. Needs like rent, food, and bills still have to be paid."
      }
    ]
  },
  {
    title: "Needs vs. Wants",
    description: "Tell the difference between things you need and things you just want."
  },
  {
    title: "Meal Budgeting",
    description: "Spend less on food by planning meals and cooking at home."
  },
  {
    title: "Saving and Emergency Funds",
    description: "Why you should save first, and how to be ready for surprises."
  },
  {
    title: "Bills and Due Dates",
    description: "Keep track of your bills so you never pay a late fee."
  },
  {
    title: "Debit vs. Credit Cards",
    description: "How each card works and when to use which one."
  },
  {
    title: "Understanding Interest",
    description: "How interest makes savings grow and makes debt cost more."
  },
  {
    title: "Taxes Basics",
    description: "What taxes are, where they come from, and why your paycheck is smaller."
  }
];
