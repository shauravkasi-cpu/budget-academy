// spending-test-data.js
// The situations for the Spending Test (spending-test.js uses this list).
// Each test picks one situation. The situation stays the same for every question,
// and each question asks something different about it.
//
// title     - who this is
// about     - one sentence about them
// pay       - money they take home each month (in cents)
// bills     - what they pay each month (amounts in cents)
// facts     - a few more things to know
// questions - question, choices, answer (the spot of the right choice, starting at 0),
//             explain (why it's right), lesson (the lesson to review, 0 = Lesson 1)

const scenarios = [
  {
    title: "Maya, high school senior",
    about: "Maya works part-time at a coffee shop and drives her own car.",
    pay: 80000,
    bills: [
      { name: "Phone", amount: 5000 },
      { name: "Car insurance", amount: 12000 },
      { name: "Gas", amount: 8000 },
      { name: "Streaming", amount: 1500 }
    ],
    facts: ["$300 in savings", "No credit card debt"],
    questions: [
      {
        question: "Maya just got paid. What should she do first?",
        choices: [
          "Spend on what she wants, then see what's left for bills",
          "Set aside money for her bills and savings, then spend the rest",
          "Take it all out as cash",
          "Leave it in checking and not make a plan"
        ],
        answer: 1,
        explain: "Paying bills and savings first means fun spending can't eat the money you need.",
        lesson: 6
      },
      {
        question: "Maya wants to start saving but doesn't know how much. What's a good rule?",
        choices: [
          "Save whatever happens to be left at the end of the month",
          "Only save after she gets a raise",
          "Try to save about 20% of what she makes",
          "Wait until she's out of school"
        ],
        answer: 2,
        explain: "The 50/30/20 rule says about 20% of your pay should go to savings. Starting early helps the most.",
        lesson: 0
      },
      {
        question: "Which of Maya's costs is a want, not a need?",
        choices: ["Streaming", "Phone", "Car insurance", "Gas"],
        answer: 0,
        explain: "She needs her phone, insurance, and gas to get to work. Streaming is nice to have, but she could live without it.",
        lesson: 1
      },
      {
        question: "Maya's phone bill is due tomorrow, and she wants $90 shoes today. What should she do?",
        choices: [
          "Buy the shoes and pay the phone bill late",
          "Put the shoes on a credit card and skip saving this month",
          "Skip the phone bill this month",
          "Pay the phone bill first, then buy the shoes only if they fit her budget"
        ],
        answer: 3,
        explain: "Bills come first. Paying late can mean late fees and a hit to your credit.",
        lesson: 14
      },
      {
        question: "Maya's car needs a $250 repair. What's the best way to pay for it?",
        choices: [
          "Use her savings, then build them back up",
          "Put it on a credit card and pay the minimum",
          "Stop paying car insurance for two months",
          "Don't fix it and hope it's fine"
        ],
        answer: 0,
        explain: "This is exactly what savings are for. A credit card would charge her interest.",
        lesson: 7
      },
      {
        question: "Maya wants $600 for prom in 4 months. What's the best plan?",
        choices: [
          "Set it as a goal and save a little from every paycheck",
          "Wait until the week before and put it on a credit card",
          "Skip her car insurance for a few months",
          "Hope someone gives her the money"
        ],
        answer: 0,
        explain: "Breaking a big goal into small amounts from each paycheck makes it easy to reach on time.",
        lesson: 8
      },
      {
        question: "Maya gets her first credit card. How does she avoid paying interest?",
        choices: [
          "Pay the minimum every month",
          "Pay the full balance every month",
          "Pay half the balance every month",
          "Only use it at stores she likes"
        ],
        answer: 1,
        explain: "If you pay the full balance on time, you pay no interest at all.",
        lesson: 10
      },
      {
        question: "A text says Maya won a $500 gift card and asks for her bank login. What should she do?",
        choices: [
          "Send her login so she gets the prize",
          "Reply and ask if it's real",
          "Delete it and don't click any links",
          "Send only her password, not her username"
        ],
        answer: 2,
        explain: "Real companies never ask for your bank login by text. This is a scam.",
        lesson: 18
      }
    ]
  },

  {
    title: "Jordan, first apartment",
    about: "Jordan works full-time at a grocery store and just moved into an apartment with a friend.",
    pay: 160000,
    bills: [
      { name: "Rent (Jordan's half)", amount: 55000 },
      { name: "Groceries", amount: 25000 },
      { name: "Student loan", amount: 12000 },
      { name: "Utilities", amount: 6000 },
      { name: "Bus pass", amount: 6000 },
      { name: "Phone", amount: 4000 }
    ],
    facts: ["$400 in savings", "$300 on a credit card that charges 24% interest"],
    questions: [
      {
        question: "Jordan isn't sure where the money goes each month. What should Jordan do?",
        choices: [
          "Check the bank balance once a year",
          "Guess and hope it works out",
          "Stop using a bank",
          "Write down every purchase for a month to see where it goes"
        ],
        answer: 3,
        explain: "Tracking your spending shows you where your money really goes, so you know what to change.",
        lesson: 2
      },
      {
        question: "Jordan's rent is a little more than 30% of take-home pay. What does that mean?",
        choices: [
          "Jordan has to be extra careful with the rest of the budget",
          "It doesn't matter at all",
          "Jordan should stop paying rent",
          "Jordan should break the lease tomorrow"
        ],
        answer: 0,
        explain: "When rent is high, there's less room for everything else, so the other spending needs a plan.",
        lesson: 16
      },
      {
        question: "Jordan's job pays $2,000 a month, but only $1,600 shows up in the bank. Why?",
        choices: [
          "The bank keeps some as a fee",
          "Taxes and other things are taken out first",
          "Jordan's boss made a mistake",
          "Jordan spent it already"
        ],
        answer: 1,
        explain: "Your paycheck has taxes like federal, state, and Social Security taken out. What's left is your take-home pay.",
        lesson: 15
      },
      {
        question: "What's the smartest thing to do with the $300 credit card balance?",
        choices: [
          "Pay only the minimum, it's a small amount",
          "Ignore it until next year",
          "Add more to it so the credit score goes up",
          "Pay it off soon, because 24% interest is expensive"
        ],
        answer: 3,
        explain: "High interest debt grows fast. Paying it off is like earning 24% on your money.",
        lesson: 12
      },
      {
        question: "Jordan has $400 in savings. What is an emergency fund for?",
        choices: [
          "Vacations and concerts",
          "Surprise costs, like a car repair, a doctor visit, or losing a job",
          "Buying stocks",
          "Anything Jordan wants right now"
        ],
        answer: 1,
        explain: "An emergency fund is for surprises you can't plan for, so you don't have to use a credit card.",
        lesson: 7
      },
      {
        question: "Which cost could Jordan most easily lower?",
        choices: [
          "Groceries, by planning meals and cooking at home",
          "Rent, in the middle of the lease",
          "The student loan payment",
          "The bus pass Jordan needs to get to work"
        ],
        answer: 0,
        explain: "Rent and loans are set for now, but grocery spending is up to Jordan every week.",
        lesson: 4
      },
      {
        question: "Renter's insurance costs $15 a month. Is it worth it?",
        choices: [
          "No, the landlord's insurance covers Jordan's stuff",
          "No, only homeowners need insurance",
          "Yes, it protects everything Jordan owns for a small cost",
          "Only if Jordan has expensive art"
        ],
        answer: 2,
        explain: "The landlord's insurance covers the building, not your things. Renter's insurance is cheap protection.",
        lesson: 17
      },
      {
        question: "Jordan gets a raise of $200 a month. What's the best plan?",
        choices: [
          "Spend it all on eating out",
          "Move to a more expensive apartment right away",
          "Don't change anything, and spend it as it comes",
          "Save or pay down debt with most of it before spending grows"
        ],
        answer: 3,
        explain: "If you save a raise before you get used to spending it, you won't miss it.",
        lesson: 6
      }
    ]
  },

  {
    title: "Sam, new college grad",
    about: "Sam just started a full-time office job and has a car loan.",
    pay: 320000,
    bills: [
      { name: "Rent", amount: 100000 },
      { name: "Groceries", amount: 40000 },
      { name: "Car payment", amount: 35000 },
      { name: "Student loan", amount: 25000 },
      { name: "Car insurance", amount: 13000 },
      { name: "Utilities", amount: 12000 },
      { name: "Phone", amount: 6000 }
    ],
    facts: ["$2,000 in savings", "Sam's job will match 401(k) savings up to 4% of pay"],
    questions: [
      {
        question: "Sam has money left over after bills each month. What's a smart plan for it?",
        choices: [
          "Spend it on whatever comes up",
          "Leave it in checking and forget about it",
          "Use it all for eating out",
          "Give every dollar a job: some to savings, some to goals, some for fun"
        ],
        answer: 3,
        explain: "When every dollar has a plan, extra money goes to your goals instead of disappearing.",
        lesson: 3
      },
      {
        question: "Most of Sam's pay goes to needs, more than the 50% goal. What would help the most?",
        choices: [
          "Stop paying the student loan",
          "Find a cheaper place or a roommate when the lease ends",
          "Cancel the car insurance",
          "Put groceries on a credit card"
        ],
        answer: 1,
        explain: "Rent is Sam's biggest bill, so lowering it frees up the most money. Skipping bills or insurance causes bigger problems.",
        lesson: 16
      },
      {
        question: "Sam's job matches 401(k) savings up to 4% of pay. What should Sam do?",
        choices: [
          "Skip it until later",
          "Put in at least 4% to get the full match",
          "Put in 1% to start",
          "Take the match money out right away"
        ],
        answer: 1,
        explain: "A match is free money. If you don't put in 4%, you leave some of your pay on the table.",
        lesson: 23
      },
      {
        question: "Sam has $2,000 saved. What should Sam do with savings?",
        choices: [
          "Spend it on a vacation, $2,000 is plenty",
          "Put it all into one stock",
          "Keep building it until it covers 3 to 6 months of bills",
          "Stop saving now"
        ],
        answer: 2,
        explain: "A full emergency fund covers 3 to 6 months of bills, so a job loss or big repair doesn't become debt.",
        lesson: 7
      },
      {
        question: "Sam wants to start investing. Which is the best choice for a beginner?",
        choices: [
          "A low-cost index fund",
          "One stock a friend says will go up",
          "A crypto coin from a social media ad",
          "Lottery tickets"
        ],
        answer: 0,
        explain: "An index fund owns many companies at once, so one bad company doesn't sink you.",
        lesson: 22
      },
      {
        question: "Sam could have gotten the car loan at 3% or at 9% interest. Which is better?",
        choices: [
          "9%, because the payments go higher",
          "They cost the same in the end",
          "3%, because Sam pays less interest overall",
          "It doesn't matter for car loans"
        ],
        answer: 2,
        explain: "A lower interest rate means less money paid on top of the price of the car.",
        lesson: 13
      },
      {
        question: "Sam's credit score is 640. What helps raise it the most?",
        choices: [
          "Checking the score every day",
          "Paying every bill on time",
          "Opening lots of new cards at once",
          "Closing the oldest credit card"
        ],
        answer: 1,
        explain: "Paying on time is the biggest part of your credit score.",
        lesson: 11
      },
      {
        question: "Sam buys coffee every day and wonders if it matters. What's true?",
        choices: [
          "Small purchases never matter",
          "Only big purchases affect a budget",
          "Coffee counts as a need",
          "Small daily costs add up to a lot over a month or a year"
        ],
        answer: 3,
        explain: "$5 a day is about $150 a month. Small costs are easy to miss, so they're worth tracking.",
        lesson: 2
      }
    ]
  }
];
