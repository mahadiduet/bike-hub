import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { AuthContext } from '../../../FirebaseProvider/FirebaseProvider';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formDetails, setFormDetails] = useState({});
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/users/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setDisplayName(data.displayName);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setAddress(data.address);
                });
        }
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const renderRating = (rating) => {
        // Handle cases where rating is undefined or null
        if (rating == null) {
            return (
                <div className="flex items-center text-gray-400">
                    {[...Array(5)].map((_, index) => (
                        <FaRegStar key={`empty-${index}`} />
                    ))}
                </div>
            );
        }

        // Ensure rating is between 0 and 5
        const adjustedRating = Math.max(0, Math.min(rating, 5));

        const fullStars = Math.floor(adjustedRating);
        const halfStar = adjustedRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex items-center text-yellow-500">
                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={`full-${index}`} />
                ))}
                {halfStar && <FaStarHalfAlt />}
                {[...Array(emptyStars)].map((_, index) => (
                    <FaRegStar key={`empty-${index}`} />
                ))}
            </div>
        );
    };

    const handleBuyNow = () => setIsModalOpen(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalShippingAddress = formDetails.shippingAddress || address;

        const purchaseData = {
            ...formDetails,
            productId: id,
            customerName: displayName,
            customerEmail: email,
            customerPhone: phone,
            billingAddress: address,
            shippingAddress: finalShippingAddress,
            productName: product.productName,
            productPrice: product.price,
            productImage: product.imageUrl,
        };
        console.log('Data:', formDetails, purchaseData);
        try {
            await axios.post("http://localhost:5000/order", { purchaseData });
            toast.success("Purchase successful!");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Purchase failed:", error);
            toast.error("Failed to complete purchase");
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Product Image and Info */}
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="w-full lg:w-1/2 flex-shrink-0">
                    <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col justify-between mt-6 lg:mt-0 lg:w-1/2">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">{product.productName}</h2>
                        <p className="text-xl font-semibold text-gray-600 my-2">
                            Price: <span className="text-blue-600">{product.price} Tk</span>
                        </p>
                        <p className="text-lg text-gray-500">Brand: {product.brand}</p>
                        <p className="text-lg text-gray-500">Engine Capacity: {product.engineCapacity} CC</p>
                        <p className="text-lg text-gray-500">Model Year: {product.modelYear}</p>
                        <p className="text-lg text-gray-500">Category: {product.category}</p>
                        <div className="mt-2">{renderRating(product.rating)}</div>
                    </div>
                    <button onClick={handleBuyNow} className="mt-6 py-2 px-4 w-full text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 transition duration-300">
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800">Product Description</h3>
                <p className="mt-4 text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>

            {/* Buy Now Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            &#10005;
                        </button>
                        <h3 className="text-xl font-bold mb-4">Purchase Details</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={displayName}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    readOnly
                                    className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed"
                                />
                            </label>
                            <label className="block mb-2">
                                Phone:
                                <input
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Billing Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Shipping Address:
                                <input
                                    type="text"
                                    name="shippingAddress"
                                    defaultValue={shippingAddress}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </label>
                            <button
                                type="submit"
                                className="w-full mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Confirm Purchase
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
