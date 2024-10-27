import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [brand, setBrand] = useState("");
    const [engineCapacity, setEngineCapacity] = useState("");
    const [modelYear, setModelYear] = useState("");
    const [rating, setRating] = useState("");
    const navigate = useNavigate();

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://bike-hub-server-five.vercel.app/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Handle image upload to ImgBB
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await fetch("https://api.imgbb.com/1/upload?key=3b2ded2a43e05b5bea2551d070fd2193", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                console.log('Image URL:', data.data.display_url);
                setImageUrl(data.data.display_url); // Update imageUrl state here
                return data.data.display_url; // Return the imageUrl for use in handleSubmit
            } else {
                console.error("Image upload failed:", data);
                return null; // Return null if upload fails
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            return null; // Return null if there's an error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadedImageUrl = null; // Variable to store the uploaded image URL

        // Check if there is an image to upload
        if (image) {
            uploadedImageUrl = await handleImageUpload(image); // Wait for the image upload to complete
        }
    
        // Create product data, ensuring imageUrl is set correctly
        const productData = {
            productName,
            price,
            category: selectedCategory,
            description,
            imageUrl: uploadedImageUrl || imageUrl, // Use the uploaded image URL if available
            brand,
            engineCapacity,
            modelYear,
            rating,
        };
    
        console.log(productData);

        // console.log(productData);

        // Submit the product data to your API
        try {
            const response = await fetch('https://bike-hub-server-five.vercel.app/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                toast.success('Product added successfully.');
                navigate('/dashboard/admin/products');
            } else {
                toast.error('Failed to add product. Please try again.');
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Helmet>
                <title>Dashboard | Add Product</title>
            </Helmet>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6">Upload Motorcycle Product</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Product Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="productName">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter motorcycle name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
                            Price (Tk)
                        </label>
                        <input
                            type="number"
                            id="price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.categoryName}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="brand">
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                    </div>

                    {/* Engine Capacity */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="engineCapacity">
                            Engine Capacity (CC)
                        </label>
                        <input
                            type="number"
                            id="engineCapacity"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter engine capacity"
                            value={engineCapacity}
                            onChange={(e) => setEngineCapacity(e.target.value)}
                            required
                        />
                    </div>

                    {/* Model Year */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="modelYear">
                            Model Year
                        </label>
                        <input
                            type="number"
                            id="modelYear"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter model year"
                            value={modelYear}
                            onChange={(e) => setModelYear(e.target.value)}
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter rating (1-5)"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
                            Product Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
