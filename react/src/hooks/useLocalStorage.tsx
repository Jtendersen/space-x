import { useState } from "react";

const LOCAL_STORAGE_FAVORITE_KEY = "favorites";

export const useLocalStorage = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_KEY) || "{}")
  );

  const updateFavorite = (fligh_number: number) => {
    const newFavs = {
      ...favorites,
      [fligh_number]: !favorites[fligh_number],
    };
    setFavorites(newFavs);
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_KEY, JSON.stringify(newFavs));
  };

  const setFavoritesFromBackend = (
    backendFavorites: Record<number, boolean>
  ) => {
    setFavorites(backendFavorites);
    localStorage.setItem(
      LOCAL_STORAGE_FAVORITE_KEY,
      JSON.stringify(backendFavorites)
    );
  };

  return {
    updateFavorite,
    favorites,
    setFavoritesFromBackend,
  };
};
