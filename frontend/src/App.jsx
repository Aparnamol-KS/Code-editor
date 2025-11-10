import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";

// Auth
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProtectedRouteUser from "./components/auth/ProtectedRouteUser";
import ProtectedRouteAdmin from "./components/auth/ProtectedRouteAdmin";

// User Pages
import HomePage from "./components/user/HomePage";
import AllProblems from "./components/user/AllProblems";
import Attempt from "./components/user/Attempt";
import Submissions from "./components/user/Submissions";

// Admin Pages
import AdminDashboard from "./components/admin/AdminDashboard";
import EditProblem from "./components/admin/EditProblem";

// Common
import NotFound from "./components/common/NotFound";


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center bg-[#0d1117] text-gray-400 font-['JetBrains_Mono']">
          Loading...
        </div>
      }>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />

          {/* User Protected Routes */}

          <Route path="/allProblems" element={<ProtectedRouteUser><AllProblems /></ProtectedRouteUser>} />
          <Route path="/problem/:id" element={<ProtectedRouteUser><Attempt /></ProtectedRouteUser>} />
          <Route path="/submissions" element={<ProtectedRouteUser><Submissions /></ProtectedRouteUser>} />


          {/* Admin Protected Routes */}
          <Route path="/admin/*" element={<ProtectedRouteAdmin><AdminDashboard /></ProtectedRouteAdmin>} />
          <Route path="/admin/editProblem/:id" element={<ProtectedRouteAdmin><EditProblem /></ProtectedRouteAdmin>} />
        </Routes>
      </Suspense>
    </BrowserRouter>

  );
}

export default App;
