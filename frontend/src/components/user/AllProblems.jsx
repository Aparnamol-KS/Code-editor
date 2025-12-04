import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AllProblems() {
    const navigate = useNavigate()
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/problems", {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setProblems(response.data.problems || []);
            })
            .catch((error) => {
                console.error("Error fetching problems:", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-[#0e0e10] text-gray-200 flex flex-col items-center py-12 px-4">
            {/* Heading */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-10">
                <h1 className="text-4xl font-['Orbitron'] text-cyan-400">
                    CodeArena
                </h1>

                <button
                    onClick={() => navigate("/submissions")}
                    className="px-5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-600
                           text-white font-['Share_Tech'] text-lg transition-all duration-300
                           border border-cyan-400/40 hover:border-cyan-300"
                >
                    My Submissions
                </button>
            </div>


            {/* Problem Grid */}
            <div className="grid gap-6 w-full max-w-4xl">
                {problems.length > 0 ? (
                    problems.map((problem) => (
                        <div
                            key={problem._id}
                            className="bg-[#1a1b1e] border border-cyan-800/40 hover:border-cyan-400/60
                         rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
                        >
                            <h2 className="text-2xl font-['Share_Tech'] text-cyan-300 mb-2">
                                {problem.title}
                            </h2>

                            <div className="flex justify-between items-center text-sm text-gray-400">
                                <span className="font-['JetBrains_Mono']">
                                    Difficulty:{" "}
                                    <span
                                        className={`${problem.difficulty === "Easy"
                                            ? "text-green-400"
                                            : problem.difficulty === "Medium"
                                                ? "text-yellow-400"
                                                : "text-red-400"
                                            }`}
                                    >
                                        {problem.difficulty}
                                    </span>
                                </span>

                                <button
                                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white
                              font-['Share_Tech'] transition-all duration-300 text-lg"
                                    onClick={() => {
                                        // navigate to problem page later
                                        navigate(`/problem/${problem._id}`)
                                    }}
                                >
                                    Solve
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 font-['JetBrains_Mono']">
                        Loading problems or none available...
                    </p>
                )}
            </div>
        </div>
    );
}

export default AllProblems;
