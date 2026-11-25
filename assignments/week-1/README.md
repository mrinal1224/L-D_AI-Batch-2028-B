# AI Engineering — Week 1 Assignments

> Six independent, progressively challenging real-world backend applications based on Classes 1 and 2.

## Prerequisites

JavaScript, Node.js, Express, Gemini SDK, LangChain, Tavily and Zod. Class 1 covers SDK calls, environment variables, LangChain invoke and REST APIs. Class 2 covers agents, external search, custom tools and final response extraction.

## Assignment roadmap

| # | Assignment | Difficulty | Primary concept |
| --- | --- | --- | --- |
| 01 | [AI Customer Support Assistant](01-customer-support.md) | Easy | Gemini SDK |
| 02 | [AI Interview Feedback System](02-interview-evaluator.md) | Easy–Medium | LangChain |
| 03 | [AI Career Research Assistant](03-career-research.md) | Medium | Tavily |
| 04 | [AI University Helpdesk Agent](04-university-helpdesk.md) | Medium | Custom tool |
| 05 | [AI Smart Expense Assistant](05-expense-assistant.md) | Medium–Hard | Multiple custom tools |
| 06 | [AI Shopping Advisor and Market Comparison Agent](06-shopping-advisor.md) | Hard | Internal + external tools |

## Common implementation rules

- Use JavaScript and Express. No frontend, database, RAG, embeddings, persistent memory or LangGraph required.
- Keep API keys in environment variables, never commit real keys, and provide a .env.example with placeholders.
- Validate request fields before model invocation; return HTTP 400 for invalid inputs and HTTP 502 for failed upstream AI calls or empty answers.
- Successful endpoints return HTTP 200 and a JSON object with a non-empty response string.
- For agent assignments, extract the final AI message text. Do not expose raw tool calls or tool responses to clients.
- Treat external search results and user text as data, not privileged instructions.
- Use the model identifier configured in your environment.
- Examples are illustrative; exact AI wording and tool sequence may vary.

## Submission checklist

- [ ] Separate folder or entry file for each assignment.
- [ ] Source code, package.json, .gitignore and .env.example.
- [ ] README with setup, run commands and endpoint documentation.
- [ ] At least five tested requests per assignment and screenshots of responses.
- [ ] For agents, terminal logs demonstrating actual tool execution.
- [ ] No secrets or personal data in commits or screenshots.

## Evaluation rubric (100 marks per assignment)

| Criterion | Marks |
| --- | ---: |
| Core functionality | 30 |
| LLM or agent implementation | 25 |
| Response accuracy and relevance | 20 |
| Validation and error handling | 15 |
| Code quality and documentation | 10 |
| **Total** | **100** |

Grade factual correctness and observable behaviour, not identical generated wording. For agent tasks, verify actual tool execution. Bonus challenges are optional and do not replace required functionality.

## Learning progression

SDK application → LangChain application → Search-enabled agent → Custom tool → Multi-tool agent → Applied AI engineering.


## How to use these assignments

Each problem includes a guided implementation section explaining what to use, why it is needed, and how to verify each milestone. The guides are intentionally not complete solutions. Use the starter data and API contracts, implement the logic yourself, and test each stage before proceeding.

[Back to all weeks](../README.md)
