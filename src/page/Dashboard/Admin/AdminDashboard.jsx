import { FaBox, FaDollarSign, FaTag, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Dashboard Header */}
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Products */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaBox className="text-4xl text-blue-600 mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Products</h2>
                        <p className="text-gray-500">230</p>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaUsers className="text-4xl text-green-600 mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Users</h2>
                        <p className="text-gray-500">540</p>
                    </div>
                </div>

                {/* Total Sales */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaDollarSign className="text-4xl text-yellow-600 mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Sales</h2>
                        <p className="text-gray-500">$12,400</p>
                    </div>
                </div>

                {/* Total Categories */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaTag className="text-4xl text-red-600 mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Categories</h2>
                        <p className="text-gray-500">15</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity (Table) */}
            <div className="bg-white shadow-md rounded-lg mt-8 p-6">
                <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
                            <th className="px-4 py-2 text-left text-gray-600">Customer</th>
                            <th className="px-4 py-2 text-left text-gray-600">Total</th>
                            <th className="px-4 py-2 text-left text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="px-4 py-2">#1001</td>
                            <td className="px-4 py-2">John Doe</td>
                            <td className="px-4 py-2">$150</td>
                            <td className="px-4 py-2 text-green-600">Completed</td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">#1002</td>
                            <td className="px-4 py-2">Jane Smith</td>
                            <td className="px-4 py-2">$220</td>
                            <td className="px-4 py-2 text-yellow-600">Pending</td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">#1003</td>
                            <td className="px-4 py-2">Michael Scott</td>
                            <td className="px-4 py-2">$90</td>
                            <td className="px-4 py-2 text-red-600">Cancelled</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;