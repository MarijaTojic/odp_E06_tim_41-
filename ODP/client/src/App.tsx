import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
//import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";
//import KontrolnaTablaUserStranica from "./pages/kontrolna_tabla/KontrolnaTablaUserStranica";
import KontrolnaTablaAdminStranica from "./pages/kontrolna_tabla/KontrolnaTablaAdminStranica";
import NotFoundStranica from "./pages/not_found/NotFoundPage";
//import { usersApi } from "./api_services/users/UsersAPIService";
import CatalogPage from "./pages/ContentPage";


function App() {
  return (
   <Routes>
     
      <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />
      <Route path="/404" element={<NotFoundStranica />} />

      {/* User dashboard */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <CatalogPage />
          </ProtectedRoute>
        }
      />

      {/* Admin dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <KontrolnaTablaAdminStranica />
          </ProtectedRoute>
        }
      />

      {/* Default ruta */}
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
  
}

export default App;
