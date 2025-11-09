import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0d1117] text-white font-['JetBrains_Mono']">
      {/* ==== Main Heading ==== */}
      <h1 className="text-5xl md:text-6xl font-['Orbitron'] bg-gradient-to-r from-[#00E0FF] to-[#007BFF] bg-clip-text text-transparent drop-shadow-lg mb-4">
        CodeSphere
      </h1>

      {/* ==== Subheading / Quote ==== */}
      <p className="text-gray-400 text-lg font-['Share_Tech'] mb-10 text-center max-w-xl">
        "Empower your logic, ignite your creativity — one problem at a time."
      </p>

      {/* ==== Buttons ==== */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 text-lg rounded-md font-semibold border cursor-pointer border-[#00E0FF] text-[#00E0FF] hover:bg-[#00E0FF]/10 hover:shadow-[#00E0FF]/40 transition-all duration-300"
        >
          Register
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 text-lg rounded-md font-semibold border cursor-pointer border-[#00E0FF] text-[#00E0FF] hover:bg-[#00E0FF]/10 hover:shadow-[#00E0FF]/40 transition-all duration-300"
        >
          Login
        </button>
      </div>

      {/* ==== Footer Text (Optional) ==== */}
      <p className="absolute bottom-6 text-gray-500 text-sm font-['Rajdhani']">
        © {new Date().getFullYear()} CodeSphere — Built for Thinkers.
      </p>
    </div>
  );
}

export default HomePage;
