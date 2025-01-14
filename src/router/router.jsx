import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <div>Error</div>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/all-properties',
          element: <AllProperties></AllProperties>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/dashboard',
          element: <Dashboard></Dashboard>
        }
      ]
    },
  ]);

  export default router;