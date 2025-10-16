import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData, isLoading: productLoading } = useGetProductByIdQuery(params._id);
  const { data: categories = [], isLoading: categoriesLoading } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(false); // loader for update/delete

  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category?._id || "");
      setQuantity(productData.quantity || "");
      setBrand(productData.brand || "");
      setStock(productData.countInStock || 0);
      setImage(productData.image || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", { position: "top-right", autoClose: 2000 });
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed", { position: "top-right", autoClose: 2000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !brand || !description || !price || !category || !quantity) {
      return toast.error("All fields are required", { position: "top-right", autoClose: 2000 });
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("brand", brand);
    formData.append("countInStock", stock);
    formData.append("image", image);

    try {
      const data = await updateProduct({ productId: params._id, formData });
      setLoading(false);
      if (data?.error) {
        toast.error(data.error, { position: "top-right", autoClose: 2000 });
      } else {
        toast.success("Product updated successfully", { position: "top-right", autoClose: 2000 });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Product update failed", { position: "top-right", autoClose: 2000 });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      const { data } = await deleteProduct(params._id);
      setLoading(false);
      toast.success(`"${data.name}" deleted successfully`, { position: "top-right", autoClose: 2000 });
      navigate("/admin/allproductslist");
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Delete failed", { position: "top-right", autoClose: 2000 });
    }
  };

  if (productLoading || categoriesLoading || loading) return <Loader />;

  return (
    <div className="container xl:mx-[9rem] sm:mx-[2rem] my-5">
      <div className="flex flex-col md:flex-row gap-6">
        <AdminMenu />
        <div className="md:w-3/4 p-6 bg-[#e8e8ea] rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Update / Delete Product</h2>

          {image && (
            <div className="text-center my-5">
              <img
                src={image}
                alt="product"
                className="mx-auto rounded-lg shadow-lg object-contain max-w-full w-[60%] h-auto border border-gray-600"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="text-white block w-full text-center rounded-lg cursor-pointer font-bold py-3 border-2 border-dashed border-gray-600 hover:border-green-500 transition-all">
              {image?.name || "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <div className="flex-1">
                <label className="text-white font-semibold">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#101011] text-white border border-gray-600 focus:border-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-white font-semibold">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#101011] text-white border border-gray-600 focus:border-green-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex-1">
                <label className="text-white font-semibold">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#101011] text-white border border-gray-600 focus:border-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-white font-semibold">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#101011] text-white border border-gray-600 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="text-white font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#101011] text-white border border-gray-600 focus:border-green-500"
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex-1">
                <label className="text-white font-semibold">Count In Stock</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#101011] text-white border border-gray-600 focus:border-green-500"
                />
              </div>

              <div className="flex-1">
                <label className="text-white font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#101011] text-white border border-gray-600 focus:border-green-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
              >
                Update Product
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-all"
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
