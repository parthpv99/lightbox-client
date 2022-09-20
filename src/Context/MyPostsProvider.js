import React, { useContext, useEffect, useState } from "react";

const MyPostsContext = React.createContext();

export function useMyPosts() {
    return useContext(MyPostsContext);
}

export function MyPostsProvider({ children }) {
    const [myposts, setMyPosts] = useState([]);

    return (
        <MyPostsContext.Provider
            value={{
                myposts,
                setMyPosts,
            }}
        >
            {children}
        </MyPostsContext.Provider>
    );
}
