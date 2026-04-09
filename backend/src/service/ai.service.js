import { GoogleGenAI } from "@google/genai";
import ENV from "../config/env.js";
import { moderateCommentPrompt, moderateContentPrompt } from "../lib/prompt.js";

const genAI = new GoogleGenAI({
  apiKey: ENV.GEMINI_API_KEY,
});

const modelConfig = {
  model: "gemini-2.5-flash-lite",
  config: {
    responseMimeType: "application/json",
  },
};

const moderateContent = async (title, content) => {
  const prompt = moderateContentPrompt(title, content);
  try {
    const response = await genAI.models.generateContent({
      contents: prompt,
      ...modelConfig,
    });
    const text = response.text;

    return JSON.parse(text);
  } catch (error) {
    throw error;
  }
};

const moderateComment = async (comment) => {
  const prompt = moderateCommentPrompt(comment);
  try {
    const response = await genAI.models.generateContent({
      contents: prompt,
      ...modelConfig,
    });
    const text = response.text;

    return JSON.parse(text);
  } catch (error) {
    throw error;
  }
};

export { moderateContent, moderateComment };
