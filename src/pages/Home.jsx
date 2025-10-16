import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Header from "../components/Header.jsx";
import Product from "./Products/Products.jsx";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {!keyword && <Header />}
          <div className="flex justify-between items-center px-8 md:px-28 lg:px-52 mt-10">
            <h1 className="text-[2.5rem] md:text-[3rem] font-bold">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 md:px-14 hover:bg-pink-700 transition-colors"
            >
              Shop
            </Link>
          </div>

          {/* <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data?.products?.length > 0 ? (
                data.products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))
              ) : (
                <Message variant="info">No products found</Message>
              )}
            </div>
          </div> */}
        </>
      )}
    </>
  );
};

export default Home;
