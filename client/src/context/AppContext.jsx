import {  createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyPdfChats, dummyChats } from "../assets/assets";


const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const navigate =useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    
    const fetchUser = async () =>{
        setUser(dummyPdfChats)
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

    useEffect(()=>{
        if(user){
            // Load dummy chats first
            setChats(dummyChats);
            // Then create and select a new chat
            const newChat = {
                _id: Date.now().toString(),
                name: 'New Chat',
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            setChats(prevChats => [newChat, ...prevChats]);
            setSelectedChat(newChat);
        }else{
            setChats([])
            setSelectedChat(null)
        }
    },[user])

    

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