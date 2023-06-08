import { Routes, Route } from "react-router-dom";
import { ArcGISMap } from "./components/Map/Map";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArcGISMap />} />
    </Routes>
  );
}

export default App;
