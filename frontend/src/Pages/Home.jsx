import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSource, setCurrentSource] = useState("public");
  const [searchQuery, setSearchQuery] = useState("food");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Initial load (default products)
  useEffect(() => {
    searchProducts("pizza", "public");
  }, []);



  const searchProducts = async (query, source) => {
    if (!query.trim()) return;

    setSearchQuery(query);
    setCurrentSource(source);
    setLoading(true);

    try {
      // NEW (public or backend based on toggle)
      const url =
        source === "backend"
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
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden gap-6 p-6">
        {/* Sidebar with vertical scroll - always visible */}
        <div className="shrink-0">
          <Sidebar onSearch={searchProducts} setSearchQuery={setSearchQuery} />
        </div>
        
        {/* Main content area with vertical scrollable content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900">Discover Foods</h1>
            <p className="text-gray-700 mt-1">Explore delicious and nutritious options</p>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto pr-4">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin text-4xl mb-3">↻</div>
                  <p className="text-gray-500 font-medium">Searching products...</p>
                </div>
              </div>
            )}

            {/* No Results */}
            {!loading && products.length === 0 && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-5xl mb-3">🍽️</div>
                  <p className="text-gray-500 font-medium">No products found. Try searching!</p>
                </div>
              </div>
            )}

            {/* Card Grid and Results */}
            {!loading && products.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h2>
                <div className="flex gap-6 overflow-x-auto pb-4">
                  {products.map((product) => (
                    <div key={product.code} className="w-72 shrink-0">
                      <ProductCard 
                        product={product} 
                        state={{ source: currentSource }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommended System (always visible) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <h2 className="text-lg font-semibold text-gray-800">AI Recommendations</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">🌟 Healthy Choice</h3>
                      <p className="text-sm text-gray-600">Based on your search for "{searchQuery || 'food'}", we recommend exploring products with high protein and low carbs for optimal nutrition.</p>
                      <button className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                        Learn More
                      </button>
                    </div>
                    <div className="text-4xl ml-4">💡</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">✨ Trending Now</h3>
                      <p className="text-sm text-gray-600">Discover what's popular in the community. Plant-based proteins and organic options are trending this week.</p>
                      <button className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                        Explore Trends
                      </button>
                    </div>
                    <div className="text-4xl ml-4">📈</div>
                  </div>
                </div>

                <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900 mb-2">🎯 Personalized Suggestion</h3>
                      <p className="text-sm text-amber-800">
                        Complete your profile to get personalized food recommendations based on your dietary preferences and health goals.
                      </p>
                      <button className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                        Complete Profile
                      </button>
                    </div>
                    <div className="text-4xl ml-4">👤</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
