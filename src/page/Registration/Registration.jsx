import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../FirebaseProvider/FirebaseProvider";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";  // Import Link

const Registration = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        const phone = data.phone;
        const address = data.address;
        createUser(data.email, data.password)
            .then(result => {
                updateUser(data.name, data.photoUrl)
                    .then((updateUser) => {
                        console.log(updateUser);
                    }).catch((error) => {
                        console.log(error);
                    });
                const displayName = data.name;
                const email = result.user.email;
                const createdAt = result.user.metadata.createdAt;
                const lastSignInTime = result.user.metadata.lastSignInTime;
                const role = 'user';
                const user = {displayName, email, phone, address, role, createdAt, lastSignInTime };

                // Data pass to MongoDB by API
                fetch('http://localhost:5000/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    });
                toast.success('You are successfully registered.');
                navigate('/');
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    toast.error('This user already exists, please login.');
                }
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">Valid email is required</p>}
                    </div>

                    {/* Phone Number Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                        <input
                            type="tel"
                            {...register('phone', { required: true, pattern: /^[0-9]{10,15}$/ })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">Valid phone number is required</p>}
                    </div>

                    {/* Photo URL */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Photo URL</label>
                        <input
                            type="text"
                            {...register('photoUrl', { required: true })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your profile image url"
                        />
                        {errors.photoUrl && <p className="text-red-500 text-sm mt-1">URL is required</p>}
                    </div>

                    {/* Address Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Address</label>
                        <input
                            type="text"
                            {...register('address', { required: true })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your address"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">Address is required</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                {/* Toggle Link to Login Page */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?
                    <Link to="/signin" className="text-blue-600 hover:underline ml-1">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
