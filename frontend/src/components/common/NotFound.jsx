import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#0d1117] flex flex-col items-center justify-center text-center text-gray-300 font-['JetBrains_Mono']">
      
      {/* Glowing 404 */}
      <h1 className="text-7xl md:text-8xl font-['Orbitron'] bg-gradient-to-r from-[#00E0FF] to-[#007BFF] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,192,255,0.6)]">
        404
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-lg md:text-xl font-['Rajdhani'] text-gray-400">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Quote line */}
      <p className="mt-2 text-sm italic text-gray-500">
        "Even the best explorers sometimes take a wrong turn."
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-[#0090FF] to-[#007BFF] hover:from-[#1d4ed8] hover:to-[#38bdf8] transition-all px-6 py-2 rounded-md font-semibold text-white shadow-md hover:shadow-lg"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="border border-[#007BFF]/60 hover:bg-[#007BFF]/10 px-6 py-2 rounded-md font-semibold text-gray-300 transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
