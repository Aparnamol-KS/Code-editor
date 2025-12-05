import { useEffect, useState } from "react";
import axios from "axios";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/submissions", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setSubmissions(response.data.submissions))
      .catch((error) => console.error("Error fetching submissions:", error));
     
  }, []);
 console.log(submissions)
  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-['JetBrains_Mono'] p-8">
      {/* ==== HEADER ==== */}
      <h1 className="text-4xl font-['Orbitron'] text-center mb-8 bg-gradient-to-r from-[#00E0FF] to-[#007BFF] bg-clip-text text-transparent drop-shadow-lg">
        Submissions
      </h1>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-20 text-lg">
          You haven’t submitted any solutions yet 🚀
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-4">
          {submissions.map((sub, index) => (
            <div
              key={index}
              className="group bg-[#161b22] border border-gray-700 rounded-xl p-5 hover:bg-[#1c222c] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-['Orbitron'] mb-2 text-xl text-[#00E0FF]">
                    {sub.problemTitle || "Unknown Problem"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Language:{" "}
                    <span className="text-gray-300 font-semibold">
                      {sub.language.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${sub.status === "Accepted"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                >
                  {sub.status}
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-400 flex justify-between">
                <p>
                  Test Cases:{" "}
                  <span className="text-gray-200 font-semibold">
                    {sub.passesTestCases}/{sub.totalTestCases}
                  </span>
                </p>
                <p className="text-gray-500 italic">
                  Submitted:{" "}
                  {new Date(sub.submittedAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Submissions;
