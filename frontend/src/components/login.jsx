import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", form);
            localStorage.setItem("token", res.data.token);
            setMessage("Login successful!");
            navigate('/allProblems')

        } catch (err) {
            setMessage("Invalid email or password");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-950 font-['JetBrains_Mono'] text-white">

            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">

                <h1 className="text-3xl font-['Orbitron'] font-semibold text-cyan-400 mb-12 text-center">
                    Welcome Back !!
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />


                    <button
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-700 font-['Orbitron']  transition rounded-lg py-2 font-semibold"
                    >
                        Login
                    </button>
                </form>

                {message && (
                    <p className="text-center mt-4 text-sm text-red-400">{message}</p>
                )}

                <p className="text-center font-['Share_Tech'] text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-cyan-400  hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
