import { useState } from "react";
import Split from "react-split";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import "./App.css";

function App() {
  const [code, setCode] = useState(
    `function greet(name) {
  return "Hello " + name;
}

console.log(greet("World"));`
  );

  return (
    <div className="h-screen w-screen bg-[#0d1117] text-white font-['JetBrains_Mono'] overflow-hidden">
      {/* ==== HEADER ==== */}
      <header className="flex justify-between items-center px-6 py-2 bg-[#161b22]/95 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-['Orbitron'] bg-gradient-to-r from-[#00E0FF] to-[#007BFF] bg-clip-text text-transparent">
          DevOrbit
        </h1>

        <div className="flex gap-3 items-center">
          {/* ==== LANGUAGE DROPDOWN ==== */}
          <select
            className="bg-[#1e1e1e] text-gray-300 border border-gray-700 rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#007BFF]/50 transition-all"
            defaultValue="javascript"
            onChange={(e) => console.log(`Language: ${e.target.value}`)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          {/* ==== RUN & SUBMIT BUTTONS ==== */}
          <button className="bg-gradient-to-r from-[#0090FF] to-[#007BFF] hover:from-[#1d4ed8] hover:via-[#3b82f6] hover:to-[#38bdf8] transition-all px-5 py-2 rounded-md font-semibold text-white shadow-md hover:shadow-lg">
            Run
          </button>

          <button className="bg-gradient-to-r from-[#0090FF] to-[#007BFF] hover:from-[#1d4ed8] hover:via-[#3b82f6] hover:to-[#38bdf8] transition-all px-5 py-2 rounded-md font-semibold text-white shadow-md hover:shadow-lg">
            Submit
          </button>
        </div>
      </header>


      {/* ==== SPLIT PANELS ==== */}
      <Split
        className="flex h-[calc(100%-60px)]"
        sizes={[33, 67]}
        minSize={300}
        gutterSize={8}
      >
        {/* ==== LEFT PANEL ==== */}
        <div className="bg-[#0d1117] border-r border-gray-700 overflow-y-auto">
          <div className="sticky top-0 bg-[#0d1117]/95 backdrop-blur-sm z-10  p-5 shadow-md">
            <h2 className="text-2xl font-semibold font-['Share_Tech'] text-gray-300 ">
              Problem Description
            </h2>
          </div>

          <div className="p-5 space-y-4 text-gray-400 leading-relaxed">
            <p>
              Write a function <code>greet(name)</code> that returns{" "}
              <code>"Hello name"</code>. Test it using the provided input. Adjust
              your logic and hit <strong>Run</strong>.
            </p>

            <div>
              <h3 className="text-gray-300 font-semibold">Input:</h3>
              <p>"World"</p>
            </div>

            <div>
              <h3 className="text-gray-300 font-semibold">Expected Output:</h3>
              <p>"Hello World"</p>
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
                <Editor
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) =>
                    highlight(code, languages.javascript, "javascript")
                  }
                  padding={14}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    minHeight: "43vh",
                    outline: "none",
                  }}
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

export default App;
