import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { displayName, email, phone, address };
        console.log(updatedUser);
        try {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });
            if (response.ok) {
                toast.success("User updated successfully");
                navigate("/dashboard/admin/users");
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
            fetch(`http://localhost:5000/users/${id}`)
                .then(res => res.json())
                .then(data => {
                    setDisplayName(data.displayName);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setAddress(data.address);
                });
        }
    }, [id]);
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-6">{id ? "Edit Category" : "Add New Category"}</h2>

                <form onSubmit={handleSubmit}>
                    {/* Category Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="categoryName">
                            Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter category name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Slug (Read-only) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="slug">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                            value={email}
                            readOnly
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="categoryName">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    {/* User Address */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="categoryName">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {id ? "Update User" : "Add User"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;