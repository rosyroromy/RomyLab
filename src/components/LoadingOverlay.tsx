import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Scan } from '@phosphor-icons/react';

const steps = [
  "Uploading frames...",
  "Extracting subtitles via OCR...",
  "Translating to Chinese...",
  "Matching cinematic database...",
  "Generating layout..."
];

export default function LoadingOverlay() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => Math.min(s + 1, steps.length - 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 80); // 100% in ~4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden relative">
      {/* Glowing background effect */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-64 h-64 bg-[#FFB800] rounded-full blur-[100px]"
      />

      {/* Scanner visual */}
      <div className="relative w-48 h-32 border border-white/10 rounded-xl overflow-hidden mb-8 bg-black/40 backdrop-blur-md shadow-2xl">
        <motion.div
          animate={{ y: ['0%', '100%', '0%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-0.5 bg-[#FFB800] shadow-[0_0_15px_#FFB800] z-10"
        />
        <ScanLine className="absolute inset-0 m-auto w-8 h-8 text-[#FFB800]/40" />
        
        {/* Simulated image grid in background */}
        <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/20 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="h-8 relative w-full flex justify-center mb-4">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute font-serif text-[#FFB800] tracking-wide text-sm drop-shadow-md"
        >
          {steps[step]}
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative z-10">
        <motion.div 
          className="h-full bg-[#FFB800]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      <div className="mt-2 text-xs text-[#FFB800] font-mono relative z-10">{progress}%</div>
    </div>
  );
}
