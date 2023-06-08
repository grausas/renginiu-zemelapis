import { Routes, Route } from "react-router-dom";
import { Map } from "./pages/Map";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
    </Routes>
  );
}

export default App;
