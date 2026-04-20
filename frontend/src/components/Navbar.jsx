
import { useState, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";
import NutritionAssistant from "./NutritionAssistant";

const authSubscribe = (onStoreChange) => {
  window.addEventListener("food-explorer-auth", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("food-explorer-auth", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
};

const getTokenExists = () => !!localStorage.getItem("token");

const Navbar = () => {
  const isLoggedIn = useSyncExternalStore(authSubscribe, getTokenExists, () => false);
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("food-explorer-auth"));
    navigate("/auth", { replace: true });
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-white px-3 py-1 rounded font-bold text-sm">
            Food Explorer 🍔
          </div>
        </div>

        {/* Pills menu */}
        <div className="flex gap-2 bg-gray-100 p-2 rounded-full shadow-sm items-center">
          <Link
            to="/"
            className="px-4 py-2 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 hover:shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Home
          </Link>

          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-full text-sm font-medium border-2 border-amber-500 text-amber-700 bg-white hover:bg-amber-100 hover:text-amber-800 hover:shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Dashboard
            </Link>
          )}

          {['Nutrition', 'Recipes', 'Analytics'].map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 hover:shadow-md transition-all hover:scale-105 active:scale-95"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => setChatOpen((prev) => !prev)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer ${chatOpen
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-300"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
              }`}
          >
            🤖 AI Coach
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              Login
            </Link>
          )}

          <div className="w-10 h-10 rounded-full border-2 border-amber-400 shadow-md overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>


      </div>

      {/* Floating AI Chat */}
      <NutritionAssistant isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default Navbar;