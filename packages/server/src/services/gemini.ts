import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface GenerateQuestionsRequest {
  topic: string;
  count?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export async function generateQuestions({
  topic,
  count = 5,
  difficulty = 'medium'
}: GenerateQuestionsRequest): Promise<Question[]> {
  try {
    const prompt = `Generate ${count} multiple choice questions about "${topic}" with ${difficulty} difficulty level. 
    Each question should have 4 options (A, B, C, D) with only one correct answer.
    Format the response as a JSON array with this structure:
    [
      {
        "question": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correct": 0
      }
    ]
    The "correct" field should be the index (0-3) of the correct option.
    
    You are a quiz question generator. Always respond with valid JSON only, no additional text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error('No response from Gemini');
    }

    // Parse the JSON response
    const questions = JSON.parse(text) as Question[];
    
    // Validate the response structure
    if (!Array.isArray(questions)) {
      throw new Error('Invalid response format');
    }

    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate questions');
  }
}
