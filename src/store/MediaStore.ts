import { create } from 'zustand';

type typeGenre = {
  id: number;
  name: string;
};
interface state {
  initial: boolean;
  loading: boolean;
  page: number;
  hasMore: boolean;
  mediaType: string;
  total_pages: number;

  media: any[];
  url: string;
  back: boolean;
  sortBy: { value: string; label: string };
  genres: typeGenre[];
  selectedGenresList: typeGenre[];

  setMedia: (res: any) => void;
  setState: (state: any) => void;
  updateSpecific: (key: any, value: any) => void;
}

const MediaStore = create<state>()((set) => ({
  initial: true,
  loading: true,
  page: 0,
  hasMore: false,
  mediaType: '',
  total_pages: 0,
  media: [],
  url: '',
  back: false,
  genres: [],
  selectedGenresList: [],
  sortBy: {
    label: 'Sort By',
    value: '',
  },

  setMedia: (newMedia) =>
    set((state) => ({ media: [...state.media, ...newMedia] })),
  setState: (newState) =>
    set((state) => ({
      ...state,
      ...newState,
    })),
  updateSpecific: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
export default MediaStore;
