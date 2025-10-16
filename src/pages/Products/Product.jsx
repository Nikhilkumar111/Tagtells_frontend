import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-4 p-3 relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      
      {/* Image + Heart Icon */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800 hover:text-pink-500 transition-colors duration-200">
              {product.name}
            </div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
