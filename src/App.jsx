import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";

import CreatePortfolio from "./pages/CreatePortfolio";
import MyProjects from "./pages/MyProjects";
import AddProject from "./pages/AddProject";
import ProjectDetails from "./pages/ProjectDetails";
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

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/create-portfolio"
          element={<CreatePortfolio />}
        />

        <Route
          path="/my-projects"
          element={<MyProjects />}
        />

        <Route
          path="/add-project"
          element={<AddProject />}
        />

        <Route
          path="/project-details"
          element={<ProjectDetails />}
        />
      </Routes>

      <Footer />
    </>
  );
}