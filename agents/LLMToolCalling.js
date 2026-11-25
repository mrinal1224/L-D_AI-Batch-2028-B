
import express from "express";
import { llm } from "./04_Langchain.js";

const app = express();

app.use(express.json());

// STEP 1 — Create the same endpoint.
app.post("/chat", async (req, res) => {
  const { prompt } = req.body ?? {};

  // STEP 2 — Validate user input.
  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({
      error: "A non-empty prompt is required",
    });
  }

  try {
    // STEP 3 — Call Gemini through LangChain.
    const result = await llm.invoke(prompt);

    // STEP 4 — Extract generated text.
    const response = result.text;

    // STEP 5 — Return the same JSON contract.
    return res.json({
      response,
    });
  } catch (error) {
    console.error("LangChain call failed:", error);

    return res.status(502).json({
      error: "AI service failed",
    });
  }
});

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`LangChain chatbot running on port ${PORT}`);
});