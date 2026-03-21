
// import { Link } from "react-router-dom";

// function Navbar() {
//     return (
//         <div className="flex  items-center justify-between mb-6 border-b border-amber-600 pb-4">
//             <h1 className="text-3xl font-bold text-center">Food Explorer 🍔</h1>
//             {/* Link to dashboard only visible if user is logged in (token exists in localStorage) */}

//             <div className="flex gap-2">
//                 <Link to="/dashboard" className="bg-white border border-amber-600 text-amber-700 px-4 py-2 rounded hover:bg-amber-100">
//                     Dashboard
//                 </Link>
//                 <Link
//                     to="/auth"
//                     className="bg-white border border-amber-600 text-amber-700 px-4 py-2 rounded hover:bg-amber-100"
//                 >
//                     Login / Register
//                 </Link>
//             </div>

//         </div>
//     )
// }

// export default Navbar


// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="flex items-center justify-between mb-6">

//       {/* Logo */}
//       <div className="flex items-center gap-3">
//         <div className="bg-amber-600 text-white   flex items-center justify-center font-bold">
//           Food Explorer 🍔
//         </div>
//       </div>

//       {/* Pills menu */}
//       <div className="flex gap-3 bg-white p-2 rounded-full shadow-sm">
//         {["Home", "Nutrition", "Recipes", "Analytics"].map((item) => (
//           <button
//             key={item}
//             className="px-4 py-1 rounded-full text-sm hover:bg-gray-100"
//           >
//             {item}
//           </button>
//         ))}
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-full bg-gray-300" />
//       </div>

//     </div>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
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
        
        {/* Dashboard next to Home if logged in */}
        {isLoggedIn && (
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-full text-sm font-medium border-2 border-amber-500 text-amber-700 bg-white hover:bg-amber-100 hover:text-amber-800 hover:shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Dashboard
          </Link>
        )}
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        {['Nutrition', 'Recipes', 'Analytics'].map((item) => (
          <button
            key={item}
            className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 hover:shadow-md transition-all hover:scale-105 active:scale-95"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right side (IMPORTANT) */}
      <div className="flex items-center gap-3">

        {/* Login / Logout */}
        <Link
          to="/auth"
          className="px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Link>

        {/* Profile circle */}
        <div className="w-10 h-10 rounded-full border-2 border-amber-400 shadow-md overflow-hidden">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

    </div>
  );
};

export default Navbar;