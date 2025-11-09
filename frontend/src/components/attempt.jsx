import { useEffect, useState } from "react";
import Split from "react-split";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import { useParams } from "react-router";


function Attempt() {
    const { id } = useParams()
    const [code, setCode] = useState('');
    const [problem, setProblem] = useState({ _id: "", title: "", description: "", difficulty: "", sampleInput: "", sampleOutput: "", testcases: [] });
    const [language, setLanguage] = useState('Javascript')

    useEffect(() => {
        axios.get(`http://localhost:5000/problems/${id}`, {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        }).then((response) => {
            console.log(response.data.problem)
            setProblem(response.data.problem)

        }).catch((error) => {
            console.error("Error fetching problem:", error);
        });
    }, []);
    return (
        <div className="h-screen w-screen bg-[#0d1117] text-white font-['JetBrains_Mono'] overflow-hidden">
            {/* ==== HEADER ==== */}
            <header className="flex justify-between items-center px-6 py-2 bg-[#161b22]/95 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-50">
                <h1 className="text-2xl font-['Orbitron'] bg-gradient-to-r from-[#00E0FF] to-[#007BFF] bg-clip-text text-transparent">
                    
                    CodeSphere
                </h1>

                <div className="flex gap-3 items-center">
                    {/* ==== LANGUAGE DROPDOWN ==== */}
                    <select
                        className="bg-[#1e1e1e] text-gray-300 border border-gray-700 rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#007BFF]/50 transition-all"

                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>

                    {/* ==== RUN & SUBMIT BUTTONS ==== */}
                    <button className="bg-gradient-to-r from-[#0090FF] to-[#007BFF] hover:from-[#1d4ed8] hover:via-[#3b82f6] hover:to-[#38bdf8] transition-all px-5 py-2 rounded-md font-semibold text-white shadow-md hover:shadow-lg">
                        Run
                    </button>


                    {/* <button
                        disabled={isRunning}
                        className={`bg-gradient-to-r from-[#0090FF] to-[#007BFF] px-5 py-2 rounded-md font-semibold text-white shadow-md ${isRunning ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                            }`}
                        onClick={handleRun}
                    >
                        {isRunning ? "Running..." : "Run"}
                    </button> */}


                    <button className="bg-gradient-to-r from-[#0090FF] to-[#007BFF] hover:from-[#1d4ed8] hover:via-[#3b82f6] hover:to-[#38bdf8] transition-all px-5 py-2 rounded-md font-semibold text-white shadow-md hover:shadow-lg">
                        Submit
                    </button>
                </div>
            </header>


            {/* ==== SPLIT PANELS ==== */}
            <Split
                className="flex h-[calc(100%-60px)]"
                sizes={[40, 60]}
                minSize={300}
                gutterSize={8}
            >
                {/* ==== LEFT PANEL ==== */}
                <div className="bg-[#0d1117] border-r border-gray-700 overflow-y-auto">
                    <div className="sticky top-0 bg-[#0d1117]/95 backdrop-blur-sm z-10  p-5 shadow-md">
                        <h2 className="text-3xl font-semibold font-['Share_Tech'] text-gray-300 ">
                            {problem.title}
                        </h2>
                        {" "}
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
                    </div>

                    <div className="p-5 space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            {problem.description}
                        </p>



                        <div>
                            <h3 className="text-gray-300 font-semibold">Input:</h3>
                            <p>{problem.sampleInput}</p>
                        </div>

                        <div>
                            <h3 className=" text-gray-300 font-semibold">Expected Output:</h3>
                            <p>{problem.sampleOutput}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-['Rajdhani'] font-semibold mb-2 text-gray-300">
                                Sample Test Cases :
                            </h3>
                            {problem.testcases && problem.testcases.length > 0 ? (
                                <div className="space-y-3">
                                    {problem.testcases.map((testcase, index) => (
                                        <div
                                            key={index}
                                            className="p-3 bg-gray-800 border border-gray-700 rounded-lg"
                                        >
                                            <p className="text-gray-300 font-['JetBrains_Mono']">
                                                <span className="text-cyan-400">Input:</span> {testcase.input}
                                            </p>
                                            <p className="text-gray-300 font-['JetBrains_Mono']">
                                                <span className="text-cyan-400">Expected Output:</span>{" "}
                                                {testcase.expectedOutput}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 font-['JetBrains_Mono'] italic">
                                    No test cases available.
                                </p>
                            )}
                        </div>



                    </div>
                </div>

                {/* ==== RIGHT PANEL (CODE + OUTPUT) ==== */}
                <Split
                    direction="vertical"
                    className="flex flex-col h-full"
                    sizes={[70, 30]}
                    minSize={200}
                    gutterSize={8}
                >
                    {/* ==== CODE EDITOR ==== */}
                    <div className="bg-[#0d1117] border-b border-gray-700 overflow-y-auto relative">
                        <div className="sticky top-0 bg-[#0d1117]/95 backdrop-blur-sm z-10 pt-5 px-5 shadow-md">

                            <h2 className="text-2xl font-semibold font-['Share_Tech'] text-gray-300 ">
                                Code Editor
                            </h2>
                        </div>

                        <div className="p-5">
                            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg border border-gray-800">
                                <div className="bg-[#161b22] text-gray-400 text-xs px-4 py-2 border-t border-gray-700 flex justify-between items-center">
                                    <span>Language: {language}</span>
                                </div>

                                <Editor
                                    value={code}
                                    onValueChange={setCode}
                                    highlight={(code) => highlight(code, languages[language] || languages.javascript, language)}
                                    padding={14}
                                    style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 15, minHeight: "43vh" }}
                                />

                            </div>
                        </div>
                    </div>

                    {/* ==== OUTPUT PANEL ==== */}
                    <div className="bg-[#0d1117] overflow-y-auto relative">
                        <div className="sticky top-0 bg-[#0d1117]/95 backdrop-blur-sm py-3 px-5 z-10 shadow-md">
                            <h2 className="text-2xl font-semibold font-['Share_Tech'] text-gray-300">Output</h2>
                        </div>

                        <div className="p-5">
                            <div className="bg-[#1e1e1e] rounded-lg p-4 h-full overflow-y-auto border border-gray-800 shadow-inner">
                                <pre className="text-gray-400 text-sm whitespace-pre-wrap">
                                    {"Output will appear here once you run your code."}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Split>
            </Split>
        </div>
    );
}

export default Attempt;
