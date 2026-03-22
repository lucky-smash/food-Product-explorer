import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createProduct, fetchProducts } from "../services/productService.js";

const Dashboard = () => {
  // Form state for product creation
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Products list state
  const [products, setProducts] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState("");

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createProduct(form);
      setSuccess("Product created successfully.");
      setForm({ name: "", brand: "", category: "", imageUrl: "" });
    } catch (err) {
      setError(err.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load for products list
  useEffect(() => {
    const load = async () => {
      setListLoading(true);
      setListError("");
      try {
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        setListError(err.message || "Failed to load products.");
      } finally {
        setListLoading(false);
      }
    };
    load();
  }, []);



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="p-6 flex-1">
        <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-gray-800">➕ Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                type="text"
                name="name"
                placeholder="Product name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                type="text"
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
              />
              <input
                className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
              <input
                className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
              />

              {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
              {success && <p className="text-green-700 text-sm bg-green-50 p-3 rounded-lg">{success}</p>}

              <button
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-60 font-medium"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-gray-800">📦 Your Products</h2>

            {/* Loading Spinner */}
            {listLoading && (
              <div className="flex items-center justify-center mb-4">
                <span className="inline-block animate-spin text-4xl">↻</span>
                <p className="ml-3  text-gray-500 font-medium">Loading products...</p>
              </div>
            )}
            {listError && <p className="text-red-600 bg-red-50 p-3 rounded-lg">{listError}</p>}

            {!listLoading && !listError && products.length === 0 && (
              <p className="text-gray-600">No products found. Add your first product!</p>
            )}

            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div key={product._id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.brand || "N/A"}</p>
                      <p className="text-sm text-gray-600">{product.category || "N/A"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
