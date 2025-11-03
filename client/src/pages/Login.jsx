

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../assets/GoogleIcon';

const Login = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser, theme, setTheme } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser({ name: name || 'Demo User', email });
        navigate('/');
    }

    return (
        <div
            className={`min-h-screen w-full transition-colors duration-300 flex flex-col items-center justify-center
                ${theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
                    : 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 animate-gradient-x'}
            `}
            style={{ minHeight: '100vh', width: '100vw', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
            {/* Mode toggle button */}
            <button
                className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold shadow-md transition-colors duration-200
                    ${theme === 'dark' ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="flex-1 flex items-center justify-center w-full px-1 md:px-0" style={{ minHeight: '100vh' }}>
                <form
                    onSubmit={handleSubmit}
                    className={`flex flex-col gap-8 items-center justify-center w-full max-w-lg mx-auto p-4 sm:p-8 md:p-14 my-8 rounded-3xl shadow-2xl border-4 animate-fade-in transition-colors duration-300
                        ${theme === 'dark'
                            ? 'bg-gray-900/95 border-gray-700 text-white'
                            : 'bg-white/95 border-white/60 text-gray-900'}
                    `}
                    style={{ minWidth: 0, minHeight: '70vh' }}
                >
                    <h1 className={`text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg mb-2
                        ${theme === 'dark'
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-200'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600'}
                    `}>
                        Welcome!
                    </h1>
                    <p className={`text-base md:text-lg mb-4 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Sign in to your account or create a new one below.</p>
                    <button
                        type="button"
                        className={`flex items-center gap-3 w-full justify-center py-3 px-4 md:px-6 rounded-lg border-2 transition-all shadow-md mb-2 font-semibold text-base
                            ${theme === 'dark'
                                ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700'
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'}
                        `}
                    >
                        <GoogleIcon style={{ width: 24, height: 24 }} />
                        Sign up with Google
                    </button>
                    <div className="w-full flex items-center gap-2 my-2 text-xs md:text-sm">
                        <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-800' : 'bg-gradient-to-r from-gray-300 to-gray-100'}`} />
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>OR</span>
                        <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gradient-to-l from-gray-700 to-gray-800' : 'bg-gradient-to-l from-gray-300 to-gray-100'}`} />
                    </div>
                    {state === "register" && (
                        <div className="w-full flex flex-col items-center">
                            <p className={`self-start font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Type your name" className={`border-2 rounded-lg w-full p-2 md:p-3 mt-1 outline-none transition-colors duration-200
                                ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white focus:border-pink-400' : 'border-gray-400 bg-white/80 text-gray-900 focus:border-pink-500'}`}
                                type="text" required />
                        </div>
                    )}
                    <div className="w-full flex flex-col items-center">
                        <p className={`self-start font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Type your email" className={`border-2 rounded-lg w-full p-2 md:p-3 mt-1 outline-none transition-colors duration-200
                            ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white focus:border-indigo-300' : 'border-gray-400 bg-white/80 text-gray-900 focus:border-indigo-500'}`}
                            type="email" required />
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <p className={`self-start font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Type your password" className={`border-2 rounded-lg w-full p-2 md:p-3 mt-1 outline-none transition-colors duration-200
                            ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white focus:border-purple-300' : 'border-gray-400 bg-white/80 text-gray-900 focus:border-purple-500'}`}
                            type="password" required />
                    </div>
                    {state === "register" ? (
                        <p className={`text-center w-full text-sm ${theme === 'dark' ? 'text-gray-400' : ''}`}>
                            Already have an account? <span onClick={() => setState("login")} className="text-indigo-400 font-bold cursor-pointer hover:underline">Click here</span>
                        </p>
                    ) : (
                        <p className={`text-center w-full text-sm ${theme === 'dark' ? 'text-gray-400' : ''}`}>
                            Create an account? <span onClick={() => setState("register")} className="text-pink-400 font-bold cursor-pointer hover:underline">Click here</span>
                        </p>
                    )}
                    <button type='submit' className={`w-full py-2 md:py-3 rounded-lg font-bold text-base md:text-lg shadow-lg mt-2 transition-all
                        ${theme === 'dark'
                            ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white'
                            : 'bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 hover:from-pink-500 hover:to-indigo-500 text-white'}
                    `}>
                        {state === "register" ? "Create Account" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login
