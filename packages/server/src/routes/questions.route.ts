import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { generateQuestions } from '../services/gemini';

const questionsRoute = new Hono();

const generateQuestionsSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  count: z.number().min(1).max(20).optional().default(5),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional().default('medium'),
});

questionsRoute.post(
  '/generate',
  zValidator('json', generateQuestionsSchema),
  async (c) => {
    try {
      const { topic, count, difficulty } = c.req.valid('json');
      
      const questions = await generateQuestions({
        topic,
        count,
        difficulty,
      });

      return c.json({
        success: true,
        data: questions,
      });
    } catch (error) {
      console.error('Error in questions route:', error);
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        500
      );
    }
  }
);

export { questionsRoute };
