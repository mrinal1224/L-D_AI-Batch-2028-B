/**
 * SECTION 01 — Environment variables and Gemini SDK client
 * Teach: credentials, dotenv, SDK vs API, timeouts.
 * Run: node sections/01-sdk-client.js (from level-1)
 *
 * Prerequisites: npm install ; .env with GEMINI_API_KEY
 */
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// STEP 1 — Verify configuration without printing the secret.
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in level-1/.env");
}
console.log("STEP 1: API key is configured");

// STEP 2 — Create a reusable Gemini SDK client.
// An SDK provides JS methods around HTTP API requests.
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
console.log("STEP 2: Gemini client initialized");

// STEP 3 — Read model from the environment so it can be changed
// without editing every example. Choose a model available to your key.
export const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
console.log("STEP 3: Selected model:", model);

// ASK STUDENTS: Why should we never log an API key?