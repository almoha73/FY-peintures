import React, { Suspense, lazy } from "react";
import { Routes, Route} from "react-router-dom";
import Spinner from "./pages/Spinner/Spinner";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Admin from "./pages/Private/Admin";

const Home = lazy(() => import("./pages/Home"));
const Parcours = lazy(() => import("./pages/Parcours"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const Commentaires = lazy(() => import("./pages/Commentaires"));
const Contact = lazy(() => import("./pages/Contact"));
// page Admin


const Login = lazy(() => import("./pages/Login"));
const AdminComment = lazy(() => import("./pages/AdminComment"));
const Private = lazy(() => import("./pages/Private/Private"));
const Edit = lazy(() => import("./pages/Private/Edit"));


function App() {
  
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/parcours" element={<Parcours />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/commentaires" element={<Commentaires />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admincomment" element={<AdminComment />}></Route>
          
          <Route element={<Private />}>
            <Route path="/private/admin" element={<Admin />}></Route>
            <Route path="/private/edit/:id" element={<Edit />}></Route>
          </Route>

          {/* <Route path="*" element={<Error />} /> */}
        </Routes>

        {/* {!isHomePage && <Footer />} */}
      </Suspense>
    </div>
  );
}

export default App;
