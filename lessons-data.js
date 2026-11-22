// lessons-data.js
// All the units and lessons in the course.
//
// ---------- Units ----------
// Each unit is a group of lessons.
//   title  - the name of the unit
//   badge  - the badge you get for finishing the whole unit
//   level  - your new skill level after you finish the unit
//
// ---------- Lessons ----------
// Each lesson has:
//   unit         - which unit it's in (1, 2, 3, ...)
//   title        - the name of the lesson
//   description  - one short sentence about it
//   badge        - the badge you get for finishing it
//   steps        - the lesson, one screen at a time (lessons without steps show "Coming soon")
//
// Every step has a "type". These are the types:
//
//   story       Jordan talking         { type, heading, text }
//   text        an explanation         { type, heading, text, points (optional list) }
//   question    a quick check          { type, question, choices, answer, explain }
//                                        answer = spot of the right choice (0 = first)
//   sort        put things in groups   { type, heading, text, buckets, items }
//                                        each item is { name, answer }
//                                        answer = spot of the right bucket (0 = first)
//   choice      what would you do?     { type, heading, text, choices }
//                                        each choice is { text, result, good }
//   calculator  try a calculator       { type, heading, text, kind }
//                                        kind = which calculator (see calculators.js)


const units = [
  { title: "Budgeting Basics", badge: "Budget Boss", level: "Budget Builder" },
  { title: "Banking and Saving", badge: "Super Saver", level: "Smart Saver" },
  { title: "Credit and Debt", badge: "Credit Champ", level: "Credit Smart" },
  { title: "Bills, Taxes, and Growing Up", badge: "Real World Ready", level: "Money Pro" },
  { title: "Investing and Building Wealth", badge: "Future Investor", level: "Money Master" }
];


const lessons = [

  // ==================== UNIT 1: BUDGETING BASICS ====================

  // ---------- Lesson 1 ----------
  {
    unit: 1,
    title: "What Is a Budget?",
    description: "Learn what a budget is and why it helps you control your money.",
    badge: "Budget Basics",

    steps: [
      {
        type: "story",
        heading: "Meet Jordan",
        text: "Hi! I'm Jordan. I just started my first job at a grocery store, and I make $1,000 a month. Last month my money was gone before the month was even over, and I have no idea where it went. Can you help me make a plan?"
      },
      {
        type: "text",
        heading: "A budget is a plan for your money",
        text: "A budget shows how much money comes in and where it goes. The key is making the plan BEFORE you spend, not after. That way you decide where your money goes, instead of wondering where it went, like Jordan did."
      },
      {
        type: "question",
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
        type: "text",
        heading: "The 3 parts of a budget",
        text: "Every budget, big or small, has the same three parts:",
        points: [
          "Income: the money you earn, like Jordan's $1,000 paycheck.",
          "Expenses: the money you spend. Needs are things you have to pay for, like rent and groceries. Wants are things that are nice to have, like eating out.",
          "Savings: the money you keep for later."
        ]
      },
      {
        type: "sort",
        heading: "Help Jordan sort these",
        text: "Is each one a need or a want?",
        buckets: ["Need", "Want"],
        items: [
          { name: "Rent", answer: 0 },
          { name: "New sneakers", answer: 1 },
          { name: "Groceries", answer: 0 },
          { name: "Movie tickets", answer: 1 },
          { name: "Phone bill", answer: 0 },
          { name: "Eating out", answer: 1 }
        ]
      },
      {
        type: "question",
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
        type: "text",
        heading: "An easy rule: 50/30/20",
        text: "Not sure how to split your money? Start with this rule:",
        points: [
          "50% goes to needs",
          "30% goes to wants",
          "20% goes to savings"
        ]
      },
      {
        type: "calculator",
        kind: "budget",
        heading: "Try the 50/30/20 rule",
        text: "Type in a monthly income to see how the rule splits it up. Start with Jordan's $1,000, then try your own number."
      },
      {
        type: "question",
        question: "Jordan makes $1,000 a month. Using the 50/30/20 rule, how much should Jordan save?",
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
        type: "choice",
        heading: "Friday night",
        text: "Jordan's friends invite them to a $60 dinner. Rent is due next week, and Jordan only has $40 left for wants this month. What should Jordan do?",
        choices: [
          {
            text: "Go anyway and put it on a credit card",
            result: "Jordan now owes $60 plus interest. Spending money you don't have is how debt starts.",
            good: false
          },
          {
            text: "Invite everyone over to cook dinner together",
            result: "Jordan spends $15 on groceries and still gets to hang out. Smart budgeting!",
            good: true
          },
          {
            text: "Go, and pay a little less rent this month",
            result: "Jordan gets a $35 late fee. Needs always come first.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "How to make your first budget",
        text: "This is the plan Jordan follows now:",
        points: [
          "1. Write down how much money you get each month.",
          "2. List everything you spend money on.",
          "3. Subtract your spending from your income.",
          "4. Spending too much? Cut wants first, because needs can't wait."
        ]
      },
      {
        type: "question",
        question: "You're spending more than you make. What should you cut first?",
        choices: [
          "Rent",
          "Wants, like eating out",
          "Groceries",
          "Your electric bill"
        ],
        answer: 1,
        explain: "Cut wants first. Needs like rent, food, and bills still have to be paid."
      },
      {
        type: "story",
        heading: "Jordan's new plan",
        text: "Thanks for the help! This month I made a budget: $500 for needs, $300 for wants, and $200 into savings. For the first time ever, I still had money left at the end of the month."
      }
    ]
  },

  // ---------- Lesson 2 ----------
  {
    unit: 1,
    title: "Needs vs. Wants",
    description: "Tell the difference between things you need and things you just want.",
    badge: "Smart Chooser",

    steps: [
      {
        type: "story",
        heading: "Jordan's tricky list",
        text: "My budget says $500 for needs and $300 for wants. But some things are confusing. Is my phone a need? What about new shoes when my old ones still work? Help me figure it out!"
      },
      {
        type: "text",
        heading: "What makes something a need?",
        text: "A need is something you must have to live, work, or stay safe. A want is something that makes life nicer, but you'd be okay without it.",
        points: [
          "Needs: a place to live, basic food, electricity and water, a way to get to work, basic clothes, medicine.",
          "Wants: eating out, streaming services, the newest phone, name-brand clothes, concerts, video games."
        ]
      },
      {
        type: "sort",
        heading: "Need or want?",
        text: "Sort each one for Jordan.",
        buckets: ["Need", "Want"],
        items: [
          { name: "Electric bill", answer: 0 },
          { name: "Streaming service", answer: 1 },
          { name: "Bus pass to get to work", answer: 0 },
          { name: "Designer jeans", answer: 1 },
          { name: "Basic groceries", answer: 0 },
          { name: "Concert tickets", answer: 1 },
          { name: "Medicine", answer: 0 },
          { name: "New video game", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "The gray area",
        text: "Some things are part need and part want. A phone is a need if you use it for work and to stay safe. But the newest $1,200 phone is a want. The basic version is the need. Anything extra is the want.",
        points: [
          "Need: a basic phone plan. Want: the newest phone with unlimited everything.",
          "Need: groceries. Want: snacks and name brands.",
          "Need: a way to get to work. Want: a brand new car."
        ]
      },
      {
        type: "question",
        question: "Jordan needs a phone for work. Which part is the WANT?",
        choices: [
          "Having a phone at all",
          "A basic phone plan",
          "Upgrading to the newest $1,200 phone",
          "Being able to call work"
        ],
        answer: 2,
        explain: "Jordan needs a phone, but the newest model is a want. A basic one does the job."
      },
      {
        type: "text",
        heading: "Why it matters",
        text: "When money is tight, needs get paid first. If you mix them up, you might spend rent money on things you don't really need. Knowing the difference helps you decide what to cut, and what to keep."
      },
      {
        type: "choice",
        heading: "The sneaker sale",
        text: "Jordan's sneakers still work fine, but a new pair is on sale for $120. Jordan only has $60 left for wants this month. What should Jordan do?",
        choices: [
          {
            text: "Buy them now on a credit card",
            result: "Now Jordan owes $120 plus interest for shoes they didn't even need yet.",
            good: false
          },
          {
            text: "Wait, and save $30 a week for them",
            result: "In a month Jordan can pay cash with no debt, if they still want them by then!",
            good: true
          },
          {
            text: "Skip groceries this week to afford them",
            result: "Food is a need. Trading a need for a want is how budgets break.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "The 24-hour rule",
        text: "Before you buy a want, wait 24 hours. If you still want it tomorrow, and it fits your budget, go for it. A lot of the time the urge goes away, and the money stays in your pocket.",
        points: [
          "1. See something you want.",
          "2. Wait one full day.",
          "3. Ask yourself: Do I still want it? Does it fit in my 30% for wants?"
        ]
      },
      {
        type: "question",
        question: "What is the 24-hour rule?",
        choices: [
          "Pay all your bills within 24 hours",
          "Wait a day before buying a want",
          "Spend your paycheck within 24 hours",
          "Save money for 24 days"
        ],
        answer: 1,
        explain: "Waiting a day helps you skip things you only wanted in the moment."
      },
      {
        type: "question",
        question: "Which one of these is a NEED?",
        choices: [
          "A streaming service",
          "A bus pass to get to work",
          "A new video game",
          "Dinner at a restaurant"
        ],
        answer: 1,
        explain: "Jordan needs a way to get to work. The others are wants."
      },
      {
        type: "story",
        heading: "Jordan waited",
        text: "I waited 24 hours on those sneakers and... I didn't even want them anymore! That's $120 that stayed in my pocket. I put it in savings instead."
      }
    ]
  },

  // ---------- Lesson 3 ----------
  {
    unit: 1,
    title: "Tracking Your Spending",
    description: "Find out where your money really goes, and stop small leaks.",
    badge: "Money Tracker",

    steps: [
      {
        type: "story",
        heading: "Where did it go?",
        text: "My budget says I should still have money this week, but my bank account says I don't. Something doesn't add up. Where is my money going?"
      },
      {
        type: "text",
        heading: "Why track your spending?",
        text: "A budget is your plan. Tracking is checking if you actually followed it. Most people think they spend way less than they really do, especially on small things."
      },
      {
        type: "text",
        heading: "Small leaks add up",
        text: "Small purchases happen so often that they turn into big numbers:",
        points: [
          "A $5 coffee every workday = about $100 a month",
          "A $12 lunch 3 times a week = about $150 a month",
          "$15 a week on apps and games = about $60 a month"
        ]
      },
      {
        type: "question",
        question: "Jordan buys a $5 coffee every workday (about 20 days a month). How much is that each month?",
        choices: [
          "$5",
          "$20",
          "$100",
          "$500"
        ],
        answer: 2,
        explain: "$5 x 20 days = $100 a month. That's $1,200 a year!"
      },
      {
        type: "text",
        heading: "Easy ways to track",
        text: "You don't need anything fancy. Pick one way and stick with it for a month:",
        points: [
          "Write every purchase in a notebook",
          "Type it into a notes app on your phone",
          "Check your bank app every few days",
          "Keep your receipts in an envelope"
        ]
      },
      {
        type: "sort",
        heading: "Planned or a leak?",
        text: "Is each one part of Jordan's plan, or a small leak?",
        buckets: ["Planned", "Leak"],
        items: [
          { name: "Rent payment", answer: 0 },
          { name: "Daily energy drink", answer: 1 },
          { name: "Weekly groceries", answer: 0 },
          { name: "Random in-app purchases", answer: 1 },
          { name: "Phone bill", answer: 0 },
          { name: "Late-night snack runs", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Look for patterns",
        text: "After a week or two, look at your list. Put your spending into groups like food, getting around, and fun. The group that surprises you the most is usually where you can save the most."
      },
      {
        type: "choice",
        heading: "Jordan's tracking week",
        text: "Jordan tracked one week and found $45 spent on drinks and snacks at the gas station. What should Jordan do?",
        choices: [
          {
            text: "Ignore it, it's only small stuff",
            result: "$45 a week is about $180 a month. Small stuff isn't small when it adds up!",
            good: false
          },
          {
            text: "Buy drinks in a pack at the grocery store instead",
            result: "A 12-pack costs about $8. Jordan saves over $30 a week and still gets drinks.",
            good: true
          },
          {
            text: "Stop tracking so it doesn't feel bad",
            result: "Not looking doesn't bring the money back. Tracking is how you take control.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "What's the main reason to track your spending?",
        choices: [
          "To feel bad about spending",
          "To see if you're really following your budget",
          "Because the bank makes you",
          "So you can spend more"
        ],
        answer: 1,
        explain: "Tracking shows if your real spending matches your plan."
      },
      {
        type: "question",
        question: "What's the BEST way to start tracking?",
        choices: [
          "Guess at the end of the month",
          "Write down every purchase for a month",
          "Only track big purchases",
          "Check your account once a year"
        ],
        answer: 1,
        explain: "Writing down everything, even small things, shows you the real picture."
      },
      {
        type: "story",
        heading: "What Jordan found",
        text: "I tracked everything for a month. Turns out I was spending $160 on snacks and drinks! Now I buy them at the grocery store and save about $100 a month. Tracking was totally worth it."
      }
    ]
  },

  // ---------- Lesson 4 ----------
  {
    unit: 1,
    title: "Making Your First Budget",
    description: "Build a real monthly budget, step by step, and give every dollar a job.",
    badge: "Budget Maker",

    steps: [
      {
        type: "story",
        heading: "Time for a real budget",
        text: "I've learned the basics. Now I want to make a real budget for next month. I take home $1,000. Can you help me plan every single dollar?"
      },
      {
        type: "text",
        heading: "Step 1: Know your income",
        text: "Start with the money you actually take home after taxes. That's the amount that lands in your bank account. For Jordan, that's $1,000 a month."
      },
      {
        type: "text",
        heading: "Step 2: List your expenses",
        text: "Write down everything you'll spend money on next month. Fixed expenses cost the same every month. Variable expenses change from month to month.",
        points: [
          "Fixed: rent $400, phone $40, bus pass $60",
          "Variable: groceries, snacks, fun money, clothes"
        ]
      },
      {
        type: "sort",
        heading: "Fixed or variable?",
        text: "Does each one cost the same every month, or does it change?",
        buckets: ["Fixed", "Variable"],
        items: [
          { name: "Rent", answer: 0 },
          { name: "Groceries", answer: 1 },
          { name: "Phone bill", answer: 0 },
          { name: "Eating out", answer: 1 },
          { name: "Streaming subscription", answer: 0 },
          { name: "Gas for a car", answer: 1 }
        ]
      },
      {
        type: "question",
        question: "What is a fixed expense?",
        choices: [
          "One that changes every month",
          "One that costs the same every month",
          "One you never have to pay",
          "Money you get from work"
        ],
        answer: 1,
        explain: "Fixed expenses, like rent, cost the same every month."
      },
      {
        type: "text",
        heading: "Step 3: Give every dollar a job",
        text: "Subtract your expenses from your income. Every dollar left should get a job, like savings. When nothing is left without a plan, your budget is done. Here's Jordan's:",
        points: [
          "Income: $1,000",
          "Needs (rent, phone, bus pass, groceries): $650",
          "Wants (fun, eating out, clothes): $200",
          "Savings: $150",
          "$650 + $200 + $150 = $1,000, so every dollar has a job"
        ]
      },
      {
        type: "text",
        heading: "When the rule doesn't fit",
        text: "Jordan's needs take 65% of the money, not 50%. That's okay! The 50/30/20 rule is a starting point, not a law. When needs cost more, take a little from wants so savings doesn't get skipped."
      },
      {
        type: "calculator",
        kind: "budget",
        heading: "Compare with the rule",
        text: "Here's what the 50/30/20 rule says for $1,000. Compare it to Jordan's real budget: $650 needs, $200 wants, $150 savings."
      },
      {
        type: "question",
        question: "Jordan makes $1,000 and plans $650 for needs and $200 for wants. How much is left for savings?",
        choices: [
          "$50",
          "$150",
          "$250",
          "$350"
        ],
        answer: 1,
        explain: "$1,000 - $650 - $200 = $150."
      },
      {
        type: "choice",
        heading: "Mid-month surprise",
        text: "Halfway through the month, Jordan's phone screen cracks. The repair costs $80. What should Jordan do?",
        choices: [
          {
            text: "Move $80 from fun money to pay for it",
            result: "Less fun this month, but rent, food, and savings are safe. That's how a budget bends without breaking.",
            good: true
          },
          {
            text: "Use some of the rent money",
            result: "Now Jordan is short on rent. Never take from needs to cover a surprise.",
            good: false
          },
          {
            text: "Put it on a credit card and forget about it",
            result: "The bill comes back next month with interest. Forgetting about it doesn't make it go away.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Step 4: Check in every week",
        text: "A budget isn't something you make once and forget. Check it every week. If you spend too much in one group, take it from another. At the end of the month, see what worked and make next month's budget even better."
      },
      {
        type: "question",
        question: "How often should you check your budget?",
        choices: [
          "Once a year",
          "Only when you run out of money",
          "About once a week",
          "Never, once it's made it's done"
        ],
        answer: 2,
        explain: "A quick weekly check keeps small problems from turning into big ones."
      },
      {
        type: "story",
        heading: "Jordan's first budget",
        text: "My first real budget worked! I paid every bill, had fun money, and saved $150. Even when my phone broke, I just moved money around. I actually feel in control now."
      }
    ]
  },

  // ---------- Lesson 5 ----------
  {
    unit: 1,
    title: "Smart Shopping and Meal Budgeting",
    description: "Spend less on food and shopping with a few simple habits.",
    badge: "Smart Shopper",

    steps: [
      {
        type: "story",
        heading: "The food problem",
        text: "Food is eating my budget alive! I planned $150 for groceries, but between groceries, fast food, and snacks, I spent almost $300 last month. Help!"
      },
      {
        type: "text",
        heading: "Food is a big expense",
        text: "For most people, food is one of the biggest parts of their budget, and the easiest one to overspend on. The good news is that it's also one of the easiest places to save."
      },
      {
        type: "text",
        heading: "Cooking vs. eating out",
        text: "Making food at home costs a lot less than buying it ready-made:",
        points: [
          "A fast food meal: about $12",
          "The same kind of meal cooked at home: about $4",
          "Eating out 10 times a month instead of cooking: about $80 extra"
        ]
      },
      {
        type: "question",
        question: "A fast food meal costs $12. Cooking the same meal at home costs $4. How much do you save by cooking?",
        choices: [
          "$4",
          "$8",
          "$12",
          "$16"
        ],
        answer: 1,
        explain: "$12 - $4 = $8 saved, every single time."
      },
      {
        type: "text",
        heading: "Plan your meals",
        text: "Before you shop, plan what you'll eat this week. Then make a list and only buy what's on it. Stores are designed to get you to buy extra stuff.",
        points: [
          "1. Plan your meals for the week",
          "2. Check what food you already have",
          "3. Make a list and stick to it",
          "4. Don't go shopping hungry!"
        ]
      },
      {
        type: "text",
        heading: "Compare unit prices",
        text: "The bigger box isn't always the better deal. Look for the unit price on the shelf tag. It tells you the price per ounce, so you can compare fairly.",
        points: [
          "Small cereal: $3.00 for 10 oz = 30 cents per oz",
          "Big cereal: $4.50 for 18 oz = 25 cents per oz",
          "The big box costs less per ounce, as long as you'll actually eat it all"
        ]
      },
      {
        type: "question",
        question: "Which juice is the better deal per ounce?",
        choices: [
          "Juice A: $2.00 for 20 oz",
          "Juice B: $3.00 for 40 oz"
        ],
        answer: 1,
        explain: "A costs 10 cents per oz. B costs 7.5 cents per oz, so B is the better deal."
      },
      {
        type: "sort",
        heading: "Smart move or budget trap?",
        text: "Sort each shopping habit.",
        buckets: ["Smart", "Trap"],
        items: [
          { name: "Shopping with a list", answer: 0 },
          { name: "Shopping while hungry", answer: 1 },
          { name: "Buying the store brand", answer: 0 },
          { name: "Buy 3, get 1 free on stuff you don't need", answer: 1 },
          { name: "Checking unit prices", answer: 0 },
          { name: "Grabbing candy at the checkout", answer: 1 }
        ]
      },
      {
        type: "choice",
        heading: "The big sale sign",
        text: "Jordan is at the store with a list. A huge sign says chips are \"Buy 2, get 2 free!\" Chips aren't on the list. What should Jordan do?",
        choices: [
          {
            text: "Grab 4 bags, it's a great deal",
            result: "It's only a deal if you needed it. Jordan just spent $8 that wasn't in the plan.",
            good: false
          },
          {
            text: "Stick to the list",
            result: "Jordan stays on budget. A sale on something you don't need isn't saving, it's spending.",
            good: true
          },
          {
            text: "Forget the list and buy whatever is on sale",
            result: "Jordan ends up with a cart full of \"deals\" and nothing for dinner. The bill is $40 over budget.",
            good: false
          }
        ]
      },
      {
        type: "calculator",
        kind: "goal",
        heading: "Make your savings work",
        text: "By cooking at home, Jordan saves about $20 a week. Jordan wants a $600 laptop. Use the savings goal calculator to see how long it will take, then try your own goal."
      },
      {
        type: "question",
        question: "What's the best way to avoid buying things you don't need at the store?",
        choices: [
          "Go shopping when you're hungry",
          "Make a list and stick to it",
          "Only buy things that are on sale",
          "Go shopping every day"
        ],
        answer: 1,
        explain: "A list keeps you focused on what you actually need."
      },
      {
        type: "story",
        heading: "Jordan's food budget",
        text: "I started planning meals and cooking most nights. Last month I spent $160 on food instead of $300! That's $140 more for savings, and I'm actually getting pretty good at cooking."
      }
    ]
  },


  // ==================== UNIT 2: BANKING AND SAVING ====================

  { unit: 2, title: "Checking vs. Savings Accounts", description: "What each bank account is for, and the fees to watch out for.", badge: "Bank Ready" },
  { unit: 2, title: "Pay Yourself First", description: "Why saving first works better than saving what's left.", badge: "Self Payer" },
  { unit: 2, title: "Emergency Funds", description: "How much to save for surprises, and why it comes first.", badge: "Safety Net" },
  { unit: 2, title: "Saving for Goals", description: "Plan for short-term and long-term goals, and see how long they take.", badge: "Goal Getter" },


  // ==================== UNIT 3: CREDIT AND DEBT ====================

  { unit: 3, title: "Debit vs. Credit Cards", description: "How each card works and when to use which one.", badge: "Card Smart" },
  { unit: 3, title: "Understanding Interest", description: "How interest makes debt grow, and why the minimum payment is a trap.", badge: "Interest Expert" },
  { unit: 3, title: "Credit Scores", description: "What your credit score means, and what raises or hurts it.", badge: "Score Keeper" },
  { unit: 3, title: "Paying Off Debt", description: "The snowball and avalanche methods for getting out of debt.", badge: "Debt Crusher" },
  { unit: 3, title: "Loans: Student, Car, and Personal", description: "What you really pay over time when you borrow money.", badge: "Loan Wise" },


  // ==================== UNIT 4: BILLS, TAXES, AND GROWING UP ====================

  { unit: 4, title: "Bills and Due Dates", description: "Stay organized, use autopay, and never pay a late fee.", badge: "On Time" },
  { unit: 4, title: "Your Paycheck and Taxes", description: "Why your paycheck is smaller than you expected.", badge: "Tax Aware" },
  { unit: 4, title: "Renting Your First Place", description: "Rent rules of thumb, deposits, and roommates.", badge: "Home Ready" },
  { unit: 4, title: "Insurance Basics", description: "Health, car, and renters insurance in plain words.", badge: "Covered" },
  { unit: 4, title: "Avoiding Scams", description: "Spot fake texts and get-rich-quick tricks, and protect your info.", badge: "Scam Spotter" },


  // ==================== UNIT 5: INVESTING AND BUILDING WEALTH ====================

  { unit: 5, title: "Saving vs. Investing", description: "Why money sitting in savings slowly loses value.", badge: "Growth Mindset" },
  { unit: 5, title: "The Magic of Compound Interest", description: "See why starting early makes a huge difference.", badge: "Early Starter" },
  { unit: 5, title: "Stocks, Bonds, and Funds", description: "What you actually own when you invest.", badge: "Market Basics" },
  { unit: 5, title: "Index Funds and Diversification", description: "Why spreading your money out lowers your risk.", badge: "Diversified" },
  { unit: 5, title: "Retirement Accounts: 401(k) and Roth IRA", description: "Employer matches, tax benefits, and free money.", badge: "Retirement Ready" },
  { unit: 5, title: "Risk and Your Investing Plan", description: "Investing for the long term, and the right order to do things.", badge: "Money Planner" }
];
