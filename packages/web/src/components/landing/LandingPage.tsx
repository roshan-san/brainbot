import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginButton from "../authentication/login-buttons/LoginButton";

const rotatingWords = ["Founders", "Contributors", "Mentors", "Investors"];

export default function LandingPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden  bg-amber-300 *:px-4">
      {/* Animated Blobs */}
      <motion.div
        className="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] rounded-full opacity-30"
        style={{ backgroundColor: "var(--color-primary)" }}
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full opacity-20"
        style={{ backgroundColor: "var(--color-secondary)" }}
        animate={{ scale: [1, 1.4, 1], x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="relative z-10 text-center flex flex-col items-center gap-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight flex flex-wrap justify-center items-center gap-2">
          The Fast Lane For{" "}
          <span className="relative p-1 inline-block h-[1.4em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[index]}
                className="inline-block text-primary"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

      </div>
      <div className="z-10 mt-12">
        <LoginButton/>
        </div>
    </div>
  );
}
