import React from 'react';
import { Link } from 'react-router-dom';
// Import FontAwesome icons if you are using FontAwesome for star icons
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const { _id, productName, engineCapacity, imageUrl, price, rating } = product;

    // Generate stars based on the rating value
    const renderStars = (rating) => {
        const stars = [];
        const maxStars = 5;

        for (let i = 1; i <= maxStars; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500" />);
            }
        }
        return stars;
    };

    return (
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
            <figure className="relative h-48 w-full">
                <img
                    src={imageUrl}
                    alt={productName}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full rounded-lg"></div>
            </figure>
            <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{productName}</h2>
                    <p className="text-xl text-gray-600 font-semibold">Price: <span className="text-primary-600">{price} Tk</span></p>
                    <p className="text-lg text-gray-500">Engine Capacity: {engineCapacity} CC</p>
                    <div className="flex items-center">
                        <p className="text-lg text-gray-500 mr-2">Rating:</p>
                        <div className="flex space-x-1">
                            {renderStars(rating)}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <Link to={`/products/${_id}`}><button className="w-full py-2 px-4 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
