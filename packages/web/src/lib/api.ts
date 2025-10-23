export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface GenerateQuestionsRequest {
  topic: string;
  count: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function generateQuestions(request: GenerateQuestionsRequest): Promise<Question[]> {
  const response = await fetch(`${API_BASE_URL}/questions/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: ApiResponse<Question[]> = await response.json();
  
  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to generate questions');
  }

  return result.data;
}
