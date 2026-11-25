
/**
 * SECTION 06 — Initialize LangChain with Gemini
 *
 * Teach:
 * - SDK vs LangChain
 * - Chat models
 * - invoke()
 * - Environment variables
 *
 * Run from level-1:
 * node sections/06_langchain_client.js
 */

import "dotenv/config";
import {ChatGoogleGenerativeAI} from '@google/genai'

// STEP 1 — Validate the API key.
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env");
}

console.log("STEP 1: API key configured");

// STEP 2 — Create a LangChain chat model.
export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.7, 
// what is temp?
  maxRetries: 2,
  maxOutputTokens : 300
});

console.log("STEP 2: LangChain model initialized");

// STEP 3 — Test the model when this file runs directly.
// We'll test it in the next section through Express.
