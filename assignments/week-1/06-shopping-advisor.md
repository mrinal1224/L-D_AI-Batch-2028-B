# Assignment 06 — AI Shopping Advisor and Market Comparison Agent

**Difficulty:** Hard | **Estimated effort:** 2–3 hours

## Problem statement

Shoppers struggle to find products that fit their budget, check availability and compare store prices against external offers. Build an agent that combines internal catalogue lookups with web research when requested.

## Starter data

```javascript
const products = [
  { id: 1, name: "Lenovo IdeaPad", category: "laptop", price: 45000, stock: 8, ram: "8GB" },
  { id: 2, name: "ASUS Vivobook", category: "laptop", price: 55000, stock: 5, ram: "16GB" },
  { id: 3, name: "MacBook Air", category: "laptop", price: 90000, stock: 3, ram: "16GB" },
  { id: 4, name: "Dell Inspiron", category: "laptop", price: 60000, stock: 0, ram: "16GB" },
  { id: 5, name: "Logitech Mouse", category: "accessories", price: 1500, stock: 20 },
  { id: 6, name: "Mechanical Keyboard", category: "accessories", price: 3500, stock: 12 }
];
```

All store prices and stock values are fictional and in INR.

## Tool contracts

| Tool | Type | Input / responsibility |
| --- | --- | --- |
| search_product | Custom | productName: string; retrieve product |
| filter_products | Custom | category: string, maxPrice: number (optional), minRamGB: number (optional); return matching products including stock |
| check_stock | Custom | productName: string; return availability |
| Tavily Search | External | Research external prices and specifications |

## API contract

`POST /shopping/chat`

```json
{"prompt":"I am a software engineering student looking for a laptop within 60000 with at least 16GB RAM. What should I buy from your store?"}
```

Illustrative response:
```json
{"response":"The ASUS Vivobook costs INR 55,000, has 16GB RAM and is in stock. The Dell Inspiron also meets the budget and RAM requirements but is out of stock."}
```

## Requirements

- [ ] Implement three independent custom tools with Zod schemas.
- [ ] Register the custom tools and Tavily with one agent.
- [ ] Apply category, budget and RAM filters in JavaScript; maxPrice is inclusive.
- [ ] Do not recommend out-of-stock products as immediately purchasable.
- [ ] Use external search for current market research or explicit comparisons, not routine store lookups.
- [ ] Distinguish store prices from external prices and include actual retrieved source links.
- [ ] Do not claim exact like-for-like comparisons if model identifiers or configurations are missing.
- [ ] Support multiple calls and return only the final text.

## Acceptance tests

| Prompt | Expected behaviour |
| --- | --- |
| Price of MacBook Air? | Internal lookup: INR 90,000 |
| Laptops under or equal to INR 60,000? | Lenovo, ASUS and Dell; disclose stock |
| Is Dell Inspiron available? | Out of stock |
| Recommend an available 16GB laptop within INR 60,000 | ASUS Vivobook |
| Compare ASUS Vivobook with online prices | Internal tool and Tavily; disclose model uncertainty |
| Laptop and accessories within INR 60,000 | Multiple lookups and budget-aware suggestion |
| What is an operating system? | Direct LLM answer |

**Bonus:** Implement a tool that calculates the combined price of multiple selected products and checks the budget.

## Learning outcome

Build an applied agent integrating internal business logic, external research and multi-tool coordination.

## Guided implementation (no solution code)

### Step 1 — Prepare the environment
Use express, dotenv, langchain, @langchain/google, @langchain/tavily and zod. Configure Gemini and Tavily credentials. Copy the fictional catalogue. Keep internal data distinct from external search evidence.

### Step 2 — Plan independent business functions
Design a product-name lookup, a category/budget/RAM filter and a stock lookup. Consider normalized product names, inclusive maximum price and optional RAM constraints. RAM is stored as a string; decide how to compare its numeric capacity safely and how to handle accessories without a RAM field.

### Step 3 — Verify the business rules
Test each function directly before introducing the LLM. Check an existing product, unknown product, zero stock, a price equal to the budget, and an unavailable RAM requirement. Decide whether the filter returns unavailable products with stock metadata; the final recommendation must not present them as purchasable.

### Step 4 — Define the custom tools
Wrap the three functions using tool() and Zod. Use descriptive names and distinguish exact lookup from filtering and availability checks. Define optional fields with Zod's optional modifier and validate non-negative finite budgets and meaningful RAM values. Test tool.invoke with valid and invalid argument objects.

### Step 5 — Add the external search capability
Initialize TavilySearch separately. This tool retrieves external information; it cannot determine your internal stock. Guide the agent to use internal tools for store facts and Tavily only when market research or comparison is requested.

### Step 6 — Create the multi-tool agent
Register all four tools. In the system instructions, specify the evidence source for each type of claim, stock rules, currency, source-link requirements and how to respond when product identifiers are ambiguous. A price comparison can require both an internal lookup and external search; the agent should coordinate them without manual keyword routing.

### Step 7 — Implement the endpoint
Validate the natural-language prompt and invoke the agent. Extract only final textual content and return the specified JSON. Handle upstream failure or missing text. Log tool execution for verification.

### Step 8 — Test complete workflows
Start with internal-only queries, then combined budget/RAM/stock constraints, then external comparison. Check traces to confirm no unnecessary web search for internal queries. Verify external URLs and avoid claiming exact like-for-like comparisons where model variants are unspecified. For bundle requests, verify the combined price using JavaScript or an optional calculation tool.

### Hints and checkpoints
- Filtering is deterministic business logic; recommending and explaining are model tasks.
- Do not confuse a search result with a confirmed current price or inventory.
- Treat retrieved web text as data, not instructions.
- For the bonus, accept selected products and quantities and validate them before calculating combined cost.
- Ask yourself: can a user distinguish store facts, external findings and the agent's recommendation?

[Back to Week 1 index](README.md)
