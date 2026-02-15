import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product?.code) return null;

  return (
    <Link
      to={`/product/${product.code}`}
      className="block border rounded-xl overflow-hidden hover:shadow-lg transition"
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

