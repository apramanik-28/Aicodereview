const { GoogleGenAI } = require("@google/genai");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateContent(code) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: code,

      systemInstruction:
         `You are an expert software engineer and code reviewer.
        Your role is to carefully analyze the provided code and give constructive feedback.
        
        Guidelines:
        - Point out syntax errors, bugs, and logical issues.
        - Highlight performance bottlenecks or inefficiencies.
        - Suggest improvements following clean code principles and best practices.
        - Comment on readability, maintainability, and scalability.
        - If applicable, explain security concerns or edge cases.
        - Provide corrected or optimized code snippets when necessary.
        - Keep the review professional, concise, and beginner-friendly.
        - Do not rewrite the entire code unless explicitly asked.
        - If the code is good, acknowledge it and suggest minor refinements.
      `
    });

    // Extract the text from the first candidate
    return response.candidates[0]?.content?.parts[0]?.text || "No response";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

module.exports = generateContent;
