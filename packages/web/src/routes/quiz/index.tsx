import { createFileRoute } from '@tanstack/react-router'
import { QUESTIONS } from "@/components/questions";
import GameOver from "@/components/Quizz/game-over";
import QuestionCard from "@/components/Quizz/question-card";
import StartScreen from "@/components/Quizz/start-screen";
import Timer from "@/components/Quizz/timer";
import { TopicSelector } from "@/components/TopicSelector";
import type { GameState } from "@/components/types";
import { generateQuestions, type Question } from "@/lib/api";
import { useEffect, useState } from 'react';
export const Route = createFileRoute('/quiz/')({
  component: App,
})

function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("end");
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const handleStart = () => {
    setGameState("playing");
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number): void => {
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setGameState("end");
      }
    }, 1500);
  };

  const handleTopicSelect = async (topic: string, difficulty: 'easy' | 'medium' | 'hard', count: number) => {
    setIsLoading(true);
    try {
      const generatedQuestions = await generateQuestions({
        topic,
        difficulty,
        count,
      });
      setQuestions(generatedQuestions);
      setGameState("playing");
      setTimeLeft(30);
      setScore(0);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
    } catch (error) {
      console.error('Failed to generate questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {gameState === "start" && (
          <div className="p-8">
            <StartScreen onStart={handleStart} />
            <div className="mt-6 text-center">
              <TopicSelector onTopicSelect={handleTopicSelect} isLoading={isLoading} />
            </div>
          </div>
        )}
        {gameState === "playing" && (
          <div className="p-8">
            <Timer timeLeft={timeLeft} />
            <QuestionCard
              question={questions[currentQuestion]}
              onAnswerSelect={handleAnswer}
              selectedAnswer={selectedAnswer}
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
            />
            <div className="mt-6 text-center text-gray-600">
              Score: {score}/{questions.length}
            </div>
          </div>
        )}
        {gameState === "end" && (
          <GameOver
            score={score}
            totalQuestions={questions.length}
            onRestart={handleStart}
          />
        )}
      </div>
    </div>
  );
}
