import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon.jsx";
import Ratings from "./Ratings.jsx";
import ProductTabs from "./ProductTabs.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice.js";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  // ---------- Submit Review ----------
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  // ---------- Add to Cart ----------
  const addToCartHandler = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to Cart!");
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        product && (
          <div className="max-w-[1400px] mx-auto mt-10 px-8 text-white space-y-12">

            {/* =================== PRODUCT INFO SECTION =================== */}
            <div className="flex flex-col xl:flex-row gap-12 bg-gray-800 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700">
              
              {/* Left: Image */}
              <div className="relative w-full xl:w-[50%] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[30rem] object-cover"
                />
                <div className="absolute top-4 right-4">
                  <HeartIcon
                    product={product}
                    className="bg-red-400 p-2 rounded-full shadow-md"
                  />
                </div>
              </div>

              {/* Right: Details */}
              <div className="flex flex-col justify-between w-full xl:w-[50%] space-y-6">
                {/* Product Title + Desc + Price */}
                <div>
                  <h2 className="text-4xl font-bold mb-2">{product.name}</h2>
                  <p className="text-white text-lg leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-5xl font-extrabold text-pink-500">
                    ₹{product.price}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-white">
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <FaStore className="text-pink-500" /> Brand: {product.brand}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaClock className="text-pink-500" /> Added:{" "}
                      {moment(product.createdAt).fromNow()}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaStar className="text-pink-500" /> Reviews: {product.numReviews}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <FaStar className="text-pink-500" /> Rating: {product.rating}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaShoppingCart className="text-pink-500" /> Quantity: {product.quantity}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaBox className="text-pink-500" /> In Stock: {product.countInStock}
                    </p>
                  </div>
                </div>

                {/* Rating + Quantity Selector */}
                <div className="flex justify-between items-center flex-wrap gap-4 mt-6">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  {product.countInStock > 0 && (
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Add To Cart Button */}
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className={`py-3 px-6 rounded-xl shadow-lg font-semibold w-full md:w-auto transition-all duration-300 ${
                    product.countInStock === 0
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-700 text-white"
                  }`}
                >
                  {product.countInStock === 0 ? "Out of Stock" : "Add To Cart"}
                </button>
              </div>
            </div>

            {/* =================== PRODUCT REVIEWS SECTION =================== */}
            <div className="bg-gray-900/40 p-8 rounded-2xl shadow-lg border border-gray-700">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
                productRating={product.rating}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProductDetails;
