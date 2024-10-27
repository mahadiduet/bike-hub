import { useContext, useEffect, useState } from "react";
import { FaBox, FaListAlt, FaPlus, FaTag, FaUsers } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../FirebaseProvider/FirebaseProvider";

const Leftnavbar = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState('user');

    useEffect(() => {
        if (user?.email) {
            fetch(`https://bike-hub-server-five.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setRole(data.role);
                });
        }
    }, [user?.email]);

    return (
        <div className="h-screen w-64 bg-gray-800 text-white">
            <div className="p-6 text-2xl font-semibold border-b border-gray-600">
                <Link to='/dashboard'>Dashboard</Link>
            </div>

            {role === 'admin' ? (
                <nav className="mt-10">
                    <ul>
                        <li className="hover:bg-gray-700 p-4 cursor-pointer flex items-center">
                            <FaPlus className="mr-4" />
                            <NavLink to='/dashboard/admin/add-product'>Add Product</NavLink>
                        </li>
                        <li className="hover:bg-gray-700 p-4 cursor-pointer flex items-center">
                            <FaBox className="mr-4" />
                            <NavLink to='/dashboard/admin/products'>All Products</NavLink>
                        </li>
                        <li className="hover:bg-gray-700 p-4 cursor-pointer flex items-center">
                            <FaUsers className="mr-4" />
                            <NavLink to='/dashboard/admin/users'>All Users</NavLink>
                        </li>
                        <li className="hover:bg-gray-700 p-4 cursor-pointer flex items-center">
                            <FaTag className="mr-4" />
                            <NavLink to='/dashboard/admin/add-category'>Add Category</NavLink>
                        </li>
                        <li className="hover:bg-gray-700 p-4 cursor-pointer flex items-center">
                            <FaListAlt className="mr-4" />
                            <NavLink to='/dashboard/admin/categories'>All Categories</NavLink>
                        </li>
                        <li className="hover:bg-gray-700 p-4 cursor-pointer flex items-center">
                            <FaListAlt className="mr-4" />
                            <NavLink to='/dashboard/admin/order'>Order</NavLink>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav className="mt-10">
                    <ul>
                        <li className="hover:bg-gray-700 p-4 cursor-pointer flex items-center">
                            <FaBox className="mr-4" />
                            <NavLink to='/dashboard'>My Profile</NavLink>
                        </li>
                        <li className="hover:bg-gray-700 p-4 cursor-pointer flex items-center">
                            <FaListAlt className="mr-4" />
                            <NavLink to='/dashboard/order'>My Orders</NavLink>
                        </li>
                    </ul>
                </nav>
            )}
            <Link to="/" className="block px-4 py-2 border-t border-dotted text-white hover:bg-blue-500">View Site</Link>
        </div>
    );
};

export default Leftnavbar;
