import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Map } from "./pages/Map";
import { Login } from "./pages/login";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Header />}

      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
