import { useState } from "react";
import axios from "axios";

function AddProblem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    sampleInput: "",
    sampleOutput: "",
  });

  const [testcases, setTestcases] = useState([{ input: "", expectedOutput: "" }]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestcaseChange = (index, field, value) => {
    const newTestcases = [...testcases];
    newTestcases[index][field] = value;
    setTestcases(newTestcases);
  };

  const addTestcase = () => {
    setTestcases([...testcases, { input: "", expectedOutput: "" }]);
  };

  const removeTestcase = (index) => {
    const newTestcases = testcases.filter((_, i) => i !== index);
    setTestcases(newTestcases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, testcases };

    try {
      const res = await axios.post("http://localhost:5000/problems", data, {
        headers: { authorization: localStorage.getItem("token") },
      });
      alert("Problem created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create problem.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 flex flex-col items-center px-6 py-10 font-['JetBrains_Mono']">
      <h1 className="text-4xl mb-8 font-['Orbitron'] bg-gradient-to-r from-[#00E0FF] to-[#007BFF] bg-clip-text text-transparent">
        Add New Challenge
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-[#161b22] p-8 rounded-2xl shadow-2xl border border-gray-800 space-y-6"
      >
        {/* === Title === */}
        <div>
          <label className="block mb-2 text-gray-400 font-['Rajdhani'] text-lg">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-[#0d1117] border border-gray-700 rounded-md p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />
        </div>

        {/* === Description === */}
        <div>
          <label className="block mb-2 text-gray-400 font-['Rajdhani'] text-lg">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-[#0d1117] border border-gray-700 rounded-md p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />
        </div>

        {/* === Difficulty === */}
        <div>
          <label className="block mb-2 text-gray-400 font-['Rajdhani'] text-lg">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full bg-[#0d1117] border border-gray-700 rounded-md p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* === Sample Input & Output === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-400 font-['Rajdhani'] text-lg">Sample Input</label>
            <input
              type="text"
              name="sampleInput"
              value={formData.sampleInput}
              onChange={handleChange}
              required
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-400 font-['Rajdhani'] text-lg">Sample Output</label>
            <input
              type="text"
              name="sampleOutput"
              value={formData.sampleOutput}
              onChange={handleChange}
              required
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            />
          </div>
        </div>

        {/* === Test Cases === */}
        <div>
          <h2 className="text-xl mb-3 font-['Share_Tech'] text-gray-300">
            Test Cases
          </h2>
          <div className="space-y-4">
            {testcases.map((tc, index) => (
              <div
                key={index}
                className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Input"
                    value={tc.input}
                    onChange={(e) =>
                      handleTestcaseChange(index, "input", e.target.value)
                    }
                    className="bg-[#0d1117] border border-gray-700 rounded-md p-2 text-gray-300 focus:ring-2 focus:ring-[#007BFF] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Expected Output"
                    value={tc.expectedOutput}
                    onChange={(e) =>
                      handleTestcaseChange(index, "expectedOutput", e.target.value)
                    }
                    className="bg-[#0d1117] border border-gray-700 rounded-md p-2 text-gray-300 focus:ring-2 focus:ring-[#007BFF] outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeTestcase(index)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addTestcase}
            className="mt-4 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-gray-700 text-cyan-400 font-semibold px-4 py-2 rounded-md transition-all"
          >
            + Add Test Case
          </button>
        </div>

        {/* === Submit Button === */}
        <div className="pt-6 text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#00E0FF] to-[#007BFF] hover:from-[#1d4ed8] hover:to-[#38bdf8] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Create Problem
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProblem;
