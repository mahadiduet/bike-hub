import { Outlet } from 'react-router-dom';
import Navbar from '../component/share/Navbar';
import Footer from '../component/share/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default MainLayout;