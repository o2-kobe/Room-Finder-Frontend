import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import MapPage from "./pages/MapPage";
import HostelDetailPage from "./pages/HostelDetailPage";
import RentalDetailPage from "./pages/RentalDetailPage";
import AddListingPage from "./pages/AddListingPage";
import ProfilePage from "./pages/ProfilePage";
import AuthForm from "./pages/AuthForm";

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
    path: "/hostel/:id",
    Component: HostelDetailPage,
  },
  {
    path: "/rental/:id",
    Component: RentalDetailPage,
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
    path: "/auth",
    Component: AuthForm,
  },
]);
