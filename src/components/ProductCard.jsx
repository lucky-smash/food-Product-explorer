// const ProductCard = ({ product }) => {
//   return (
//     <div className="border rounded p-3 shadow-xl">
//       {/* Product Image */}
//       {product.image_url ? (
//         <img
//           src={product.image_url}
//           alt={product.product_name}
//           className="w-full h-40 object-cover mb-2"
//         />
//       ) : (
//         <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-2">
//           No Image
//         </div>
//       )}

//       {/* Product Name */}
//       <h2 className="font-semibold text-lg">
//         {product.product_name || "No name available"}
//       </h2>

//       {/* Nutrition Grade */}
//       <p className="text-sm text-gray-600">
//         Nutrition Grade{" "}
//         <span className="font-bold uppercase">
//           {product.nutrition_grades || "N/A"}
//         </span>
//       </p>
//     </div>
//   );
// };

// export default ProductCard;

import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product?.code) return null;

  return (
    <Link
      to={`/product/${product.code}`}
      className="block border rounded-xl overflow-hidden hover:shadow-lg transition bg-white"
    >
      <img
        src={product.image_url || "/no-image.png"}
        alt={product.product_name}
        className="h-48 w-full object-cover"
      />

      <div className="p-3">
        <h2 className="font-semibold text-lg">
          {product.product_name || "Unnamed product"}
        </h2>

        <p className="text-sm text-gray-600">
          Nutrition Grade{" "}
          <span className="font-medium">
            {product.nutrition_grades?.toUpperCase() || "N/A"}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

