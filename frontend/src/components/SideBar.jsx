
import { useState, useEffect } from "react";

const Sidebar = ({ onSearch, setSearchQuery }) => {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("public");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [filters, setFilters] = useState({ vegetarian: false, lowCarb: false, highProtein: false, organic: false, glutenFree: false });



  const handleSearch = () => {
    setSearchQuery?.(search);
    onSearch(search, source);
  };

//   const handleChatSend = () => {
//     if (chatInput.trim()) {
//       setChatMessages([...chatMessages, { text: chatInput, user: true }, { text: "AI Recommendation: Try searching for 'healthy snacks'!", ai: true }]);
//       setChatInput("");
//     }
//   };

  const toggleFilter = (filterName) => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  return (
    <div className="w-62  bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col h-full overflow-hidden">
     

      <div className="flex-1 overflow-y-auto sidebar-scroll p-6 space-y-6">
        {/* Header with Profile Picture */}
        <div className="sidebar-item flex items-center gap-4 pb-6 border-b border-gray-200 shrink-0">
          <div className="w-14 h-14 rounded-full border-3 border-amber-400 shadow-md overflow-hidden shrink-0">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Food Explorer</h2>
            <p className="text-xs text-gray-500">Premium Edition</p>
          </div>
        </div>

        {/* 🔍 Search Section */}
        <div className="sidebar-item">
          <label className="block text-sm font-semibold text-gray-400 mb-3">Find Food</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSearchQuery?.(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full border-2 border-gray-600 bg-gray-700 text-white px-4 py-3 pr-12 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400 transition-all placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors text-xl"
            >
              🔍
            </button>
          </div>
        </div>

        {/* 🔁 Data Source Section */}
        <div className="sidebar-item">
          <label className="block text-sm font-semibold text-gray-400 mb-3">Data Source</label>
          <div className="space-y-2">
            <button
              onClick={() => setSource("public")}
              className={`w-full p-3 rounded-xl border-2 transition-all text-left font-medium hover:shadow-md ${
                source === "public"
                  ? "bg-amber-500 border-amber-400 text-white shadow-lg"
                  : "bg-gray-700 border-gray-600 text-gray-200 hover:border-gray-500"
              }`}
            >
              🌐 Public API
            </button>
            <button
              onClick={() => setSource("backend")}
              className={`w-full p-3 rounded-xl border-2 transition-all text-left font-medium hover:shadow-md ${
                source === "backend"
                  ? "bg-amber-500 border-amber-400 text-white shadow-lg"
                  : "bg-gray-700 border-gray-600 text-gray-200 hover:border-gray-500"
              }`}
            >
              🖥️ Backend API
            </button>
          </div>
        </div>

        {/* 🧠 Dietary Filters Section */}
        <div className="sidebar-item">
          <label className="block text-sm font-semibold text-gray-400 mb-3">Dietary Filters</label>
          <div className="space-y-2">
            {[
              { key: 'vegetarian', label: '🥬 Vegetarian', color: 'green' },
              { key: 'lowCarb', label: '🥩 Low Carb', color: 'red' },
              { key: 'highProtein', label: '💪 High Protein', color: 'yellow' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => toggleFilter(filter.key)}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left font-medium flex items-center justify-between hover:shadow-md ${
                  filters[filter.key]
                    ? `bg-${filter.color}-500 border-${filter.color}-400 text-black shadow-lg`
                    : "bg-gray-700 border-gray-600 text-gray-200 hover:border-gray-500"
                }`}
              >
                <span>{filter.label}</span>
                <input
                  type="checkbox"
                  checked={filters[filter.key]}
                  onChange={() => {}}
                  className="w-4 h-4 cursor-pointer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 🌿 Lifestyle Preferences */}
        <div className="sidebar-item">
          <label className="block text-sm font-semibold text-gray-400 mb-3">Lifestyle</label>
          <div className="space-y-2">
            {[
              { key: 'organic', label: '🌱 Organic', color: 'green' },
              { key: 'glutenFree', label: '🍞 Gluten Free', color: 'amber' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => toggleFilter(filter.key)}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left font-medium flex items-center justify-between hover:shadow-md ${
                  filters[filter.key]
                    ? `bg-${filter.color}-500 border-${filter.color}-400 text-black shadow-lg`
                    : "bg-gray-700 border-gray-600 text-gray-200 hover:border-gray-500"
                }`}
              >
                <span>{filter.label}</span>
                <input
                  type="checkbox"
                  checked={filters[filter.key]}
                  onChange={() => {}}
                  className="w-4 h-4 cursor-pointer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 💡 Quick Tips */}
        <div className="sidebar-item">
          <label className="block text-sm font-semibold text-gray-400 mb-3">💡 Quick Tips</label>
          <div className="bg-blue-900 border border-blue-700 rounded-xl p-3 text-sm text-blue-200">
            <p>✓ Use filters to narrow down your search</p>
            <p className="mt-2">✓ Check nutrition grades for healthier options</p>
          </div>
        </div>

        {/* 🔥 Popular Searches */}
        <div className="sidebar-item">
          <label className="block text-sm font-semibold text-gray-400 mb-3">🔥 Popular</label>
          <div className="space-y-2">
            {['Pizza', 'Salad', 'Smoothie', 'Pasta'].map(item => (
              <button
                key={item}
                className="w-full p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-100 text-sm font-medium transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Spacer to allow full scrolling */}
        <div className="h-8"></div>
      </div>

    </div>
  );
};

export default Sidebar;
