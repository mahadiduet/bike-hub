import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    // Function to generate slug
    const generateSlug = (name) => {
        return name
            .toLowerCase() // Convert to lowercase
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[^\w\-]+/g, ""); // Remove any non-word characters (optional)
    };

    // Update slug whenever categoryName changes
    useEffect(() => {
        const newSlug = generateSlug(categoryName);
        setSlug(newSlug);
    }, [categoryName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = { categoryName, slug, description };
        // console.log(newCategory);
        fetch('https://bike-hub-server-five.vercel.app/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Category Added Successfull.');
                navigate('/dashboard/admin/categories')
            });
    };
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Helmet>
                <title>BikeHub | Add Category</title>
            </Helmet>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-6">Add New Category</h2>

                <form onSubmit={handleSubmit}>
                    {/* Category Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="categoryName">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Slug (Read-only) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="slug">
                            Category Slug (Auto-generated)
                        </label>
                        <input
                            type="text"
                            id="slug"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                            value={slug}
                            readOnly
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
                            placeholder="Enter category description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="categoryName">
                            Category Image Url
                        </label>
                        <input
                            type="text"
                            id="categoryImage"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter category image url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;