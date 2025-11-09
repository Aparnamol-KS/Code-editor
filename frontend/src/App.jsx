import { Route, Routes, BrowserRouter } from "react-router";

import Attempt from "./components/attempt";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import ProtectedRouteUser from "./components/protectingRoute";
import AllProblems from "./components/problems";
import HomePage from "./components/home";
import './App.css'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/allProblems"
        element={
          <ProtectedRouteUser>
            <AllProblems />
          </ProtectedRouteUser>
          
        }
      />
      <Route
        path="/problem/:id"
        element={
          <ProtectedRouteUser>
            <Attempt />
          </ProtectedRouteUser>
          
        }
      />
    </Routes>
  </BrowserRouter>

}

export default App
