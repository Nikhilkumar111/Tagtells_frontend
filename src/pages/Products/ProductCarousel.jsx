import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,  
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex justify-center my-8 px-4 md:px-10">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="w-full max-w-[70rem] bg-white rounded-xl shadow-xl p-6">
          <Slider {...settings} className="w-full">
            {products.map(
              ({
                image,
                _id,
                name,
                price,
                description,
                brand,
                createdAt,
                numReviews,
                rating,
                quantity,
                countInStock,
              }) => (
                <div
                  key={_id}
                  className="flex flex-col gap-4 bg-gray-50 rounded-lg shadow-md p-4"
                  style={{ minHeight: "36rem" }} // card height
                >
                  {/* Top: Image */}
                  <div className="flex justify-center">
                    <img
                      src={image}
                      alt={name}
                      className="w-full max-w-[32rem] h-80 md:h-[32rem] lg:h-[36rem] object-cover rounded-lg shadow-sm"
                    />
                  </div>

                  {/* Bottom: Product Info */}
                  <div className="flex flex-col justify-between p-2">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{name}</h2>
                      <p className="text-xl text-pink-600 font-semibold mb-2">
                        ₹ {price}
                      </p>
                      <p className="text-gray-600 mb-2">
                        {description.substring(0, 150)}...
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 mt-4 text-gray-700">
                      <div className="flex flex-col gap-1">
                        <h1 className="flex items-center">
                          <FaStore className="mr-2 text-pink-600" /> Brand: {brand}
                        </h1>
                        <h1 className="flex items-center">
                          <FaClock className="mr-2 text-pink-600" /> Added: {moment(createdAt).fromNow()}
                        </h1>
                        <h1 className="flex items-center">
                          <FaStar className="mr-2 text-pink-600" /> Reviews: {numReviews}
                        </h1>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h1 className="flex items-center">
                          <FaStar className="mr-2 text-pink-600" /> Ratings: {Math.round(rating)}
                        </h1>
                        <h1 className="flex items-center">
                          <FaShoppingCart className="mr-2 text-pink-600" /> Quantity: {quantity}
                        </h1>
                        <h1 className="flex items-center">
                          <FaBox className="mr-2 text-pink-600" /> In Stock: {countInStock}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
