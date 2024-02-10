import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";

import Salad from "../pages/shop/Menu";
import Pizza from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
// import DashboardLayout from "../layout/DashboardLayout";
// import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <PrivateRouter><Menu/></PrivateRouter>,
      },
      {
        path: "/salad",
        element: <PrivateRouter><Salad/></PrivateRouter>,
        
      },
      {
        path: "/pizza",
        element: <PrivateRouter><Pizza/></PrivateRouter>,
        
      },
      {
        path: "/cart-page",
        element: <CartPage/>,
        
      },
      {
        path:'/update-profile',
        element:<UpdateProfile/>
      }
    ],
  },
    {
      path:"/signup",
      element:<Signup/>
    },
    // {
    //   path:"/login",
    //   element:<Login/>
    // },
    {
      path:"/dashboard",
      element: <PrivateRouter><DashboardLayout/></PrivateRouter>,   
      children:[
        {
          path: "",
          element:<Dashboard/>

        },
        {
          path: "users",
          element:<Users/>

        }
      ]
    },
    
   
]);

export default router;
