/**
 * SECTION 02 — First text generation
 * Teach: prompt, model, async/await, inference, error handling.
 * Run: node sections/02-first-llm-call.js (from level-1)
 */
import { ai, model } from "./01_SDK_Gemini";

async function main() {
  try {
    // STEP 1 — Write our prompt.
    const prompt = "Explain JavaScript closures in two simple sentences.";

    // STEP 2 — Send the prompt to an existing model.
    console.log("Sending prompt:", prompt);
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    // STEP 3 — Read the model-generated text.
    console.log("\nModel response:\n", result.text ?? "(No text returned)");

    // CLASS EXPERIMENT: Change the audience to "a 10-year-old",
    // then "a senior developer". Compare answers.
  } catch (error) {
    console.error("Generation failed:", error.message);
    process.exitCode = 1;
  }
}

main();