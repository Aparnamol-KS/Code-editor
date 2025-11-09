import { Route, Routes, BrowserRouter } from "react-router";

import Attempt from "./components/attempt";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import ProtectedRouteUser from "./components/protectingRoute";
import AllProblems from "./components/problems";
import HomePage from "./components/home";
import Submissions from "./components/submissions";
import AddProblem from "./components/addProblem";
import AdminAllProblems from "./components/adminProblemHandler";
import EditProblem from "./components/AdminEditProblem";
import NotFound from "./components/notFound";
import './App.css'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/allProblems" element={<ProtectedRouteUser><AllProblems /></ProtectedRouteUser>} />
      <Route path="/problem/:id" element={<ProtectedRouteUser><Attempt /></ProtectedRouteUser>}/>
      <Route path="/submissions" element={<ProtectedRouteUser><Submissions /></ProtectedRouteUser>}/>
      <Route path="/admin/addProblem" element={ <AddProblem />}/>
      <Route path="/admin/allProblems" element={<AdminAllProblems />}/>
      <Route path="/admin/editProblem/:id" element={<EditProblem />}/>
    </Routes>
  </BrowserRouter>

}

export default App
