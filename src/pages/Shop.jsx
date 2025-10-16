// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

// import {
//   setCategories,
//   setProducts,
//   setChecked,
// } from "../redux/features/shop/shopSlice";
// import Loader from "../components/Loader";
// import ProductCard from "./Products/ProductCard";

// const Shop = () => {
//   const dispatch = useDispatch();
//   const { categories, products, checked, radio } = useSelector(
//     (state) => state.shop
//   );

//   const categoriesQuery = useFetchCategoriesQuery();
//   const [priceFilter, setPriceFilter] = useState("");

//   const filteredProductsQuery = useGetFilteredProductsQuery({
//     checked,
//     radio,
//   });



//   useEffect(() => {
//     if (!categoriesQuery.isLoading) {
//       dispatch(setCategories(categoriesQuery.data));
//     }
//   }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

//   useEffect(() => {
//     if (!checked.length || !radio.length) {
//       if (!filteredProductsQuery.isLoading) {
//         // Filter products based on both checked categories and price filter
//         const filteredProducts = filteredProductsQuery.data.filter(
//           (product) => {
//             // Check if the product price includes the entered price filter value
//             return (
//               product.price.toString().includes(priceFilter) ||
//               product.price === parseInt(priceFilter, 10)
//             );
//           }
//         );

//         dispatch(setProducts(filteredProducts));
//       }
//     }
//   }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

//   const handleBrandClick = (brand) => {
//     const productsByBrand = filteredProductsQuery.data?.filter(
//       (product) => product.brand === brand
//     );
//     dispatch(setProducts(productsByBrand));
//   };




//   const handleCheck = (value, id) => {
//     const updatedChecked = value
//       ? [...checked, id]
//       : checked.filter((c) => c !== id);
//     dispatch(setChecked(updatedChecked));
//   };





//   // Add "All Brands" option to uniqueBrands
//   const uniqueBrands = [
//     ...Array.from(
//       new Set(
//         filteredProductsQuery.data
//           ?.map((product) => product.brand)
//           .filter((brand) => brand !== undefined)
//       )
//     ),
//   ];



//   const handlePriceChange = (e) => {
//     // Update the price filter state when the user types in the input filed
//     setPriceFilter(e.target.value);
//   };




  


//   return (
//     <>
//       <div className="container mx-auto">
//         <div className="flex md:flex-row">
//           <div className="bg-[#151515] p-3 mt-2 mb-2">
//             <h2 className="h4 text-center py-2 bg-white rounded-full mb-2">
//               Filter by Categories
//             </h2>

//             <div className="p-5 w-[15rem]">
//               {categories?.map((c) => (
//                 <div key={c._id} className="mb-2">
//                   <div className="flex items-center mr-4">
//                     <input
//                       type="checkbox"
//                       id="red-checkbox"
//                       onChange={(e) => handleCheck(e.target.checked, c._id)}
//                       className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />

//                     <label
//                       htmlFor="pink-checkbox"
//                       className="ml-2 text-sm font-medium text-white dark:text-gray-300"
//                     >
//                       {c.name}
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <h2 className="h4 text-center py-2 bg-white rounded-full mb-2">
//               Filter by Brands
//             </h2>

//             <div className="p-5">
//               {uniqueBrands?.map((brand) => (
//                 <>
//                   <div className="flex items-center mr-4 mb-5">
//                     <input
//                       type="radio"
//                       id={brand}
//                       name="brand"
//                       onChange={() => handleBrandClick(brand)}
//                       className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />

//                     <label
//                       htmlFor="pink-radio"
//                       className="ml-2 text-sm font-medium text-white dark:text-gray-300"
//                     >
//                       {brand}
//                     </label>
//                   </div>
//                 </>
//               ))}
//             </div>

//             <h2 className="h4 text-center py-2 bg-white rounded-full mb-2">
//               Filer by Price
//             </h2>

//             <div className="p-5 w-[15rem]">
//               <input
//                 type="text"
//                 placeholder="Enter Price"
//                 value={priceFilter}
//                 onChange={handlePriceChange}
//                 className="w-full px-3 py-2 bg-white placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
//               />
//             </div>

//             <div className="p-5 pt-0">
//               <button
//                 className="w-full border my-4"
//                 onClick={() => window.location.reload()}
//               >
//                 Reset
//               </button>
//             </div>
//           </div>

//           <div className="p-6">
//             <h2 className="text-3xl font-bold text-center mb-6 text-white">
//               {products?.length} Products
//             </h2>

//             {products.length === 0 ? (
//               <Loader />
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products?.map((p) => (
//                   <div
//                     key={p._id}
//                     className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
//                   >
//                     <ProductCard p={p} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Shop;















import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Toggle for mobile

  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          );
        });
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand);
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data?.map((product) => product.brand).filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => setPriceFilter(e.target.value);

  return (
    <div className="container mx-auto p-2">
      {/* Mobile Filter Toggle */}
      <div className="flex justify-between items-center md:hidden mb-4">
        <h2 className="text-xl font-bold text-white">Filters</h2>
        <button
          className="bg-pink-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide" : "Show"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar / Filters */}
        <div
          className={`bg-[#151515] p-3 rounded-lg md:w-[18rem] w-full flex-shrink-0 transition-all ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <h2 className="text-center py-2 bg-white rounded-full mb-2 font-semibold">Filter by Categories</h2>
          <div className="p-2">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                />
                <label className="ml-2 text-white text-sm">{c.name}</label>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-white rounded-full mb-2 font-semibold">Filter by Brands</h2>
          <div className="p-2">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="mb-2 flex items-center">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 focus:ring-2"
                />
                <label className="ml-2 text-white text-sm">{brand}</label>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-white rounded-full mb-2 font-semibold">Filter by Price</h2>
          <div className="p-2 mb-2">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 bg-white placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
            />
          </div>

          <button
            className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 p-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-white">
            {products?.length} Products
          </h2>

          {products.length === 0 ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
