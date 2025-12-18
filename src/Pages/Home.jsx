import { useEffect, useState } from "react";
import { searchProductsByName } from "../services/openFoodApi.js";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // const fetchProducts = async () => {
        //     const data = await searchProductsByName("pizza", 1);
        //     setProducts(data.products || []);
        // };

        const fetchProducts = async () => {
            const data = await searchProductsByName("pizza", 1);

            const validProducts = (data.products || []).filter(
                (product) => product.code
            );

            setProducts(validProducts);
        };


        fetchProducts();
    }, []);



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <ProductCard key={product.code} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
