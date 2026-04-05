import { useState } from 'react';
import { CaretLeft, BookOpen } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { Frame } from '../types';

const getDefinition = (word: string) => {
  const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const dict: Record<string, { pos: string, def: string, trans: string }> = {
    'beat': { pos: 'v.', def: 'to defeat or overcome', trans: '打败；克服' },
    'sorry': { pos: 'adj.', def: 'feeling regret or penitence', trans: '抱歉的；遗憾的' },
    'vanished': { pos: 'adj.', def: 'having disappeared completely', trans: '消失的；无影无踪的' },
    'touch': { pos: 'v.', def: 'come into or be in contact with', trans: '触摸；触及' },
    'remembers': { pos: 'v.', def: 'have in or be able to bring to one\'s mind an awareness of', trans: '记得；回想起' },
    'years': { pos: 'n.', def: 'the time taken by the earth to make one revolution around the sun', trans: '岁月；年' },
    'looking': { pos: 'v.', def: 'direct one\'s gaze toward someone or something', trans: '看；注视' },
    'back': { pos: 'adv.', def: 'in, into, or towards a previous place or condition', trans: '向后；回首' },
    'see': { pos: 'v.', def: 'perceive with the eyes; discern visually', trans: '看见' }
  };
  return dict[cleanWord] || { pos: 'n/v.', def: 'Contextual meaning in the movie.', trans: '语境释义' };
};

export default function FrameDetail({ frame, onBack }: { frame: Frame, onBack: () => void }) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const words = frame.text.split(' ');

  return (
    <div className="min-h-full bg-[#0A0A0A] flex flex-col relative">
      <header className="px-4 h-14 flex items-center justify-between absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="p-2 -ml-2 text-white/70 hover:text-white transition-colors bg-black/20 rounded-full backdrop-blur-md">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="relative w-full aspect-[4/5] bg-black">
        <img src={frame.image} alt="Scene" className="w-full h-full object-cover" style={{ objectPosition: `50% ${frame.offsetY}%` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
      </div>

      <div className="px-6 py-8 flex-1 flex flex-col -mt-24 relative z-10">
        <div className="flex flex-wrap gap-x-2 gap-y-3 justify-center mb-6">
          {words.map((word, i) => (
            <span
              key={i}
              onClick={() => setSelectedWord(word)}
              className={`font-serif text-2xl cursor-pointer transition-colors ${selectedWord === word ? 'text-[#FFB800] drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]' : 'text-white hover:text-white/70 drop-shadow-md'}`}
            >
              {word}
            </span>
          ))}
        </div>
        <p className="font-serif text-white/60 text-center text-sm">{frame.translation}</p>

        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-auto bg-[#1A1A1A] rounded-2xl p-5 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-[#FFB800]" />
                <h3 className="text-lg font-serif font-medium">{selectedWord.replace(/[^a-zA-Z']/g, '')}</h3>
                <span className="text-xs text-white/40 ml-2">{getDefinition(selectedWord).pos}</span>
              </div>
              <p className="text-sm text-white/80 mb-1">{getDefinition(selectedWord).def}</p>
              <p className="text-sm text-[#FFB800]/80 font-serif">{getDefinition(selectedWord).trans}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
