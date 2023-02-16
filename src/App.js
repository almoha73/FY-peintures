import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Spinner from "./pages/Spinner/Spinner"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Parcours = lazy(() => import("./pages/Parcours"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const Commentaires = lazy(() => import("./pages/Commentaires"));
const Contact = lazy(() => import("./pages/Contact"));


function App() {
  const location = useLocation();
   // Check if the current page is the home page
   const isHomePage = location.pathname === '/';
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/parcours" element={<Parcours />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/commentaires" element={<Commentaires />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        {!isHomePage && <Footer />}
      </Suspense>
      
    </div>
  );
}

export default App;
