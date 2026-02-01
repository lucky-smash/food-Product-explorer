import { useParams, Link } from "react-router-dom";//useparams helps to get the dynamic part of the url
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${code}.json`
        );

        const data = await res.json();

        // IMPORTANT: OpenFoodFacts returns status = 0 or 1
        if (data.status === 1 && data.product) {
          setProduct(data.product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [code]);

  // Loading state
  if (loading) {
    return <p className="p-6">Loading product details...</p>;
  }

  // Product not found state
  if (!product) {
    return (
      <div className="p-6">
        <Link to="/" className="text-blue-600 underline">
          ← Back to products
        </Link>
        <p className="mt-4 text-red-500 font-medium">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full mx-auto bg-amber-300">
      {/* Back Button */}
      <Link to="/" className="text-blue-600 underline">
        ← Back to products
      </Link>

      {/* Product Info */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <img
          src={product.image_url || "/no-image.png"}
          alt={product.product_name || "Product image"}
          className="w-full rounded-xl border"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">
            {product.product_name || "Unnamed product"}
          </h1>

          <p className="mb-1">
            <strong>Brand:</strong> {product.brands || "N/A"}
          </p>

          <p className="mb-1">
            <strong>Quantity:</strong> {product.quantity || "N/A"}
          </p>

          <p className="mb-3">
            <strong>Nutrition Grade:</strong>{" "}
            <span className="px-2 py-1 bg-green-100 rounded">
              {product.nutrition_grades
                ? product.nutrition_grades.toUpperCase()
                : "N/A"}
            </span>
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            Nutrition (per 100g)
          </h2>

          <ul className="list-disc ml-6 space-y-1">
            <li>Energy: {product.nutriments?.energy_100g ?? "—"} kcal</li>
            <li>Fat: {product.nutriments?.fat_100g ?? "—"} g</li>
            <li>Sugars: {product.nutriments?.sugars_100g ?? "—"} g</li>
            <li>Protein: {product.nutriments?.proteins_100g ?? "—"} g</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
