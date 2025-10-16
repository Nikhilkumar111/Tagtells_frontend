import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings.jsx";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js";
import SmallProduct from "./SmallProduct.jsx";
import Loader from "../../components/Loader.jsx";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) return <Loader />;

  const handleTabClick = (tabNumber) => setActiveTab(tabNumber);

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gray-900 p-4 rounded-xl shadow-lg">
      {/* Sidebar Tabs */}
      <aside className="flex md:flex-col justify-around md:justify-start md:w-1/4 gap-4 md:gap-6">
        {["Write Your Review", "All Reviews", "Related Products"].map(
          (tab, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(index + 1)}
              className={`cursor-pointer p-3 text-center font-medium rounded-lg transition-all duration-300 ${
                activeTab === index + 1
                  ? "bg-pink-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-pink-500 hover:text-white"
              }`}
            >
              {tab}
            </div>
          )
        )}
      </aside>

      {/* Tab Content */}
      <div className="flex-1 md:w-3/4">
        {/* Write Review */}
        {activeTab === 1 && (
          <div className="bg-gray-800 p-6 rounded-xl shadow-inner">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-lg font-semibold mb-2 text-white">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg w-full bg-gray-900 text-white"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-lg font-semibold mb-2 text-white">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg w-full bg-gray-900 text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-gray-300">
                Please <Link to="/login" className="text-pink-500 hover:underline">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}

        {/* All Reviews */}
        {activeTab === 2 && (
          <div className="space-y-5 mt-4">
            {product.reviews.length === 0 && (
              <p className="text-gray-300 bg-gray-800 p-4 rounded-lg">No Reviews</p>
            )}

            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-white">{review.name}</strong>
                  <span className="text-gray-400 text-sm">{review.createdAt.substring(0, 10)}</span>
                </div>
                <Ratings value={review.rating} />
                <p className="text-gray-300 mt-2">{review.comment || "No comment provided"}</p>
              </div>
            ))}
          </div>
        )}

        {/* Related Products */}
        {activeTab === 3 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((prod) => (
                <SmallProduct key={prod._id} product={prod} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
