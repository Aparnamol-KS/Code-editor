import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ListChecks, PlusCircle, LogOut } from "lucide-react";

import AddProblem from "./AddProblem";
import AdminAllProblems from "./AdminAllProblems";
import EditProblem from "./EditProblem";
import NotFound from "../common/NotFound";

function AdminDashboard() {
    const [active, setActive] = useState("dashboard");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const current = location.pathname.split("/").pop() || "dashboard";
        setActive(current);
    }, [location]);

    const handleNav = (page) => {
        setActive(page);
        navigate(`/admin/${page}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const renderSection = () => {
        switch (active) {
            case "dashboard":
                return (
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-['Orbitron'] text-cyan-400">
                            Welcome, Commander 👨‍💻
                        </h2>
                        <p className="text-gray-300 font-['JetBrains_Mono'] text-base max-w-3xl mx-auto">
                            You’ve entered the Admin Control Zone of{" "}
                            <span className="text-cyan-400 font-semibold">CodeSphere</span>.
                            <br /> Use the navigation bar above to manage problems, users, and submissions efficiently.
                        </p>
                    </div>
                );

            case "allProblems":
            case "problems":
                return <AdminAllProblems />;

            case "addProblem":
            case "add-problem":
                return <AddProblem />;

            case "editProblem":
                return <EditProblem />;

            
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 flex flex-col font-['JetBrains_Mono']">
            {/* Navbar */}
            <nav className="bg-gray-900/80 border-b border-gray-800 shadow-lg px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 backdrop-blur-sm">
                <h1 className="text-3xl font-['Orbitron'] text-cyan-400 tracking-widest text-center md:text-left">
                    CodeSphere Admin
                </h1>

                <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-end font-['Rajdhani'] text-lg">
                    <button
                        onClick={() => handleNav("dashboard")}
                        className={`flex items-center gap-2 transition-all duration-200 ${
                            active === "dashboard"
                                ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                                : "text-gray-400 hover:text-cyan-300"
                        }`}
                    >
                        <LayoutDashboard size={18} /> Dashboard
                    </button>

                    <button
                        onClick={() => handleNav("allProblems")}
                        className={`flex items-center gap-2 transition-all duration-200 ${
                            active === "allProblems"
                                ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                                : "text-gray-400 hover:text-cyan-300"
                        }`}
                    >
                        <ListChecks size={18} /> Problems
                    </button>

                    <button
                        onClick={() => handleNav("addProblem")}
                        className={`flex items-center gap-2 transition-all duration-200 ${
                            active === "addProblem"
                                ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                                : "text-gray-400 hover:text-cyan-300"
                        }`}
                    >
                        <PlusCircle size={18} /> Add Problem
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-all duration-200"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </nav>

            {/* Main Section */}
            <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-10 py-4 overflow-y-auto">
                 {renderSection()}
                   
                
            </div>
        </div>
    );
}

export default AdminDashboard;
