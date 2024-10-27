import { useContext, useState } from "react";
import { AuthContext } from "../../FirebaseProvider/FirebaseProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";  // Import Link
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const existLocation = location?.state || '/dashboard/admin';

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        loginUser(email, password)
            .then((result) => {
                toast.success('You are successfully logged in');
                console.log('You are successfully logged in');
                navigate(existLocation);
            })
            .catch((error) => {
                toast.error('Username and password not match');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Helmet>
                <title>BikeHub | Sign In</title>
            </Helmet>
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login to Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm text-gray-600">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Login
                    </button>
                </form>

                {/* Toggle Link to Register Page */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account? 
                    <Link to="/signup" className="text-blue-600 hover:underline ml-1">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
