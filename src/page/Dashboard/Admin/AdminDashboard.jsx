import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaBox, FaDollarSign, FaTag, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
    const [product, setProduct] = useState();
    const [category, setCategory] = useState();
    const [sale, setSale] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://bike-hub-server-five.vercel.app/categories');
                setCategory(response.data.length);
                const response1 = await axios.get('https://bike-hub-server-five.vercel.app/users');
                setUsers(response1.data.length);
                const response2 = await axios.get('https://bike-hub-server-five.vercel.app/products');
                setProduct(response2.data.length);
                const response3 = await axios.get('https://bike-hub-server-five.vercel.app/order');
                const orders = response3.data;

                const totalProductPrice = orders.reduce((total, order) => {
                    const price = parseFloat(order.purchaseData.productPrice);
                    return total + (isNaN(price) ? 0 : price);
                }, 0);
                setSale(totalProductPrice);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <Helmet>
                <title>Dashboard | Admin</title>
            </Helmet>
            {/* Dashboard Header */}
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Total Products */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaBox className="text-6xl text-blue-600 mr-4" />
                    <div>
                        <h2 className="text-2xl font-semibold">Total Products</h2>
                        <p className="text-gray-500 text-2xl text-center">{product}</p>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaUsers className="text-6xl text-green-600 mr-4" />
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">Total Users</h2>
                        <p className="text-gray-500 text-2xl">{users}</p>
                    </div>
                </div>

                {/* Total Sales */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaDollarSign className="text-6xl text-yellow-600 mr-4" />
                    <div>
                        <h2 className="text-2xl font-semibold">Total Sales</h2>
                        <p className="text-gray-500 text-2xl text-center">Tk: {sale}</p>
                    </div>
                </div>

                {/* Total Categories */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaTag className="text-6xl text-red-600 mr-4" />
                    <div>
                        <h2 className="text-2xl font-semibold">Total Categories</h2>
                        <p className="text-gray-500 text-2xl text-center">{category}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;