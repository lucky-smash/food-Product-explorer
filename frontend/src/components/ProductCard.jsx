import { Link } from "react-router-dom";

const ProductCard = ({ product, state }) => {
  if (!product?.code) return null;

  return (
    <Link
      to={`/product/${product.code}`}
      state={state}
      className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="p-4">
        <img
          src={product.image_url || "/no-image.png"}
          alt={product.product_name}
          className="h-48 w-full object-cover rounded-lg border border-gray-100"
        />
      </div>

      <div className="p-4 pt-0">
        <h2 className="font-semibold text-lg mb-2">
          {product.product_name || "Unnamed product"}
        </h2>

        <p className="text-sm text-gray-600">
          Nutrition Grade{" "}
          <span className="font-medium text-amber-600">
            {product.nutrition_grades?.toUpperCase() || "N/A"}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

