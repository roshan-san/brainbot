import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface QuizAnalyticsProps {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  questionTimes?: number[];
  topic?: string;
  difficulty?: string;
}

export default function QuizAnalytics({ 
  score, 
  totalQuestions, 
  timeSpent, 
  questionTimes = [], 
  topic = "Quiz",
  difficulty = "Medium"
}: QuizAnalyticsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const averageTimePerQuestion = questionTimes.length > 0 ? questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length : 0;

  // Performance data for charts
  const performanceData = [
    { name: 'Correct', value: score, color: '#10b981' },
    { name: 'Incorrect', value: totalQuestions - score, color: '#ef4444' }
  ];

  const difficultyData = [
    { name: 'Easy', correct: difficulty === 'easy' ? score : 0, total: difficulty === 'easy' ? totalQuestions : 0 },
    { name: 'Medium', correct: difficulty === 'medium' ? score : 0, total: difficulty === 'medium' ? totalQuestions : 0 },
    { name: 'Hard', correct: difficulty === 'hard' ? score : 0, total: difficulty === 'hard' ? totalQuestions : 0 }
  ];

  const timeData = questionTimes.map((time, index) => ({
    question: `Q${index + 1}`,
    time: time,
    cumulative: questionTimes.slice(0, index + 1).reduce((a, b) => a + b, 0)
  }));

  const accuracyTrend = questionTimes.map((time, index) => ({
    question: index + 1,
    accuracy: Math.max(0, Math.min(100, 100 - (index * 5) + Math.random() * 20)), // Simulated accuracy trend
    time: time
  }));

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master! 🏆";
    if (percentage >= 80) return "Excellent work! You're doing great! 🌟";
    if (percentage >= 70) return "Good job! Keep up the practice! 👍";
    if (percentage >= 60) return "Not bad! A bit more practice will help! 📚";
    return "Keep studying! You'll get there! 💪";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <motion.div 
      className="space-y-6 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with overall performance */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h2>
        <p className="text-lg text-gray-600 mb-4">{topic} • {difficulty} Difficulty</p>
        <motion.div 
          className={`text-4xl font-bold ${getPerformanceColor()}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          {percentage}%
        </motion.div>
        <p className="text-lg text-gray-700 mt-2">{getPerformanceMessage()}</p>
      </motion.div>

      {/* Key Metrics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-blue-600">{score}/{totalQuestions}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-green-600">{Math.round(timeSpent / 1000)}s</div>
            <div className="text-sm text-gray-600">Total Time</div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-purple-600">{Math.round(averageTimePerQuestion)}s</div>
            <div className="text-sm text-gray-600">Avg per Question</div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {/* Performance Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} questions`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Correct ({score})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Incorrect ({totalQuestions - score})</span>
            </div>
          </div>
        </Card>

        {/* Time Analysis Bar Chart */}
        {questionTimes.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Time per Question</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}s`, 'Time']} />
                <Bar dataKey="time" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Accuracy Trend Line Chart */}
        {questionTimes.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Difficulty Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Difficulty Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={difficultyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="correct" fill="#10b981" name="Correct" />
              <Bar dataKey="total" fill="#e5e7eb" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Insights and Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Speed Analysis</p>
              <p className="text-sm text-gray-600">
                {averageTimePerQuestion < 10 
                  ? "You're answering quickly! Great job on time management." 
                  : averageTimePerQuestion < 20 
                  ? "Good pace! You're taking time to think through questions." 
                  : "Consider practicing to improve your response time."}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Accuracy Assessment</p>
              <p className="text-sm text-gray-600">
                {percentage >= 80 
                  ? "Excellent accuracy! You have a strong grasp of this topic." 
                  : percentage >= 60 
                  ? "Good understanding! Consider reviewing the missed questions." 
                  : "Keep studying! Focus on the fundamentals and practice more."}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Recommendations</p>
              <p className="text-sm text-gray-600">
                {percentage >= 90 
                  ? "Try a harder difficulty level to challenge yourself!" 
                  : percentage >= 70 
                  ? "Great job! Try mixing in some harder questions." 
                  : "Focus on understanding the concepts behind each question."}
              </p>
            </div>
          </div>
        </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
