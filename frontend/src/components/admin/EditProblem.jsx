import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    testCases: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/problems/${id}`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        const data = res.data.problem;
        setProblem({
          title: data.title || "",
          description: data.description || "",
          difficulty: data.difficulty || "Easy",
          testCases: JSON.stringify(data.testCases, null, 2) || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem({ ...problem, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/problems/${id}`,
        {
          ...problem,
          testCases: JSON.parse(problem.testCases),
        },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      alert("Problem updated successfully!");
      navigate("/all-problems");
    } catch (err) {
      console.error(err);
      alert("Failed to update problem!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-300 font-['Orbitron']">
        Loading Problem...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 font-['JetBrains_Mono'] px-8 py-10">
      <h1 className="text-4xl mb-10 font-['Orbitron'] bg-gradient-to-r from-[#00E0FF] to-[#007BFF] bg-clip-text text-transparent text-center">
        ✏ Edit Problem
      </h1>

      <form
        onSubmit={handleUpdate}
        className="max-w-3xl mx-auto bg-[#161b22] p-8 rounded-2xl shadow-lg border border-gray-800 hover:border-[#007BFF]/40 transition-all duration-300"
      >
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={problem.title}
            onChange={handleChange}
            required
            className="w-full bg-[#0d1117] border border-gray-700 focus:border-[#007BFF] text-gray-100 rounded-md p-3 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={problem.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full bg-[#0d1117] border border-gray-700 focus:border-[#007BFF] text-gray-100 rounded-md p-3 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
          <select
            name="difficulty"
            value={problem.difficulty}
            onChange={handleChange}
            className="w-full bg-[#0d1117] border border-gray-700 focus:border-[#007BFF] text-gray-100 rounded-md p-3 outline-none"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm text-gray-400 mb-2">Test Cases</label>
          <textarea
            name="testCases"
            value={problem.testCases}
            onChange={handleChange}
            rows="6"
            className="w-full bg-[#0d1117] border border-gray-700 focus:border-[#007BFF] text-gray-100 rounded-md p-3 outline-none font-['JetBrains_Mono']"
          />
          <p className="text-xs text-gray-500 mt-2">
            Enter JSON array
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#00E0FF] to-[#007BFF] px-6 py-3 rounded-md text-white text-lg font-semibold hover:scale-105 transition-all shadow-lg"
          >
            Update Problem
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProblem;
