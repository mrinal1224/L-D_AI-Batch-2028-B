
import express from "express";
import { llm } from "./04_Langchain.js";
import { TavilySearch } from "@langchain/tavily";

import {createAgent} from 'langchain'

const app = express();

app.use(express.json());

const searchtool = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

const agent = createAgent({
  model: llm,
  tools: [searchtool],
});













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
    const result = await agent.invoke({
      messages : [
        {
          role : 'user',
          content: prompt
        }
      ]

    });

    // STEP 4 — Extract generated text.
    const response = result.messages.at(-1).content

    // STEP 5 — Return the same JSON contract.
    return res.json({
      response
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