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
        <>
          <div className="flex flex-wrap items-start mt-8 ml-[10rem] gap-10">
            {/* Product Image */}
            <div className="relative w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[28rem] object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute top-3 right-3">
                <HeartIcon product={product} />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full xl:w-[40rem]">
              <h2 className="text-3xl font-bold text-white">{product.name}</h2>
              <p className="my-4 text-gray-300 xl:w-[35rem] lg:w-[30rem]">
                {product.description}
              </p>
              <p className="text-4xl my-4 font-extrabold text-pink-500">
                ₹{product.price}
              </p>

              {/* Info Sections */}
              <div className="flex flex-wrap justify-between gap-8 mt-4 text-gray-300">
                <div className="space-y-4">
                  <h1 className="flex items-center gap-2">
                    <FaStore className="text-pink-500" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <FaClock className="text-pink-500" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <FaStar className="text-pink-500" /> Reviews: {product.numReviews}
                  </h1>
                </div>
                <div className="space-y-4">
                  <h1 className="flex items-center gap-2">
                    <FaStar className="text-pink-500" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <FaShoppingCart className="text-pink-500" /> Quantity: {product.quantity}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <FaBox className="text-pink-500" /> In Stock: {product.countInStock}
                  </h1>
                </div>
              </div>

              {/* Rating & Quantity */}
              <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />

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
              <div className="mt-6">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16 container ml-[10rem]">
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
        </>
      )}
    </>
  );
};

export default Product;
