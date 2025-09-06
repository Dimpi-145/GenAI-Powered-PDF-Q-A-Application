import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AppContext = createContext()

export const AppContextProvider = ({children})=>{

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedchats, setselectedChats] = useState(null);
    const [theme, settheme] = useState(localStorage.getItem('theme') || 'light');

    const fetchUser = async () =>{
        setUser(dummyUserData)
    
    }

    const fetchUsersChats = async () =>{
        setChats(dummyChats)
        setselectedChats(dummyChats[0])
    }

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
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
        navigate, user, setUser, chats, setChats, selectedchats, setselectedChats, theme
    }

    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>     
    )
}

export const useAppcontext = ()=> useContext(AppContext)