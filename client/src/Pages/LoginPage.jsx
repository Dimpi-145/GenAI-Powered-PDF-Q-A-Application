
import React, { useState } from 'react';
import { useAppcontext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

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
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#242124] to-[#000000] z-50">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center justify-center w-full h-full max-w-full max-h-full text-gray-500 bg-white/90">
                <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
                    <p className="text-2xl font-medium mb-4 text-center">
                        <span className="text-indigo-500 ">User</span> {state === "login" ? "Login" : "Sign Up"}
                    </p>
                    {state === "register" && (
                        <div className="w-full flex flex-col items-center">
                            <p className="self-start">Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border-2 border-gray-400 focus:border-gray-600 rounded w-full p-2 mt-1 outline-indigo-500 transition-colors duration-200" type="text" required />
                        </div>
                    )}
                    <div className="w-full flex flex-col items-center">
                        <p className="self-start">Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border-2 border-gray-400 focus:border-gray-600 rounded w-full p-2 mt-1 outline-indigo-500 transition-colors duration-200" type="email" required />
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <p className="self-start">Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border-2 border-gray-400 focus:border-gray-600 rounded w-full p-2 mt-1 outline-indigo-500 transition-colors duration-200" type="password" required />
                    </div>
                    {state === "register" ? (
                        <p className="text-center w-full">
                            Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                        </p>
                    ) : (
                        <p className="text-center w-full">
                            Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                        </p>
                    )}
                    <button type='submit' className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer mt-4">
                        {state === "register" ? "Create Account" : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage
