import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("public"); // public / backend
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Initial load (default products)
  useEffect(() => {
    searchProducts("pizza");
  }, []);

  

  const searchProducts = async (query = search) => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      // OLD (public API only)
      // const res = await fetch(
      //   `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=12`
      // );
      //
      // const data = await res.json();
      // setProducts(data.products || []);

      // NEW (public or backend based on toggle)
      const url =
        source === "backend"
          // ? `http://localhost:5000/api/products?search=${encodeURIComponent(query)}`
          ? `${API_BASE}/api/products?search=${encodeURIComponent(query)}`
          : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
              query
            )}&search_simple=1&action=process&json=1&page_size=12`;

      const res = await fetch(url);
      const data = await res.json();

      let productsList;

      if (source === "backend") {
        productsList = (data || []).map((item) => ({
          code: item._id, // use MongoDB _id as code for backend products
          product_name: item.name,
          brands: item.brand,
          image_url: item.imageUrl,
        }));
      } else {
        productsList = data.products || [];
      }
      // const productsList = source === "backend" ? productsList : data.products;
      setProducts(productsList || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-full mx-auto bg-amber-300">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Food Explorer 🍔
      </h1>

      {/* Toggle between public and backend data source */}
      <div className="mb-4 flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="mark"
            value="public"
            checked={source === "public"}
            onChange={() => setSource("public")}
          />
          Public API
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="mark"
            value="backend"
            checked={source === "backend"}
            onChange={() => setSource("backend")}
          />
          Backend API
        </label>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search food products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchProducts()}
          className="border px-4 py-2 rounded w-full"
        />

        <button
          onClick={() => searchProducts()}
          className="bg-blue-600 text-white px-5 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500">
          Searching products...
        </p>
      )}

      {/* No Results */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">
          No products found.
        </p>
      )}

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <Link
            to={`/product/${product.code}`}
            state={{ source }}
            key={product.code}
            className="border rounded-xl p-4 hover:shadow-lg transition"
          >
            <img
              src={product.image_url || "/no-image.png"}
              alt={product.product_name || "Product"}
              className="h-40 w-full object-contain mb-3"
            />

            <h2 className="font-semibold text-lg mb-1">
              {product.product_name || "Unnamed product"}
            </h2>

            <p className="text-sm text-gray-600">
              {product.brands || "Unknown brand"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
