import { Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OurTasks from "./pages/OurTasks";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="h-screen w-full">
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ourtasks" element={<OurTasks />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
