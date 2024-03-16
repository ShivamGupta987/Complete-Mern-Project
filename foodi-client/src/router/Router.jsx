import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Order from "../pages/dashboard/Order.jsx";

import Salad from "../pages/shop/Menu";
import Pizza from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserProfile from "../pages/dashboard/UserProfile";

import CartPage from "../pages/shop/CartPage";
// import DashboardLayout from "../layout/DashboardLayout";
// import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Login from "../components/Login";
import Payment from "../pages/shop/Payment.jsx";
import ManageBookings from "../pages/dashboard/admin/ManageBookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      // user routes
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu/>
      },
      {
        path: "/salad",
        element: <PrivateRoute><Salad/></PrivateRoute>,
        
      },
      {
        path: "/pizza",
        element: <PrivateRoute><Pizza/></PrivateRoute>,
        
      },
      {
        path: "/cart-page",
        element: <CartPage/>,
        
      },
      {
        path: "/order",
        element:<PrivateRoute><Order/></PrivateRoute>
      },
      {
        path:'/update-profile',
        element:<UserProfile/>
      }
    ],
  },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path: '/process-checkout',
      element : <Payment/>
    },
    // admin routes
    {
      path:"/dashboard",
      element: <PrivateRoute><DashboardLayout/></PrivateRoute>,   
      children:[
        {
          path: '',
          element:<Dashboard/>

        },
        {
          path: "users",
          element:<Users/>

        },
        {
          path: "add-menu",
          element:<AddMenu/>

        },
        {
          path: "manage-items",
          element:<ManageItems/>
        },
        {
          path: "update-menu/:id",
          element: <UpdateMenu/>,
          loader: ({params}) => fetch(`https://complete-mern-project-13.onrender.com//menu/${params.id}`)
        },
        {
          path: 'manage-bookings',
          element: <ManageBookings />
        }
       
      ]
    },
    
   
]);

export default router;
