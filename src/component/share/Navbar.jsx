import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../FirebaseProvider/FirebaseProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [role, setRole] = useState('user');
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState("light");  // Initialize theme state

    useEffect(() => {
        if (user?.email) {
            fetch(`https://bike-hub-server-five.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data.role);
                });
        }
    }, [user?.email]);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    // Handle click outside to close dropdown
    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Theme toggle function
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "synthwave" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);  // DaisyUI theme set on <html>
    };

    return (
        <div className="navbar bg-gradient-to-r from-blue-900 to-blue-800 shadow-md py-4 px-6 flex justify-between items-center">
            <div className="navbar-start flex items-center space-x-4">
                <NavLink to="/" className="text-2xl font-bold text-cyan-200">BikeHub</NavLink>
                <button className="md:hidden text-cyan-200" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className={`navbar-center ${menuOpen ? "absolute left-0 top-16 w-full flex flex-col items-start p-4 bg-blue-900 rounded-lg shadow-lg space-y-4" : "hidden"} md:flex md:flex-row md:space-x-4 md:items-center`}>
                <NavLink to="/" className="block text-lg font-semibold text-white hover:text-cyan-200">Home</NavLink>
                <NavLink to="/products" className="block text-lg font-semibold text-white hover:text-cyan-200">All Bikes</NavLink>
                {role === 'user' ? (
                    <NavLink to="/dashboard" className="block text-lg font-semibold text-white hover:text-cyan-200">Dashboard</NavLink>
                ) : (
                    <NavLink to="/dashboard/admin" className="block text-lg font-semibold text-white hover:text-cyan-200">Dashboard</NavLink>
                )}
            </div>

            <div className="navbar-end flex items-center space-x-4">

                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button className="flex items-center mx-4 px-5 py-2 rounded-lg text-lg font-semibold text-white hover:bg-cyan-600" onClick={toggleDropdown}>
                            {user?.displayName}
                            <img src={user.photoURL || "/default-profile.png"} alt="Profile" className="w-8 h-8 rounded-full ml-2 border-2 border-white shadow-md" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-gradient-to-r from-blue-900 to-blue-300 rounded-lg shadow-lg mt-4 z-10">
                                <div className="p-4 text-center border-b border-blue-800">
                                    <img src={user.photoURL || "/default-profile.png"} alt="Profile" className="w-10 h-10 mx-auto rounded-full" />
                                    <p className="mt-2 font-semibold text-white">{user.displayName}</p>
                                </div>
                                <Link to="/profile" className="block px-4 py-2 border-b text-white hover:bg-blue-500">View Profile</Link>
                                <Link to="/dashboard/admin" className="block px-4 py-2 border-b text-white hover:bg-blue-500">Dashboard</Link>
                                <button onClick={logout} className="block w-full text-left px-4 py-2 text-white hover:bg-blue-500">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={`flex ${menuOpen ? "flex-col space-y-2" : "space-x-4"} md:flex-row md:space-y-0`}>
                        <NavLink className="px-5 py-2 rounded-lg text-lg font-semibold bg-cyan-500 text-white hover:bg-cyan-600" to="/signup">Sign Up</NavLink>
                        <NavLink className="px-5 py-2 rounded-lg text-lg font-semibold bg-cyan-500 text-white hover:bg-cyan-600" to="/signin">Sign In</NavLink>
                    </div>
                )}
            </div>
            <div>
                <label className="grid cursor-pointer place-items-center">
                    <input
                        type="checkbox"
                        checked={theme === "synthwave"}
                        onChange={toggleTheme}
                        className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                    />
                    <svg
                        className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <svg
                        className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;
