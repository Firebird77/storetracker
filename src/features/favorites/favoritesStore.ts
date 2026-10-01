import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Store } from '../../api/types';

interface FavoritesState {
  favorites: Store[];
  toggle: (store: Store) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggle: (store) =>
        set(({ favorites }) => ({
          favorites: favorites.some((f) => f.id === store.id)
            ? favorites.filter((f) => f.id !== store.id)
            : [...favorites, store],
        })),
    }),
    { name: 'favorites', storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export const useIsFavorite = (id: string) => useFavoritesStore((s) => s.favorites.some((f) => f.id === id));
