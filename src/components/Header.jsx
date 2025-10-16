import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader.jsx";
import SmallProduct from "../pages/Products/SmallProduct.jsx";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="flex flex-row justify-between gap-6 p-4">
      {/* LEFT SIDE: SmallProduct grid */}
      <div className="w-2/3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: Product Carousel */}
      <div className="w-1/3">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
