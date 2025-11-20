
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { GEMINI_MODEL } from '../constants';

// Initialize the Gemini API client.
// The API key is expected to be available from the environment variable.
let ai: GoogleGenAI | null = null;

const getGeminiClient = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      // In a real application, you'd handle this more gracefully,
      // e.g., prompt the user or show a clear error message.
      console.error('API_KEY is not set. Please ensure it is configured.');
      throw new Error('Gemini API key is not configured.');
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

/**
 * Generates a text response from the Gemini model.
 * @param prompt The user's input prompt.
 * @returns A string containing the AI's response.
 */
export async function generateTextResponse(prompt: string): Promise<string | undefined> {
  try {
    const gemini = getGeminiClient();
    const response: GenerateContentResponse = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 200,
      },
    });
    return response.text;
  } catch (error) {
    console.error('Error generating text from Gemini API:', error);
    // Depending on the error, we might want to suggest the user open the API key selector.
    if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
      alert("API key might be invalid or not selected. Please select your API key.");
      // Simulate opening the selector, if `window.aistudio` was available.
      // await window.aistudio.openSelectKey();
    }
    throw error;
  }
}

/**
 * Generates task suggestions based on a given prompt using the Gemini model.
 * @param prompt A specific prompt to guide the AI in generating task suggestions.
 * @returns A string containing the AI's suggested task.
 */
export async function generateTaskSuggestions(prompt: string): Promise<string | undefined> {
  try {
    const gemini = getGeminiClient();
    const response: GenerateContentResponse = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        temperature: 0.5, // Lower temperature for more focused suggestions
        topP: 0.9,
        topK: 32,
        maxOutputTokens: 50,
      },
    });
    return response.text;
  } catch (error) {
    console.error('Error generating task suggestion from Gemini API:', error);
    throw error;
  }
}
