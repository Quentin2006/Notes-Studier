import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";

dotenv.config();

export const DEFAULT_QUIZ_PROMPT =
  `
You are a quiz generator.You will be given a "note" object that contains a title, subject, and a list of key points or content.Your task is to generate a quiz JSON that matches the following schema:

{
"title": string,
"subject": string,
"questions": [
{
"question": string,
"answer": [string],
"correctAnswer": number  // index of correct answer in the answer array
}
]
}

Rules:
1. Use the title and subject from the supplied note object.
2. Generate 5 multiple - choice questions based on the note content.
3. Each question must have exactly 3 answer options.
4. The correct answer must be clearly one of the options.
5. Output ONLY valid JSON(no extra text, no explanation).

Example note object:
{
"title": "Sample Note",
"subject": "This is a sample note about the water cycle.",
"content": [
"Evaporation is the process of water turning into vapor.",
"Condensation forms clouds.",
"Precipitation falls as rain or snow."
]
}

Now generate the quiz using the following supplied note object.
`

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}
// The SDK automatically picks up the GEMINI_API_KEY environment variable
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default ai;

