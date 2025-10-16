import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  // Clamp value between 0 and 5
  const safeValue = Math.min(Math.max(value || 0, 0), 5);

  const fullStars = Math.floor(safeValue);
  const hasHalfStar = safeValue - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - hasHalfStar;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className={`text-${color} ml-1`} />
      ))}

      {hasHalfStar === 1 && (
        <FaStarHalfAlt className={`text-${color} ml-1`} />
      )}

      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className={`text-${color} ml-1`} />
      ))}

      {text && <span className={`ml-2 text-${color}`}>{text}</span>}
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;
