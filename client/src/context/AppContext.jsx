import {  createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyPdfChats, dummyChats } from "../assets/assets";


const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    // Initialize chats with dummyChats so recent chats show immediately
    const [chats, setChats] = useState(dummyChats || []);
    // Do not auto-select any chat on load — show 'New Chat' by default after login
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    
    const fetchUser = async () =>{
        // No-op for now; keep user null unless explicitly set by login
        // If you want a demo user automatically, call setUser({ name: 'Demo User', email: 'demo@example.com' }) here.
    }

    const createNewChat = () => {
        const newChat = {
            _id: Date.now().toString(),
            name: 'New Chat',
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        setChats(prevChats => [newChat, ...prevChats]);
        setSelectedChat(newChat);
        navigate('/');
        return newChat;
    };

    const fetchUserChats = async () => {
        setChats(dummyChats)
        setSelectedChat(dummyChats[0])
    }

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    // Ensure dummy chats are present on mount but do NOT auto-select them
    useEffect(() => {
        if ((!chats || chats.length === 0) && dummyChats && dummyChats.length > 0) {
            setChats(dummyChats)
        }
    }, [])

    useEffect(() => {
        // If a user logs in, you could load user-specific chats from a server here.
        // For now we keep the dummy chats visible for all users (including anonymous visitors).
        if (user) {
            // Optionally: merge server/user chats with dummyChats
            // Example: setChats(prev => [...dummyChats, ...prev])
        }
    }, [user])

    

    useEffect(()=>{
        // populate initial user
        fetchUser()
    },[])


    const value={
        navigate, user, setUser, fetchUser, chats, setChats, selectedChat, setSelectedChat, theme, setTheme, createNewChat
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext =()=> useContext(AppContext)