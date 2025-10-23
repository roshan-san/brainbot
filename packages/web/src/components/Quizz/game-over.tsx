import { Trophy, BarChart3, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizAnalytics from "./QuizAnalytics";
import { useState } from "react";

interface GameOverProps {
  onRestart: () => void;
  score: number;
  totalQuestions: number;
  timeSpent?: number;
  questionTimes?: number[];
  topic?: string;
  difficulty?: string;
}

export default function GameOver({
  onRestart,
  score,
  totalQuestions,
  timeSpent = 0,
  questionTimes = [],
  topic = "Quiz",
  difficulty = "Medium"
}: GameOverProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="p-8">
      {!showAnalytics ? (
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <p className="text-lg text-gray-600">
              Final Score: {score}/{totalQuestions}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {topic} • {difficulty} Difficulty
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setShowAnalytics(true)}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button
              onClick={onRestart}
              variant="outline"
              className="inline-flex items-center px-6 py-3 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Another Quiz
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Quiz Analytics</h2>
            <Button
              onClick={() => setShowAnalytics(false)}
              variant="outline"
              className="text-sm"
            >
              Back to Results
            </Button>
          </div>
          <QuizAnalytics
            score={score}
            totalQuestions={totalQuestions}
            timeSpent={timeSpent}
            questionTimes={questionTimes}
            topic={topic}
            difficulty={difficulty}
          />
          <div className="mt-6 text-center">
            <Button
              onClick={onRestart}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Another Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
