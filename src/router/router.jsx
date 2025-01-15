import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/all-properties',
          element: <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
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
          element: <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }
      ]
    },
  ]);

  export default router;