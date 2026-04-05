import { useState } from 'react';
import { CaretLeft, DotsSixVertical, Sparkle } from '@phosphor-icons/react';
import { motion, Reorder, useDragControls } from 'motion/react';
import { ProjectData, Frame, Movie } from '../types';

function FrameItem({ frame, onTextChange, onOffsetChange }: { key?: string, frame: Frame, onTextChange: (id: string, field: 'text' | 'translation', value: string) => void, onOffsetChange: (id: string, value: number) => void }) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item 
      value={frame} 
      dragListener={false}
      dragControls={dragControls}
      className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-lg border border-white/5"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-black">
        <img
          src={frame.image}
          alt="Scene"
          className="w-full h-full object-cover"
          style={{ objectPosition: `50% ${frame.offsetY}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtitle Overlay */}
        <div className="absolute bottom-4 left-0 right-0 text-center px-8 pointer-events-none">
          <p className="font-serif text-white text-sm drop-shadow-md">{frame.text}</p>
          <p className="font-serif text-white/80 text-xs mt-1 drop-shadow-md">{frame.translation}</p>
        </div>

        {/* Controls Overlay */}
        <div className="absolute right-2 top-0 bottom-0 flex flex-col items-center justify-center py-4 pointer-events-none">
          <input
            type="range"
            min="0"
            max="100"
            value={frame.offsetY}
            onChange={(e) => onOffsetChange(frame.id, Number(e.target.value))}
            className="pointer-events-auto h-24 w-1 appearance-none bg-white/20 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
            style={{ writingMode: 'vertical-lr', direction: 'rtl' } as any}
          />
        </div>
      </div>

      {/* Editor Area */}
      <div className="p-4 flex gap-3">
        <div className="flex-1 space-y-3">
          <input
            type="text"
            value={frame.text}
            onChange={(e) => onTextChange(frame.id, 'text', e.target.value)}
            className="w-full bg-transparent border-b border-white/10 pb-1 text-sm font-serif text-white/90 focus:border-[#FFB800] outline-none transition-colors placeholder:text-white/20"
            placeholder="Original text..."
          />
          <input
            type="text"
            value={frame.translation}
            onChange={(e) => onTextChange(frame.id, 'translation', e.target.value)}
            className="w-full bg-transparent border-b border-white/10 pb-1 text-sm font-serif text-white/60 focus:border-[#FFB800] outline-none transition-colors placeholder:text-white/20"
            placeholder="Translation..."
          />
        </div>
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center justify-center cursor-grab active:cursor-grabbing px-2 text-white/30 hover:text-white/60 transition-colors touch-none"
        >
          <GripVertical className="w-5 h-5" />
        </div>
      </div>
    </Reorder.Item>
  );
}

export default function Editor({ 
  initialFrames, 
  movie, 
  onPreview, 
  onBack 
}: { 
  initialFrames: Frame[];
  movie: Movie;
  onPreview: (data: ProjectData) => void;
  onBack: () => void;
}) {
  const [frames, setFrames] = useState(initialFrames);
  const [editedTitle, setEditedTitle] = useState(movie.title);

  const handleTextChange = (id: string, field: 'text' | 'translation', value: string) => {
    setFrames(frames.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleOffsetChange = (id: string, value: number) => {
    setFrames(frames.map(f => f.id === id ? { ...f, offsetY: value } : f));
  };

  return (
    <div className="min-h-full bg-[#0A0A0A] flex flex-col">
      <header className="px-4 h-14 flex items-center justify-between border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-white/70 hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center flex-1 mx-4">
          <span className="text-sm font-medium">Editor</span>
          <div className="flex items-center gap-1 mt-0.5 w-full justify-center">
            <Sparkles className="w-3 h-3 text-[#FFB800]" />
            <input 
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              className="bg-transparent text-center text-[10px] text-[#FFB800] focus:outline-none focus:border-b focus:border-[#FFB800]/50 w-full max-w-[120px]"
            />
          </div>
        </div>
        <button
          onClick={() => onPreview({ frames, movie: { ...movie, title: editedTitle } })}
          className="p-2 -mr-2 text-[#FFB800] font-medium text-sm transition-opacity"
        >
          Next
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="p-4">
          <Reorder.Group axis="y" values={frames} onReorder={setFrames} className="space-y-6">
            {frames.map((frame) => (
              <FrameItem 
                key={frame.id} 
                frame={frame} 
                onTextChange={handleTextChange} 
                onOffsetChange={handleOffsetChange} 
              />
            ))}
          </Reorder.Group>
        </div>
      </main>
    </div>
  );
}
