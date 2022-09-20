import React, { useContext, useEffect, useState } from "react";
import { kBaseUrl } from "../constants";

const PostsContext = React.createContext();

export function usePosts() {
  return useContext(PostsContext);
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch(kBaseUrl + "dashboard?page=1", {
  //     credentials: "include",
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.message !== "Unauthenticated") setPosts(data);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
