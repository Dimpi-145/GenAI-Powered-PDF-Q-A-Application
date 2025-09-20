import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AppContext = createContext()

export const AppContextProvider = ({children})=>{

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedchats, setselectedChats] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const fetchUser = async () =>{
        setUser(null)
    }

    const fetchUsersChats = async () =>{
        setChats([])
        setselectedChats(null)
    }

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme)
    },[theme])

    useEffect(()=>{
        if(user){
            fetchUsersChats()
        }
        else{
            setChats([])
            setselectedChats(null)
        }
    },[user])
    
    useEffect(()=>{
        fetchUser()
    },[])

    const value ={
        navigate, user, setUser, chats, setChats, selectedchats, setselectedChats, theme, setTheme
    }

    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>     
    )
}

export const useAppcontext = ()=> useContext(AppContext)