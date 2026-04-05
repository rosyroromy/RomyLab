import { useState } from 'react';
import { CaretLeft, MagnifyingGlass, CheckSquare, Square, Scissors } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Movie, Frame } from '../types';

export default function MovieDetails({ 
  movie, 
  frames, 
  onBack, 
  onStitch,
  onFrameClick
}: { 
  movie: Movie; 
  frames: Frame[]; 
  onBack: () => void; 
  onStitch: (selectedFrames: Frame[]) => void;
  onFrameClick: (frame: Frame) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredFrames = frames.filter(f => 
    f.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleStitch = () => {
    const selectedFrames = frames.filter(f => selectedIds.has(f.id));
    onStitch(selectedFrames);
  };

  return (
    <div className="min-h-full bg-[#0A0A0A] flex flex-col relative pb-24">
      {/* Header & Movie Info */}
      <div className="relative">
        <div className="absolute inset-0 h-64 overflow-hidden">
          <img src={movie.poster} alt="" className="w-full h-full object-cover opacity-30 blur-xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>
        
        <header className="px-4 h-14 flex items-center justify-between relative z-20">
          <button onClick={onBack} className="p-2 -ml-2 text-white/70 hover:text-white transition-colors bg-black/20 rounded-full backdrop-blur-md">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </header>

        <div className="px-6 pt-4 pb-8 relative z-10 flex gap-4">
          <img src={movie.poster} alt={movie.title} className="w-24 h-36 object-cover rounded-lg shadow-2xl border border-white/10" />
          <div className="flex flex-col justify-end pb-2">
            <h1 className="text-xl font-semibold tracking-tight leading-tight mb-2">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 mb-2">
              <span className="bg-white/10 px-2 py-0.5 rounded-sm">{movie.year}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded-sm">{movie.region}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-[#FFB800]">IMDb {movie.score}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-4 sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-xl py-3 border-b border-white/5 flex gap-2">
        <div className="flex-1 relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search lines..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFB800]/50 transition-colors"
          />
        </div>
        <button
          onClick={() => {
            setIsSelectMode(!isSelectMode);
            if (isSelectMode) setSelectedIds(new Set());
          }}
          className={`px-4 rounded-xl text-sm font-medium transition-colors border ${isSelectMode ? 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30' : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'}`}
        >
          {isSelectMode ? 'Cancel' : 'Select'}
        </button>
      </div>

      {/* Frames List */}
      <div className="p-4 space-y-4">
        {filteredFrames.map(frame => (
          <div 
            key={frame.id} 
            onClick={() => isSelectMode ? toggleSelect(frame.id) : onFrameClick(frame)}
            className={`relative bg-[#1A1A1A] rounded-2xl overflow-hidden border transition-all cursor-pointer ${selectedIds.has(frame.id) ? 'border-[#FFB800] shadow-[0_0_15px_rgba(255,184,0,0.15)]' : 'border-white/5 hover:border-white/20'}`}
          >
            <div className="relative w-full aspect-video bg-black">
              <img src={frame.image} alt="Scene" className="w-full h-full object-cover" style={{ objectPosition: `50% ${frame.offsetY}%` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 text-center px-8">
                <p className="font-serif text-white text-sm drop-shadow-md">{frame.text}</p>
                <p className="font-serif text-white/80 text-xs mt-1 drop-shadow-md">{frame.translation}</p>
              </div>
            </div>
            
            {isSelectMode && (
              <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-md rounded-full p-1">
                {selectedIds.has(frame.id) ? (
                  <CheckSquare className="w-5 h-5 text-[#FFB800]" />
                ) : (
                  <Square className="w-5 h-5 text-white/50" />
                )}
              </div>
            )}
          </div>
        ))}
        {filteredFrames.length === 0 && (
          <div className="text-center py-12 text-white/40 text-sm">
            No lines found.
          </div>
        )}
      </div>

      {/* Floating Action Button for Stitching */}
      {isSelectMode && selectedIds.size > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-0 right-0 flex justify-center z-40"
        >
          <button
            onClick={handleStitch}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFB800] text-black font-semibold shadow-[0_0_20px_rgba(255,184,0,0.3)] active:scale-95 transition-transform"
          >
            <Scissors className="w-4 h-4" />
            Stitch ({selectedIds.size})
          </button>
        </motion.div>
      )}
    </div>
  );
}
