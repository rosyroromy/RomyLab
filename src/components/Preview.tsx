import { useState } from 'react';
import { ChevronLeft, Download, Library, Trash2, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectData } from '../types';

export default function Preview({ data, onBack, onSave }: { data: ProjectData | null, onBack: () => void, onSave: () => void }) {
  const [showSaveOptions, setShowSaveOptions] = useState(false);

  if (!data) return null;

  const { frames, movie } = data;

  return (
    <div className="min-h-full bg-[#111] flex flex-col">
      <header className="px-4 h-14 flex items-center justify-between border-b border-white/5 bg-[#111]/80 backdrop-blur-xl sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-white/70 hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-sm font-medium">Preview</span>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex justify-center">
        {/* The Stitched Image Container */}
        <div className="w-full max-w-[320px] bg-black drop-shadow-2xl flex flex-col relative overflow-hidden rounded-sm">
          {/* Film Sprocket Holes Decoration - Left */}
          <div className="absolute left-1 top-0 bottom-0 w-1.5 flex flex-col justify-around py-2 z-10 opacity-30 mix-blend-overlay pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-full h-2 bg-black rounded-sm" />
            ))}
          </div>
          {/* Film Sprocket Holes Decoration - Right */}
          <div className="absolute right-1 top-0 bottom-0 w-1.5 flex flex-col justify-around py-2 z-10 opacity-30 mix-blend-overlay pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-full h-2 bg-black rounded-sm" />
            ))}
          </div>

          {frames.map((frame, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={frame.id}
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: isFirst ? '16/9' : 'auto',
                  height: isFirst ? 'auto' : '120px'
                }}
              >
                <img
                  src={frame.image}
                  alt="Scene"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: `50% ${frame.offsetY}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-0 right-0 text-center px-6 pointer-events-none">
                  <p className="font-serif text-white text-[13px] leading-snug drop-shadow-md">{frame.text}</p>
                  <p className="font-serif text-white/70 text-[11px] mt-0.5 drop-shadow-md">{frame.translation}</p>
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <div className="py-6 px-4 flex flex-col items-center justify-center bg-black border-t border-white/5 relative z-10">
            <p className="font-serif text-white/80 text-xs text-center tracking-wide">
              {movie.title} · {movie.year} · IMDb {movie.score}
            </p>
            <p className="text-white/30 text-[9px] mt-2 uppercase tracking-widest font-sans">
              Designed by MovieEcho
            </p>
          </div>
        </div>
      </main>

      <footer className="p-6 bg-[#111] border-t border-white/5 sticky bottom-0 z-20 relative">
        <AnimatePresence>
          {showSaveOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full left-6 right-6 mb-4 bg-[#1A1A1A] border border-white/10 rounded-2xl p-2 flex flex-col gap-1 shadow-2xl origin-bottom"
            >
              <button onClick={onSave} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                <div className="bg-white/10 p-2 rounded-lg"><Trash2 className="w-4 h-4 text-[#FFB800]" /></div>
                <div>
                  <p className="text-sm font-medium text-white">Merge & Replace</p>
                  <p className="text-[10px] text-white/50 mt-0.5">Save to archive and delete original frames</p>
                </div>
              </button>
              <button onClick={onSave} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                <div className="bg-white/10 p-2 rounded-lg"><Copy className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-sm font-medium text-white">Save as New Copy</p>
                  <p className="text-[10px] text-white/50 mt-0.5">Keep original frames intact in the archive</p>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSaveOptions(!showSaveOptions)}
            className="flex-1 py-3.5 rounded-2xl bg-[#1A1A1A] text-white font-medium text-sm flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-[#222] border border-white/5"
          >
            <Library className="w-4 h-4" />
            Save to Archive
          </button>
          <button
            onClick={onSave}
            className="flex-1 py-3.5 rounded-2xl bg-[#FFB800] text-black font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_25px_rgba(255,184,0,0.3)]"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </footer>
    </div>
  );
}
