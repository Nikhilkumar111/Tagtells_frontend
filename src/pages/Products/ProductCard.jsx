import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  // Add to Cart Handler
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
      
      {/* Image Section */}
      <section className="relative overflow-hidden h-48 flex items-center justify-center">
        <Link to={`/product/${p._id}`} className="w-full h-full block">
          <span className="absolute top-3 left-3 bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full shadow-sm z-10">
            {p?.brand}
          </span>

          <img
            className="cursor-pointer w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <div className="absolute top-3 right-3 z-10">
          <HeartIcon product={p} />
        </div>
      </section>

      {/* Product Details */}
      <div className="p-5 flex flex-col justify-between h-[220px]">
        <div className="flex justify-between items-start mb-2">
          <h5 className="text-lg font-semibold text-white hover:text-pink-400 transition-colors duration-200">
            {p?.name}
          </h5>
          <p className="font-bold text-pink-500 text-lg">
            {p?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="text-gray-400 text-sm mb-3">
          {p?.description?.substring(0, 60)}...
        </p>

        {/* Actions */}
        <section className="flex justify-between items-center mt-auto">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-colors duration-200"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            onClick={() => addToCartHandler(p, 1)}
            className="p-2 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors duration-200 shadow-md"
          >
            <AiOutlineShoppingCart size={25} className="text-white" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
