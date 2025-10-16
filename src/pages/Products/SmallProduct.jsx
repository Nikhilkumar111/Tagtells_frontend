import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    
    <div className="w-[18rem] sm:w-[16rem] md:w-[20rem] m-4 p-4 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 relative">
      {/* HeartIcon independently clickable */}
      <div className="absolute top-2 right-2 z-10">
        <HeartIcon product={product} />
      </div>

      {/* Rest of card clickable */}
      <Link to={`/product/${product._id}`} className="block">
        <img   
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="flex justify-between items-center mt-2">
          <div className="font-semibold text-sm md:text-base">{product.name}</div>
          <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            ₹{product.price}
          </span>
        </h2>
      </Link>
    </div>
  );
};

export default SmallProduct;
