import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import ProductCard from "../../../component/share/ProductCard";
import { Helmet } from "react-helmet";

const CategoryProduct = () => {
    const location = useLocation();
    const param = useParams();
    const slug = location.pathname.split("/").pop();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true); // Start loading
                const response = await axios.get(`https://bike-hub-server-five.vercel.app/products/category?categoryName=${slug}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setIsLoading(false); // End loading
            }
        };
        fetchProducts();
    }, [slug]);

    const kebabToTitleCase = (kebabCase) => {
        return kebabCase
            .split('-') 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(' '); 
    };

    return (
        <div>
            <Helmet>
                <title>BikeHub | {kebabToTitleCase(slug)}</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center mt-10">Category: {kebabToTitleCase(slug)}</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">Explore our wide range of bike collections.</p>

            <div className="p-10 min-h-screen flex items-center justify-center">
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : products && products.length > 0 ? (
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center space-y-6 py-20">
                        <img src="https://via.placeholder.com/150" alt="No products" className="mx-auto w-24 h-24 opacity-60" />
                        <h1 className="text-2xl font-semibold text-gray-700">No Products Found</h1>
                        <p className="text-gray-500">It seems we don’t have any products in this category at the moment.</p>
                        <Link to="/products" className="inline-block mt-6">
                            <button className="btn btn-primary px-6 py-2 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
                                Explore All Products
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryProduct;
