import { GoogleGenAI } from "@google/genai";
import ENV from "../config/env.js";
import { moderateContentPrompt } from "../lib/prompt.js";

const genAI = new GoogleGenAI({
  apiKey: ENV.GEMINI_API_KEY,
});

const moderateContent = async (title, content) => {
  const prompt = moderateContentPrompt(title, content);
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    const text = response.text;

    return JSON.parse(text);
  } catch (error) {
    throw error;
  }
};

export { moderateContent };
