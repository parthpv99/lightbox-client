import React, { useContext, useEffect, useState } from "react";
import { kBaseUrl } from "../constants";

const ChatContext = React.createContext();

export function useChats() {
    return useContext(ChatContext);
}


export function ChatsProvider({ children }) {
    const [chats, setChats] = useState({});
    const [count, setCount] = useState({});

    useEffect(() => {
        fetch(kBaseUrl + "get_all_chat_messages", {
            credentials: "include",
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
            }
        }).then(res => res.json()).
            then(data => { setChats(data); })
            .catch(e => console.log(e));
    }, []);

    return (
        <ChatContext.Provider
            value={{
                chats, setChats, count, setCount
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}
