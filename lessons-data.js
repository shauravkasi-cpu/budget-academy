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
//   calculator  try a calculator       { type, heading, text, kind, values (optional) }
//                                        kind = which calculator (see calculators.js)
//                                        values = starting numbers for the boxes, like ["50", "5", "4"]


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

  // ---------- Lesson 6 ----------
  {
    unit: 2,
    title: "Checking vs. Savings Accounts",
    description: "What each bank account is for, and the fees to watch out for.",
    badge: "Bank Ready",

    steps: [
      {
        type: "story",
        heading: "Jordan's paycheck problem",
        text: "Right now I cash my paychecks at a store, and they keep a fee every time. My boss says I should open a bank account instead. But there are so many kinds! What's the difference between checking and savings?"
      },
      {
        type: "text",
        heading: "Why use a bank?",
        text: "Cash kept at home can be lost or stolen, and check-cashing stores often keep a few percent of every check. A bank or credit union keeps your money safe and doesn't charge you just to get paid.",
        points: [
          "Banks and credit unions both keep your money safe.",
          "Most U.S. banks are FDIC insured, and credit unions are NCUA insured. That means your money is protected up to $250,000, even if the bank fails.",
          "Credit unions are owned by their members and often have lower fees."
        ]
      },
      {
        type: "text",
        heading: "Checking accounts are for spending",
        text: "A checking account holds the money you use every day. It comes with a debit card, so you can pay at stores, pay bills online, and get cash from an ATM.",
        points: [
          "Good for: getting your paycheck, paying bills, everyday shopping",
          "Usually earns little or no interest"
        ]
      },
      {
        type: "text",
        heading: "Savings accounts are for keeping",
        text: "A savings account holds money you don't want to spend right now. It earns interest, which is money the bank pays you for keeping your money there.",
        points: [
          "Good for: your emergency fund and saving for goals",
          "A high-yield savings account (often at an online bank) pays a lot more interest than a regular one",
          "It's a little harder to spend on a whim, which is a good thing!"
        ]
      },
      {
        type: "sort",
        heading: "Checking or savings?",
        text: "Which account should Jordan use for each one?",
        buckets: ["Checking", "Savings"],
        items: [
          { name: "Paying the phone bill", answer: 0 },
          { name: "Emergency fund", answer: 1 },
          { name: "Buying groceries with a debit card", answer: 0 },
          { name: "Saving up for a car", answer: 1 },
          { name: "Getting paid by direct deposit", answer: 0 },
          { name: "Money for a trip next summer", answer: 1 }
        ]
      },
      {
        type: "question",
        question: "Which kind of account usually earns more interest?",
        choices: [
          "Checking",
          "Savings",
          "They always earn the same",
          "Neither one ever earns interest"
        ],
        answer: 1,
        explain: "Savings accounts are made for keeping money, so they pay more interest."
      },
      {
        type: "text",
        heading: "Watch out for fees",
        text: "Some accounts charge fees that slowly eat your money. Read the rules before you open one, and pick an account with no fees or very low fees.",
        points: [
          "Monthly fee: some accounts charge $5 to $15 a month unless you keep a minimum amount in them",
          "Overdraft fee: spend more than you have and pay a fee, often $25 to $35",
          "ATM fee: using another bank's ATM can cost $2 to $5 each time"
        ]
      },
      {
        type: "question",
        question: "Jordan has $20 in checking and buys a $25 shirt with a debit card. What could happen?",
        choices: [
          "Nothing, the bank covers it for free",
          "Jordan could be charged an overdraft fee",
          "The shirt becomes free",
          "The bank gives Jordan free money"
        ],
        answer: 1,
        explain: "Spending more than you have can cost an overdraft fee. Many banks let you turn overdraft off, so the card just gets declined instead."
      },
      {
        type: "choice",
        heading: "Picking a bank",
        text: "Bank A charges $12 a month unless you keep $1,500 in the account. Bank B is a credit union with no monthly fee. Jordan usually has about $300 in the account. Which should Jordan choose?",
        choices: [
          {
            text: "Bank A, because it has a cool app",
            result: "With only $300, Jordan pays $12 every month. That's $144 a year for nothing!",
            good: false
          },
          {
            text: "Bank B, because it has no monthly fee",
            result: "Jordan keeps every dollar. No-fee accounts are easy to find, especially at credit unions and online banks.",
            good: true
          },
          {
            text: "Neither, just keep cash under the bed",
            result: "Cash can be lost or stolen, and it earns nothing. A free account is safer.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "The best setup: use both",
        text: "Most people use checking for spending and savings for keeping. Here's how it works:",
        points: [
          "1. Your paycheck goes into checking.",
          "2. A set amount moves to savings right away.",
          "3. You spend from checking and leave savings alone."
        ]
      },
      {
        type: "question",
        question: "What does FDIC insurance do?",
        choices: [
          "It's a fee banks charge every month",
          "It protects your money if the bank fails",
          "It's insurance for your car",
          "It's a kind of credit card"
        ],
        answer: 1,
        explain: "FDIC insurance protects money in a bank, up to $250,000, even if the bank goes out of business."
      },
      {
        type: "story",
        heading: "Jordan opens accounts",
        text: "I opened a free checking account and a savings account at a credit union. No more check-cashing fees, and my paycheck shows up on its own. I even turned off overdraft so I can't get surprise fees."
      }
    ]
  },

  // ---------- Lesson 7 ----------
  {
    unit: 2,
    title: "Pay Yourself First",
    description: "Why saving first works better than saving what's left.",
    badge: "Self Payer",

    steps: [
      {
        type: "story",
        heading: "Nothing left to save",
        text: "Every month I promise myself I'll save whatever is left over. But at the end of the month, there's never anything left! What am I doing wrong?"
      },
      {
        type: "text",
        heading: "Saving last doesn't work",
        text: "When you save last, spending always wins. There's always something else to buy, so there's never anything left. \"Pay yourself first\" flips it around: you save FIRST, then spend what's left."
      },
      {
        type: "text",
        heading: "How it works",
        text: "Here's what payday looks like when Jordan pays themself first:",
        points: [
          "1. Payday: $1,000 lands in checking.",
          "2. Right away, $100 moves to savings.",
          "3. Jordan budgets and spends the other $900.",
          "The saving is done before Jordan even has a chance to spend it."
        ]
      },
      {
        type: "question",
        question: "What does \"pay yourself first\" mean?",
        choices: [
          "Buy yourself something nice on payday",
          "Put money into savings before you spend anything",
          "Pay all your bills last",
          "Ask your boss for a raise"
        ],
        answer: 1,
        explain: "Paying yourself first means savings comes out before any spending."
      },
      {
        type: "text",
        heading: "Make it automatic",
        text: "The easiest way is to set it up once and then forget about it. Most banks let you set up an automatic transfer from checking to savings on payday. Some jobs can even split your paycheck between two accounts.",
        points: [
          "You don't have to remember to do it.",
          "You never see the money, so you don't miss it.",
          "It still happens on busy or stressful weeks."
        ]
      },
      {
        type: "sort",
        heading: "Pay first or save last?",
        text: "Which habits pay yourself first?",
        buckets: ["Pay first", "Save last"],
        items: [
          { name: "Auto-transfer $50 every payday", answer: 0 },
          { name: "Save whatever is left at the end of the month", answer: 1 },
          { name: "Send 10% of each paycheck straight to savings", answer: 0 },
          { name: "Save money only when you remember", answer: 1 },
          { name: "Move money to savings the day you get paid", answer: 0 },
          { name: "Plan to save after you go shopping", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Start small",
        text: "You don't need to save a lot to start. Even $10 or $20 from each paycheck builds the habit. Once it feels normal, raise it a little. A great long-term goal is saving 10% to 20% of your income."
      },
      {
        type: "calculator",
        kind: "compound",
        values: ["50", "5", "4"],
        heading: "Watch it add up",
        text: "Jordan saves $50 a month in a high-yield savings account that earns about 4% a year. Press Calculate to see what Jordan has after 5 years, then try your own numbers."
      },
      {
        type: "question",
        question: "Jordan saves $25 every week. About how much is that in one year?",
        choices: [
          "$100",
          "$300",
          "$1,300",
          "$2,500"
        ],
        answer: 2,
        explain: "$25 x 52 weeks = $1,300 in a year."
      },
      {
        type: "choice",
        heading: "Jordan gets a raise",
        text: "Jordan's pay goes up from $1,000 to $1,100 a month. What should Jordan do with the extra $100?",
        choices: [
          {
            text: "Spend all of it, Jordan earned it",
            result: "Jordan's spending grows with the raise, and savings stays the same. This is called lifestyle creep.",
            good: false
          },
          {
            text: "Save half of it and enjoy the other half",
            result: "Jordan saves $50 more a month and still gets a little treat. That's a great balance!",
            good: true
          },
          {
            text: "Stop saving for a month to celebrate",
            result: "Stopping savings to celebrate undoes the habit Jordan worked hard to build.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Watch out for lifestyle creep",
        text: "When people start making more money, they often start spending more on nicer things, until the raise is all gone. Saving part of every raise keeps your savings growing along with your paycheck."
      },
      {
        type: "question",
        question: "What is lifestyle creep?",
        choices: [
          "When your bank adds new fees",
          "Spending more every time you earn more",
          "Saving part of every raise",
          "Moving to a new city"
        ],
        answer: 1,
        explain: "Lifestyle creep is when spending rises with income, so you never get ahead."
      },
      {
        type: "story",
        heading: "Jordan pays themself first",
        text: "I set up a $50 transfer every payday. Honestly, I don't even notice it's gone, and I already have $300 saved. Saving last never worked for me. Saving first does!"
      }
    ]
  },

  // ---------- Lesson 8 ----------
  {
    unit: 2,
    title: "Emergency Funds",
    description: "How much to save for surprises, and why it comes first.",
    badge: "Safety Net",

    steps: [
      {
        type: "story",
        heading: "The surprise",
        text: "My bike chain broke, and I need my bike to get to work. The repair costs $120, and I don't have $120 extra right now! What do people do when this happens?"
      },
      {
        type: "text",
        heading: "Surprises happen to everyone",
        text: "Car repairs, doctor visits, a broken phone, losing a job. Surprises like these happen to everyone sooner or later. An emergency fund is money saved ONLY for these moments, so a surprise doesn't turn into debt."
      },
      {
        type: "text",
        heading: "What counts as an emergency?",
        text: "Ask three questions: Is it unexpected? Is it necessary? Is it urgent? If the answer to all three is yes, it's an emergency.",
        points: [
          "Yes: a car or bike repair you need for work, a medical bill, losing your job",
          "No: a concert, a big sale, a new phone when your old one still works"
        ]
      },
      {
        type: "sort",
        heading: "Emergency or not?",
        text: "Should Jordan use the emergency fund for each one?",
        buckets: ["Emergency", "Not"],
        items: [
          { name: "Car repair to get to work", answer: 0 },
          { name: "Concert tickets", answer: 1 },
          { name: "Urgent dentist visit", answer: 0 },
          { name: "Big sale at the mall", answer: 1 },
          { name: "Losing your job", answer: 0 },
          { name: "Holiday gifts", answer: 1 }
        ]
      },
      {
        type: "question",
        question: "Why are holiday gifts NOT an emergency?",
        choices: [
          "Gifts are always a need",
          "You know they're coming every year, so you can plan for them",
          "Emergencies have to cost over $1,000",
          "Because stores are closed on holidays"
        ],
        answer: 1,
        explain: "Emergencies are surprises. Things you know are coming belong in your budget or a savings goal."
      },
      {
        type: "text",
        heading: "How much do you need?",
        text: "Build your emergency fund in steps:",
        points: [
          "Step 1: Save a starter fund of $500 to $1,000.",
          "Step 2: Build it up to 3 months of expenses.",
          "Step 3: Keep going until you have 6 months of expenses."
        ]
      },
      {
        type: "calculator",
        kind: "emergency",
        values: ["650"],
        heading: "Jordan's emergency fund goals",
        text: "Jordan's needs cost $650 a month. Press Calculate to see Jordan's goals, then try your own monthly expenses."
      },
      {
        type: "question",
        question: "Jordan's needs cost $650 a month. How much is 3 months of expenses?",
        choices: [
          "$650",
          "$1,300",
          "$1,950",
          "$3,900"
        ],
        answer: 2,
        explain: "$650 x 3 = $1,950."
      },
      {
        type: "text",
        heading: "Where to keep it",
        text: "Keep your emergency fund in a savings account, separate from checking. You should be able to get to it in a day or two, but not so easily that you spend it by accident. A high-yield savings account even lets it earn a little interest while it waits."
      },
      {
        type: "choice",
        heading: "Fund or credit card?",
        text: "Jordan's bike repair costs $120, and Jordan has $300 in an emergency fund. What should Jordan do?",
        choices: [
          {
            text: "Put it on a credit card to keep the fund safe",
            result: "Now Jordan pays interest on a repair they had the cash for. This is exactly what the fund is for!",
            good: false
          },
          {
            text: "Use the emergency fund, then refill it",
            result: "Jordan fixes the bike with no debt, then adds a little each payday until the fund is back to $300.",
            good: true
          },
          {
            text: "Skip work until payday",
            result: "Missing work means less pay. A $120 problem just became a much bigger one.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Refill it",
        text: "After you use your emergency fund, refill it before you save for anything else. Cut back on wants for a little while and send that money back to the fund."
      },
      {
        type: "question",
        question: "What should you do after you use your emergency fund?",
        choices: [
          "Close the account",
          "Refill it",
          "Spend the rest on a vacation",
          "Nothing, its job is done forever"
        ],
        answer: 1,
        explain: "Refill it right away so you're ready for the next surprise."
      },
      {
        type: "story",
        heading: "Jordan's safety net",
        text: "I used my emergency fund for the bike and refilled it in a month. Knowing that money is there makes me way less stressed. Now a surprise is just a speed bump, not a disaster."
      }
    ]
  },

  // ---------- Lesson 9 ----------
  {
    unit: 2,
    title: "Saving for Goals",
    description: "Plan for short-term and long-term goals, and see how long they take.",
    badge: "Goal Getter",

    steps: [
      {
        type: "story",
        heading: "Jordan's big plans",
        text: "Now that I have an emergency fund, I want to save for fun things! A new laptop, a trip with my friends, and someday a car. But how do I save for all of them at once?"
      },
      {
        type: "text",
        heading: "Short-term and long-term goals",
        text: "Goals come in different sizes, depending on how long they take:",
        points: [
          "Short-term (less than 1 year): a phone, concert tickets, gifts",
          "Medium-term (1 to 5 years): a car, a big trip, moving out",
          "Long-term (more than 5 years): college, a house, retirement"
        ]
      },
      {
        type: "sort",
        heading: "Short-term or long-term?",
        text: "Sort each of these goals.",
        buckets: ["Short-term", "Long-term"],
        items: [
          { name: "New headphones next month", answer: 0 },
          { name: "Buying a house", answer: 1 },
          { name: "A concert in 3 months", answer: 0 },
          { name: "Retirement", answer: 1 },
          { name: "Holiday gifts this December", answer: 0 },
          { name: "Paying for college in 6 years", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Make your goals SMART",
        text: "\"Save money\" is hard to stick to. \"Save $600 for a laptop by June\" is much easier. A SMART goal is:",
        points: [
          "Specific: what exactly do you want?",
          "Measurable: how much money is it?",
          "Achievable: can you really save that much?",
          "Relevant: does it actually matter to you?",
          "Time-bound: by when?"
        ]
      },
      {
        type: "question",
        question: "Which of these is the most SMART goal?",
        choices: [
          "Save some money someday",
          "Get rich",
          "Save $600 for a laptop by June",
          "Spend less"
        ],
        answer: 2,
        explain: "It says what, how much, and by when."
      },
      {
        type: "text",
        heading: "Do the math",
        text: "Divide the price by the number of weeks you have. That's how much to save each week.",
        points: [
          "$600 laptop / 30 weeks = $20 a week",
          "$1,200 trip / 40 weeks = $30 a week"
        ]
      },
      {
        type: "calculator",
        kind: "goal",
        values: ["1200", "30"],
        heading: "Plan Jordan's trip",
        text: "Jordan wants to go on a $1,200 trip with friends and can save $30 a week. Press Calculate to see when Jordan can go, then try a goal of your own."
      },
      {
        type: "question",
        question: "Jordan wants $300 headphones in 10 weeks. How much should Jordan save each week?",
        choices: [
          "$10",
          "$30",
          "$50",
          "$300"
        ],
        answer: 1,
        explain: "$300 / 10 weeks = $30 a week."
      },
      {
        type: "text",
        heading: "One bucket for each goal",
        text: "Many banks let you open more than one savings account, or split one into \"buckets,\" for free. Give each one a name, like \"Laptop\" or \"Trip.\" It's easier to stay motivated when you can watch each goal grow."
      },
      {
        type: "choice",
        heading: "Two goals, one paycheck",
        text: "Jordan can save $60 a week. Jordan wants a $600 laptop and a $1,200 trip. What's the smartest plan?",
        choices: [
          {
            text: "Put all $60 into the trip and forget the laptop",
            result: "The trip happens, but the laptop never does. Jordan can make room for both.",
            good: false
          },
          {
            text: "Split it: $20 to the laptop and $40 to the trip",
            result: "The laptop takes 30 weeks and the trip takes 30 weeks too. Both goals finish at the same time!",
            good: true
          },
          {
            text: "Spend it this week and start saving next month",
            result: "Putting it off is how goals turn into \"someday.\" Starting now, even small, is what works.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Save in the right order",
        text: "Not all goals are equal. A smart order is:",
        points: [
          "1. A starter emergency fund",
          "2. Costs you know are coming, like a car repair or a gift",
          "3. Goals you're excited about, like a trip",
          "4. Long-term goals like retirement (you'll learn about those in Unit 5)"
        ]
      },
      {
        type: "question",
        question: "Which should Jordan save for FIRST?",
        choices: [
          "A vacation",
          "A starter emergency fund",
          "A new phone",
          "Concert tickets"
        ],
        answer: 1,
        explain: "An emergency fund comes first, so surprises don't wreck your other goals."
      },
      {
        type: "story",
        heading: "Jordan hits a goal",
        text: "Thirty weeks later, I bought my laptop with cash, and my trip fund was full too! I never thought I could save $1,800. Setting real goals made it feel possible."
      }
    ]
  },


  // ==================== UNIT 3: CREDIT AND DEBT ====================

  // ---------- Lesson 10 ----------
  {
    unit: 3,
    title: "Debit vs. Credit Cards",
    description: "How each card works and when to use which one.",
    badge: "Card Smart",

    steps: [
      {
        type: "story",
        heading: "Jordan's mail",
        text: "I got a letter that says \"You're pre-approved for a credit card!\" I already have a debit card. What's the difference? Should I sign up?"
      },
      {
        type: "text",
        heading: "A debit card spends YOUR money",
        text: "A debit card is connected to your checking account. When you use it, the money comes out of your account right away. You can only spend what you have.",
        points: [
          "Money comes straight out of checking",
          "No bill to pay later",
          "No interest, because you aren't borrowing anything"
        ]
      },
      {
        type: "text",
        heading: "A credit card spends BORROWED money",
        text: "A credit card lets you borrow money from a bank, up to a limit. At the end of the month you get a bill. Pay the whole bill on time and you pay no interest. If you don't, the bank charges interest on whatever is left.",
        points: [
          "Credit limit: the most you can borrow, like $500",
          "Statement: your monthly bill",
          "APR: the interest rate on what you don't pay off, often 20% to 30% a year"
        ]
      },
      {
        type: "sort",
        heading: "Debit or credit?",
        text: "Which card does each one describe?",
        buckets: ["Debit", "Credit"],
        items: [
          { name: "Money leaves your checking account right away", answer: 0 },
          { name: "You get a bill at the end of the month", answer: 1 },
          { name: "You can only spend what you have", answer: 0 },
          { name: "It can help you build a credit score", answer: 1 },
          { name: "You're borrowing money", answer: 1 },
          { name: "You never pay interest", answer: 0 }
        ]
      },
      {
        type: "question",
        question: "When does a credit card charge you interest?",
        choices: [
          "Every time you use it",
          "When you don't pay the full bill by the due date",
          "Only on weekends",
          "Never"
        ],
        answer: 1,
        explain: "Pay the whole statement by the due date and you pay $0 in interest."
      },
      {
        type: "text",
        heading: "The good side of credit cards",
        text: "Used the right way, credit cards can help you:",
        points: [
          "Build a credit score, which matters later for renting an apartment and getting loans",
          "Get stronger protection if someone steals your card number",
          "Earn cash back or rewards on some cards"
        ]
      },
      {
        type: "text",
        heading: "The danger",
        text: "Credit cards make it easy to spend money you don't have. The bill comes later, and if you only pay part of it, interest piles up fast. The rule: only charge what you could pay for with cash today."
      },
      {
        type: "question",
        question: "What's the safest way to use a credit card?",
        choices: [
          "Spend up to the limit every month",
          "Only buy what you can pay off in full when the bill comes",
          "Pay the bill whenever you feel like it",
          "Use it, but never look at the bill"
        ],
        answer: 1,
        explain: "If you pay in full every month, a credit card never costs you interest."
      },
      {
        type: "choice",
        heading: "The pre-approved offer",
        text: "Jordan has a steady job, a budget, and an emergency fund. Should Jordan get a credit card?",
        choices: [
          {
            text: "Get it and use it for everything, then worry later",
            result: "Without a plan, Jordan could end up with a bill they can't pay. Credit cards need rules.",
            good: false
          },
          {
            text: "Get one with no yearly fee, use it for one small bill, and pay it in full every month",
            result: "Jordan builds credit safely and never pays interest. That's how to use a card like a pro.",
            good: true
          },
          {
            text: "Get five cards so there's more money to spend",
            result: "A credit card isn't extra money, it's borrowed money. More cards means more chances to get into debt.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "Jordan has $40 in checking and wants a $60 jacket. What should Jordan do?",
        choices: [
          "Put it on a credit card, it's basically free",
          "Wait until Jordan has the money",
          "Use the debit card and hope it works",
          "Borrow from the rent money"
        ],
        answer: 1,
        explain: "A credit card isn't extra money. If you can't afford it with cash, wait."
      },
      {
        type: "story",
        heading: "Jordan's first credit card",
        text: "I got a card with no yearly fee. I only use it for my $40 phone bill, and autopay pays it in full every month. I've never paid a cent of interest, and my credit score is growing."
      }
    ]
  },

  // ---------- Lesson 11 ----------
  {
    unit: 3,
    title: "Understanding Interest",
    description: "How interest makes debt grow, and why the minimum payment is a trap.",
    badge: "Interest Expert",

    steps: [
      {
        type: "story",
        heading: "Just the minimum",
        text: "My friend has a $1,000 credit card bill and only pays the minimum, about $30 a month. They said, \"It's fine, it's only $30.\" Is it really fine?"
      },
      {
        type: "text",
        heading: "What is interest?",
        text: "Interest is the cost of borrowing money. When you borrow, you pay back what you borrowed plus extra. When you save, the bank pays YOU interest. Interest can work for you or against you.",
        points: [
          "Saving: interest makes your money grow",
          "Borrowing: interest makes your debt grow"
        ]
      },
      {
        type: "text",
        heading: "What does APR mean?",
        text: "APR stands for Annual Percentage Rate. It's the yearly cost of borrowing. A 24% APR means about 2% of what you owe is added every month.",
        points: [
          "Savings accounts pay you about 0% to 5% a year",
          "Car loans often cost about 5% to 10% a year",
          "Credit cards often cost 20% to 30% a year"
        ]
      },
      {
        type: "question",
        question: "A credit card has a 24% APR. About how much interest gets added each month?",
        choices: [
          "24%",
          "12%",
          "2%",
          "0.24%"
        ],
        answer: 2,
        explain: "24% a year divided by 12 months is about 2% a month."
      },
      {
        type: "text",
        heading: "The minimum payment trap",
        text: "Credit cards let you pay a small minimum each month. It sounds easy, but a big part of that payment goes to interest instead of what you owe. That's why paying only the minimum can take years."
      },
      {
        type: "calculator",
        kind: "credit",
        values: ["1000", "24", "30"],
        heading: "The friend's credit card",
        text: "A $1,000 balance at 24% APR, paying $30 a month. Press Calculate to see how long it takes. Then change the payment to $100 and compare."
      },
      {
        type: "question",
        question: "Paying $30 a month takes 56 months and costs $664.43 in interest. Paying $100 a month takes only 12 months. Why is paying more so much better?",
        choices: [
          "The bank gives a prize for big payments",
          "More of each payment goes to the debt, so less interest builds up",
          "Interest stops after one year",
          "It isn't better"
        ],
        answer: 1,
        explain: "Bigger payments shrink the balance faster, and interest is charged on a smaller amount each month."
      },
      {
        type: "text",
        heading: "Interest can work FOR you too",
        text: "The same math helps you when you save or invest. You earn interest, and then you earn interest on that interest. This is called compound interest, and you'll see how powerful it is in Unit 5."
      },
      {
        type: "sort",
        heading: "For you or against you?",
        text: "Is interest helping or hurting in each case?",
        buckets: ["For you", "Against you"],
        items: [
          { name: "Interest from a savings account", answer: 0 },
          { name: "A credit card balance you don't pay off", answer: 1 },
          { name: "Investing for 30 years", answer: 0 },
          { name: "A payday loan", answer: 1 },
          { name: "A high-yield savings account", answer: 0 },
          { name: "Paying only the minimum", answer: 1 }
        ]
      },
      {
        type: "choice",
        heading: "An extra $100",
        text: "Jordan's friend has $100 extra this month and still owes on the 24% credit card. What should they do with it?",
        choices: [
          {
            text: "Spend it, the minimum is already paid",
            result: "The debt keeps growing at 24%. That $100 could have saved a lot of interest.",
            good: false
          },
          {
            text: "Put all $100 extra toward the credit card",
            result: "Every extra dollar shrinks the balance, so next month's interest is smaller. Great move!",
            good: true
          },
          {
            text: "Put it in a savings account that earns 4%",
            result: "Earning 4% while paying 24% is a losing deal. Paying off a 24% debt is like earning 24%.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "On a $1,000 credit card balance, which costs MORE in interest over time?",
        choices: [
          "Paying $200 a month",
          "Paying $30 a month"
        ],
        answer: 1,
        explain: "Smaller payments make the debt last longer, so you pay interest for more months."
      },
      {
        type: "story",
        heading: "Jordan helps a friend",
        text: "I showed my friend the calculator, and they were shocked! Now they pay $100 a month instead of $30. They'll be debt-free in about a year instead of almost five."
      }
    ]
  },

  // ---------- Lesson 12 ----------
  {
    unit: 3,
    title: "Credit Scores",
    description: "What your credit score means, and what raises or hurts it.",
    badge: "Score Keeper",

    steps: [
      {
        type: "story",
        heading: "The apartment application",
        text: "I want to rent my own apartment next year. The landlord said they'll check my credit score. I don't even know what that is! Is it like a grade?"
      },
      {
        type: "text",
        heading: "What is a credit score?",
        text: "A credit score is a number, usually from 300 to 850, that shows how well you handle borrowed money. Lenders, landlords, and even some phone and insurance companies look at it.",
        points: [
          "670 or higher: good",
          "740 or higher: very good",
          "Below 580: it can be hard to get approved"
        ]
      },
      {
        type: "question",
        question: "What range do most credit scores use?",
        choices: [
          "0 to 100",
          "300 to 850",
          "1 to 10",
          "A to F"
        ],
        answer: 1,
        explain: "Most credit scores go from 300 to 850."
      },
      {
        type: "text",
        heading: "What makes up your score",
        text: "Your score is built from five things:",
        points: [
          "Paying on time (about 35%): the biggest part!",
          "How much you owe (about 30%): use only a little of your credit limit",
          "How long you've had credit (about 15%)",
          "New credit (about 10%): opening lots of cards at once hurts",
          "Types of credit (about 10%)"
        ]
      },
      {
        type: "question",
        question: "What's the BIGGEST part of your credit score?",
        choices: [
          "How much money you make",
          "Paying your bills on time",
          "How many cards you have",
          "Where you live"
        ],
        answer: 1,
        explain: "Paying on time is about 35% of your score. How much you earn isn't part of it at all."
      },
      {
        type: "text",
        heading: "Use less of your limit",
        text: "Credit utilization means how much of your credit limit you're using. Try to keep it under 30%, and lower is even better. If your limit is $1,000, try to owe less than $300 when the bill comes."
      },
      {
        type: "question",
        question: "Jordan has a $500 credit limit. To stay under 30%, Jordan should owe less than...",
        choices: [
          "$50",
          "$150",
          "$300",
          "$500"
        ],
        answer: 1,
        explain: "30% of $500 is $150."
      },
      {
        type: "sort",
        heading: "Helps or hurts?",
        text: "What does each one do to your credit score?",
        buckets: ["Helps", "Hurts"],
        items: [
          { name: "Paying every bill on time", answer: 0 },
          { name: "Missing a payment", answer: 1 },
          { name: "Keeping your balance low", answer: 0 },
          { name: "Maxing out your card", answer: 1 },
          { name: "Keeping your oldest card open", answer: 0 },
          { name: "Opening 5 new cards in one month", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Check your credit for free",
        text: "You can see your credit reports for free at AnnualCreditReport.com, the official site. Look for mistakes or accounts you don't recognize. If something is wrong, you can ask to have it fixed."
      },
      {
        type: "choice",
        heading: "Almost late",
        text: "Jordan forgot about the credit card bill, and it's due tomorrow. Jordan has the money. What should Jordan do?",
        choices: [
          {
            text: "Pay it now, then set up autopay so it never happens again",
            result: "Paid on time, and autopay keeps it that way. Jordan's score stays healthy.",
            good: true
          },
          {
            text: "Pay it next month, it's no big deal",
            result: "Late payments can mean fees, and they can stay on your credit report for years.",
            good: false
          },
          {
            text: "Close the card so there's no bill",
            result: "The bill still has to be paid, and closing a card can lower your score.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "Who might look at your credit score?",
        choices: [
          "Only banks",
          "Landlords, lenders, and some phone and insurance companies",
          "Nobody ever looks at it",
          "Only your friends"
        ],
        answer: 1,
        explain: "Lots of companies check your credit before they agree to work with you."
      },
      {
        type: "story",
        heading: "Jordan's score",
        text: "After a year of paying on time and keeping my balance low, my score is over 700! The landlord approved my apartment application."
      }
    ]
  },

  // ---------- Lesson 13 ----------
  {
    unit: 3,
    title: "Paying Off Debt",
    description: "The snowball and avalanche methods for getting out of debt.",
    badge: "Debt Crusher",

    steps: [
      {
        type: "story",
        heading: "Too many debts",
        text: "My cousin has three debts: a $300 store card, a $2,000 credit card, and a $1,200 personal loan. They don't know where to start. Which one should they pay first?"
      },
      {
        type: "text",
        heading: "Step 1: Stop adding new debt",
        text: "You can't climb out of a hole while you're still digging. Before anything else, stop using credit cards for things you can't pay off. Stick to your budget and pay with cash or debit."
      },
      {
        type: "text",
        heading: "Step 2: List every debt",
        text: "Write down what you owe, the interest rate, and the minimum payment for each one. Here's the cousin's list:",
        points: [
          "Store card: $300 at 25% APR, minimum $25",
          "Credit card: $2,000 at 22% APR, minimum $60",
          "Personal loan: $1,200 at 10% APR, minimum $50"
        ]
      },
      {
        type: "text",
        heading: "The snowball method",
        text: "Pay the minimum on everything, then put every extra dollar toward the SMALLEST debt. When it's paid off, add its payment to the next smallest. Quick wins keep you motivated.",
        points: [
          "Order: $300 store card, then the $1,200 loan, then the $2,000 credit card"
        ]
      },
      {
        type: "text",
        heading: "The avalanche method",
        text: "Pay the minimum on everything, then put every extra dollar toward the debt with the HIGHEST interest rate. This saves the most money.",
        points: [
          "Order: the 25% store card, then the 22% credit card, then the 10% loan"
        ]
      },
      {
        type: "question",
        question: "Which method pays off the smallest debt first?",
        choices: [
          "Avalanche",
          "Snowball",
          "Both of them",
          "Neither of them"
        ],
        answer: 1,
        explain: "The snowball starts small, like a snowball rolling downhill and getting bigger."
      },
      {
        type: "question",
        question: "Which method usually saves the MOST money on interest?",
        choices: [
          "Snowball",
          "Avalanche",
          "They always save the same",
          "Paying only the minimums"
        ],
        answer: 1,
        explain: "The avalanche goes after the highest interest rate first, so less interest builds up."
      },
      {
        type: "sort",
        heading: "Snowball or avalanche?",
        text: "Which method does each one describe?",
        buckets: ["Snowball", "Avalanche"],
        items: [
          { name: "Pay the smallest balance first", answer: 0 },
          { name: "Pay the highest interest rate first", answer: 1 },
          { name: "Gives you quick wins", answer: 0 },
          { name: "Saves the most money", answer: 1 },
          { name: "Great if you need motivation", answer: 0 },
          { name: "Great if you want the cheapest plan", answer: 1 }
        ]
      },
      {
        type: "calculator",
        kind: "credit",
        values: ["2000", "22", "60"],
        heading: "Paying more makes a big difference",
        text: "Here's the cousin's $2,000 credit card at 22% APR, paying the $60 minimum. Press Calculate, then try $120 a month and see how much interest you save."
      },
      {
        type: "choice",
        heading: "A surprise bonus",
        text: "Jordan's cousin gets a $300 bonus at work. What's the best thing to do with it?",
        choices: [
          {
            text: "Pay off the $300 store card completely",
            result: "One debt is gone! Now that $25 minimum can go toward the next debt. That's the snowball in action.",
            good: true
          },
          {
            text: "Buy a new TV to celebrate",
            result: "The debts keep growing while the TV gets old. Celebrate after the debt is gone!",
            good: false
          },
          {
            text: "Open a new credit card for more room",
            result: "More credit means more chances for debt. The goal is to owe less, not borrow more.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Watch out for \"easy fixes\"",
        text: "Be careful of companies that promise to make your debt disappear fast. Many of them charge big fees. Free or low-cost help is available from nonprofit credit counselors, like the ones that belong to the NFCC."
      },
      {
        type: "question",
        question: "What should you do FIRST when you want to get out of debt?",
        choices: [
          "Open a new credit card",
          "Stop adding new debt",
          "Pay only the minimums forever",
          "Ignore the bills"
        ],
        answer: 1,
        explain: "Stopping new debt keeps the hole from getting deeper while you climb out."
      },
      {
        type: "story",
        heading: "The debt-free plan",
        text: "My cousin used the snowball method. The store card was gone in a month, the loan in a year, and now they're crushing the credit card. Watching the debts disappear one by one kept them going!"
      }
    ]
  },

  // ---------- Lesson 14 ----------
  {
    unit: 3,
    title: "Loans: Student, Car, and Personal",
    description: "What you really pay over time when you borrow money.",
    badge: "Loan Wise",

    steps: [
      {
        type: "story",
        heading: "Jordan needs a car",
        text: "I got a better job across town, and I need a car. The dealer says I can get a $15,000 car for \"only $256 a month!\" That sounds cheap. Is it?"
      },
      {
        type: "text",
        heading: "How a loan works",
        text: "Every loan has the same parts:",
        points: [
          "Principal: the amount you borrow",
          "Interest rate (APR): the yearly cost of borrowing",
          "Term: how long you have to pay it back",
          "Monthly payment: what you pay every month until it's paid off"
        ]
      },
      {
        type: "text",
        heading: "Longer loans cost more",
        text: "A longer loan has a smaller monthly payment, but you pay interest for more months. Here's a $15,000 car loan at 7% APR:",
        points: [
          "4 years: about $360 a month, about $2,236 in interest",
          "6 years: about $256 a month, about $3,408 in interest",
          "The smaller monthly payment costs over $1,100 more in the end!"
        ]
      },
      {
        type: "calculator",
        kind: "credit",
        values: ["15000", "7", "256"],
        heading: "Try the car loan",
        text: "This calculator works for any loan, not just credit cards. Here's the 6-year car loan: $15,000 at 7%, paying $256 a month. Press Calculate, then try $360 a month."
      },
      {
        type: "question",
        question: "Which car loan costs LESS in total?",
        choices: [
          "A 4-year loan with a higher monthly payment",
          "A 6-year loan with a lower monthly payment"
        ],
        answer: 0,
        explain: "Paying it off faster means fewer months of interest."
      },
      {
        type: "text",
        heading: "Student loans",
        text: "Student loans help pay for college. Federal student loans from the government usually have lower, fixed rates and more ways to get help if paying gets hard. Private loans from banks can cost more. Always fill out the FAFSA first, and use free money like grants and scholarships before you borrow."
      },
      {
        type: "sort",
        heading: "Free money or must pay back?",
        text: "Sort each way to pay for college or a car.",
        buckets: ["Free money", "Pay it back"],
        items: [
          { name: "Scholarship", answer: 0 },
          { name: "Federal student loan", answer: 1 },
          { name: "Pell Grant", answer: 0 },
          { name: "Private student loan", answer: 1 },
          { name: "Pay from a work-study job", answer: 0 },
          { name: "Car loan", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Personal loans and payday loans",
        text: "A personal loan is borrowed money you can use for almost anything, and the rate depends on your credit score. Payday loans are small, short loans that can cost over 300% APR. They trap a lot of people in debt, so stay away from them."
      },
      {
        type: "question",
        question: "Why are payday loans so dangerous?",
        choices: [
          "Their interest is very high, often over 300% APR",
          "They are free",
          "They raise your credit score a lot",
          "They take a long time to get"
        ],
        answer: 0,
        explain: "With rates that high, a small loan can quickly turn into a big debt."
      },
      {
        type: "choice",
        heading: "At the car dealer",
        text: "The dealer shows Jordan a $25,000 car for $350 a month over 7 years. Jordan's budget can handle a $15,000 car. What should Jordan do?",
        choices: [
          {
            text: "Get the $25,000 car, the monthly payment seems fine",
            result: "Over 7 years, Jordan pays thousands in interest for a car that loses value every year. A small monthly payment can hide the real cost.",
            good: false
          },
          {
            text: "Stick to a $15,000 car and the shortest loan Jordan can afford",
            result: "Jordan pays less interest, owns the car sooner, and keeps the budget safe. Smart!",
            good: true
          },
          {
            text: "Skip the loan and use the whole emergency fund",
            result: "The emergency fund is for surprises. Using all of it leaves Jordan with no safety net.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Before you sign anything",
        text: "Follow these rules before you take any loan:",
        points: [
          "Compare rates from a few places, like your bank or credit union",
          "Look at the TOTAL cost, not just the monthly payment",
          "A bigger down payment means you borrow less",
          "Never sign something you don't understand"
        ]
      },
      {
        type: "question",
        question: "When you compare loans, what's the most important thing to look at?",
        choices: [
          "Only the monthly payment",
          "The total cost, including interest",
          "The color of the car",
          "How friendly the salesperson is"
        ],
        answer: 1,
        explain: "The total cost shows what you really pay, and a low monthly payment can hide a lot of interest."
      },
      {
        type: "story",
        heading: "Jordan's car",
        text: "I bought a $14,000 used car with a 4-year loan from my credit union, at a lower rate than the dealer offered. My payment is a little higher, but I'll save over $1,000 and own the car two years sooner."
      }
    ]
  },


  // ==================== UNIT 4: BILLS, TAXES, AND GROWING UP ====================

  // ---------- Lesson 15 ----------
  {
    unit: 4,
    title: "Bills and Due Dates",
    description: "Stay organized, use autopay, and never pay a late fee.",
    badge: "On Time",

    steps: [
      {
        type: "story",
        heading: "Bills everywhere",
        text: "With my new apartment and car, I have bills everywhere! Rent, electric, internet, phone, a car payment, car insurance. Last month I forgot the internet bill and got a $15 late fee. How do people keep track of all this?"
      },
      {
        type: "text",
        heading: "What is a bill?",
        text: "A bill is money you owe for something you already used or agreed to pay for. Every bill has a due date, which is the last day you can pay without a penalty.",
        points: [
          "Due date: the last day to pay on time",
          "Late fee: extra money you have to pay for being late",
          "Very late bills can also hurt your credit score"
        ]
      },
      {
        type: "text",
        heading: "Fixed bills and variable bills",
        text: "Some bills are easy to plan for, and some change every month:",
        points: [
          "Fixed bills cost the same every month, like rent and a car payment",
          "Variable bills change, like electric and water",
          "For variable bills, budget a little extra so you're never surprised"
        ]
      },
      {
        type: "text",
        heading: "Make a bill calendar",
        text: "Write down every bill, how much it costs, and when it's due. Here's Jordan's:",
        points: [
          "1st: Rent, $600",
          "5th: Car payment, $340",
          "10th: Internet, $50",
          "15th: Electric, about $60",
          "20th: Phone, $40",
          "25th: Car insurance, $120"
        ]
      },
      {
        type: "question",
        question: "What is a due date?",
        choices: [
          "The day the bill is sent to you",
          "The last day to pay without a penalty",
          "The day you get paid",
          "Any day you feel like paying"
        ],
        answer: 1,
        explain: "Pay on or before the due date to avoid late fees."
      },
      {
        type: "sort",
        heading: "Fixed or variable bill?",
        text: "Does each bill stay the same, or change every month?",
        buckets: ["Fixed", "Variable"],
        items: [
          { name: "Rent", answer: 0 },
          { name: "Electric bill", answer: 1 },
          { name: "Car payment", answer: 0 },
          { name: "Water bill", answer: 1 },
          { name: "Streaming subscription", answer: 0 },
          { name: "Heating in the winter", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Use autopay",
        text: "Autopay pays a bill for you on the due date, all by itself. It's one of the easiest ways to never be late again. Just make sure the money is in your account first, or you could get an overdraft fee."
      },
      {
        type: "choice",
        heading: "Payday timing",
        text: "Jordan gets paid on the 15th and the 30th. Rent is $600 and due on the 1st. What's the best plan?",
        choices: [
          {
            text: "Spend the paycheck on the 15th and hope rent works out",
            result: "When the 1st comes, the money is gone. Bills need a plan, not hope.",
            good: false
          },
          {
            text: "Set aside $300 from each paycheck for rent",
            result: "When the 1st comes, the $600 is ready. Splitting big bills across paychecks makes them easy.",
            good: true
          },
          {
            text: "Pay rent whenever there's money left over",
            result: "Rent is due on the 1st, no matter what. Paying late means late fees and an angry landlord.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "What can happen if you pay a bill late?",
        choices: [
          "Nothing ever happens",
          "You might pay a late fee, and your credit score could drop",
          "The bill gets cheaper",
          "You get a reward"
        ],
        answer: 1,
        explain: "Late payments cost money, and very late ones can hurt your credit."
      },
      {
        type: "text",
        heading: "Check your subscriptions",
        text: "Subscriptions are sneaky bills: streaming, music, apps, and gyms. Each one is small, but they add up. Every few months, look at your bank statement and cancel anything you don't really use."
      },
      {
        type: "question",
        question: "Jordan pays for 3 streaming services at $15 each but only watches one. How much could Jordan save each month by canceling the other two?",
        choices: [
          "$15",
          "$30",
          "$45",
          "$60"
        ],
        answer: 1,
        explain: "2 services x $15 = $30 a month, or $360 a year!"
      },
      {
        type: "story",
        heading: "Jordan's bill system",
        text: "I made a bill calendar and set up autopay for every bill that's the same each month. I haven't paid a late fee since, and I canceled two subscriptions I forgot I even had!"
      }
    ]
  },

  // ---------- Lesson 16 ----------
  {
    unit: 4,
    title: "Your Paycheck and Taxes",
    description: "Why your paycheck is smaller than you expected.",
    badge: "Tax Aware",

    steps: [
      {
        type: "story",
        heading: "Where did my money go?",
        text: "My new job pays $2,000 a month. But my first paycheck was way less than I expected! Did my boss make a mistake?"
      },
      {
        type: "text",
        heading: "Gross pay and net pay",
        text: "Gross pay is what you earn before anything is taken out. Net pay, also called take-home pay, is what actually lands in your bank account. The difference is mostly taxes.",
        points: [
          "Gross pay: $2,000 (what Jordan earns)",
          "Net pay: what Jordan actually gets after taxes"
        ]
      },
      {
        type: "question",
        question: "What is net pay?",
        choices: [
          "Your pay before taxes",
          "The money you actually take home after taxes",
          "A yearly bonus",
          "Money you pay your boss"
        ],
        answer: 1,
        explain: "Net pay, or take-home pay, is what's left after taxes and other deductions."
      },
      {
        type: "text",
        heading: "What gets taken out",
        text: "These are the most common taxes on a paycheck:",
        points: [
          "Federal income tax: goes to the U.S. government",
          "Social Security (6.2%): pays for retirement and disability benefits",
          "Medicare (1.45%): health insurance for people 65 and older",
          "State income tax: depends on your state, and some states don't have one"
        ]
      },
      {
        type: "calculator",
        kind: "paycheck",
        values: ["2000"],
        heading: "Jordan's paycheck",
        text: "Press Calculate to see a rough guess of Jordan's take-home pay from $2,000. Real taxes depend on where you live and how much you earn, so this is only an estimate."
      },
      {
        type: "question",
        question: "In the calculator, about how much of Jordan's $2,000 goes to taxes?",
        choices: [
          "$0",
          "About $433",
          "About $1,000",
          "All of it"
        ],
        answer: 1,
        explain: "About $433 goes to taxes, so Jordan takes home about $1,567."
      },
      {
        type: "text",
        heading: "Reading your pay stub",
        text: "Every paycheck comes with a pay stub that shows where your money went:",
        points: [
          "Gross pay: the total you earned",
          "Taxes: each tax and how much was taken",
          "Deductions: other things taken out, like health insurance or retirement savings",
          "Net pay: what you actually get"
        ]
      },
      {
        type: "sort",
        heading: "Taken out of your pay?",
        text: "Is each one taken out of your paycheck?",
        buckets: ["Taken out", "Not taken out"],
        items: [
          { name: "Federal income tax", answer: 0 },
          { name: "Social Security", answer: 0 },
          { name: "Your rent", answer: 1 },
          { name: "Medicare", answer: 0 },
          { name: "Your phone bill", answer: 1 },
          { name: "Your grocery bill", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Filing your taxes",
        text: "Every year, usually by April 15, you file a tax return. It checks whether the right amount of tax was taken from your pay. Your job sends you a form called a W-2 that shows what you earned and what was taken out.",
        points: [
          "Too much was taken out? You get a refund.",
          "Too little was taken out? You owe the difference.",
          "Many people with simple taxes can file for free online."
        ]
      },
      {
        type: "question",
        question: "Which form does your job send you so you can file your taxes?",
        choices: [
          "A W-2",
          "A FAFSA",
          "A lease",
          "A pay stub from last year"
        ],
        answer: 0,
        explain: "The W-2 shows how much you earned and how much tax was taken out during the year."
      },
      {
        type: "choice",
        heading: "The tax refund",
        text: "Jordan files taxes and gets a $400 refund. What's the smartest thing to do with it?",
        choices: [
          {
            text: "Spend it all on a shopping trip",
            result: "Fun for a day, but the money is gone. A refund is a great chance to get ahead.",
            good: false
          },
          {
            text: "Add some to the emergency fund and put the rest toward a goal",
            result: "Jordan's safety net and savings both grow. A refund is your own money coming back, so use it wisely!",
            good: true
          },
          {
            text: "Never cash the refund",
            result: "That's Jordan's money! Leaving it sitting there helps no one.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Budget with your take-home pay",
        text: "Always build your budget from your net pay, not your gross pay. Net pay is the money you can actually spend. Jordan now budgets with about $1,567, not $2,000."
      },
      {
        type: "story",
        heading: "No mistake after all",
        text: "My boss didn't make a mistake! About $433 went to taxes that pay for things like roads, schools, and Social Security. Now I budget with my real take-home pay, and my plans finally work."
      }
    ]
  },

  // ---------- Lesson 17 ----------
  {
    unit: 4,
    title: "Renting Your First Place",
    description: "Rent rules of thumb, deposits, and roommates.",
    badge: "Home Ready",

    steps: [
      {
        type: "story",
        heading: "Moving out",
        text: "I'm ready to move into my own place! I found an apartment I love for $900 a month. My take-home pay is about $1,567. Can I afford it?"
      },
      {
        type: "text",
        heading: "The 30% rule",
        text: "A common rule is to spend no more than 30% of your gross pay (before taxes) on rent. Many landlords also want your income to be at least 3 times the rent.",
        points: [
          "Jordan's gross pay: $2,000 a month",
          "30% of $2,000 = $600",
          "So Jordan should look for rent around $600 or less"
        ]
      },
      {
        type: "question",
        question: "Jordan earns $2,000 a month before taxes. Using the 30% rule, what's the most Jordan should spend on rent?",
        choices: [
          "$300",
          "$600",
          "$900",
          "$1,500"
        ],
        answer: 1,
        explain: "30% of $2,000 is $600."
      },
      {
        type: "text",
        heading: "Why $900 is too much",
        text: "Rent of $900 would take over half of Jordan's $1,567 take-home pay. That leaves too little for food, the car, other bills, and savings. Falling behind on rent can lead to late fees, or even being evicted."
      },
      {
        type: "calculator",
        kind: "budget",
        values: ["1567"],
        heading: "Jordan's take-home budget",
        text: "Here's the 50/30/20 rule for Jordan's $1,567 take-home pay. All of Jordan's needs, including rent, should fit in the first box. A $600 apartment fits. A $900 apartment wouldn't even fit."
      },
      {
        type: "text",
        heading: "Move-in costs",
        text: "Moving in costs more than one month of rent. Plan for all of this:",
        points: [
          "First month's rent: $600",
          "Security deposit, often one month's rent: $600 (you get it back if you don't damage the place)",
          "Application fee: about $40",
          "Total before you move in: about $1,240"
        ]
      },
      {
        type: "question",
        question: "What is a security deposit?",
        choices: [
          "A fee you never get back",
          "Money the landlord holds and gives back if you don't damage the place",
          "Your first month's rent",
          "A tip for the landlord"
        ],
        answer: 1,
        explain: "Take photos when you move in, so you can show the damage wasn't yours when you move out."
      },
      {
        type: "text",
        heading: "The lease",
        text: "A lease is a contract between you and the landlord. Read the whole thing before you sign it. Look for:",
        points: [
          "How long it lasts, often 12 months",
          "How much rent is, and when it's due",
          "Late fees, and rules about pets, guests, and noise",
          "Who pays for repairs and which utilities"
        ]
      },
      {
        type: "sort",
        heading: "Saves money or costs more?",
        text: "Which choices make renting cheaper?",
        buckets: ["Saves money", "Costs more"],
        items: [
          { name: "Getting a roommate", answer: 0 },
          { name: "Living alone right downtown", answer: 1 },
          { name: "Living a little farther from the city", answer: 0 },
          { name: "Paying rent late", answer: 1 },
          { name: "A place with utilities included", answer: 0 },
          { name: "Breaking your lease early", answer: 1 }
        ]
      },
      {
        type: "choice",
        heading: "The roommate question",
        text: "Jordan's friend wants to split a $1,100 two-bedroom apartment. What should Jordan do before saying yes?",
        choices: [
          {
            text: "Say yes right away, friends never fight about money",
            result: "Even good friends can argue over money. A plan protects the friendship.",
            good: false
          },
          {
            text: "Agree on how to split rent, bills, and chores, and both sign the lease",
            result: "Jordan pays $550, and both know the rules. Clear agreements keep friendships and money safe.",
            good: true
          },
          {
            text: "Let the friend sign the lease alone and pay them in cash",
            result: "If Jordan isn't on the lease, Jordan has no protection if something goes wrong.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "What should you do before you sign a lease?",
        choices: [
          "Sign fast before someone else takes the place",
          "Read the whole lease and ask questions",
          "Only read the first page",
          "Let the landlord fill it out for you"
        ],
        answer: 1,
        explain: "A lease is a contract, so make sure you understand everything in it."
      },
      {
        type: "text",
        heading: "Don't forget renters insurance",
        text: "The landlord's insurance covers the building, not your stuff. Renters insurance covers your things if they're stolen or damaged, and it often costs only about $15 to $20 a month. You'll learn more about it in the next lesson."
      },
      {
        type: "story",
        heading: "Jordan's new home",
        text: "I found a two-bedroom with a friend for $1,100, so my share is $550. I saved the move-in money first, read the whole lease, and got renters insurance. It actually feels like home!"
      }
    ]
  },

  // ---------- Lesson 18 ----------
  {
    unit: 4,
    title: "Insurance Basics",
    description: "Health, car, and renters insurance in plain words.",
    badge: "Covered",

    steps: [
      {
        type: "story",
        heading: "Why pay for insurance?",
        text: "Everyone keeps telling me I need insurance for my health, my car, and my apartment. But it costs money every month. Why should I pay for something I might never use?"
      },
      {
        type: "text",
        heading: "What is insurance?",
        text: "Insurance protects you from huge costs you couldn't pay on your own. You pay a small amount regularly, and if something big happens, the insurance company helps pay for it.",
        points: [
          "Premium: what you pay every month (or year) to have insurance",
          "Deductible: what you pay first, before insurance starts paying",
          "Coverage: the things the insurance pays for"
        ]
      },
      {
        type: "question",
        question: "What is a premium?",
        choices: [
          "Money the insurance company pays you",
          "The amount you pay regularly to have insurance",
          "A type of car",
          "A fee for paying late"
        ],
        answer: 1,
        explain: "Your premium is the regular price of your insurance."
      },
      {
        type: "text",
        heading: "How a deductible works",
        text: "Say Jordan's car insurance has a $500 deductible, and an accident causes $2,000 in damage:",
        points: [
          "Jordan pays the first $500",
          "Insurance pays the other $1,500",
          "A higher deductible usually means a lower premium, but you pay more when something happens"
        ]
      },
      {
        type: "question",
        question: "Jordan has a $1,000 deductible and a $3,000 repair bill. How much does insurance pay?",
        choices: [
          "$0",
          "$1,000",
          "$2,000",
          "$3,000"
        ],
        answer: 2,
        explain: "Jordan pays the first $1,000, and insurance pays the other $2,000."
      },
      {
        type: "text",
        heading: "Health insurance",
        text: "Health insurance helps pay for doctor visits, medicine, and hospital stays. Without it, one trip to the emergency room can cost thousands of dollars.",
        points: [
          "You can usually stay on a parent's health plan until you turn 26",
          "Many jobs offer health insurance",
          "You can also shop for a plan at HealthCare.gov"
        ]
      },
      {
        type: "text",
        heading: "Car and renters insurance",
        text: "Two more kinds you'll probably need:",
        points: [
          "Car insurance is required in almost every state. It pays for damage you cause to other people, and it can cover your own car too.",
          "Renters insurance covers your things if they're stolen or damaged. It often costs about $15 to $20 a month."
        ]
      },
      {
        type: "sort",
        heading: "Which insurance covers it?",
        text: "Match each one to the right kind of insurance.",
        buckets: ["Health", "Car", "Renters"],
        items: [
          { name: "A doctor visit", answer: 0 },
          { name: "A fender bender", answer: 1 },
          { name: "A laptop stolen from your apartment", answer: 2 },
          { name: "Medicine", answer: 0 },
          { name: "Damage you cause to another car", answer: 1 },
          { name: "A fire that ruins your clothes and furniture", answer: 2 }
        ]
      },
      {
        type: "choice",
        heading: "Picking a deductible",
        text: "Jordan can choose car insurance with a $250 deductible for $140 a month, or a $1,000 deductible for $110 a month. Jordan has $1,500 in an emergency fund. What should Jordan do?",
        choices: [
          {
            text: "Pick the $1,000 deductible for $110 a month",
            result: "Jordan saves $30 a month, and the emergency fund can cover the $1,000 if something happens. Smart choice!",
            good: true
          },
          {
            text: "Skip car insurance to save money",
            result: "Driving without insurance is illegal in almost every state, and one accident could cost thousands.",
            good: false
          },
          {
            text: "Buy the cheapest plan without reading what it covers",
            result: "A cheap plan that barely covers anything can leave Jordan paying for most of an accident.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "Why does renters insurance matter?",
        choices: [
          "The landlord's insurance doesn't cover your things",
          "It pays your rent every month",
          "It's the same thing as car insurance",
          "It's only for people who own houses"
        ],
        answer: 0,
        explain: "The landlord's insurance covers the building. Your stuff is up to you."
      },
      {
        type: "text",
        heading: "Insurance belongs in your budget",
        text: "Insurance is a need, not a want. Put your premiums in your budget like any other bill, and keep your emergency fund big enough to pay your deductibles."
      },
      {
        type: "question",
        question: "What's the BEST reason to have insurance?",
        choices: [
          "To make money",
          "To protect you from huge costs you couldn't pay yourself",
          "Because it's free",
          "To get discounts at stores"
        ],
        answer: 1,
        explain: "Insurance turns a huge surprise cost into a small, planned one."
      },
      {
        type: "story",
        heading: "Jordan is covered",
        text: "I stayed on my parent's health plan, picked car insurance with a $1,000 deductible, and got renters insurance for $16 a month. Last month a tree branch fell on my car and did $2,500 of damage. I paid my $1,000 deductible, and insurance covered the rest. Totally worth it."
      }
    ]
  },

  // ---------- Lesson 19 ----------
  {
    unit: 4,
    title: "Avoiding Scams",
    description: "Spot fake texts and get-rich-quick tricks, and protect your info.",
    badge: "Scam Spotter",

    steps: [
      {
        type: "story",
        heading: "Too good to be true?",
        text: "I just got a text: \"Congrats! You won a $1,000 gift card! Click here and enter your bank info to claim it.\" I never entered any contest. Should I click?"
      },
      {
        type: "text",
        heading: "What is a scam?",
        text: "A scam is a trick to steal your money or your personal information. Scammers pretend to be someone you trust, like a bank, a company, or even the government. They usually try to rush you so you don't stop and think."
      },
      {
        type: "text",
        heading: "Red flags",
        text: "Watch out when someone:",
        points: [
          "Contacts you out of nowhere",
          "Says it's urgent: \"Act now or your account will be closed!\"",
          "Wants to be paid with gift cards, a wire transfer, crypto, or a payment app",
          "Asks for passwords, login codes, or your Social Security number",
          "Offers a deal that sounds too good to be true"
        ]
      },
      {
        type: "question",
        question: "Jordan never entered a contest, but gets a \"You won!\" text asking for bank info. What is it?",
        choices: [
          "A real prize",
          "Almost certainly a scam",
          "A message from Jordan's bank",
          "A free gift with no catch"
        ],
        answer: 1,
        explain: "You can't win a contest you never entered, and asking for bank info is a huge red flag."
      },
      {
        type: "sort",
        heading: "Scam or safe?",
        text: "Sort each message.",
        buckets: ["Scam", "Safe"],
        items: [
          { name: "\"Pay this fine with gift cards or you'll be arrested\"", answer: 0 },
          { name: "Your bank's app showing your balance", answer: 1 },
          { name: "\"Make $5,000 a week from home, just pay a $200 starter fee\"", answer: 0 },
          { name: "An electric bill you were expecting, from your real company", answer: 1 },
          { name: "\"We'll double your money in one week, guaranteed!\"", answer: 0 },
          { name: "A login code you just asked for", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Common scams",
        text: "These are some of the scams people fall for most often:",
        points: [
          "Phishing: fake texts or emails that look real and want you to click a link",
          "Fake jobs: \"jobs\" that make you pay to start, or send you a check to deposit and send back",
          "Get rich quick: promises of huge, guaranteed profits, often with crypto",
          "Government impostors: the real IRS won't call and demand gift cards"
        ]
      },
      {
        type: "question",
        question: "Which of these is a sign of a FAKE government call?",
        choices: [
          "They send you a letter in the mail",
          "They demand payment with gift cards right now",
          "They give you time to ask questions",
          "They tell you to check their official website"
        ],
        answer: 1,
        explain: "No real government office will ever ask you to pay with gift cards."
      },
      {
        type: "choice",
        heading: "The \"job offer\"",
        text: "Jordan gets an email offering $40 an hour for an easy online job. They'll mail Jordan a $2,000 check. Jordan just has to deposit it and send $1,500 back with a payment app. What should Jordan do?",
        choices: [
          {
            text: "Do it, it's easy money!",
            result: "The check bounces a few days later, and Jordan loses the $1,500 they sent. This is a common fake check scam.",
            good: false
          },
          {
            text: "Delete it and don't reply",
            result: "Smart! Real jobs never send you money and ask you to send some of it back.",
            good: true
          },
          {
            text: "Reply and ask for more details first",
            result: "Replying tells the scammers your email is real, so they'll keep trying. It's safer to just delete it.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Protect your info",
        text: "A few habits make it much harder for scammers to get to you:",
        points: [
          "Use a different strong password for each account",
          "Turn on two-factor authentication, which sends a code to your phone when you log in",
          "Never share a login code with anyone, even if they say they're from your bank",
          "Check your bank account often for charges you didn't make"
        ]
      },
      {
        type: "question",
        question: "Someone calls saying they're from your bank and asks for the code they just texted you. What should you do?",
        choices: [
          "Read them the code",
          "Hang up and call the number on the back of your card",
          "Give them half of the code",
          "Text the code to a friend first"
        ],
        answer: 1,
        explain: "Real banks don't call and ask for your codes. Call your bank yourself, using a number you trust."
      },
      {
        type: "text",
        heading: "If you get scammed",
        text: "It happens to smart people too, so don't be embarrassed. Act fast:",
        points: [
          "Call your bank right away to stop payments and protect your account",
          "Change your passwords",
          "Report it at ReportFraud.ftc.gov"
        ]
      },
      {
        type: "question",
        question: "What's the FIRST thing to do if you think you got scammed?",
        choices: [
          "Wait and see what happens",
          "Call your bank right away",
          "Send the scammer more money to fix it",
          "Post about it online"
        ],
        answer: 1,
        explain: "The faster your bank knows, the better the chance of stopping the money."
      },
      {
        type: "story",
        heading: "Jordan spots the scam",
        text: "I deleted that \"You won!\" text and blocked the number. A week later, my friend almost fell for the same one, and I showed them the red flags. Now I'm the scam expert in my group!"
      }
    ]
  },


  // ==================== UNIT 5: INVESTING AND BUILDING WEALTH ====================

  // ---------- Lesson 20 ----------
  {
    unit: 5,
    title: "Saving vs. Investing",
    description: "Why money sitting in savings slowly loses value.",
    badge: "Growth Mindset",

    steps: [
      {
        type: "story",
        heading: "Slow growth",
        text: "I have an emergency fund, no credit card debt, and I save every month. But my savings account barely grows! My coworker keeps talking about \"investing.\" What's the difference?"
      },
      {
        type: "text",
        heading: "Before we start",
        text: "This unit teaches the basics that most money experts agree on. It's for learning, not personal financial advice. Everyone's situation is different, so before you invest real money, do your research and talk to a trusted adult or a licensed professional."
      },
      {
        type: "text",
        heading: "Saving vs. investing",
        text: "Both are important, but they do different jobs:",
        points: [
          "Saving: keeping money safe for things you'll need soon, like an emergency fund. Low risk, low growth.",
          "Investing: buying things like stocks and funds that can grow over many years. More risk, but more growth over time."
        ]
      },
      {
        type: "text",
        heading: "Inflation",
        text: "Inflation means prices slowly go up over time. If your money grows slower than prices, it buys less each year, even though the number in your account stays the same.",
        points: [
          "Inflation is often around 2% to 3% a year",
          "At 3% inflation, prices double in about 24 years",
          "Money in a low-interest account can fall behind"
        ]
      },
      {
        type: "question",
        question: "What is inflation?",
        choices: [
          "When prices slowly go up over time",
          "When your bank adds money to your account",
          "A kind of investment",
          "When stores have a big sale"
        ],
        answer: 0,
        explain: "Inflation is why things cost more today than they did years ago."
      },
      {
        type: "sort",
        heading: "Save it or invest it?",
        text: "Where should Jordan keep the money for each one?",
        buckets: ["Save", "Invest"],
        items: [
          { name: "Emergency fund", answer: 0 },
          { name: "Retirement in 40 years", answer: 1 },
          { name: "A trip next summer", answer: 0 },
          { name: "Money you won't need for 20 years", answer: 1 },
          { name: "Next month's rent", answer: 0 },
          { name: "Building wealth for the future", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "A simple rule",
        text: "If you'll need the money within about 5 years, save it. If you won't need it for 5 years or more, investing might make sense. Investments can go down for a while, so you need time to wait for them to come back up."
      },
      {
        type: "question",
        question: "Jordan wants money for a new car in 1 year. Where should that money go?",
        choices: [
          "A savings account",
          "Stocks",
          "A brand new crypto coin",
          "Under the bed"
        ],
        answer: 0,
        explain: "Money you need soon should stay safe, because investments can drop right when you need them."
      },
      {
        type: "calculator",
        kind: "compound",
        values: ["100", "30", "4"],
        heading: "Saving vs. investing",
        text: "Here's $100 a month for 30 years at 4%, about what a good savings account might pay. Press Calculate. Then change the growth to 7%, which is closer to what the stock market has averaged over long periods (but it's never guaranteed)."
      },
      {
        type: "question",
        question: "With $100 a month for 30 years, about how much MORE does 7% grow to than 4%?",
        choices: [
          "About $500",
          "About $5,000",
          "About $53,000",
          "They're the same"
        ],
        answer: 2,
        explain: "$122,708.80 at 7% vs. $69,636.29 at 4%. A few percent makes a huge difference over 30 years."
      },
      {
        type: "choice",
        heading: "The coworker's tip",
        text: "A coworker says, \"Put all your savings into this new crypto coin. It's going to 10x next week!\" What should Jordan do?",
        choices: [
          {
            text: "Put everything in, even the emergency fund",
            result: "If the coin crashes, Jordan loses the emergency fund too. Nobody can promise an investment will go up.",
            good: false
          },
          {
            text: "Keep the emergency fund safe and learn about long-term investing first",
            result: "Smart. Promises of fast, huge gains are a red flag. Real investing is slow and steady.",
            good: true
          },
          {
            text: "Borrow on a credit card to buy even more",
            result: "Borrowing at 24% to gamble on a coin is one of the riskiest money moves there is.",
            good: false
          }
        ]
      },
      {
        type: "story",
        heading: "Jordan's plan",
        text: "My emergency fund stays in savings, because I need it ready. But money I won't touch for years? That's what I want to learn to invest. Let's keep going!"
      }
    ]
  },

  // ---------- Lesson 21 ----------
  {
    unit: 5,
    title: "The Magic of Compound Interest",
    description: "See why starting early makes a huge difference.",
    badge: "Early Starter",

    steps: [
      {
        type: "story",
        heading: "Too early to start?",
        text: "I'm young and I don't make that much. Shouldn't I wait until I'm older and have more money before I start investing?"
      },
      {
        type: "text",
        heading: "What is compound interest?",
        text: "Compound interest means your money grows, and then that growth grows too. Over time it snowballs. The longer it has to roll, the bigger the snowball gets."
      },
      {
        type: "text",
        heading: "A simple example",
        text: "Say you invest $1,000, and it grows 7% every year:",
        points: [
          "Year 1: $1,000 grows to $1,070",
          "Year 2: $1,070 grows to about $1,145",
          "Year 3: it grows to about $1,225",
          "Each year grows a little more than the last, because the growth is growing too"
        ]
      },
      {
        type: "question",
        question: "What makes compound interest so powerful?",
        choices: [
          "You only earn on the money you put in",
          "Your growth earns growth too, so it snowballs over time",
          "The bank doubles your money every year",
          "It only works for rich people"
        ],
        answer: 1,
        explain: "Growth on top of growth is what makes it snowball."
      },
      {
        type: "text",
        heading: "The Rule of 72",
        text: "Here's a quick way to see how fast money doubles: divide 72 by the yearly growth rate.",
        points: [
          "At 7% growth: 72 / 7 = about 10 years to double",
          "At 4%: 72 / 4 = 18 years",
          "At 1%: 72 years!"
        ]
      },
      {
        type: "question",
        question: "Using the Rule of 72, about how long does money take to double at 9% growth?",
        choices: [
          "4 years",
          "8 years",
          "20 years",
          "72 years"
        ],
        answer: 1,
        explain: "72 / 9 = 8 years."
      },
      {
        type: "text",
        heading: "Time is your superpower",
        text: "Two people each invest $100 a month at 7% until they turn 65:",
        points: [
          "Starts at 18: puts in $56,400, ends with about $441,000",
          "Starts at 28: puts in $44,400, ends with about $211,000",
          "Starting just 10 years earlier more than DOUBLES the result!"
        ]
      },
      {
        type: "calculator",
        kind: "compound",
        values: ["100", "47", "7"],
        heading: "Start at 18",
        text: "This is $100 a month from age 18 to 65 (47 years) at 7%. Press Calculate. Then change the years to 37 to see what happens if you start at 28 instead."
      },
      {
        type: "question",
        question: "Why does starting 10 years earlier make SUCH a big difference?",
        choices: [
          "You put in way more money",
          "The money has 10 extra years to snowball",
          "Younger people get higher interest rates",
          "It doesn't really make a difference"
        ],
        answer: 1,
        explain: "The early starter only puts in $12,000 more, but ends up with about $230,000 more."
      },
      {
        type: "sort",
        heading: "Helps it grow or slows it down?",
        text: "What does each one do to compound growth?",
        buckets: ["Helps", "Slows it"],
        items: [
          { name: "Starting early", answer: 0 },
          { name: "Waiting 10 years to start", answer: 1 },
          { name: "Adding money every month", answer: 0 },
          { name: "Taking money out often", answer: 1 },
          { name: "Leaving it alone for decades", answer: 0 },
          { name: "Paying high fees", answer: 1 }
        ]
      },
      {
        type: "choice",
        heading: "Jordan's first $50",
        text: "Jordan has an extra $50 a month. A friend says that's too small to matter. What should Jordan do?",
        choices: [
          {
            text: "Wait until Jordan can invest $500 a month",
            result: "Waiting costs years of growth. Small amounts started early often beat big amounts started late.",
            good: false
          },
          {
            text: "Start investing the $50 now, and add more later",
            result: "Perfect. Starting small and early lets compound interest do the heavy lifting.",
            good: true
          },
          {
            text: "Spend it, $50 is too small to grow",
            result: "$50 a month at 7% for 40 years grows to over $130,000. Small amounts matter!",
            good: false
          }
        ]
      },
      {
        type: "story",
        heading: "Jordan starts early",
        text: "I used to think investing was only for rich people. Now I know that time matters more than money. I'm starting small, and I'm letting compound interest do its thing."
      }
    ]
  },

  // ---------- Lesson 22 ----------
  {
    unit: 5,
    title: "Stocks, Bonds, and Funds",
    description: "What you actually own when you invest.",
    badge: "Market Basics",

    steps: [
      {
        type: "story",
        heading: "What am I buying?",
        text: "Everyone says \"invest in the stock market.\" But what does that even mean? What am I actually buying?"
      },
      {
        type: "text",
        heading: "Stocks: owning a piece of a company",
        text: "A stock, also called a share, is a tiny piece of ownership in a company. If the company grows and earns more, your share can be worth more. If the company struggles, your share can lose value.",
        points: [
          "Can grow a lot over many years",
          "Can also drop a lot, especially in the short term",
          "Some companies share their profits with owners. These payments are called dividends."
        ]
      },
      {
        type: "text",
        heading: "Bonds: lending money",
        text: "A bond is a loan you give to a company or the government. They pay you interest, then pay the loan back later. Bonds are usually safer than stocks, but they usually grow more slowly.",
        points: [
          "Lower risk than stocks",
          "Usually lower growth than stocks over long periods",
          "U.S. government bonds are considered very safe"
        ]
      },
      {
        type: "sort",
        heading: "Stock or bond?",
        text: "Which one does each sentence describe?",
        buckets: ["Stock", "Bond"],
        items: [
          { name: "You own a piece of a company", answer: 0 },
          { name: "You lend money and get paid interest", answer: 1 },
          { name: "Usually grows more over many years", answer: 0 },
          { name: "Usually safer and steadier", answer: 1 },
          { name: "Its price can swing a lot from day to day", answer: 0 },
          { name: "The government sells these to borrow money", answer: 1 }
        ]
      },
      {
        type: "question",
        question: "What do you own when you buy a stock?",
        choices: [
          "A loan to the company",
          "A tiny piece of the company",
          "A promise that you'll make money",
          "A job at the company"
        ],
        answer: 1,
        explain: "A stock makes you a part-owner of the company, even if it's a very tiny part."
      },
      {
        type: "text",
        heading: "Funds: a basket of investments",
        text: "A fund pools money from lots of people to buy many investments at once. Buying one share of a fund can mean owning tiny pieces of hundreds of companies.",
        points: [
          "Mutual funds and ETFs (exchange-traded funds) are two common kinds",
          "One fund can hold hundreds or even thousands of stocks or bonds",
          "Funds charge a small yearly fee called an expense ratio"
        ]
      },
      {
        type: "question",
        question: "Why might a beginner choose a fund instead of a single stock?",
        choices: [
          "Funds are guaranteed to go up",
          "A fund spreads money across many companies, so one bad company hurts less",
          "Funds have no risk at all",
          "Buying single stocks is against the law"
        ],
        answer: 1,
        explain: "Owning lots of companies means one bad one can't sink you."
      },
      {
        type: "text",
        heading: "Watch the fees",
        text: "A fund's expense ratio is a small percent of your money that you pay every year. It sounds tiny, but it adds up over decades.",
        points: [
          "A 0.05% fee costs $5 a year for every $10,000",
          "A 1% fee costs $100 a year for every $10,000",
          "Over 30 or more years, high fees can eat tens of thousands of dollars"
        ]
      },
      {
        type: "question",
        question: "Which yearly fund fee is better for you?",
        choices: [
          "1%",
          "0.05%"
        ],
        answer: 1,
        explain: "Lower fees mean more of your money stays invested and keeps growing."
      },
      {
        type: "choice",
        heading: "The trending stock",
        text: "Jordan's friend says, \"Just buy whatever stock is trending on social media.\" What should Jordan do?",
        choices: [
          {
            text: "Buy the trending stock with all of Jordan's savings",
            result: "Trends come and go. Putting everything into one hyped stock is gambling, not investing.",
            good: false
          },
          {
            text: "Learn about low-cost funds that own many companies",
            result: "Smart. Spreading your money out is one of the most important rules of investing, and it's the next lesson!",
            good: true
          },
          {
            text: "Never invest at all, because it's confusing",
            result: "It's fine to start slowly, but never investing means missing out on years of growth.",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "How people buy investments",
        text: "People usually buy stocks, bonds, and funds through a brokerage account or a retirement account, like a 401(k) or an IRA. Many brokerages let you start with very little money. Teens can invest using a custodial account that a parent helps manage."
      },
      {
        type: "question",
        question: "Which one is usually SAFER, but grows more slowly?",
        choices: [
          "Stocks",
          "Bonds"
        ],
        answer: 1,
        explain: "Bonds are usually steadier, while stocks usually grow more over long periods."
      },
      {
        type: "story",
        heading: "Jordan gets it",
        text: "So stocks are pieces of companies, bonds are loans, and funds are baskets of both. I don't have to pick the winners. I can just own a little bit of a lot!"
      }
    ]
  },

  // ---------- Lesson 23 ----------
  {
    unit: 5,
    title: "Index Funds and Diversification",
    description: "Why spreading your money out lowers your risk.",
    badge: "Diversified",

    steps: [
      {
        type: "story",
        heading: "All eggs, one basket",
        text: "My cousin put all his money into one company's stock, and it dropped 60% in a month. He's freaking out. How do I keep that from happening to me?"
      },
      {
        type: "text",
        heading: "Don't put all your eggs in one basket",
        text: "Diversification means spreading your money across many different investments. If one company does badly, the others can balance it out.",
        points: [
          "All your money in 1 stock: if that company fails, you could lose most of it",
          "Your money spread across 500 stocks: one company failing barely matters"
        ]
      },
      {
        type: "question",
        question: "What does diversification mean?",
        choices: [
          "Putting all your money into your favorite company",
          "Spreading your money across many different investments",
          "Only investing in bonds",
          "Checking your account every day"
        ],
        answer: 1,
        explain: "Spreading your money out means no single investment can sink you."
      },
      {
        type: "text",
        heading: "What is an index fund?",
        text: "An index fund buys every company on a list called an index. For example, an S&P 500 index fund owns pieces of about 500 of the biggest U.S. companies. Instead of trying to pick winners, you own the whole list.",
        points: [
          "Diversified right away",
          "Very low fees, because no one is paid to pick stocks",
          "Many experts suggest them for beginners and long-term investors"
        ]
      },
      {
        type: "question",
        question: "What does an S&P 500 index fund own?",
        choices: [
          "One big company",
          "Pieces of about 500 large U.S. companies",
          "Only government bonds",
          "Gold"
        ],
        answer: 1,
        explain: "It follows the S&P 500 list, so it owns a little of each company on it."
      },
      {
        type: "text",
        heading: "Why index funds work for so many people",
        text: "Picking the winning stocks is really hard, even for professionals. Over long periods, most funds run by stock pickers do worse than a simple index fund, partly because their fees are higher."
      },
      {
        type: "sort",
        heading: "Diversified or risky?",
        text: "Sort each way to invest.",
        buckets: ["Diversified", "Risky"],
        items: [
          { name: "An S&P 500 index fund", answer: 0 },
          { name: "All your money in one company", answer: 1 },
          { name: "A total stock market fund", answer: 0 },
          { name: "Everything in one trending crypto coin", answer: 1 },
          { name: "A mix of stock funds and bond funds", answer: 0 },
          { name: "Only the stocks your friend recommends", answer: 1 }
        ]
      },
      {
        type: "calculator",
        kind: "compound",
        values: ["200", "40", "7"],
        heading: "Slow and steady",
        text: "Index fund investing is boring on purpose. Here's $200 a month for 40 years at 7%. Press Calculate and see what slow and steady can do."
      },
      {
        type: "question",
        question: "In the calculator, about how much of the total came from growth, not from money put in?",
        choices: [
          "About $96,000",
          "About $432,000",
          "About $5,000",
          "$0"
        ],
        answer: 1,
        explain: "Jordan would put in $96,000, and growth would add about $432,000 more."
      },
      {
        type: "choice",
        heading: "The market drops",
        text: "Jordan's index fund drops 15% one year. Jordan's cousin says to sell everything before it gets worse. What should Jordan do?",
        choices: [
          {
            text: "Sell everything right now",
            result: "Selling locks in the loss. The market has always had ups and downs, and over long periods it has recovered from its drops.",
            good: false
          },
          {
            text: "Keep investing like normal and stay in for the long term",
            result: "Jordan keeps buying, even at lower prices. Staying patient is one of the most powerful things an investor can do.",
            good: true
          },
          {
            text: "Move it all into one hot stock to win it back fast",
            result: "Trying to win it back fast usually means taking even more risk.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "Why do index funds usually have low fees?",
        choices: [
          "They follow a list instead of paying people to pick stocks",
          "It's against the law to charge fees on them",
          "The government pays their fees",
          "They don't hold any investments"
        ],
        answer: 0,
        explain: "Following a list is simple, so it costs very little to run the fund."
      },
      {
        type: "story",
        heading: "Jordan's simple plan",
        text: "No more trying to find the next big stock. I'm putting my money in a low-cost index fund that owns hundreds of companies. Boring? Maybe. But boring is how a lot of people build wealth."
      }
    ]
  },

  // ---------- Lesson 24 ----------
  {
    unit: 5,
    title: "Retirement Accounts: 401(k) and Roth IRA",
    description: "Employer matches, tax benefits, and free money.",
    badge: "Retirement Ready",

    steps: [
      {
        type: "story",
        heading: "Free money?",
        text: "Someone at my job said the company \"matches 401(k) contributions up to 4%.\" Everyone acted like it was a big deal. What does that mean?"
      },
      {
        type: "text",
        heading: "Why retirement accounts?",
        text: "Retirement accounts are special investment accounts with tax benefits. The government gives you these tax breaks to encourage you to save for when you stop working. The money inside is usually invested in things like index funds.",
        points: [
          "They help your money grow with less taxes",
          "There are usually penalties if you take money out early, before about age 59",
          "They're meant for the long term"
        ]
      },
      {
        type: "text",
        heading: "The 401(k)",
        text: "A 401(k) is a retirement account you get through your job. The money comes straight out of your paycheck before you can spend it. That's paying yourself first!",
        points: [
          "Many employers offer a match: free money added when you save",
          "Example: \"100% match up to 4%\" means if you put in 4% of your pay, your employer adds 4% more"
        ]
      },
      {
        type: "text",
        heading: "Jordan's match",
        text: "Here's how the match works for Jordan:",
        points: [
          "Jordan earns $2,000 a month",
          "Jordan puts in 4% of $2,000 = $80 a month",
          "The company adds another $80, for free",
          "That's $160 a month going into Jordan's retirement"
        ]
      },
      {
        type: "question",
        question: "Jordan's company matches 100% up to 4%. If Jordan puts in 4% ($80), how much does the company add?",
        choices: [
          "$0",
          "$40",
          "$80",
          "$160"
        ],
        answer: 2,
        explain: "A 100% match means the company adds the same $80 Jordan puts in."
      },
      {
        type: "calculator",
        kind: "compound",
        values: ["160", "37", "7"],
        heading: "Jordan's 401(k)",
        text: "$160 a month (Jordan's $80 plus the $80 match) for 37 years at 7%. Press Calculate. Then change it to $80 to see what Jordan would have WITHOUT the match."
      },
      {
        type: "question",
        question: "About how much does the free match add to Jordan's total over 37 years?",
        choices: [
          "About $80",
          "About $1,000",
          "About $169,000",
          "Nothing at all"
        ],
        answer: 2,
        explain: "$337,403.61 with the match vs. $168,701.55 without it. Free money grows too!"
      },
      {
        type: "text",
        heading: "The Roth IRA",
        text: "An IRA is a retirement account you open yourself, not through a job. In a Roth IRA, you put in money you've already paid taxes on. It grows, and when you take it out in retirement, you usually pay no taxes on it at all.",
        points: [
          "You need income from a job to put money in",
          "A teen with a job can have one with a parent's help (a custodial Roth IRA)",
          "There's a limit on how much you can put in each year"
        ]
      },
      {
        type: "sort",
        heading: "401(k) or Roth IRA?",
        text: "Which account does each one describe?",
        buckets: ["401(k)", "Roth IRA"],
        items: [
          { name: "You get it through your job", answer: 0 },
          { name: "You open it yourself", answer: 1 },
          { name: "Your employer might match your money", answer: 0 },
          { name: "A teen with a summer job can open one with a parent", answer: 1 },
          { name: "Money comes straight out of your paycheck", answer: 0 },
          { name: "Usually no taxes when you take money out in retirement", answer: 1 }
        ]
      },
      {
        type: "choice",
        heading: "Take the match?",
        text: "Jordan's budget is tight. Jordan could put 0%, 2%, or 4% into the 401(k), and the company matches up to 4%. What should Jordan do?",
        choices: [
          {
            text: "Put in 0% and keep all the money now",
            result: "Jordan turns down $80 a month of free money. That's like saying no to a raise!",
            good: false
          },
          {
            text: "Put in 4% for the full match, and cut back on wants a little to make room",
            result: "Jordan gets every dollar of free money. Getting the full match is one of the best money moves there is.",
            good: true
          },
          {
            text: "Put in 2% to keep more cash",
            result: "Jordan only gets half of the free money. If at all possible, get the full match.",
            good: false
          }
        ]
      },
      {
        type: "question",
        question: "Why do people call an employer match \"free money\"?",
        choices: [
          "The government prints it for you",
          "Your employer adds money to your account just because you saved",
          "You never have to work for it",
          "It's a loan you pay back later"
        ],
        answer: 1,
        explain: "The match is extra money from your employer, on top of your pay."
      },
      {
        type: "story",
        heading: "Jordan's retirement",
        text: "I signed up for my 401(k) at 4% and got the full match. I barely notice the $80 missing from my paycheck, but my account grows by $160 every month. Future me is going to be very happy."
      }
    ]
  },

  // ---------- Lesson 25 ----------
  {
    unit: 5,
    title: "Risk and Your Investing Plan",
    description: "Investing for the long term, and the right order to do things.",
    badge: "Money Planner",

    steps: [
      {
        type: "story",
        heading: "Putting it all together",
        text: "I've learned so much! But it's a lot. In what ORDER should I do all of this? And how do I keep from panicking when the market drops?"
      },
      {
        type: "text",
        heading: "Risk and reward",
        text: "Investments with more risk can grow more, but they can also drop more. Investments with less risk are steadier, but they grow less. There's no growth without some risk.",
        points: [
          "Lower risk, lower growth: savings accounts, bonds",
          "Higher risk, higher growth over time: stocks and stock funds",
          "Very high risk: single hyped stocks, crypto, get-rich-quick schemes"
        ]
      },
      {
        type: "sort",
        heading: "Lower risk or higher risk?",
        text: "Sort each place to put money.",
        buckets: ["Lower risk", "Higher risk"],
        items: [
          { name: "High-yield savings account", answer: 0 },
          { name: "One trending stock", answer: 1 },
          { name: "U.S. government bonds", answer: 0 },
          { name: "A brand new crypto coin", answer: 1 },
          { name: "A bank savings account", answer: 0 },
          { name: "Borrowing money to invest", answer: 1 }
        ]
      },
      {
        type: "text",
        heading: "Your time horizon",
        text: "Your time horizon is how long until you need the money. The longer it is, the more time you have to ride out the ups and downs.",
        points: [
          "Need it in less than 5 years? Keep it safe in savings.",
          "Need it in 10 or more years? Investing in stock funds may make sense.",
          "As you get closer to needing it, many people slowly move to safer investments."
        ]
      },
      {
        type: "question",
        question: "Who can usually take on more investing risk?",
        choices: [
          "Someone who needs the money next month",
          "Someone who won't need the money for 40 years"
        ],
        answer: 1,
        explain: "More time means more time to recover from drops."
      },
      {
        type: "text",
        heading: "Markets go up AND down",
        text: "The stock market has had plenty of big drops. In 2020, it fell about 34% in about a month, then climbed back to where it was within about 6 months. People who sold in a panic locked in their losses. People who stayed in recovered.",
        points: [
          "Drops are normal, even though they're scary",
          "You don't need to check your account every day",
          "Keep investing on schedule, even when the market is down"
        ]
      },
      {
        type: "question",
        question: "The market drops 20%. What do long-term investors usually do?",
        choices: [
          "Sell everything right away",
          "Stay calm and keep investing on schedule",
          "Borrow money to bet on one stock",
          "Close the account forever"
        ],
        answer: 1,
        explain: "Patient investors keep going, because they don't need the money for years."
      },
      {
        type: "text",
        heading: "The money order",
        text: "Here's an order a lot of money experts suggest. Each step builds on the one before it:",
        points: [
          "1. Make a budget and spend less than you earn",
          "2. Save a starter emergency fund",
          "3. Get your full employer 401(k) match",
          "4. Pay off high-interest debt, like credit cards",
          "5. Grow your emergency fund to 3 to 6 months",
          "6. Invest more for retirement, like a Roth IRA with low-cost index funds",
          "7. Save and invest for your other goals"
        ]
      },
      {
        type: "question",
        question: "In the money order, what comes right after saving a starter emergency fund?",
        choices: [
          "Buying a new car",
          "Getting your full employer match",
          "Investing in crypto",
          "Buying a house"
        ],
        answer: 1,
        explain: "The match is free money, so it comes early in the order."
      },
      {
        type: "choice",
        heading: "Jordan's big plan",
        text: "Jordan has a $1,500 emergency fund, no credit card debt, the full 401(k) match, and $150 extra each month. What's a smart plan?",
        choices: [
          {
            text: "Put the whole $150 into one trending stock",
            result: "One stock is a gamble. Jordan's plan should be spread out and long term.",
            good: false
          },
          {
            text: "Grow the emergency fund to 3 months, then invest in a Roth IRA with a low-cost index fund",
            result: "That follows the money order perfectly. Jordan is safe today and building wealth for the future.",
            good: true
          },
          {
            text: "Spend it, Jordan already saves enough",
            result: "Jordan is doing great, but extra money invested early grows the most. Future Jordan says thanks!",
            good: false
          }
        ]
      },
      {
        type: "text",
        heading: "Good to know",
        text: "Everything in this course is for learning, not personal financial advice. Everyone's situation is different. Before making big money decisions, do your research and talk to a trusted adult or a licensed financial professional."
      },
      {
        type: "question",
        question: "Which plan is the SMARTEST for a long-term investor?",
        choices: [
          "Buy and sell every day to beat the market",
          "Invest regularly in low-cost, diversified funds and be patient",
          "Put everything into whatever is popular online",
          "Keep all your money in cash forever"
        ],
        answer: 1,
        explain: "Steady, low-cost, diversified investing is the plan many experts agree on."
      },
      {
        type: "story",
        heading: "Jordan's journey",
        text: "A year ago, my paycheck disappeared before the month was even over. Now I have a budget, an emergency fund, good credit, insurance, and money growing for my future. Budgeting really is a skill, and I learned it. You can too!"
      }
    ]
  }

];
