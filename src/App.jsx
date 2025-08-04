import { useState } from 'react';
import './App.css';

import Editor from 'react-simple-code-editor';
import { highlight } from "prismjs";
import 'prismjs/components/prism-javascript'; // ✅ Load JS syntax
import 'prismjs/themes/prism.css'; // Theme


function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState('const a = 10;');

  return (
    <div className="flex flex-col justify-end font-mono h-screen bg-[#080808]">

      <div className="flex justify-center gap-4 pb-4">
        <button className="rounded-xl border bg-blue-900 text-lg text-white font-semibold focus:ring-2 focus:ring-blue-400 w-30 p-2">
          Run
        </button>
        <button className="rounded-xl border bg-blue-900 text-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 w-30 p-2">
          Submit
        </button>
      </div>

      <div className="flex justify-around flex-wrap gap-4 px-4">

        <div className="relative bg-[#141b1e] w-full md:w-md lg:w-2xl h-[700px] rounded-2xl overflow-y-auto hide-scrollbar">
          <div className="sticky top-0 z-10 h-10 bg-[#d0d0d0] flex items-center px-4 rounded-t-2xl">
            <p className="text-black font-semibold text-lg">Description</p>
          </div>
          <div className="text-white space-y-4 p-5">


          </div>
          <div className="h-10 bg-[#141b1e] sticky bottom-0"></div>
        </div>

        <div className="flex flex-col w-full md:w-md lg:w-2xl h-[700px] gap-4">

          <div className="relative bg-[#141b1e] flex-2 rounded-2xl overflow-y-auto hide-scrollbar">
            <div className="sticky top-0 z-10 h-10 bg-[#d0d0d0] flex items-center px-4 rounded-t-2xl">
              <p className="text-black font-semibold text-lg">Code</p>
            </div>

            <div className="text-white px-5 pt-5 pb-20">  {/* <- This adds padding bottom! */}
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={code => highlight(code, Prism.languages.javascript, 'javascript')}
                padding={10}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '15px',
                }}
              />
            </div>
          </div>


          <div className="relative bg-[#141b1e] flex-1 rounded-2xl overflow-y-auto hide-scrollbar">
            <div className="sticky top-0 z-10 h-10 bg-[#d0d0d0] flex items-center px-4 rounded-t-2xl">
              <p className="text-black font-semibold text-lg">Test</p>
            </div>
            <div className="text-white space-y-4 p-5 " >
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i}>
                  <span className="text-gray-400 pr-3">{i}</span>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, rerum!
                </p>
              ))}
              <div className="h-8 bg-[#141b1e] sticky bottom-0"></div>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
}

export default App;
