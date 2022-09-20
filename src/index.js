import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserContextProvider from "./Context/UserContextProvider";
import ThemeContextProvider from "./Context/ThemeContextProvider";
import { SocketProvider } from "./Context/SocketProvider";
import { ConnectionProvider } from "./Context/ConnectionProvider";
import { NotificationProvider } from "./Context/NotificationProvider";
import { ProjectRequestProvider } from "./Context/ProjectRequestProvider";
import { ProjectsProvider } from "./Context/ProjectsProvider";
import { PostsProvider } from "./Context/PostsProvider";
import { ToastProvider } from "./Context/ToastProvider";
import { MyProjectsProvider } from "./Context/MyProjectsProvider";
import { ChatsProvider } from "./Context/ChatsProvider";
import { MyPostsProvider } from "./Context/MyPostsProvider";

ReactDOM.render(
  <SocketProvider>
    <PostsProvider>
      <MyPostsProvider>
        <ToastProvider>
          <ProjectsProvider>
            <NotificationProvider>
              <ProjectRequestProvider>
                <ConnectionProvider>
                  <ThemeContextProvider>
                    <UserContextProvider>
                      <MyProjectsProvider>
                        <ChatsProvider>
                          <App />{" "}
                        </ChatsProvider>
                      </MyProjectsProvider>
                    </UserContextProvider>
                  </ThemeContextProvider>
                </ConnectionProvider>
              </ProjectRequestProvider>
            </NotificationProvider>
          </ProjectsProvider>
        </ToastProvider>
      </MyPostsProvider>
    </PostsProvider>
  </SocketProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
