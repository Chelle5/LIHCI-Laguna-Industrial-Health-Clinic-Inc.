import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import Clinics from "./pages/Clinics";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "clients", Component: Clients },
      { path: "clinics", Component: Clinics },
      { path: "work", Component: Work },
      { path: "contact", Component: Contact },
    ],
  },
]);
