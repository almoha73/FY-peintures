import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./pages/Spinner/Spinner"


const Home = lazy(() => import("./pages/Home"));
const Parcours = lazy(() => import("./pages/Parcours"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const Commentaires = lazy(() => import("./pages/Commentaires"));
const Contact = lazy(() => import("./pages/Contact"));


function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/parcours" element={<Parcours />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/commentaires" element={<Commentaires />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
