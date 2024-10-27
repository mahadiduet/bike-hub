import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://bike-hub-server-five.vercel.app/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://bike-hub-server-five.vercel.app/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
            toast.success('Delete Category Successfull.');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
    return (
        <div className="">
            <Helmet>
                <title>Dashboard | Products</title>
            </Helmet>
            <div className="p-8 mb-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-lg text-white">
                <h2 className="text-3xl font-bold mb-4">Admin Dashboard: Products</h2>
                <p className="text-lg mb-6">Admin! Access to product edit and delete!</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-white text-black rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-semibold">Total Product</h3>
                        <p className="text-3xl font-bold">{products.length}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end px-10 mx-auto mb-4">
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="border p-2 rounded"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <table className="px-10 mx-auto bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">SN#</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Category</th>
                        <th className="py-2 px-4 border">Brand</th>
                        <th className="py-2 px-4 border">CC</th>
                        <th className="py-2 px-4 border">Model Year</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => (
                            <tr key={product._id}>
                                <td className="py-2 px-4 border">{index + 1 + (currentPage - 1) * productsPerPage}</td>
                                <td className="py-2 px-4 border">{product.productName}</td>
                                <td className="py-2 px-4 border">{product.price}</td>
                                <td className="py-2 px-4 border">{product.category}</td>
                                <td className="py-2 px-4 border">{product.brand}</td>
                                <td className="py-2 px-4 border">{product.engineCapacity}</td>
                                <td className="py-2 px-4 border">{product.modelYear}</td>
                                <td className="py-2 px-4 border flex justify-center">
                                    <Link to={`/dashboard/admin/products/${product._id}`}><button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Edit</button></Link>
                                    <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-2 px-4 border text-center">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center">
                <div className="flex justify-center">
                    <button
                        className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white"
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <div>
                        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white"
                        disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Products;