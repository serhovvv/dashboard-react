import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
