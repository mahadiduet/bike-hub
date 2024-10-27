import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const existLocation = location?.state || '/dashboard';
    const [role, setRole] = useState('');

    useEffect(() => {
        if (user?.email) {
            fetch(`https://bike-hub-server-five.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data.role);
                });
        }
    }, [user?.email]);

    if (loading) {
        return <span className="loading loading-ring loading-lg">Loading......</span>
    }

    if (user) {
        if (role === 'user') {
            toast.warning('This URL is not access for user.')
            return <Navigate to={existLocation} state={location?.pathname || '/'} />
        }
    }


    return (
        <div>
            {children}
        </div>
    );
};

export default AdminRoute;