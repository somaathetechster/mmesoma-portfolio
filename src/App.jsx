import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Project from "./pages/Project";
import InfinitswapProject from "./pages/projects/Infinitswap";
import "./styles/globals.css";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Cursor />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Dedicated full-documentation pages */}
          <Route path="/project/infinitswap" element={<InfinitswapProject />} />
          {/* Generic fallback for other projects */}
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
