import { Routes, Route } from "react-router-dom";
import { Map } from "./pages/Map";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
