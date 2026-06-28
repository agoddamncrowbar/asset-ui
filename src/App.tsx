import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Layout from "./components/layout/Layout.tsx";
import ProtectedRoute from "./auth/protectedRoute.tsx";
import AssetsPage from "./pages/Assets.tsx";
import UsersPage from "./pages/Users.tsx";
import DepartmentsPage from "./pages/Departments.tsx";
import CategoriesPage from "./pages/Category.tsx";
import LocationsPage from "./pages/Locations.tsx";
import Audits from "./pages/Audits.tsx";
import Inspections from "./pages/Inspections.tsx";
import Maintenance from "./pages/Maintenance.tsx";
import Requests from "./pages/Requests.tsx";
import AssignmentsPage from "./pages/Assignments.tsx";
import AppLoader from "./components/loading/AppLoader.tsx";
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
          <Route path="/requests" element={<Requests/>} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/inspections" element={<Inspections/>}/>
          <Route path="/maintenance" element={<Maintenance/>}/>
          <Route path="/audits" element={<Audits/>}/>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/loading" element={<AppLoader/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}