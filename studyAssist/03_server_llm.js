/**
 * SECTION 05 — Build an AI chatbot REST API with the native SDK
 * Teach: client -> Express -> Gemini -> JSON, server-side secrets.
 * Run: node sections/05-gemini-chatbot-api.js (from level-1)
 * POST http://localhost:5000/chat
 * JSON: {"prompt":"Explain closures simply"}
 */
import express from "express";
import { ai, model } from "./01_SDK_Gemini";

const app = express();
app.use(express.json());

// STEP 1 — Receive a user prompt over HTTP.
app.post("/chat", async (req, res) => {
  const { prompt } = req.body ?? {};

  // STEP 2 — Validate input before calling a paid API.
  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "A non-empty prompt is required" });
  }

  try {
    // STEP 3 — Ask Gemini to generate the answer.
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    // STEP 4 — Return a predictable JSON structure to clients.
    return res.json({ response: result.text ?? "" });
  } catch (error) {
    console.error("Gemini call failed:", error.message);
    return res.status(502).json({ error: "AI service failed" });
  }
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log("Gemini chatbot on port", PORT));

// ASK STUDENTS: Why must the API key live in the backend?
// ASK STUDENTS: Does this endpoint remember previous chat messages?