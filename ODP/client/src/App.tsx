import { Routes, Route, Navigate } from "react-router-dom";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";
import CatalogPage from "../src/pages/ContentPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegistracijaStranica />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}

export default App;
