import { Play } from "lucide-react";
import { Button } from "../ui/button";

interface StartScreenProps {
  onStart: () => void;
}
export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col fitems-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        BrainBot Ai Quizz appp
      </h1>
      <div className="felx flex-col">
      <Button
        onClick={onStart}
        className="items-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
        <Play className="w-5 h-5 mr-2" />
        Start  Your Quiz
      </Button>
        </div>
    </div>
  );
}
