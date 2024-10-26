import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(2);

    const [totalUsers, setTotalUsers] = useState(0);
    const [adminUsers, setAdminUsers] = useState(0);
    const [regularUsers, setRegularUsers] = useState(0);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
            const userData = response.data;
            setTotalUsers(userData.length);

            // Calculate admin and regular users count
            const adminCount = userData.filter(user => user.role === 'admin').length;
            const userCount = userData.filter(user => user.role === 'user').length;
            setAdminUsers(adminCount);
            setRegularUsers(userCount);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.displayName.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Handle delete action
    const handleRole = async (id, currentRole) => {
        try {
            const updatedRole = currentRole === 'user' ? 'admin' : 'user';
            await axios.patch(`http://localhost:5000/users/${id}`, { role: updatedRole });
            setUsers(users.map(user =>
                user._id === id ? { ...user, role: updatedRole } : user
            ));
            toast.success(`User role updated to ${updatedRole}`);
            fetchUsers();
        } catch (error) {
            console.error('Error updating role:', error);
            toast.error('Failed to update user role');
        }
    };
    return (
        <div className="">
            <div>
                <div className="p-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-lg text-white">
                    <h2 className="text-3xl font-bold">Admin Dashboard: User</h2>
                    <p className="text-lg mb-6">Welcome back, Admin! Here’s an overview of today’s activity:</p>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white text-black rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold">Total Users</h3>
                            <p className="text-3xl font-bold">{totalUsers}</p>
                        </div>

                        <div className="bg-white text-black rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold">Regular Users</h3>
                            <p className="text-3xl font-bold">{regularUsers}</p>
                        </div>

                        <div className="bg-white text-black rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold">Admin User</h3>
                            <p className="text-3xl font-bold">{adminUsers}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mb-4 px-10 mt-5">
                <input
                    type="text"
                    placeholder="Search user..."
                    className="border p-2 rounded"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">SN#</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Phone</th>
                        <th className="py-2 px-4 border">Address</th>
                        <th className="py-2 px-4 border">Role</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border">{index + 1 + (currentPage - 1) * usersPerPage}</td>
                                <td className="py-2 px-4 border">{user.displayName}</td>
                                <td className="py-2 px-4 border">{user.email}</td>
                                <td className="py-2 px-4 border">{user.phone}</td>
                                <td className="py-2 px-4 border">{user.address}</td>
                                <td className="py-2 px-4 border">{user.role}</td>
                                <td className="py-2 px-4 border flex justify-center">
                                    <Link to={user.email}><button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Edit</button></Link>
                                    <button
                                        className={`px-4 py-1 rounded ${user.role === 'user' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                        onClick={() => handleRole(user._id, user.role)}
                                    >
                                        {user.role === 'user' ? 'Make Admin' : 'Make User'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 border text-center">No User found</td>
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
                        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
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
                        disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Users;