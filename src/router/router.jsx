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
import AddProperty from "../pages/Dashboard/AgentDashboard/AddProperty"
import AgentProfile from '../pages/Dashboard/AgentDashboard/AgentProfile'
import MyAddedProperties from '../pages/Dashboard/AgentDashboard/MyAddedProperties'
import MySoldProperties from '../pages/Dashboard/AgentDashboard/MySoldProperties'
import RequestedProperties from '../pages/Dashboard/AgentDashboard/RequestedProperties'
import MyProfile from '../pages/Dashboard/UserDashboard/MyProfile'
import Wishlist from '../pages/Dashboard/UserDashboard/Wishlist'
import PropertyBought from '../pages/Dashboard/UserDashboard/PropertyBought'
import MyReviews from '../pages/Dashboard/UserDashboard/MyReviews'
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
          </PrivateRoute>,
          children: [
            // Agent Routes
            {
              path: 'agent-profile',
              element: <AgentProfile></AgentProfile>,
              index:true,
            }
            ,
            {
              path: 'add-property',
              element: <AddProperty></AddProperty>
            },
            {
              path: 'my-added-properties',
              element: <MyAddedProperties></MyAddedProperties>
            },
            {
              path: 'my-sold-properties',
              element: <MySoldProperties></MySoldProperties>
            },
            {
              path: 'requested-properties',
              element: <RequestedProperties></RequestedProperties>
            },
            // User Routes
            {
              path: 'my-profile',
              element: <MyProfile></MyProfile>
            },
            {
              path: 'wishlist',
              element: <Wishlist></Wishlist>
            },
            {
              path: 'property-bought',
              element: <PropertyBought></PropertyBought>
            },
            {
              path: 'my-reviews',
              element: <MyReviews></MyReviews>
            },
          ]
        }
      ]
    },
  ]);

  export default router;