import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Books, Calendar, User } from '@phosphor-icons/react';
import Home from './Home';
import CalendarView from './CalendarView';
import ProfileView from './ProfileView';
import { Movie } from '../types';

export default function MainLayout({ 
  movies, 
  onMovieSelect, 
  onUpload 
}: { 
  movies: Movie[], 
  onMovieSelect: (id: string) => void, 
  onUpload: (files: File[]) => void 
}) {
  const [activeTab, setActiveTab] = useState<'library' | 'calendar' | 'profile'>('library');

  return (
    <div className="min-h-full flex flex-col bg-[#0A0A0A]">
      <div className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {activeTab === 'library' && (
            <motion.div key="library" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute inset-0 overflow-y-auto">
              <Home movies={movies} onMovieSelect={onMovieSelect} onUpload={onUpload} />
            </motion.div>
          )}
          {activeTab === 'calendar' && (
            <motion.div key="calendar" initial={{ opacity: 0, x: activeTab === 'library' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: activeTab === 'library' ? -20 : 20 }} className="absolute inset-0 overflow-y-auto">
              <CalendarView movies={movies} />
            </motion.div>
          )}
          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 overflow-y-auto">
              <ProfileView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tab Bar */}
      <div className="h-16 bg-[#0A0A0A]/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-4 pb-safe absolute bottom-0 left-0 right-0 z-50">
        <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center gap-1 ${activeTab === 'library' ? 'text-[#FFB800]' : 'text-white/40'}`}>
          <Books className="w-6 h-6" />
          <span className="text-[10px] font-medium">Library</span>
        </button>
        <button onClick={() => setActiveTab('calendar')} className={`flex flex-col items-center gap-1 ${activeTab === 'calendar' ? 'text-[#FFB800]' : 'text-white/40'}`}>
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-medium">Calendar</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#FFB800]' : 'text-white/40'}`}>
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}
