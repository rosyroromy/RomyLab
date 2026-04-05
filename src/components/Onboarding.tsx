import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretRight } from '@phosphor-icons/react';

const POSTERS = [
  'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', // The Godfather
  'https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', // Pulp Fiction
  'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQQSV5GOZ.jpg', // Inception
];

function IntroVisual() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % POSTERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-48 h-64 flex items-center justify-center perspective-1000">
      <AnimatePresence mode="popLayout">
        {POSTERS.map((poster, index) => {
          const isCurrent = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + POSTERS.length) % POSTERS.length;
          const isNext = index === (currentIndex + 1) % POSTERS.length;

          if (!isCurrent && !isPrev && !isNext) return null;

          let x = 0;
          let z = 0;
          let rotateZ = 0;
          let opacity = 1;

          if (isPrev) {
            x = -40;
            z = -50;
            rotateZ = -10;
            opacity = 0.6;
          } else if (isNext) {
            x = 40;
            z = -50;
            rotateZ = 10;
            opacity = 0.6;
          } else {
            x = 0;
            z = 0;
            rotateZ = 0;
            opacity = 1;
          }

          return (
            <motion.div
              key={poster}
              initial={{ opacity: 0, x: 100, z: -100, rotateZ: 20 }}
              animate={{ opacity, x, z, rotateZ }}
              exit={{ opacity: 0, x: -100, z: -100, rotateZ: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-44 h-60 bg-white p-1.5 rounded shadow-2xl"
              style={{ zIndex: isCurrent ? 30 : 10 }}
            >
              <div className="w-full h-full bg-black overflow-hidden relative border border-black/10">
                <img src={poster} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt="movie poster" />
                {/* Film strip holes effect */}
                <div className="absolute top-0 bottom-0 left-0 w-2 flex flex-col justify-between py-2">
                  {[...Array(8)].map((_, i) => <div key={`l-${i}`} className="w-1.5 h-2 bg-white rounded-sm opacity-80" />)}
                </div>
                <div className="absolute top-0 bottom-0 right-0 w-2 flex flex-col justify-between py-2 items-end">
                  {[...Array(8)].map((_, i) => <div key={`r-${i}`} className="w-1.5 h-2 bg-white rounded-sm opacity-80" />)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

const STORY_PAGES = [
  {
    id: 'intro',
    text: "Movies are 24 frames of fiction, but quotes are 100% real. 🎬✨",
    visual: <IntroVisual />
  },
  {
    id: 'translate',
    text: "Find foreign echoes that resonate beyond your native tongue. 🌍🗣️",
    visual: (
      <div className="relative w-72 rounded-xl overflow-hidden shadow-2xl border border-white/20">
        <div className="absolute inset-0">
          <img src="https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkBg8lWOb.jpg" referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-50" alt="Spirited Away" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </div>
        <div className="relative p-5 z-10">
          <div className="text-white/90 font-serif text-lg leading-relaxed text-shadow-sm mb-16">
            一度あったことは忘れないものさ、<span className="text-[#FFB800] bg-[#FFB800]/20 px-1 rounded cursor-pointer relative inline-block backdrop-blur-sm">
              思い出せ
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-[#2A2A2A]/95 backdrop-blur-md text-white text-xs p-3 rounded shadow-xl border border-white/10 z-50 pointer-events-none"
              >
                <div className="font-bold text-[#FFB800] mb-1">思い出せる (omoidaseru)</div>
                <div className="text-white/80 mb-1">Potential form of 思い出す</div>
                <div>v. to be able to remember / recall</div>
              </motion.div>
            </span>ないだけで。
          </div>
          <p className="text-white/70 text-sm font-sans">Nothing that happens is ever forgotten, even if you can't remember it.</p>
        </div>
      </div>
    )
  },
  {
    id: 'stitch',
    text: "Saving a quote is saving the moment it moved you. 🎞️💖",
    visual: (
      <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-[#050505]">
        {/* Screen glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-3/4 bg-[#FFB800]/20 blur-3xl rounded-full" />
        {/* Screen image */}
        <motion.div 
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-4 left-4 right-4 h-28 bg-black rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,184,0,0.15)]"
        >
          <img src="https://image.tmdb.org/t/p/original/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg" referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-90" alt="La La Land" />
          {/* Film strip edges */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-black/50 flex flex-col justify-between py-1">
            {[...Array(6)].map((_, i) => <div key={`l-${i}`} className="w-1 h-1.5 bg-white/40 rounded-sm mx-auto" />)}
          </div>
          <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-black/50 flex flex-col justify-between py-1">
            {[...Array(6)].map((_, i) => <div key={`r-${i}`} className="w-1 h-1.5 bg-white/40 rounded-sm mx-auto" />)}
          </div>
        </motion.div>
        {/* Silhouette of person */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-[#0A0A0A] rounded-t-[40px] border-t border-white/10 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.8)]" />
      </div>
    )
  },
  {
    id: 'login',
    text: "MovieEcho 🍿\nCurate your multilingual life. 🌟",
    visual: null
  }
];

export default function Onboarding({ onLogin }: { onLogin: () => void }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < STORY_PAGES.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const page = STORY_PAGES[currentPage];

  return (
    <div className="min-h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#FFB800]/10 to-transparent opacity-50" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full flex flex-col items-center"
          >
            {page.visual && (
              <div className="h-72 flex items-center justify-center mb-8">
                {page.visual}
              </div>
            )}
            
            <div className="text-center space-y-2 mb-12 px-4">
              {page.text.split('\n').map((line, i) => (
                <p 
                  key={i} 
                  className={`text-white/90 ${currentPage === 3 && i === 0 ? 'text-4xl font-bold text-[#FFB800] mb-4 tracking-tight' : 'text-base font-medium tracking-tight leading-snug'}`}
                  style={{ fontFamily: '"Supria Sans", system-ui, sans-serif' }}
                >
                  {line}
                </p>
              ))}
            </div>

            {currentPage === 3 && (
              <div className="w-full max-w-sm mt-8">
                <button
                  onClick={onLogin}
                  className="w-full py-4 bg-[#FFB800] text-black rounded-xl font-bold text-lg hover:bg-[#FFB800]/90 transition-colors shadow-[0_0_20px_rgba(255,184,0,0.3)]"
                >
                  Get Started
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination & Next Button */}
      {currentPage < 3 && (
        <div className="h-24 px-8 flex items-center justify-between relative z-10">
          <div className="flex gap-2">
            {STORY_PAGES.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-[#FFB800]' : 'w-1.5 bg-white/20'}`} 
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <CaretRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
