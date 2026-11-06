import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/agencyData';

interface LoadingScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onFinish,
  minDurationMs = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(
        100,
        Math.round((elapsed / minDurationMs) * 100)
      );
      setProgress(calculatedProgress);

      if (elapsed >= minDurationMs) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          onFinish?.();
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onFinish]);

  const handleSkip = () => {
    setIsLoaded(true);
    onFinish?.();
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="zenvexa-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080B14] text-white overflow-hidden select-none"
        >
          {/* Ambient Glowing Orbs */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#6A35FF]/25 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#3B82F6]/25 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Central Logo & Brand Experience */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full space-y-6">
            {/* Animated Logo Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#6A35FF] to-[#38BDF8] blur-xl opacity-60 animate-pulse" />
              <div className="relative w-20 h-20 rounded-2xl bg-[#0F1423] border border-white/20 p-2 shadow-2xl flex items-center justify-center">
                <img
                  src={COMPANY_INFO.logoPath}
                  alt="ZENVEXA Digital Agency"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Main Requested Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#A78BFA]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>We Build · We Market · We Scale</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Grow your business with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#60A5FA] to-[#38BDF8]">
                  ZENVEXA
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                Setting up creative branding, high-converting web architecture, and digital growth systems...
              </p>
            </motion.div>

            {/* Progress Bar & Percentage */}
            <div className="w-full max-w-xs space-y-2 pt-2">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#6A35FF] via-[#3B82F6] to-[#38BDF8] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 tabular-nums">
                <span>Loading Agency Experience</span>
                <span className="text-[#38BDF8] font-bold">{progress}%</span>
              </div>
            </div>

            {/* Quick Skip Option */}
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs font-medium text-slate-500 hover:text-white transition-colors pt-4 flex items-center gap-1 cursor-pointer"
            >
              <span>Enter directly</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
