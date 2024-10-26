import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-around items-center">
                    {/* Contact Info */}
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h3 className="text-lg font-semibold">Contact Information</h3>
                        <p className="mt-2">Md. Emam Mahadi</p>
                        <p className="mt-1">Email: mahadi@gmail.com</p>
                        <p className="mt-1">Phone: +880 123 456 789</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex space-x-6">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200">
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm font-bold text-cyan-200">&copy; 2024 Bike Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
