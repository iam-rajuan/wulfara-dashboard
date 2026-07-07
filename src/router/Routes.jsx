import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CompanyProfile from "../Pages/CompanyProfile/CompanyProfile";
import ProductsServices from "../Pages/ProductsServices/ProductsServices";
import Gallery from "../Pages/Gallery/Gallery";
import RFQs from "../Pages/RFQs/RFQs";
import RFQDetails from "../Components/RFQs/RFQDetails";
import RFQReply from "../Components/RFQs/RFQReply";
import Messages from "../Pages/Messages/Messages";
import VerifyCode from "../Pages/Auth/VerifyCode/VerifyCode";
import NewPass from "../Pages/Auth/NewPass/NewPass";
import Settings from "../Pages/Settings/Settings";
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
          { path: "/settings", element: <Settings/> },
          { path: "/profile", element: <CompanyProfile/> },
          { path: "/products", element: <ProductsServices/> },
          { path: "/gallery", element: <Gallery/> },
          { path: "/rfqs", element: <RFQs/> },
          { path: "/rfqs/:id", element: <RFQDetails/> },
          { path: "/rfqs/:id/reply", element: <RFQReply/> },
          { path: "/messages", element: <Messages/> },
        ],
      },
    ],
  },
]);
