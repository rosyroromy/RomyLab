import { useState, useRef, useMemo } from 'react';
import { Plus, Star, Search, ArrowUpDown, Filter } from 'lucide-react';
import { Movie } from '../types';
import { MOCK_MOVIES } from '../data';

export default function Home({ 
  onMovieSelect, 
  onUpload 
}: { 
  onMovieSelect: (movieId: string) => void;
  onUpload: (files: File[]) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [regionFilter, setRegionFilter] = useState('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...MOCK_MOVIES];

    // Filter by search
    if (searchQuery) {
      result = result.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by region
    if (regionFilter !== 'All') {
      result = result.filter(m => m.region.includes(regionFilter));
    }

    // Sort by time
    result.sort((a, b) => {
      if (sortOrder === 'desc') return b.addedAt - a.addedAt;
      return a.addedAt - b.addedAt;
    });

    return result;
  }, [searchQuery, sortOrder, regionFilter]);

  return (
    <div className="pb-24 min-h-full">
      <header className="px-6 pt-12 pb-4 sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-xl z-10">
        <h1 className="text-2xl font-semibold tracking-tight">MovieEcho</h1>
        <p className="text-white/50 text-sm mt-1">Your cinematic archive</p>
        
        {/* Search & Filter Bar */}
        <div className="flex gap-2 mt-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFB800]/50 transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFB800]/50 appearance-none text-white/80 h-full"
            >
              <option value="All">All</option>
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
              <option value="Hong Kong">HK</option>
            </select>
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
          </div>
          <button
            onClick={() => setSortOrder(s => s === 'desc' ? 'asc' : 'desc')}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
          >
            <ArrowUpDown className={`w-4 h-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </header>

      <main className="px-4 pt-2">
        <div className="grid grid-cols-2 gap-4">
          {filteredAndSortedMovies.map((movie) => (
            <div 
              key={movie.id} 
              onClick={() => onMovieSelect(movie.id)}
              className="relative rounded-2xl overflow-hidden aspect-[2/3] bg-[#1A1A1A] group cursor-pointer border border-white/5 hover:border-white/20 transition-colors"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-[#FFB800] fill-[#FFB800]" />
                <span className="text-xs font-medium text-[#FFB800]">{movie.score}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-sm font-medium leading-tight line-clamp-2">{movie.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-white/60">{movie.year}</p>
                  <p className="text-[10px] text-white/40 px-1.5 py-0.5 bg-white/10 rounded-sm">{movie.region}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredAndSortedMovies.length === 0 && (
            <div className="col-span-2 text-center py-12 text-white/40 text-sm">
              No movies found.
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl active:scale-95 transition-transform hover:bg-white/20"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
