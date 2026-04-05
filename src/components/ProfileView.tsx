import { Gear } from '@phosphor-icons/react';

const MOCK_MOMENTS = [
  {
    id: '1',
    date: 'Today',
    image: 'https://m.media-amazon.com/images/M/MV5BMTYxMjk0NDg4Ml5BMl5BanBnXkFtZTgwODcyNjA5OTE@._V1_SX300.jpg',
    movie: 'Manchester by the Sea',
    quote: 'I can\'t beat it.'
  },
  {
    id: '2',
    date: 'Yesterday',
    image: 'https://m.media-amazon.com/images/M/MV5BYjZjMWZlNDUtODgwOS00ODJhLTg4NzItN2E2NDc1ZTIxZWEwXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    movie: 'In the Mood for Love',
    quote: 'He remembers those vanished years.'
  }
];

export default function ProfileView() {
  return (
    <div className="min-h-full bg-[#0A0A0A] pb-24">
      {/* Wallpaper & Header */}
      <div className="relative h-64">
        <img src="https://image.tmdb.org/t/p/original/mK1XEUfNqMvT2P3A2C1z6k3HwQO.jpg" referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-60" alt="Perfect Days" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white/80 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 relative -mt-12 mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-[#0A0A0A] overflow-hidden bg-[#1A1A1A] mb-4">
          <img src="https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Avatar" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Romy</h1>
        <p className="text-sm text-white/60">"Next time is next time. Now is now."</p>
        
        <div className="flex gap-6 mt-6">
          <div>
            <div className="text-xl font-bold">128</div>
            <div className="text-xs text-white/40">Lines</div>
          </div>
          <div>
            <div className="text-xl font-bold">45</div>
            <div className="text-xs text-white/40">Movies</div>
          </div>
          <div>
            <div className="text-xl font-bold">12</div>
            <div className="text-xs text-white/40">Languages</div>
          </div>
        </div>
      </div>

      {/* Moments */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-4">Moments</h2>
        <div className="space-y-4">
          {MOCK_MOMENTS.map(moment => (
            <div key={moment.id} className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/5 flex h-32">
              <div className="w-24 h-full bg-black shrink-0">
                <img src={moment.image} className="w-full h-full object-cover" alt="Moment" />
              </div>
              <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-white/80">{moment.date}</span>
                  </div>
                  <p className="text-sm font-serif text-white/90 line-clamp-2 leading-relaxed">"{moment.quote}"</p>
                </div>
                <span className="text-xs text-[#FFB800] truncate">{moment.movie}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
