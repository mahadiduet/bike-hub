import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState({
        productName: "",
        price: "",
        category: "",
        description: "",
        imageUrl: "",
        brand: "",
        engineCapacity: "",
        modelYear: "",
        rating:""
    });

    // Fetch product data for editing
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/product/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProductData(data);
                } else {
                    throw new Error("Failed to fetch product data");
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
                toast.error("Failed to load product data");
            }
        };
        fetchProductData();
    }, [id]);

    // Fetch categories data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/categories");
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    throw new Error("Failed to fetch categories");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to load categories");
            }
        };
        fetchCategories();
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/product/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });
            if (response.ok) {
                toast.success("Product updated successfully");
                navigate("/dashboard/admin/products");
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={productData.productName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="price">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={productData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Category Dropdown */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={productData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.slug}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={productData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>
                    {/* Brand */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={productData.brand}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Engine Capacity */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="engineCapacity">Engine Capacity (CC)</label>
                        <input
                            type="number"
                            id="engineCapacity"
                            name="engineCapacity"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={productData.engineCapacity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Model Year */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="modelYear">Model Year</label>
                        <input
                            type="number"
                            id="modelYear"
                            name="modelYear"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={productData.modelYear}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Rating */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="rating">
                            Rating
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter rating (1-5)"
                            value={productData.rating}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="imageUrl">Product Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={productData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
