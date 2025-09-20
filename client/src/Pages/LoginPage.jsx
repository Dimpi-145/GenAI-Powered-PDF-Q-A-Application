
import React, { useState } from 'react';
import { useAppcontext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../assets/google_logo.png';

const LoginPage = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useAppcontext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Fake login: set a dummy user object
        setUser({ name: name || 'Demo User', email });
        navigate('/home');
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 animate-gradient-x z-50">
            <div className="w-full h-full flex items-center justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center justify-center w-full max-w-md mx-auto p-10 rounded-3xl shadow-2xl bg-white/95 border-4 border-white/60 animate-fade-in">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 mb-2 text-center drop-shadow-lg">Welcome!</h1>
                    <p className="text-lg text-gray-600 mb-4 text-center">Sign in to your account or create a new one below.</p>
                    <button type="button" className="flex items-center gap-3 w-full justify-center py-3 px-6 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-100 transition-all shadow-md mb-2 font-semibold text-gray-700 text-base">
                        <img src={googleLogo} alt="Google" className="w-6 h-6" />
                        Sign up with Google
                    </button>
                    <div className="w-full flex items-center gap-2 my-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-gray-100" />
                        <span className="text-gray-400 text-xs font-bold">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-l from-gray-300 to-gray-100" />
                    </div>
                    {state === "register" && (
                        <div className="w-full flex flex-col items-center">
                            <p className="self-start font-semibold text-gray-700">Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Type your name" className="border-2 border-gray-400 focus:border-pink-500 rounded-lg w-full p-3 mt-1 outline-none transition-colors duration-200 bg-white/80" type="text" required />
                        </div>
                    )}
                    <div className="w-full flex flex-col items-center">
                        <p className="self-start font-semibold text-gray-700">Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Type your email" className="border-2 border-gray-400 focus:border-indigo-500 rounded-lg w-full p-3 mt-1 outline-none transition-colors duration-200 bg-white/80" type="email" required />
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <p className="self-start font-semibold text-gray-700">Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Type your password" className="border-2 border-gray-400 focus:border-purple-500 rounded-lg w-full p-3 mt-1 outline-none transition-colors duration-200 bg-white/80" type="password" required />
                    </div>
                    {state === "register" ? (
                        <p className="text-center w-full text-sm">
                            Already have an account? <span onClick={() => setState("login")} className="text-indigo-600 font-bold cursor-pointer hover:underline">Click here</span>
                        </p>
                    ) : (
                        <p className="text-center w-full text-sm">
                            Create an account? <span onClick={() => setState("register")} className="text-pink-600 font-bold cursor-pointer hover:underline">Click here</span>
                        </p>
                    )}
                    <button type='submit' className="bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 hover:from-pink-500 hover:to-indigo-500 transition-all text-white w-full py-3 rounded-lg font-bold text-lg shadow-lg mt-2">
                        {state === "register" ? "Create Account" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage
