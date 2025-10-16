import { useSelector } from "react-redux";

//this page is used to count the favourite prouc t
// which you have to marked it favourite 

const FavoritesCount = () => {
//this is the actual change which is reflcet on the page 

  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;



  return (

    <div className="absolute left-2 top-8">
     {favoriteCount > 0 && (
     <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">{favoriteCount}</span>
)}
    </div>
  )
}

export default FavoritesCount;
