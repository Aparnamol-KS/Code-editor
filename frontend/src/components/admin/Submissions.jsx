import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminProblemSubmissions() {
    const { problemId } = useParams();
    const navigate = useNavigate();

    const [submissions, setSubmissions] = useState([]);
    const [problemTitle, setProblemTitle] = useState("");

    useEffect(() => {
        fetchProblem();
        fetchSubmissions();
    }, []);

    const fetchProblem = async () => {
        const res = await axios.get(`http://localhost:5000/problems/${problemId}`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        });
        setProblemTitle(res.data.title);
    };

    const fetchSubmissions = async () => {
        const res = await axios.get(`http://localhost:5000/submissions/${problemId}`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        });
        setSubmissions(res.data.submissions);
        setProblemTitle(res.data.submissions[0].problemTitle);
    };
    console.log("problemTitle", problemTitle)
    console.log("submissions", submissions)
    return (
        <div className="min-h-screen bg-[#0d1117] text-gray-200 p-8">

            {/* Back Button */}
            <button
                className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg border border-gray-700 font-['Share_Tech'] transition"
                onClick={() => navigate(-1)}
            >
                ⬅ Back
            </button>

            {/* Problem Title */}
            <h1 className="text-4xl font-['Orbitron'] text-cyan-400 mb-6">
               <span className="text-cyan-300">{problemTitle}</span>
            </h1>

            {/* Table Container */}
            <div className="bg-[#1a1b1e] p-6 rounded-2xl border border-cyan-800/40 shadow-lg shadow-cyan-400/10 overflow-x-auto">

                {/* Table */}
                <table className="w-full border-collapse text-left font-['JetBrains_Mono']">
                    <thead>
                        <tr className="text-cyan-300 border-b border-cyan-800/40">
                            <th className="p-3">User</th>
                            <th className="p-3">Language</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Passed</th>
                            <th className="p-3">Submitted At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {submissions.length > 0 ? (
                            submissions.map((sub) => (
                                <tr
                                    key={sub._id}
                                    className="border-b border-gray-800/40 hover:bg-gray-800/40 transition"
                                >
                                    <td className="p-3 text-gray-300">{sub.username}</td>
                                    <td className="p-3 text-gray-400">{sub.language}</td>

                                    {/* Status colors */}
                                    <td
                                        className={`p-3 font-bold ${sub.status === "Accepted"
                                            ? "text-green-400"
                                            : sub.status === "Failed"
                                                ? "text-red-400"
                                                : "text-yellow-400"
                                            }`}
                                    >
                                        {sub.status}
                                    </td>

                                    <td className="p-3 text-gray-400">
                                        {sub.passesTestCases}/{sub.totalTestCases}
                                    </td>

                                    <td className="p-3 text-gray-500">
                                        {new Date(sub.submittedAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="p-4 text-gray-500 text-center"
                                    colSpan="5"
                                >
                                    No submissions found for this problem.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
