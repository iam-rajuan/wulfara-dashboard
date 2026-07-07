import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import VerifyCode from "../Pages/Auth/VerifyCode/VerifyCode";
import NewPass from "../Pages/Auth/NewPass/NewPass";
import Settings from "../Pages/Settings/Settings";
import Booking from "../Pages/Bookings/Bookings";
import BookingDetails from "../Pages/BookingDetails/BookingDetails";
import Workers from "../Pages/Workers/Workers";
import WorkerDetailsPage from "../Pages/WorkerDetailsPage/WorkerDetailsPage";
import PaymentDetails from "../Pages/PaymentDetails/PaymentDetails";
import Payments from "../Pages/Payments/Payments";
import Customers from "../Pages/Customers/Customers";
import CustomerDetails from "../Pages/CustomerDetails/CustomerDetails";
import Support from "../Pages/Support/Support";
export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/forgate-password",
    element: <ForgatePassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/new-password",
    element: <NewPass />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/booking", element: <Booking/> },
          { path: "/booking-details", element: <BookingDetails/> },
          { path: "/workers", element: <Workers/> },
          { path: "/workers/:id", element: <WorkerDetailsPage/> },
          {path: "/payments" , element: <Payments/>},
          {path: "/payment-details" , element: <PaymentDetails/>},
           {path: "/customers" , element: <Customers/>},
          {path: "/customer/:id" , element: <CustomerDetails/>},
          { path: "/support", element: <Support /> },
          { path: "/settings", element: <Settings/> },

        ],
      },
    ],
  },
]);
