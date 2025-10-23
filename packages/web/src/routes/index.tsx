
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: BrainBotLanding,
});

import { motion } from "framer-motion";
// shadcn/ui components (available in the environment). If you don't use shadcn, replace with plain elements.
import { Button } from "@/components/ui/button";

// Landing page component for BrainBot AI — a quiz app
// Tailwind CSS required in the project.

type Props = {
  onStart?: () => void;
};

function BrainBotLanding({ onStart }: Props) {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white text-slate-900">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-500 flex items-center justify-center shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2v20M2 12h20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-lg">BrainBot AI</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Smart quizzes, instant insights</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <Button onClick={()=>{router.navigate({to:"/quiz"})}} className="ml-2">Get Started</Button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Build sharper knowledge with <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-500">AI-powered quizzes</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-lg text-slate-600 max-w-xl"
            >
              BrainBot tailors quizzes to each learner using adaptive difficulty, instant feedback, and analytics — so studying becomes faster, smarter, and more fun.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={()=>redirect({to:"/quiz"})}>Start a Quiz</Button>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Quick quiz — Biology 101</h3>
                  <p className="text-xs text-slate-400">5 questions • adaptive • 3 minutes</p>
                </div>
                <div className="text-xs text-slate-500">Progress • 0/5</div>
              </div>

              <div className="mt-4">
                <div className="rounded-md bg-slate-50 p-4">
                  <p className="text-sm">What is the powerhouse of the cell?</p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2">
                  <button className="text-left rounded-md px-4 py-3 border border-slate-100 hover:shadow-sm">A) Nucleus</button>
                  <button className="text-left rounded-md px-4 py-3 border border-slate-100 hover:shadow-sm">B) Mitochondria</button>
                  <button className="text-left rounded-md px-4 py-3 border border-slate-100 hover:shadow-sm">C) Ribosome</button>
                  <button className="text-left rounded-md px-4 py-3 border border-slate-100 hover:shadow-sm">D) Golgi apparatus</button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-slate-500">Adaptive difficulty adjusts next question</div>
                  <Button onClick={onStart} className="">Answer & Continue</Button>
                </div>
              </div>
            </motion.div>

            <div className="absolute -bottom-6 -right-6 w-44 h-44 rounded-2xl bg-linear-to-tr from-indigo-50 to-violet-50 blur-2xl" />
          </div>
        </section>


        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold">Built for learners and instructors</h3>
              <p className="text-slate-600 mt-2">Create adaptive quizzes in seconds, assign them to learners, and measure mastery with clear, actionable insights.</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-slate-100 bg-white">
                  <h4 className="font-semibold">For Learners</h4>
                  <p className="text-sm text-slate-600 mt-2">Practice with targeted questions, get instant feedback, and focus on what matters.</p>
                </div>
                <div className="p-4 rounded-lg border border-slate-100 bg-white">
                  <h4 className="font-semibold">For Instructors</h4>
                  <p className="text-sm text-slate-600 mt-2">Auto-generate quizzes, track class performance, and export reports.</p>
                </div>
              </div>
            </div>

            <aside className="p-6 rounded-2xl bg-linear-to-br from-violet-50 to-indigo-50 border border-slate-100">
              <h4 className="font-semibold">Pricing</h4>
              <p className="text-sm text-slate-600 mt-2">Free tier available • Pro for teams</p>

              <div className="mt-4 flex items-center gap-3">
                <div className="text-xl font-bold">Free</div>
                <div className="text-slate-500">•</div>
                <div className="text-xl font-bold">Pro</div>
              </div>

              <div className="mt-6">
                <Button className="w-full">Start Free</Button>
                <a className="block text-center text-sm mt-2 text-slate-600">Compare plans</a>
              </div>
            </aside>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold">Ready to make learning stick?</h3>
            <p className="text-slate-600 mt-3">Create your first adaptive quiz in seconds. Join thousands of learners using BrainBot AI.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={onStart}>Create a Quiz — it's free</Button>
              <a className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-50">See demo</a>
            </div>
          </div>
        </section>

        <footer className="py-8 border-t border-slate-100 mt-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600">© {new Date().getFullYear()} BrainBot AI — All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a className="text-sm text-slate-600">Privacy</a>
              <a className="text-sm text-slate-600">Terms</a>
              <a className="text-sm text-slate-600">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


