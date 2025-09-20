import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AppContext = createContext()


export const AppContextProvider = ({children})=>{
    const navigate = useNavigate()
    const [user, setUserState] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const setUser = (u) => {
        setUserState(u);
        if (u) {
            localStorage.setItem('user', JSON.stringify(u));
        } else {
            localStorage.removeItem('user');
        }
    };
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');



    const fetchUsersChats = async () =>{
        setChats([])
        setSelectedChat(null)
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
            setSelectedChat(null)
        }
    },[user])
    


    const value ={
        navigate, user, setUser, chats, setChats, selectedChat, setSelectedChat, theme, setTheme
    }

    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>     
    )
}

export const useAppcontext = ()=> useContext(AppContext)