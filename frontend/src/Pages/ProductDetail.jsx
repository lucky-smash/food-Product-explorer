import { useParams, Link, useLocation } from "react-router-dom";//useparams helps to get the dynamic part of the url
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { code } = useParams();
  const location = useLocation();
  const source = location.state?.source || "public";
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // OLD (OpenFoodFacts only)
        // const res = await fetch(
        //   `https://world.openfoodfacts.org/api/v0/product/${code}.json`
        // );
        //
        // const data = await res.json();
        //
        // // IMPORTANT: OpenFoodFacts returns status = 0 or 1
        // if (data.status === 1 && data.product) {
        //   setProduct(data.product);
        // } else {
        //   setProduct(null);
        // }

        const url =
          source === "backend"
            // ? `http://localhost:5000/api/products/${code}`
            ? `${API_BASE}/api/products/${code}`
            : `https://world.openfoodfacts.org/api/v0/product/${code}.json`;

        const res = await fetch(url);
        const data = await res.json();

        if (source === "backend") {
          const backendProduct = data;
          setProduct({
            product_name: backendProduct.name,
            brands: backendProduct.brand,
            image_url: backendProduct.imageUrl,
            quantity: backendProduct.quantity,
            nutriments: backendProduct.nutriments,
            nutrition_grades: backendProduct.nutrition_grades,
          });
        } else {
          // IMPORTANT: OpenFoodFacts returns status = 0 or 1
          if (data.status === 1 && data.product) {
            setProduct(data.product);
          } else {
            setProduct(null);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [code, source]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <p className="text-center text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <Link to="/" state={{ source }} className="text-amber-600 hover:text-amber-700 font-medium">
            ← Back to products
          </Link>
          <p className="mt-4 text-red-500 font-medium">
            Product not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-linear-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* Back Button */}
        <Link to="/" state={{ source }} className="text-amber-600 hover:text-amber-700 font-medium mb-6 inline-block">
          ← Back to products
        </Link>

        {/* Product Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <img
              src={product.image_url || "/no-image.png"}
              alt={product.product_name || "Product image"}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.product_name || "Unnamed product"}
            </h1>

            <div className="space-y-2">
              <p className="text-gray-700">
                <strong className="text-gray-900">Brand:</strong> {product.brands || "N/A"}
              </p>

              <p className="text-gray-700">
                <strong className="text-gray-900">Quantity:</strong> {product.quantity || "N/A"}
              </p>

              <p className="text-gray-700">
                <strong className="text-gray-900">Nutrition Grade:</strong>{" "}
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
                  {product.nutrition_grades
                    ? product.nutrition_grades.toUpperCase()
                    : "N/A"}
                </span>
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🍎 Nutrition (per 100g)
              </h2>

              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Energy:</span>
                  <span className="font-medium">{product.nutriments?.energy_100g ?? "—"} kcal</span>
                </li>
                <li className="flex justify-between">
                  <span>Fat:</span>
                  <span className="font-medium">{product.nutriments?.fat_100g ?? "—"} g</span>
                </li>
                <li className="flex justify-between">
                  <span>Sugars:</span>
                  <span className="font-medium">{product.nutriments?.sugars_100g ?? "—"} g</span>
                </li>
                <li className="flex justify-between">
                  <span>Protein:</span>
                  <span className="font-medium">{product.nutriments?.proteins_100g ?? "—"} g</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
