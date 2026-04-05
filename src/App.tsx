import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import MainLayout from './components/MainLayout';
import Editor from './components/Editor';
import Preview from './components/Preview';
import MovieDetails from './components/MovieDetails';
import LoadingOverlay from './components/LoadingOverlay';
import FrameDetail from './components/FrameDetail';
import Onboarding from './components/Onboarding';
import PermissionModal from './components/PermissionModal';
import { Movie, Frame, ProjectData } from './types';
import { MOCK_MOVIES, MOCK_FRAMES } from './data';

type ViewState = 'home' | 'movie' | 'loading' | 'editor' | 'preview' | 'frame-detail';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [allFrames, setAllFrames] = useState<Frame[]>(MOCK_FRAMES);
  
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [editorData, setEditorData] = useState<{ frames: Frame[], movie: Movie } | null>(null);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  const handleUpload = (files: File[]) => {
    setCurrentView('loading');
    
    // Simulate AI processing time
    setTimeout(() => {
      // Mock new frames from upload
      const newFrames: Frame[] = files.map((f, i) => ({
        id: `new_${Date.now()}_${i}`,
        movieId: 'm1', // simulate matched movie
        image: URL.createObjectURL(f),
        text: 'Auto-detected text...',
        translation: '自动识别的翻译...',
        offsetY: 50,
        timestamp: Date.now() + i
      }));
      setEditorData({ frames: newFrames, movie: movies[0] });
      setCurrentView('editor');
    }, 4500);
  };

  const handleSave = (action: 'replace' | 'new-copy' | 'download') => {
    if ((action === 'new-copy' || action === 'replace') && projectData) {
      // Check if the title was changed and doesn't exist
      const existingMovie = movies.find(m => m.title === projectData.movie.title);
      let targetMovieId = existingMovie?.id;

      if (!existingMovie && action === 'new-copy') {
        const newMovie: Movie = {
          ...projectData.movie,
          id: `m_${Date.now()}`,
          dateAdded: new Date().toISOString()
        };
        setMovies([newMovie, ...movies]);
        targetMovieId = newMovie.id;
      }

      // Save frames
      if (targetMovieId) {
        const newFrames = projectData.frames.map(f => ({ ...f, movieId: targetMovieId }));
        setAllFrames([...newFrames, ...allFrames]);
      }
    }
    setCurrentView('home');
  };

  const selectedMovie = movies.find(m => m.id === selectedMovieId);
  const movieFrames = allFrames.filter(f => f.movieId === selectedMovieId).sort((a, b) => a.timestamp - b.timestamp);

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex justify-center">
        <div className="w-full max-w-[430px] min-h-screen relative overflow-hidden bg-[#0A0A0A] shadow-2xl border-x border-white/5">
          <Onboarding onLogin={() => {
            setIsLoggedIn(true);
            setShowPermissionModal(true);
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen relative overflow-hidden bg-[#0A0A0A] shadow-2xl border-x border-white/5">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 overflow-y-auto"
            >
              <MainLayout 
                movies={movies}
                onMovieSelect={(id) => {
                  setSelectedMovieId(id);
                  setCurrentView('movie');
                }}
                onUpload={handleUpload}
              />
            </motion.div>
          )}

          {currentView === 'movie' && selectedMovie && (
            <motion.div
              key="movie"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 overflow-y-auto"
            >
              <MovieDetails 
                movie={selectedMovie}
                frames={movieFrames}
                onBack={() => setCurrentView('home')}
                onStitch={(frames) => {
                  setEditorData({ frames, movie: selectedMovie });
                  setCurrentView('editor');
                }}
                onFrameClick={(frame) => {
                  setSelectedFrame(frame);
                  setCurrentView('frame-detail');
                }}
              />
            </motion.div>
          )}

          {currentView === 'frame-detail' && selectedFrame && (
            <motion.div
              key="frame-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 overflow-y-auto"
            >
              <FrameDetail 
                frame={selectedFrame} 
                onBack={() => setCurrentView('movie')} 
              />
            </motion.div>
          )}

          {currentView === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <LoadingOverlay />
            </motion.div>
          )}

          {currentView === 'editor' && editorData && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 overflow-y-auto"
            >
              <Editor
                initialFrames={editorData.frames}
                movie={editorData.movie}
                onPreview={(data) => {
                  setProjectData(data);
                  setCurrentView('preview');
                }}
                onBack={() => setCurrentView('home')}
              />
            </motion.div>
          )}

          {currentView === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 overflow-y-auto"
            >
              <Preview
                data={projectData}
                onBack={() => setCurrentView('editor')}
                onSave={handleSave}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPermissionModal && (
            <PermissionModal 
              onAllow={() => setShowPermissionModal(false)}
              onDeny={() => setShowPermissionModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
