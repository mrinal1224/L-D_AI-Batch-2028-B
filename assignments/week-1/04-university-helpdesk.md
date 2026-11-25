# Assignment 04 — AI University Helpdesk Agent

**Difficulty:** Medium | **Estimated effort:** 90 minutes

## Problem statement

University administrators repeatedly answer questions about deadlines, attendance and academic policies. Build a helpdesk that retrieves internal university information instead of guessing.

## Starter data

The following is fictional university data for the assignment.

```javascript
const universityInformation = [
  { topic: "attendance", information: "Students must maintain a minimum attendance of 75%." },
  { topic: "examination", information: "End-term examinations begin on December 15." },
  { topic: "fees", information: "The semester fee payment deadline is December 5." },
  { topic: "library", information: "The library is open from 8 AM to 10 PM." },
  { topic: "assignments", information: "Late submissions carry a penalty of 10% per day." },
  { topic: "scholarship", information: "Students with a CGPA above 9 are eligible to apply for a merit scholarship." }
];
```

## Tool contract

| Name | Input | Output |
| --- | --- | --- |
| get_university_information | topic: string | Matching policy or a not-found result |

Implement the lookup function yourself and wrap it using LangChain's tool helper and a Zod schema.

## API contract

`POST /helpdesk/chat`

```json
{"prompt":"What happens if my attendance is 70%?"}
```

Illustrative response:
```json
{"response":"The university requires at least 75% attendance. Your attendance of 70% is below the threshold. Contact academic administration for guidance."}
```

## Requirements

- [ ] Implement one custom tool with a clear name, description and Zod schema.
- [ ] Register the tool with an agent and allow automatic tool selection.
- [ ] Support natural-language paraphrases and questions about multiple topics.
- [ ] Handle missing information without inventing policies.
- [ ] Log actual tool executions.
- [ ] Do not use Tavily; university facts must come from the custom tool.

## Acceptance tests

| Prompt | Expected behaviour |
| --- | --- |
| Can I enter the library at 9 PM? | Yes, within stated hours |
| When must I pay fees? | December 5 |
| Is 70% attendance enough? | Below required 75% |
| When are exams and fees due? | Retrieve both topics |
| What is the hostel Wi-Fi password? | Information unavailable |
| Am I guaranteed a scholarship with 9.2 CGPA? | Eligible to apply, not guaranteed |

## Learning outcome

Expose application-specific information to an AI agent through a validated custom tool.

## Guided implementation (no solution code)

### Step 1 — Prepare the project
Use express, dotenv, langchain, @langchain/google and zod. Configure Gemini credentials. No Tavily API key is required. Copy the fictional starter data and keep it separate from the user's question.

### Step 2 — Build a normal JavaScript lookup
Decide how to match an incoming topic against the topic field. Consider case normalization and extra spaces. Decide what the function should return when no match exists. Test this function directly with an existing and unknown topic before introducing AI.

### Step 3 — Wrap the lookup as a custom tool
Use LangChain's tool helper with a callback and configuration object. The callback performs the work; name identifies the tool; description explains what information it retrieves; schema defines valid input arguments. Use z.object with a string topic field and a meaningful field description. Zod validates tool inputs; it does not establish that a policy exists.

### Step 4 — Test the tool independently
Call the tool's invoke method with a valid topic object and inspect its return value. Try an invalid argument type and an unknown topic. The first should fail validation; the second should produce your not-found result. Add a log of tool execution to demonstrate which topic was requested.

### Step 5 — Register the custom tool
Create an agent with the Gemini model and your tool. Explain in the instructions which university topics exist and that university-specific claims require actual tool evidence. Do not paste every policy into the system prompt, or the exercise may bypass the tool. Multiple policy questions may need more than one call.

### Step 6 — Connect Express
Validate the prompt, invoke the agent, and return only the final answer text. Use generic errors for upstream failures. Inspect intermediate messages in the terminal during testing but do not expose them to clients.

### Step 7 — Test semantic selection
Ask the same question with different wording, such as a library closing-time question and a question about entering at 9 PM. Verify the tool receives an appropriate topic. Test a question combining fees and examinations and a question about missing information.

### Hints and checkpoints
- JavaScript variable names and LLM-facing tool names are different.
- The LLM receives metadata and requests a call; LangChain executes your callback on the server.
- Do not let the agent invent consequences of low attendance or guarantee a scholarship.
- Ask yourself: would changing the starter data change the answer without retraining Gemini?

[Back to Week 1 index](README.md)
