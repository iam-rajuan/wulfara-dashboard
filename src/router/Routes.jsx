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
import SupplierManagement from "../Pages/admin-pages/supplier/SupplierManagement";
import SupplierVerificationDetail from "../Pages/admin-pages/supplier/SupplierVerificationDetail";
import ListingReview from "../Pages/admin-pages/listings/ListingReview";
import ListingDetail from "../Pages/admin-pages/listings/ListingDetail";
import CategoryManagement from "../Pages/admin-pages/categories/CategoryManagement";
import CreateCategory from "../Pages/admin-pages/categories/CreateCategory";
import EditCategory from "../Pages/admin-pages/categories/EditCategory";
import SubscriptionManagement from "../Pages/admin-pages/subscriptions/SubscriptionManagement";
import EditSubscription from "../Pages/admin-pages/subscriptions/EditSubscription";
import CreateSubscription from "../Pages/admin-pages/subscriptions/CreateSubscription";
import RfqManagement from "../Pages/admin-pages/rfqs/RfqManagement";
import RfqDetails from "../Pages/admin-pages/rfqs/RfqDetails";
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
import ContentManagement from "../Pages/admin-pages/content/ContentManagement";
import HomepageSettings from "../Pages/admin-pages/content/HomepageSettings";
import SeoManagement from "../Pages/admin-pages/seo/SeoManagement";
import SeoSettings from "../Pages/admin-pages/seo/SeoSettings";
import RevenueReports from "../Pages/admin-pages/revenue/RevenueReports";

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
          {
            path: "buyer-management",
            element: <BuyerManagement />
          },
          {
            path: "supplier-management",
            element: <SupplierManagement />
          },
          {
            path: "supplier-management/verification/:id",
            element: <SupplierVerificationDetail />
          },
          {
            path: "listings",
            element: <ListingReview />
          },
          {
            path: "listings/:id",
            element: <ListingDetail />
          },
          {
            path: "categories",
            element: <CategoryManagement />
          },
          {
            path: "categories/create",
            element: <CreateCategory />
          },
          {
            path: "categories/edit/:id",
            element: <EditCategory />
          },
          {
            path: "subscriptions",
            element: <SubscriptionManagement />
          },
          {
            path: "subscriptions/edit/:id",
            element: <EditSubscription />
          },
          {
            path: "subscriptions/create",
            element: <CreateSubscription />
          },
          {
            path: "rfqs",
            element: <RfqManagement />
          },
          {
            path: "rfqs/:id",
            element: <RfqDetails />
          },
          { path: "/settings", element: <Settings /> },
          { path: "/settings/company", element: <Settings /> },
          { path: "/settings/roles", element: <Settings /> },
          { path: "/settings/notifications", element: <Settings /> },
          {
            path: "content",
            element: <ContentManagement />
          },
          {
            path: "content/homepage",
            element: <HomepageSettings />
          },
          {
            path: "seo",
            element: <SeoManagement />
          },
          {
            path: "seo/add",
            element: <SeoSettings />
          },
          {
            path: "revenue",
            element: <RevenueReports />
          },
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
