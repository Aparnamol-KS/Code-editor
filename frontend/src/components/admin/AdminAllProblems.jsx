import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminAllProblems() {
  const [problems, setProblems] = useState([]);
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/problems", {
          headers: { authorization: token },
        });
        setProblems(res.data.problems || []);

        // Decode JWT to get role
        if (token) {
          const userInfo = JSON.parse(atob(token.split(".")[1]));
          if (userInfo.role) setRole(userInfo.role);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    try {
      await axios.delete(`http://localhost:5000/problems/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
      setProblems(problems.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete problem");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 font-['JetBrains_Mono'] px-8 py-10">
      

      {problems.length === 0 ? (
        <p className="text-center text-gray-500">No problems available.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-[#161b22] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:border-[#007BFF]/50 transition-all duration-300"
            >
              <h2 className="text-2xl font-['Share_Tech'] mb-2 text-gray-100">
                {problem.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {problem.description}
              </p>

              <span
                className={`px-3 py-1 rounded-md text-xs font-semibold ${
                  problem.difficulty === "Easy"
                    ? "bg-green-800/30 text-green-400"
                    : problem.difficulty === "Medium"
                    ? "bg-yellow-700/30 text-yellow-400"
                    : "bg-red-800/30 text-red-400"
                }`}
              >
                {problem.difficulty}
              </span>

              {role === "admin" && (
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => navigate(`/admin/editProblem/${problem._id}`)}
                    className="text-yellow-400 hover:text-yellow-500 font-semibold text-sm"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(problem._id)}
                    className="text-red-400 hover:text-red-500 font-semibold text-sm"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminAllProblems;
