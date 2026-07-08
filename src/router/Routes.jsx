import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import VerifyEmail from "../Pages/Auth/VerifyEmail/VerifyEmail";
import ChooseIndustry from "../Pages/Auth/ChooseIndustry/ChooseIndustry";
import CompanyInfo from "../Pages/Auth/CompanyInfo/CompanyInfo";
import Subscription from "../Pages/Auth/Subscription/Subscription";
import Cart from "../Pages/Auth/Cart/Cart";
import ListingPeriod from "../Pages/Auth/ListingPeriod/ListingPeriod";
import Listed from "../Pages/Auth/Listed/Listed";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BuyerManagement from "../Pages/admin-pages/buyer/BuyerManagement";
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
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/choose-industry",
    element: <ChooseIndustry />,
  },
  {
    path: "/company-info",
    element: <CompanyInfo />,
  },
  {
    path: "/subscription",
    element: <Subscription />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/listing-period",
    element: <ListingPeriod />,
  },
  {
    path: "/listed",
    element: <Listed />,
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
          { path: "/buyers", element: <BuyerManagement /> },
          { path: "/settings", element: <Settings /> },
          { path: "/profile", element: <CompanyProfile /> },
          { path: "/products", element: <ProductsServices /> },
          { path: "/gallery", element: <Gallery /> },
          { path: "/rfqs", element: <RFQs /> },
          { path: "/rfqs/:id", element: <RFQDetails /> },
          { path: "/rfqs/:id/reply", element: <RFQReply /> },
          { path: "/messages", element: <Messages /> },
        ],
      },
    ],
  },
]);
