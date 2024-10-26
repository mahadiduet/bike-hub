import axios from "axios";
import { useEffect, useState } from "react";

const Order = () => {
    const [order, setOrder] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [orderPerPage] = useState(2);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get('http://localhost:5000/order');
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrder();
    }, []);

    const filteredOrder = order.filter(item =>
        item.purchaseData.customerName && item.purchaseData.customerName.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastOrder = currentPage * orderPerPage;
    const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
    const currentOrder = filteredOrder.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="mt-10 p-10 w-full">
            <h2 className="text-2xl font-bold mb-4">Order</h2>
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search order..."
                    className="border p-2 rounded"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">SN#</th>
                        <th className="py-2 px-4 border">Customer Name</th>
                        <th className="py-2 px-4 border">Billing Address</th>
                        <th className="py-2 px-4 border">Shipping Address</th>
                        <th className="py-2 px-4 border">Phone</th>
                        <th className="py-2 px-4 border">Amount</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrder.length > 0 ? (
                        currentOrder.map((item, index) => (
                            <tr key={item._id}>
                                <td className="py-2 px-4 border">{index + 1 + (currentPage - 1) * orderPerPage}</td>
                                <td className="py-2 px-4 border">{item.purchaseData.customerName}</td>
                                <td className="py-2 px-4 border">{item.purchaseData.billingAddress}</td>
                                <td className="py-2 px-4 border">{item.purchaseData.shippingAddress}</td>
                                <td className="py-2 px-4 border">{item.purchaseData.customerPhone}</td>
                                <td className="py-2 px-4 border">{item.purchaseData.productPrice}</td>
                                <td className="py-2 px-4 border flex gap-4 justify-center">
                                    <button className="bg-green-600 text-white px-4 py-1 rounded">Confirm</button>
                                    <button className="bg-red-600 text-white px-4 py-1 rounded">Cancel</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-2 px-4 border text-center">No order found</td>
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
                        {Array.from({ length: Math.ceil(filteredOrder.length / orderPerPage) }, (_, index) => (
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
                        disabled={currentPage === Math.ceil(filteredOrder.length / orderPerPage)}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;
