# Assignment 03 — AI Career Research Assistant

**Difficulty:** Medium | **Estimated effort:** 60–90 minutes

## Problem statement

Students preparing for software roles struggle to identify current industry requirements. Build an assistant that researches recent job requirements, compares them with a student's existing skills and produces a practical learning roadmap.

## API contract

`POST /career/analyze`

```json
{
  "targetRole": "Backend Developer",
  "currentSkills": ["JavaScript", "Node.js", "Express", "MongoDB"],
  "experienceLevel": "Fresher",
  "location": "India"
}
```

Return HTTP 200 with a JSON object containing a single `response` string. The response must include:

1. Current market requirements from search.
2. Existing strengths.
3. Skill gaps and priorities.
4. A four-week learning roadmap.
5. Project recommendations.
6. Relevant source URLs actually retrieved through search.

## Requirements

- [ ] Use LangChain `createAgent()` and Tavily Search.
- [ ] Validate required fields and ensure currentSkills is an array of strings (an empty array is allowed).
- [ ] Research current requirements before making market claims.
- [ ] Compare findings with the user's skills and location.
- [ ] Do not fabricate vacancies, statistics or links.
- [ ] Disclose insufficient evidence or search failure.
- [ ] Return only the final agent text, not intermediate tool messages.

## Acceptance tests

| Scenario | Expected behaviour |
| --- | --- |
| Frontend role, React skills | Frontend-specific roadmap |
| Backend role, Node.js skills | Backend-specific roadmap |
| AI Engineer, no AI skills | Beginner-friendly plan |
| Different target location | Location-relevant research |
| Search failure | Clear error or disclosure |
| Missing target role | HTTP 400 |

**Bonus:** Accept weeksAvailable and adapt the roadmap.

## Learning outcome

Understand search-enabled agents and grounding recommendations in retrieved information.

## Guided implementation (no solution code)

### Step 1 — Prepare dependencies
Use express, dotenv, langchain, @langchain/google and @langchain/tavily. Configure both Gemini and Tavily credentials. Tavily is a search service; it retrieves web information, whereas Gemini interprets and summarizes it.

### Step 2 — Initialize components
Create the chat model and TavilySearch tool once. Review maxResults, topic and searchDepth from class. These options control search behaviour, not the truth of every search result. Verify credentials without logging secrets.

### Step 3 — Create the agent
Use createAgent with the model and search tool. A tool definition describes a capability; the agent runtime executes the model's selected calls and returns results to the model. Explain in the agent instructions that current market claims require search evidence.

### Step 4 — Validate and represent the student profile
Validate the role, location and experience level as strings; validate currentSkills as an array of strings. An empty skills array represents a beginner. Pass the profile as clear context rather than hardcoding a single role.

### Step 5 — Plan research and synthesis
Guide the agent to search for relevant roles and location, prioritize recent credible postings, identify repeated skill requirements, compare them with the given profile and produce a four-week plan. Require source URLs from actual results, and distinguish observed evidence from recommendations. Do not assume a small search sample represents the entire job market.

### Step 6 — Invoke and return the final message
Use agent.invoke with the user message. Inspect the message sequence in development: user, model tool request, tool result, final model answer (possibly repeated). Extract final textual content rather than returning the messages array. Handle empty answers and upstream errors.

### Step 7 — Verify behaviour
Use Postman to compare different profiles and locations. Inspect tool calls to confirm research actually happened. Open a sample of returned links and check that they support the answer. Simulate search failure; the response should not invent evidence.

### Hints and checkpoints
- The model may choose not to call a tool despite instructions; check the execution trace when evaluating this requirement.
- Treat retrieved web text as untrusted evidence, not instructions.
- A source URL alone does not establish that a claim is supported.
- For the bonus, validate weeksAvailable before adapting the timeline.

[Back to Week 1 index](README.md)
