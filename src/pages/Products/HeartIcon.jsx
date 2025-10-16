import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice.js";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage.js";

const HeartIcon = ({ product, className }) => {
  const dispatch = useDispatch();
 const favorites = useSelector((state) => state.favorites) || [];

  const isFavorite = favorites.some((p) => p._id === product._id);

  // ✅ Load favorites from localStorage on first render
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    if (favoritesFromLocalStorage) {
      dispatch(setFavorites(favoritesFromLocalStorage));
    }
  }, [dispatch]);

  // ✅ Toggle favorite
  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      onClick={toggleFavorites}
      className={`absolute top-4 right-4 cursor-pointer p-3 rounded-full shadow-md hover:scale-110 transition-transform duration-300 ${className}`}
      title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      {isFavorite ? (
        <FaHeart className="text-white text-2xl" />
      ) : (
        <FaRegHeart className="text-white text-2xl" />
      )}
    </div>
  );
};

export default HeartIcon;
