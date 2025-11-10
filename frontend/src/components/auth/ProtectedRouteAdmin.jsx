import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRouteAdmin({ children }) {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!token) {
            setAuthorized(false);
            setLoading(false);
            return;
        }

        axios
            .get("http://localhost:5000/userAuth", {
                headers: { authorization: token },
            })
            .then((res) => {
                if (res.data.role === "admin") {
                    setAuthorized(true);
                }
            })
            .catch(() => setAuthorized(false))
            .finally(() => setLoading(false));
    }, [token]);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen bg-[#0d1117] text-gray-400 font-['JetBrains_Mono']">
                Verifying admin access...
            </div>
        );

    if (!authorized) return <Navigate to="/login" replace />;

    return children;
}

export default ProtectedRouteAdmin;
