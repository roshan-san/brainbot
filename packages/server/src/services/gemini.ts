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
    
    IMPORTANT: Return ONLY a valid JSON array with this exact structure, no markdown, no code blocks, no additional text:
    [
      {
        "question": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correct": 0
      }
    ]
    The "correct" field should be the index (0-3) of the correct option.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error('No response from Gemini');
    }

    // Clean the response text to extract JSON
    let cleanedText = text.trim();
    
    // Remove markdown code blocks if present
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Log the cleaned text for debugging
    console.log('Cleaned response text:', cleanedText.substring(0, 200) + '...');

    // Parse the JSON response
    const questions = JSON.parse(cleanedText) as Question[];
    
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
