
const FeaturedProducts = () => {
    const products = [
        {
            name: 'Mountain Bike Pro',
            price: 'Tk: 97000',
            image: 'https://i.ibb.co.com/99WZGXb/c-1.png',
        },
        {
            name: 'Road Bike Elite',
            price: 'Tk: 213000',
            image: 'https://i.ibb.co.com/TBhs7jS/s-2.png',
        },
        {
            name: 'Hybrid Bike Plus',
            price: 'Tk: 122000',
            image: 'https://i.ibb.co.com/2nBJtH1/c-3.jpg',
        },
        {
            name: 'Electric Bike X',
            price: '$127000',
            image: 'https://i.ibb.co.com/2nBJtH1/c-3.jpg',
        },
        {
            name: 'BMX Freestyle',
            price: 'Tk: 160000',
            image: 'https://i.ibb.co.com/PW54NmB/c-2.webp',
        },
        {
            name: 'Kids Adventure Bike',
            price: 'Tk: 189000',
            image: 'https://i.ibb.co.com/TBhs7jS/s-2.png',
        },
    ];
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Products</h2>
                <p className="text-lg text-gray-600 mb-8">Check out our top-selling bikes for all types of riders.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div key={index} className="border rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-left">
                                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-gray-500 mt-2">{product.price}</p>
                                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;