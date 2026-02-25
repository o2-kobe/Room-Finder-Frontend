import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import MapPage from "./pages/MapPage";
import AddListingPage from "./pages/AddListingPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ListingDetailPage from "./pages/ListingDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/explore",
    Component: ExplorePage,
  },
  {
    path: "/map",
    Component: MapPage,
  },
  {
    path: "/explore/listing/:id",
    Component: ListingDetailPage,
  },
  {
    path: "/add-listing",
    Component: AddListingPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
]);
