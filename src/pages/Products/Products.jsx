import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice.js";
import Rating from "./Ratings.jsx";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice.js";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import ProductTabs from "./ProductTabs.jsx";
import HeartIcon from "./HeartIcon";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="bg-gray-900 min-h-screen px-10 py-10 text-gray-200">
          <div className="flex flex-wrap items-start gap-12 justify-center">
            {/* Product Image */}
            <div className="relative w-full xl:w-[45rem] lg:w-[40rem] md:w-[30rem] sm:w-[22rem]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[28rem] object-cover rounded-2xl shadow-xl hover:shadow-pink-500/40 transition-all duration-300"
              />
              <div className="absolute top-3 right-3">
                <HeartIcon product={product} />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full xl:w-[35rem] bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-extrabold text-white mb-4">
                {product.name}
              </h2>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              <p className="text-4xl font-bold text-pink-500 mb-6">
                ₹{product.price}
              </p>

              {/* Info Sections */}
              <div className="flex flex-wrap justify-between gap-8 mt-2 text-gray-300">
                <div className="space-y-3">
                  <h1 className="flex items-center gap-2">
                    <FaStore className="text-pink-500" />{" "}
                    <span className="text-white">Brand:</span> {product.brand}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <FaClock className="text-pink-500" />{" "}
                    <span className="text-white">Added:</span>{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <FaStar className="text-pink-500" />{" "}
                    <span className="text-white">Reviews:</span>{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="space-y-3">
                  <h1 className="flex items-center gap-2">
                    <FaStar className="text-pink-500" />{" "}
                    <span className="text-white">Ratings:</span> {rating}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <FaShoppingCart className="text-pink-500" />{" "}
                    <span className="text-white">Quantity:</span>{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <FaBox className="text-pink-500" />{" "}
                    <span className="text-white">In Stock:</span>{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              {/* Rating & Quantity */}
              <div className="flex justify-between items-center mt-8 flex-wrap gap-4">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="p-2 w-[6rem] rounded-lg text-gray-900 bg-gray-100 focus:ring-2 focus:ring-pink-500"
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
              <div className="mt-8">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-pink-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-20 container mx-auto text-white">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
