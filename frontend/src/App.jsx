import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UnauthorizedAccess from "./pages/UnauthorizedAccess";
import PageNotFound from "./pages/PageNotFound";

import AddProject from "./pages/AddProject";
import ProjectDetails from "./pages/ProjectDetails";
import MyPortfolio from "./pages/MyPortfolio";
// Main application component responsible for routing and page navigation.
export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/unauthorized" element={<UnauthorizedAccess />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/my-portfolio/"
          element={<MyPortfolio canEdit={true} />}
        />

        <Route
          path="/portfolio/:id"
          element={<MyPortfolio canEdit={false} />}
        />

        <Route
         path="/add-project/:id" element={<AddProject />} />
         <Route path="/add-project" element={<AddProject />} 
        />

        <Route
          path="/project-details/:id"
          element={<ProjectDetails canEdit={true} />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetails canEdit={false} />}
        />


      </Routes>

      <Footer />
    </>
  );
}