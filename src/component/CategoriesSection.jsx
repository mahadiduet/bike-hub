import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://bike-hub-server-five.vercel.app/categories/home');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Categories</h2>
                <p className="text-lg text-gray-600 mb-8">Explore our wide range of bike collections.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <>
                            <Link to={`/category/${category.slug}`}>
                                <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src={category.imageUrl}
                                        alt={category.categoryName}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center flex-col gap-5 justify-center">
                                        <h3 className="text-white text-2xl font-semibold">{category.categoryName}</h3>
                                        <button className="text-blue-500 font-bold text-2xl rounded-lg px-5 py-1 bg-black bg-opacity-70">View Products</button>
                                    </div>
                                </div>
                            </Link>
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;