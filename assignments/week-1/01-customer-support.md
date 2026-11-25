# Assignment 01 — AI Customer Support Assistant

**Difficulty:** Easy | **Estimated effort:** 45–60 minutes

## Problem statement

An e-commerce company receives hundreds of complaints every day. Build a backend that drafts professional, empathetic customer support replies grounded in company policy, reducing manual work for support executives.

## Company policies

- Returns are accepted within seven days of delivery.
- Refunds take five to seven business days after approval.
- Damaged products are eligible for replacement after verification.
- Orders may be cancelled only before shipment.

## API contract

`POST /support/reply`

Request:
```json
{
  "customerName": "Rahul",
  "complaint": "I received a damaged product yesterday.",
  "tone": "professional"
}
```

Illustrative response (HTTP 200):
```json
{
  "response": "Dear Rahul, we apologize for the inconvenience. Damaged products are eligible for replacement after verification. Please share your order details and photographs of the damaged product so we can assist you."
}
```

## Requirements

- [ ] Use the native Gemini SDK and a reusable model client.
- [ ] Provide the company policies as context.
- [ ] Support professional, friendly and apologetic tones.
- [ ] Validate all fields, including the allowed tones.
- [ ] Do not invent policies, approvals or compensation.
- [ ] Return only the final generated text in the response field.

## Acceptance tests

| Scenario | Expected behaviour |
| --- | --- |
| Damaged product | Explain replacement after verification |
| Return after 15 days | Explain seven-day return policy |
| Approved refund pending for two days | Explain five-to-seven-business-day timeline |
| Empty complaint | HTTP 400 |
| Demand for INR 10,000 compensation | No unauthorized promise |
| Cancel a shipped order | Explain cancellation restriction |

## Learning outcome

Build a domain-specific LLM application using the SDK, contextual prompts, validation and an Express endpoint.

## Guided implementation (no solution code)

### Step 1 — Prepare the project
Install express, dotenv and @google/genai. Use ES modules in package.json. Create a .env file with your Gemini API key and model name, and keep it out of Git. The SDK is a library that wraps the provider's HTTP API; dotenv loads configuration into process.env.

### Step 2 — Initialize the model
Create one GoogleGenAI client outside the request handler. A reusable client avoids reconstructing it on every request. Verify the key exists without printing it. First try a standalone, harmless prompt to confirm connectivity.

### Step 3 — Build the HTTP layer
Use Express and express.json() to parse JSON request bodies. Register the specified POST route. Inspect customerName, complaint and tone before making a paid model call. Reject non-string or blank values and unsupported tones with HTTP 400.

### Step 4 — Design the prompt
Separate the assistant's role, company policy, customer complaint and requested tone into clearly labelled sections. Context is information provided to the model for this request; it is not model training. Ask the model to treat the complaint as customer data and not as instructions overriding policy. Decide how the reply should behave when the policy does not cover a request.

### Step 5 — Call Gemini
Use the SDK's models.generateContent method with your configured model and constructed prompt. Await the promise; the network call is asynchronous. Identify the textual answer from the SDK response, check it is non-empty, and send the required JSON response rather than the entire SDK object.

### Step 6 — Handle failures and test
Catch model/network errors and respond with a generic HTTP 502 message. Test the policy scenarios in Postman, including unsupported tone and missing fields. Compare the same complaint with different tones: factual policy should remain unchanged.

### Hints and checkpoints
- Keep policy text separate from user input so it is easy to update.
- Temperature affects variation, not factual guarantees.
- No agent or search tool is required here.
- Check that an invalid request never reaches the model.
- Ask yourself: does the response promise an action the company has not actually taken?

[Back to Week 1 index](README.md)
