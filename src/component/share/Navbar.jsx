import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../FirebaseProvider/FirebaseProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [role, setRole] = useState('user');

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setRole(data.role);
                });
        }
    }, [user?.email]);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    // Handle click outside to close dropdown
    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    // Attach event listener for closing on outside click
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="navbar bg-gradient-to-r from-blue-900 to-blue-800 shadow-md py-4 px-6">
            <div className="navbar-start">
                <NavLink to="/" className="text-2xl font-bold text-cyan-200">BikeHub</NavLink>
            </div>
            <div className="navbar-center">
                <div className="flex space-x-4">
                    <NavLink to="/" className="text-lg font-semibold text-white hover:text-cyan-200">
                        Home
                    </NavLink>
                    <NavLink to="/products" className="text-lg font-semibold text-white hover:text-cyan-200">
                        All Bikes
                    </NavLink>
                    <NavLink to="/about" className="text-lg font-semibold text-white hover:text-cyan-200">
                        About
                    </NavLink>
                    {role === 'user' ? (
                        <NavLink to="/dashboard" className="text-lg font-semibold text-white hover:text-cyan-200">
                            Dashboard
                        </NavLink>
                    ) : (
                        <NavLink to="/dashboard/admin" className="text-lg font-semibold text-white hover:text-cyan-200">
                            Dashboard
                        </NavLink>
                    )}
                </div>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center mx-4 px-5 py-2 rounded-lg text-lg font-semibold text-white hover:bg-cyan-600"
                            onClick={toggleDropdown}
                        >
                            {user?.displayName}
                            <img
                                src={user.photoURL || "/default-profile.png"}
                                alt="Profile"
                                className="w-8 h-8 rounded-full ml-2 border-2 border-white shadow-md"
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-gradient-to-r from-blue-900 to-blue-300 rounded-lg shadow-lg mt-4 z-10">
                                <div className="p-4 text-center border-b border-blue-800">
                                    <img
                                        src={user.photoURL || "/default-profile.png"}
                                        alt="Profile"
                                        className="w-10 h-10 mx-auto rounded-full"
                                    />
                                    <p className="mt-2 font-semibold text-white">{user.displayName}</p>
                                </div>
                                <Link to="/profile" className="block px-4 py-2 border-b text-white hover:bg-blue-500">View Profile</Link>
                                <Link to="/dashboard" className="block px-4 py-2 border-b text-white hover:bg-blue-500">Dashboard</Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-white hover:bg-blue-500"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <NavLink
                            className="px-5 py-2 rounded-lg text-lg font-semibold bg-cyan-500 text-white hover:bg-cyan-600"
                            to="/signup"
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            className="px-5 py-2 rounded-lg text-lg font-semibold bg-cyan-500 text-white hover:bg-cyan-600"
                            to="/signin"
                        >
                            Sign In
                        </NavLink>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default Navbar;
