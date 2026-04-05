import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Movie } from '../types';
import { CaretLeft, CaretRight, DotsSixVertical } from '@phosphor-icons/react';

// Mock calendar data
const generateCalendarData = (movies: Movie[]) => {
  const daysInMonth = 31;
  const data = [];
  for (let i = 1; i <= daysInMonth; i++) {
    // Randomly assign 0, 1, or 2 movies to a day for demo
    const numMovies = i % 5 === 0 ? 2 : (i % 3 === 0 ? 1 : 0);
    const dayMovies = [];
    for (let j = 0; j < numMovies; j++) {
      if (movies.length > 0) {
        dayMovies.push(movies[(i + j) % movies.length]);
      }
    }
    data.push({ day: i, movies: dayMovies });
  }
  return data;
};

export default function CalendarView({ movies }: { movies: Movie[] }) {
  const [currentMonth, setCurrentMonth] = useState('March 2026');
  const [calendarData, setCalendarData] = useState(() => generateCalendarData(movies));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const selectedDayData = selectedDay ? calendarData.find(d => d.day === selectedDay) : null;

  // Simple reorder function for demo
  const moveMovieUp = (dayIndex: number, movieIndex: number) => {
    if (movieIndex === 0) return;
    const newData = [...calendarData];
    const dayData = newData[dayIndex];
    const temp = dayData.movies[movieIndex];
    dayData.movies[movieIndex] = dayData.movies[movieIndex - 1];
    dayData.movies[movieIndex - 1] = temp;
    setCalendarData(newData);
  };

  return (
    <div className="min-h-full bg-[#0A0A0A] p-4 pb-24">
      <header className="flex items-center justify-between mb-6 pt-2">
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1">
          <button className="p-1 text-white/60 hover:text-white"><CaretLeft className="w-4 h-4" /></button>
          <span className="text-sm font-medium w-24 text-center">{currentMonth}</span>
          <button className="p-1 text-white/60 hover:text-white"><CaretRight className="w-4 h-4" /></button>
        </div>
      </header>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-8">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-white/40 mb-2">{day}</div>
        ))}
        
        {/* Empty slots for offset */}
        <div /><div /><div />
        
        {calendarData.map((data, index) => {
          const hasMovies = data.movies.length > 0;
          const isSelected = selectedDay === data.day;
          
          return (
            <motion.button
              key={data.day}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedDay(isSelected ? null : data.day)}
              className={`relative aspect-square rounded-xl overflow-hidden flex items-center justify-center border transition-all ${isSelected ? 'border-[#FFB800] z-10 scale-110 shadow-lg' : 'border-white/5 hover:border-white/20'}`}
            >
              {hasMovies && (
                <>
                  <img src={data.movies[0].poster} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
                  <div className="absolute inset-0 bg-black/20" />
                </>
              )}
              <span className={`relative z-10 text-sm font-medium ${hasMovies ? 'text-white text-shadow-sm' : 'text-white/40'}`}>
                {data.day}
              </span>
              {data.movies.length > 1 && (
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Day Details */}
      <AnimatePresence>
        {selectedDay && selectedDayData && selectedDayData.movies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-[#FFB800] mb-4">March {selectedDay}, 2026</h3>
              <div className="space-y-3">
                {selectedDayData.movies.map((movie, idx) => (
                  <div key={`${movie.id}-${idx}`} className="flex items-center gap-3 bg-black/20 p-2 rounded-xl">
                    <button 
                      onClick={() => moveMovieUp(calendarData.findIndex(d => d.day === selectedDay), idx)}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <DotsSixVertical className="w-5 h-5 text-white/20 cursor-grab" />
                    </button>
                    <img src={movie.poster} className="w-10 h-14 object-cover rounded-md" alt="" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{movie.title}</h4>
                      <p className="text-xs text-white/40">{movie.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {selectedDay && selectedDayData && selectedDayData.movies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="text-center py-8 text-white/40 text-sm bg-[#1A1A1A] rounded-2xl border border-white/10">
              No movies recorded on this day.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
