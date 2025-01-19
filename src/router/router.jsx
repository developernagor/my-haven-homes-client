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
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import UpdateProperty from "../pages/Dashboard/AgentDashboard/UpdateProperty";
import AdminProfile from "../pages/Dashboard/AdminDashboard/AdminProfile";
import ManageProperties from "../pages/Dashboard/AdminDashboard/ManageProperties";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import ManageReviews from "../pages/Dashboard/AdminDashboard/ManageReviews";
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
          path: '/properties/:id',
          element: <PropertyDetails></PropertyDetails>
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
              path: 'update-property/:id',
              element:<UpdateProperty></UpdateProperty>
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
            {
              path: 'admin-profile',
              element: <AdminProfile></AdminProfile>
            },
            {
              path: 'manage-properties',
              element: <ManageProperties></ManageProperties>
            },
            {
              path: 'manage-users',
              element: <ManageUsers></ManageUsers>
            },
            {
              path: 'manage-reviews',
              element: <ManageReviews></ManageReviews>
            }
          ]
        }
      ]
    },
  ]);

  export default router;