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
      if (!image) {
        toast.error("Please upload an image first!");
        return;
      }

      const productData = {
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
        image, // Cloudinary URL string
      };

      // ✅ FIX: Use .unwrap() to properly handle RTK Query response
      const result = await createProduct(productData).unwrap();

      toast.success(`${result.name} is created`);
      navigate("/");
    } catch (error) {
      console.error(error);
      // ✅ FIX: Use proper error parsing for RTK Query
      toast.error(error?.data?.message || error?.message || "Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
  console.log("File size (bytes):", file.size);
  console.log("File type:", file.type);

  if (file.size > 10 * 1024 * 1024) { // 10MB
    console.log("File too large! Max 10MB allowed.");
    return;
  }
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      console.log("step 1 done");
      const res = await uploadProductImage(formData).unwrap(); // ✅ unwrap() used
      console.log("step 2");
      toast.success(res.message);
      setImage(res.image); // Cloudinary URL
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Image upload failed");
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

          <div className="mb-6">
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-gray-800 transition">
              <span className="font-semibold">
                {image ? "Image Uploaded ✅" : "Click to Upload Image"}
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

            <div>
              <label className="block mb-2 text-black">Description</label>
              <textarea
                rows={4}
                className="w-full p-3 rounded-lg bg-gray-200 border border-gray-700 focus:outline-none text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

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
                  value={category}
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
