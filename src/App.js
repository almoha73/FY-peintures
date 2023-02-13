import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Parcours from "./pages/Parcours";
import Gallery from "./pages/Gallery";
import Commentaires from "./pages/Commentaires";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/parcours" element={<Parcours/>}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/commentaires" element={<Commentaires />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
