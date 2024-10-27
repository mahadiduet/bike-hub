import { useContext, useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaLock,
    FaPodcast,
    FaQuestionCircle,
    FaSignOutAlt,
    FaRegEdit,
} from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import "./user.css";
import { AuthContext } from "../../../FirebaseProvider/FirebaseProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const UserDashboard = () => {
    const { user, updateUser, loading, logout } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://bike-hub-server-five.vercel.app/users/${user?.email}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchUserData();
        }
    }, [user?.email]);

    const handleEditToggle = () => setIsEditing((prev) => !prev);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            displayName: form.name.value,
            phone: form.phone.value,
            address: form.address.value,
            photoURL: form.photoUrl.value,
        };

        try {
            await updateUser(updatedData.displayName, updatedData.photoURL);
            const response = await axios.put(
                `https://bike-hub-server-five.vercel.app/users/${user?.email}`,  // Using email as identifier
                updatedData
            );
            if (response.status === 200) {
                Swal.fire({
                    title: "Profile Updated ✅",
                    text: "You're all set! Your profile looks great 👏",
                    icon: "success",
                    confirmButtonText: "Yay! 🤩",
                    timer: 3000,
                    timerProgressBar: true,
                    background: "#E2E8F0",
                }).then(() => {
                    fetchUserData();
                    window.location.reload();
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleSignOut = async () => {
        await logout();
        navigate("/signin");
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="flex bg-gradient-to-r from-[#142a4c] via-[#18171E] to-[#1b1f24] justify-center items-center min-h-screen">
            <Helmet>
                <title>Dashboard | User</title>
            </Helmet>
            <div className="relative w-full shadow-lg rounded-lg overflow-hidden">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/037/169/619/non_2x/ai-generated-recording-a-podcast-in-the-office-free-photo.jpg"
                    alt="Podcast Background"
                    className="absolute inset-0 object-cover w-full h-full"
                />
                <div className="relative z-10 min-h-screen flex flex-col md:w-5/12 mx-auto m-5">
                    {!isEditing ? (
                        <div className="flex flex-col">
                            <button
                                onClick={handleEditToggle}
                                className="flex justify-end text-4xl text-red-800 rounded-lg w-full"
                            >
                                <FaRegEdit className="border border-red-800 p-2 rounded-md" />
                            </button>

                            <div className="flex flex-col items-center bg-black rounded-lg shadow-md p-8">
                                <img
                                    className="w-28 h-28 rounded-full border-4 border-red-800 shadow-md"
                                    src={
                                        user?.photoURL ||
                                        "https://i.ibb.co.com/C09dnMY/default-Img-removebg-preview.png"
                                    }
                                    alt="Profile"
                                />
                                <h2 className="text-2xl font-bold mt-4 text-white">
                                    Name: {userData?.displayName || "N/A"}
                                </h2>
                                <p className="text-[#dededecc] text-base py-2">
                                    Email: {userData?.email || "N/A"}
                                </p>
                            </div>

                            <div className="mt-8 space-y-4">
                                <UserOption icon={<FaPodcast />} label="My Order" />
                                <UserOption icon={<FaLock />} label="Change Password" />
                                <UserOption icon={<FaQuestionCircle />} label="Help & Support" />
                                <UserOption
                                    icon={<FaSignOutAlt />}
                                    label="Log out"
                                    onClick={handleSignOut}
                                />
                            </div>
                        </div>
                    ) : (
                        <EditProfileForm
                            userData={userData}
                            onSubmit={handleUpdateProfile}
                            onBack={handleEditToggle}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const UserOption = ({ icon, label, onClick }) => (
    <div
        className="flex items-center justify-between px-6 py-4 bg-black rounded-lg shadow-sm cursor-pointer"
        onClick={onClick}
    >
        <div className="flex items-center">
            {icon}
            <span className="ml-4 text-[#dededecc]">{label}</span>
        </div>
        <FaArrowLeft className="text-gray-400 w-4 h-4 transform rotate-180" />
    </div>
);

const EditProfileForm = ({ userData, onSubmit, onBack }) => (
    <div className="flex flex-col">
        <div className="flex items-center mb-6">
            <button className="flex items-center text-red-800" onClick={onBack}>
                <FaArrowLeft className="w-6 h-6 mr-3" />
                <h1 className="text-xl font-bold text-white">Back</h1>
            </button>
        </div>

        <form onSubmit={onSubmit}>
            <ProfileInput label="Full name" name="name" defaultValue={userData?.displayName} />
            <ProfileInput label="Profile Image" name="photoUrl" defaultValue={userData?.photoURL} />
            <ProfileInput label="Phone number" name="phone" defaultValue={userData?.phone} />
            <ProfileInput label="Address" name="address" defaultValue={userData?.address} />
            <ProfileInput label="Email" name="email" defaultValue={userData?.email} readOnly />

            <div className="px-6 mt-8 w-7/12 mx-auto">
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-red-800 to-black text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
);

const ProfileInput = ({ label, name, defaultValue, readOnly = false }) => (
    <div className="w-10/12 mx-auto mt-4">
        <label className="block text-base font-semibold text-blue-100">{label}</label>
        <input
            type="text"
            name={name}
            defaultValue={defaultValue}
            readOnly={readOnly}
            className="mt-1 p-2 border bg-[#D1D5DB] block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring focus:ring-red-800"
        />
    </div>
);

export default UserDashboard;
