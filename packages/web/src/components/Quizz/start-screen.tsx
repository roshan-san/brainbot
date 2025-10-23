import { motion } from "framer-motion";
import { Play, Brain, Zap } from "lucide-react";

export default function StartScreen() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white text-slate-900">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-500 flex items-center justify-center shadow-md">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">BrainBot AI</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Smart quizzes, instant insights</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        <section className="flex flex-col items-center justify-center text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
          >
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
              <p className="text-slate-600 text-sm">Questions adapt to your skill level for optimal learning</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Feedback</h3>
              <p className="text-slate-600 text-sm">Get immediate explanations and learn from mistakes</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-linear-to-br from-purple-50 to-violet-50 rounded-xl flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Engaging</h3>
              <p className="text-slate-600 text-sm">Interactive quizzes that make learning fun and effective</p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
