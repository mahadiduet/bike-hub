import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../page/Home/Home";
import Registration from "../page/Registration/Registration";
import Login from "../page/Login/Login";
import Dashboard from "../page/Dashboard/Dashboard";
import UserDashboard from "../page/Dashboard/User/UserDashboard";
import AdminDashboard from "../page/Dashboard/Admin/AdminDashboard";
import AddCategory from "../page/Dashboard/Admin/AddCategory";
import AddProduct from "../page/Dashboard/Admin/AddProduct";
import Categories from "../page/Dashboard/Admin/Categories";
import EditCategory from "../page/Dashboard/Admin/EditCategory";
import Products from "../page/Dashboard/Admin/Products";
import EditProduct from "../page/Dashboard/Admin/EditProduct";
import Users from "../page/Dashboard/Admin/Users";
import EditUser from "../page/Dashboard/Admin/EditUser";
import UserProfile from "../page/Dashboard/User/UserProfile";
import CategoryProduct from "../page/Product/CategoryProduct/CategoryProduct";
import AllProducts from "../page/Product/Products/AllProducts";
import ProductDetails from "../page/Product/ProductDetails/ProductDetails";
import Order from "../page/Dashboard/Admin/Order";
import MyOrder from "../page/Dashboard/User/MyOrder";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../PrivateRoute/AdminRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signup',
                element: <Registration />
            },
            {
                path: '/signin',
                element: <Login />
            },
            {
                path: '/profile',
                element: <UserProfile />
            },
            {
                path: '/category/:slug',
                element: <CategoryProduct />
            },
            {
                path: '/products',
                element: <AllProducts />
            },
            {
                path: '/products/:id',
                element: <PrivateRoute><ProductDetails /></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element:<PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <UserDashboard />
            },
            {
                path: '/dashboard/order',
                element: <MyOrder />
            }
        ]
    },
    {
        path: '/dashboard/admin',
        element:<AdminRoute><PrivateRoute><Dashboard /></PrivateRoute></AdminRoute>,
        children: [
            {
                path: '/dashboard/admin',
                element: <AdminDashboard />
            },
            {
                path: '/dashboard/admin/add-category',
                element: <AddCategory />
            },
            {
                path: '/dashboard/admin/add-product',
                element: <AddProduct />
            },
            {
                path: '/dashboard/admin/categories',
                element: <Categories />
            },
            {
                path: '/dashboard/admin/categories/:id',
                element: <EditCategory />
            },
            {
                path: '/dashboard/admin/products',
                element: <Products />
            },
            {
                path: '/dashboard/admin/products/:id',
                element: <EditProduct />
            },
            {
                path: '/dashboard/admin/users',
                element: <Users />
            },
            {
                path: '/dashboard/admin/users/:id',
                element: <EditUser />
            },
            {
                path: '/dashboard/admin/order',
                element: <Order />
            }
        ]
    }
])