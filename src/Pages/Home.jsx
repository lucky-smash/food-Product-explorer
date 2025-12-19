// import { useEffect, useState } from "react";
// import { searchProductsByName } from "../services/openFoodApi.js";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//     const [products, setProducts] = useState([]);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {

//         const fetchProducts = async () => {
//             const data = await searchProductsByName("pizza", 1);

//             const validProducts = (data.products || []).filter(
//                 (product) => product.code
//             );

//             setProducts(validProducts);
//         };


//         fetchProducts();
//     }, []);



//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">
//                 Products
//             </h1>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {products.map((product, index) => (
//                     <ProductCard key={product.code} product={product} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Home;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Initial load (default products)
  useEffect(() => {
    searchProducts("pizza");
  }, []);

  const searchProducts = async (query = search) => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=12`
      );

      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Food Explorer 🍔
      </h1>

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
