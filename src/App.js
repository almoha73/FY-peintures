import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Parcours from "./pages/Parcours";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/parcours" element={<Parcours/>}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
      </Routes>
    </div>
  );
}

export default App;
