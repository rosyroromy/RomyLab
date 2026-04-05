import { Movie, Frame } from './types';

export const MOCK_MOVIES: Movie[] = [
  { id: 'm1', title: 'Manchester by the Sea', year: '2016', score: '7.8', region: 'US', poster: 'https://image.tmdb.org/t/p/original/w2tE7l4G75Hh8e30H3dF6H4yOQe.jpg', addedAt: 1600000000000 },
  { id: 'm2', title: 'Blade Runner 2049', year: '2017', score: '8.0', region: 'US', poster: 'https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', addedAt: 1610000000000 },
  { id: 'm3', title: 'Interstellar', year: '2014', score: '8.7', region: 'UK', poster: 'https://image.tmdb.org/t/p/original/gEU2QlsUUHXjNpebbDOvCZzypwC.jpg', addedAt: 1620000000000 },
  { id: 'm4', title: 'In the Mood for Love', year: '2000', score: '8.1', region: 'Hong Kong', poster: 'https://image.tmdb.org/t/p/original/iYypPT4OqTDX4DClqOQ4Q8Qz6z.jpg', addedAt: 1630000000000 },
];

export const MOCK_FRAMES: Frame[] = [
  { id: 'f1', movieId: 'm1', image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200&auto=format&fit=crop', text: 'I can\'t beat it.', translation: '我走不出来。', offsetY: 50, timestamp: 1 },
  { id: 'f2', movieId: 'm1', image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200&auto=format&fit=crop', text: 'I can\'t beat it.', translation: '我真的走不出来。', offsetY: 50, timestamp: 2 },
  { id: 'f3', movieId: 'm1', image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200&auto=format&fit=crop', text: 'I am sorry.', translation: '对不起。', offsetY: 50, timestamp: 3 },
  { id: 'f4', movieId: 'm4', image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop', text: 'He remembers those vanished years.', translation: '那些消逝了的岁月，仿佛隔着一块积着灰尘的玻璃。', offsetY: 50, timestamp: 4 },
  { id: 'f5', movieId: 'm4', image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop', text: 'Looking back, he can see it, but he can\'t touch it.', translation: '看得到，抓不着。', offsetY: 50, timestamp: 5 },
];
