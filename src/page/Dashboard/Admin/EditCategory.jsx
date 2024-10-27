import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();


    // Function to generate slug
    const generateSlug = (name) => {
        return name
            ? name
                .toLowerCase() // Convert to lowercase
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .replace(/[^\w\-]+/g, "") // Remove non-word characters
            : ""; // Return an empty string if name is undefined
    };

    useEffect(() => {
        // If the slug field is empty, generate a slug based on the category name
        if (!slug && categoryName) {
            const newSlug = generateSlug(categoryName);
            setSlug(newSlug);
        }
    }, [categoryName, slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCategory = { categoryName, slug, description, imageUrl };
        console.log(updatedCategory);
        try {
            const response = await fetch(`https://bike-hub-server-five.vercel.app/category/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCategory),
            });
            if (response.ok) {
                toast.success("Category updated successfully");
                navigate("/dashboard/admin/categories");
            } else {
                toast.error("Error updating category");
            }
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error("Error updating category");
        }
    };


    useEffect(() => {
        if (id) {
            fetch(`https://bike-hub-server-five.vercel.app/category/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setCategoryName(data.categoryName);
                    setDescription(data.description);
                    setSlug(data.slug);
                    setImageUrl(data.imageUrl);
                });
        }
    }, [id]);
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Helmet>
                <title>Dashboard | Edit Category</title>
            </Helmet>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">

                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-semibold mb-6">{id ? "Edit Category" : "Add New Category"}</h2>
                    <div>
                        <Link to='/dashboard/admin/categories'> <button className='bg-blue-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-700 transition-colors'>Back</button></Link>
                    </div>
                </div>
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
                            // onChange={(e) => setSlug(e.target.value)}
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

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                            Image Url
                        </label>
                        <input
                            type='text'
                            id="imageUrl"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter image url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            rows="4"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {id ? "Update Category" : "Add Category"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;