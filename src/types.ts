export type Movie = {
  id: string;
  title: string;
  year: string;
  score: string;
  region: string;
  poster: string;
  addedAt: number;
};

export type Frame = {
  id: string;
  movieId: string;
  image: string;
  text: string;
  translation: string;
  offsetY: number;
  timestamp: number;
};

export type ProjectData = {
  frames: Frame[];
  movie: Movie;
};
