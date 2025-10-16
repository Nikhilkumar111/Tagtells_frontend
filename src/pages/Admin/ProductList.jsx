import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-6 bg-[#a2adad] rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-6 text-black">Create Product</h2>

          {imageUrl && (
            <div className="mb-6 text-center">
              <img
                src={imageUrl}
                alt="product"
                className="mx-auto max-h-[200px] rounded-md shadow"
              />
            </div>
          )}

          {/* File Upload */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-gray-800 transition">
              <span className="font-semibold">
                {image ? image.name : "Click to Upload Image"}
              </span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Price */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-black">Name</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-gray-200 border border-gray-700 focus:outline-none text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-black">Price</label>
                <input
                  type="number"
                  className="w-full p-3 rounded-lg bg-gray-200 border border-gray-700 focus:outline-none text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Quantity & Brand */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-black">Quantity</label>
                <input
                  type="number"
                  className="w-full p-3 rounded-lg bg-gray-200 border border-gray-700 focus:outline-none text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-black">Brand</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-gray-200 border border-gray-700 focus:outline-none text-black"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-black">Description</label>
              <textarea
                rows={4}
                className="w-full p-3 rounded-lg bg-gray-200 border border-gray-700 focus:outline-none text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Count in Stock & Category */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-black">Count In Stock</label>
                <input
                  type="number"
                  className="w-full p-3 rounded-lg bg-gray-200 border border-gray-700 focus:outline-none text-black"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-black">Category</label>
                <select
                  className="w-full p-3 rounded-lg bg-gray-200 border border-gray-700 focus:outline-none text-black"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold bg-pink-600 hover:bg-pink-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
