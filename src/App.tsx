import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Layout from "./components/layout/Layout.tsx";
import ProtectedRoute from "./auth/protectedRoute.tsx";
import AssetsPage from "./pages/Assets.tsx";
import UsersPage from "./pages/Users.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected layout group */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests" element={<h1>Requests</h1>} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/categories" element={<h1>Categories</h1>} />
          <Route path="/departments" element={<h1>Departments</h1>} />
          <Route path="/assignments" element={<h1>Assignments</h1>} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}