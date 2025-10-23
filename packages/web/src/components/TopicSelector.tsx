import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface TopicSelectorProps {
  onTopicSelect: (topic: string, difficulty: 'easy' | 'medium' | 'hard', count: number) => void;
  isLoading?: boolean;
}

const predefinedTopics = [
  "TypeScript",
  "Node.js",
  "Python",
  "Computer Science",
  "History",
  "Geography",
  "Science",
  "Mathematics",
  "Literature"
];

export function TopicSelector({ onTopicSelect, isLoading = false }: TopicSelectorProps) {
  const [customTopic, setCustomTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [count, setCount] = useState(5);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    const topic = selectedTopic || customTopic;
    if (topic.trim()) {
      onTopicSelect(topic.trim(), difficulty, count);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isLoading}>
          {isLoading ? <Spinner className="mr-2" /> : null}
          Choose Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Quiz Topic</DialogTitle>
          <DialogDescription>
            Choose a topic for your quiz or enter a custom one.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Predefined Topics */}
          <div>
            <Label className="text-sm font-medium">Popular Topics</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {predefinedTopics.map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedTopic(topic);
                    setCustomTopic("");
                  }}
                  className="text-xs"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Topic */}
          <div>
            <Label htmlFor="custom-topic">Or enter a custom topic</Label>
            <Input
              id="custom-topic"
              placeholder="e.g., Quantum Physics, Ancient Rome..."
              value={customTopic}
              onChange={(e) => {
                setCustomTopic(e.target.value);
                setSelectedTopic("");
              }}
              className="mt-1"
            />
          </div>

          {/* Difficulty */}
          <div>
            <Label className="text-sm font-medium">Difficulty</Label>
            <div className="flex gap-2 mt-2">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty(level)}
                  className="capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <Label htmlFor="question-count">Number of Questions</Label>
            <Input
              id="question-count"
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 5)))}
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedTopic && !customTopic.trim()}
          >
            Generate Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
