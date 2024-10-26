import { Link } from "react-router-dom";

const HomeBanner = () => {
    return (
        <div
            className="relative h-[350px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/049/532/221/small/stylish-motorcycle-in-dramatic-lighting-against-a-dark-background-showcasing-its-sleek-design-and-vintage-charm-photo.jpeg')` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-4xl font-bold mb-2">Welcome to WheelCraft</h1>
                <p className="text-lg mb-4">Your one-stop shop for all biking needs</p>
                <Link to='/products'>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition">
                        Explore Our Collection
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomeBanner;