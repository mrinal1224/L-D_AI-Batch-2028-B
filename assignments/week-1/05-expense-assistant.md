# Assignment 05 — AI Smart Expense Assistant

**Difficulty:** Medium–Hard | **Estimated effort:** 2 hours

## Problem statement

Budgeting app users often record expenses without understanding spending patterns. Build an assistant that answers natural-language questions about spending, calculates remaining budget and offers grounded budgeting suggestions.

## Starter data

```javascript
const expenses = [
  { id: 1, category: "food", amount: 450 },
  { id: 2, category: "travel", amount: 1200 },
  { id: 3, category: "shopping", amount: 2500 },
  { id: 4, category: "food", amount: 800 },
  { id: 5, category: "entertainment", amount: 1500 },
  { id: 6, category: "travel", amount: 600 },
  { id: 7, category: "food", amount: 950 },
  { id: 8, category: "shopping", amount: 3000 },
  { id: 9, category: "utilities", amount: 1800 },
  { id: 10, category: "entertainment", amount: 700 }
];
const monthlyBudget = 20000;
```

All amounts are in INR and belong to one simulated month.

## Tool contracts

| Tool | Input | Expected output |
| --- | --- | --- |
| get_total_expenses | Empty object | Total expenditure |
| get_category_expenses | category: string | Category expenditure or not found |
| get_expense_breakdown | Empty object | Spending grouped by category |
| get_budget_status | Empty object | Budget, total and remaining balance |

## API contract

`POST /expenses/chat`

```json
{"prompt":"Where am I spending the most money and how much budget is left?"}
```

Illustrative response:
```json
{"response":"Shopping is your highest spending category at INR 5,500. You have spent INR 13,500 of your INR 20,000 budget, leaving INR 6,500. Consider reducing discretionary shopping."}
```

## Reference values

| Category | Amount (INR) |
| --- | ---: |
| Food | 2,200 |
| Travel | 1,800 |
| Shopping | 5,500 |
| Entertainment | 2,200 |
| Utilities | 1,800 |
| **Total** | **13,500** |
| **Remaining budget** | **6,500** |

## Requirements

- [ ] Implement four independent custom tools with Zod schemas.
- [ ] Use JavaScript for calculations, not LLM-generated arithmetic.
- [ ] Register all tools with one agent.
- [ ] Support multiple tool calls for combined questions.
- [ ] Handle unknown categories and ground suggestions in actual data.
- [ ] Return only final natural-language text.

## Acceptance tests

| Prompt | Expected result |
| --- | --- |
| How much have I spent? | INR 13,500 |
| How much did I spend on food? | INR 2,200 |
| Which category is highest? | Shopping |
| How much budget remains? | INR 6,500 |
| Can I spend another INR 8,000? | Exceeds budget by INR 1,500 |
| How can I reduce expenses? | Suggestions grounded in breakdown |
| How much did I spend on rent? | No recorded category |

**Bonus:** Implement an add_expense tool with positive amount validation and explicit user authorization before modifying in-memory data. Explain that changes reset on restart.

## Learning outcome

Combine deterministic business logic and multi-tool orchestration.

## Guided implementation (no solution code)

### Step 1 — Set up the application
Use express, dotenv, langchain, @langchain/google and zod. Copy the starter expenses and budget. Keep all amounts as numbers and use a consistent currency (INR). No web search is needed.

### Step 2 — Design the business functions
Before creating tools, decide the input and output for each calculation. Use JavaScript array methods such as filter and reduce to work with the data. Total spending, category totals, grouped breakdown and remaining balance should be deterministic: the same data must give the same numbers. Do not ask Gemini to calculate the reference totals.

### Step 3 — Test the calculations in isolation
Call each business function directly and compare against the reference table. Test unknown categories, empty data and a budget exceeded case. Decide whether unknown categories return zero with an explanation or a not-found result. Keep the behaviour consistent.

### Step 4 — Design four tool definitions
Wrap each function independently using tool(). For the category tool, describe the category string in a Zod object schema. For tools that need no arguments, use an empty object schema. Give each tool a distinct name and description explaining when it is useful. Return concise structured information for the model to interpret.

### Step 5 — Register the tools
Pass all four tools to createAgent. In the instructions, require verified expense data before financial claims and distinguish calculations from discretionary advice. A request combining spending and remaining budget may need multiple calls; avoid hardcoding prompt keywords to choose tools.

### Step 6 — Build the API
Validate the user prompt before agent.invoke. Check the final message for text and handle failures. Log actual tool names and inputs for demonstration. Do not expose raw agent history or credentials.

### Step 7 — Test combined requests
Verify the reference totals, highest category and remaining budget. For a proposed purchase, the budget tool supplies the balance; use deterministic JavaScript arithmetic for any exact additional calculation (you may extend a tool contract with an optional proposed amount if necessary). Test wording variations and unknown categories. Make sure suggestions follow the data.

### Hints and checkpoints
- Grouping expenses means accumulating amounts by category, not counting records.
- Avoid mutating the starter array in required read-only tools.
- For the optional add_expense tool, validate positive finite amounts and enforce explicit user authorization in application logic before writing; model instructions alone are not a permission check.
- Ask yourself: are all reported totals traceable to actual tool results?

[Back to Week 1 index](README.md)
