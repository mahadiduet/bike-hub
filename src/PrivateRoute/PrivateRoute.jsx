import { useContext } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-ring loading-lg">Loading......</span>
    }
    
    if (!user) {
        return <Navigate to='/signin' state={location?.pathname || '/'} />
    }

    
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;