import React, { useState, useEffect, useMemo, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import lighttheme from "./theme";
import darktheme from "./darktheme";
import navbartheme from "./navbartheme";
import LandingPage from "./Components/LandingPage/LandingPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./Components/LoginPage/ForgotPasswordPage";
import Navbar from "./Components/Navbar/Navbar";
import ConnectionPage from "./Components/ConnectionPage/ConnectionPage";
import ForumPage from "./Components/ForumPage/ForumPage";
import ChatPage from "./Components/ChatPage/ChatPage";
import ViewProfilePage from "./Components/ViewProfile/ViewProfilePage";
import { kBaseUrl } from "./constants";
import { UserContext } from "./Context/UserContext";
import Spinner from "./Spinner";
import { ThemeContext } from "./Context/ThemeContext";
import darknavbartheme from "./darknavbartheme";
import SuggestedConnectionPage from "./Components/SuggestedConnectionPage/SuggestedConnectionPage";
import PendingInvitesPage from "./Components/PendingInvitesPage/PendingInvitesPage";
import OurServices from "./Components/LandingPage/OurServices";
import Careers from "./Components/LandingPage/Careers";
import Developers from "./Components/LandingPage/Developers";
import Terms from "./Components/LandingPage/Terms";
import ProjectsPage from "./Components/ProjectsPage/ProjectsPage";
import { useSocket } from "./Context/SocketProvider";
import { ConnectionProvider } from "./Context/ConnectionProvider";
import ViewUserProfile from "./Components/ViewProfile/ViewUserProfile";
import CompleteProfile from "./Components/RegisterPage/CompleteProfile";
import ViewPost from "./Components/HomePage/ViewPost";
import MyProjects from "./Components/MyProjects/MyProjects";
import SearchResultPage from "./Components/SearchPage/SearchResultPage";
import ViewProject from "./Components/ProjectsPage/ViewProject";
import { SnackbarProvider } from "notistack";
import PageNotFoundPage from "./Components/PageNotFoundPage/PageNotFoundPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUserProfile } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem("dark-theme") !== "true"
  );
  const { defaultTheme, setDefaultTheme } = useContext(ThemeContext);
  const history = useHistory();
  // const socket = useSocket();
  // const onUnload = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  // };

  // useEffect(() => {
  //   document.addEventListener('contextmenu', (e) => {
  //     e.preventDefault();
  //   });
  //   // document.onkeydown = function (e) {

  //   //   // disable F12 key
  //   //   if (e.keyCode == 123) {
  //   //     return false;
  //   //   }

  //   //   // disable I key
  //   //   if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
  //   //     return false;
  //   //   }

  //   //   // disable J key
  //   //   if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
  //   //     return false;
  //   //   }

  //   //   // disable U key
  //   //   if (e.ctrlKey && e.keyCode == 85) {
  //   //     return false;
  //   //   }
  //   // };

  //   return () => {
  //     document.removeEventListener('contextmenu', (e) => {
  //       e.preventDefault();
  //     });
  //   };
  // }, []);

  useEffect(() => {
    localStorage.getItem("dark-theme") === "true"
      ? setDefaultTheme("dark")
      : setDefaultTheme("light");

    fetch(kBaseUrl + "authenticate", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then(async (res) => {
        if (res.status == 200) {
          const data = await res.json();
          if (!data.isProfileCompleted) {
            history.replace("/completeprofile");
          }
          else {
            fetch(kBaseUrl + "fetch_profile", {
              credentials: "include",
              method: "GET",
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
              },
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                setUserProfile(data);
                // socket.emit("auth", { uid: data.uid });
                // socket.emit("auth", { uid: data.uid });
              })
              .then(() => {
                setLogin();
                setLoading(false);
              });
          }

        } else {
          setLoading(false);
          setLogout();
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const setLogin = () => {
    setIsLoggedIn(true);
  };

  const setLogout = () => {
    localStorage.removeItem("access-token");
    setIsLoggedIn(false);
  };

  const isAuthenticated = () => {
    return isLoggedIn ? <Redirect to="/home" /> : <LandingPage />;
  };

  const checkLogin = () => {
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <LoginPage setLogin={setLogin} />
    );
  };

  const checkRegister = () => {
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <RegisterPage setLogin={setLogin} />
    );
  };

  const checkCompleteProfile = () => {
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <CompleteProfile setLogin={setLogin} />
    );
  };

  const checkForgotPassword = () => {
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <ForgotPasswordPage setLogin={setLogin} />
    );
  };

  const toHome = () => {
    return isLoggedIn ? <HomePage /> : <Redirect to="/login" />;
  };

  const toConnections = () => {
    return isLoggedIn ? <ConnectionPage /> : <Redirect to="/login" />;
  };

  const toChats = () => {
    return isLoggedIn ? <ChatPage /> : <Redirect to="/login" />;
  };

  const toForums = () => {
    return isLoggedIn ? <ForumPage /> : <Redirect to="/login" />;
  };

  const toProjects = () => {
    return isLoggedIn ? <ProjectsPage /> : <Redirect to="/login" />;
  };

  const toViewProfilePage = () => {
    return isLoggedIn ? <ViewProfilePage /> : <Redirect to="/login" />;
  };

  const toSuggestedConnectionPage = () => {
    return isLoggedIn ? <SuggestedConnectionPage /> : <Redirect to="/login" />;
  };

  const toPendingInvitesPage = () => {
    return isLoggedIn ? <PendingInvitesPage /> : <Redirect to="/login" />;
  };

  const toViewUserProfile = () => {
    return isLoggedIn ? <ViewUserProfile /> : <Redirect to="/login" />;
  };

  const toViewPost = () => {
    return isLoggedIn ? <ViewPost /> : <Redirect to="/login" />;
  };

  const toMyProjects = () => {
    return isLoggedIn ? <MyProjects /> : <Redirect to="/login" />;
  };

  const toSearchResult = () => {
    return isLoggedIn ? <SearchResultPage /> : <Redirect to="/login" />;
  };

  const toViewProject = () => {
    return isLoggedIn ? <ViewProject /> : <Redirect to="/login" />;
  };

  // const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  // // Icons imported from `@material-ui/icons`

  const appliedTheme = theme ? lighttheme : darktheme;
  const appliedNavbarTheme = theme ? navbartheme : darknavbartheme;

  const toggleTheme = () => {
    defaultTheme === "dark"
      ? setDefaultTheme("light")
      : setDefaultTheme("dark");
    localStorage.setItem("dark-theme", theme);
    setTheme(!theme);
  };

  return (
    <Router>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        {loading ? (
          <Spinner size={100} loading={loading} />
        ) : (
          <>
            {isLoggedIn && (
              <ThemeProvider theme={appliedNavbarTheme}>
                <Navbar setLogout={setLogout} toggleTheme={toggleTheme} />
              </ThemeProvider>
            )}
            <Switch>
              <Route exact path="/login" render={() => checkLogin()} />
              <Route exact path="/register" render={() => checkRegister()} />
              <Route
                exact
                path="/completeprofile"
                render={() => checkCompleteProfile()}
              />
              <Route exact path="/home" render={() => toHome()} />
              <Route exact path="/connections" render={() => toConnections()} />
              <Route
                exact
                path="/connections/:id"
                render={() => toViewUserProfile()}
              />
              <Route exact path="/posts/:id" render={() => toViewPost()} />
              <Route exact path="/search" render={() => toSearchResult()} />
              <Route exact path="/chats" render={() => toChats()} />
              <Route exact path="/forums" render={() => toForums()} />
              <Route exact path="/services" component={OurServices} />
              <Route exact path="/careers" component={Careers} />
              <Route exact path="/developers" component={Developers} />
              <Route exact path="/policy" component={Terms} />
              <Route
                exact
                path="/viewprofile"
                render={() => toViewProfilePage()}
              />
              <Route
                exact
                path="/suggestedconnections"
                render={() => toSuggestedConnectionPage()}
              />
              <Route exact path="/myprojects" render={() => toMyProjects()} />
              <Route exact path="/projects" render={() => toProjects()} />
              <Route
                exact
                path="/projects/:id"
                render={() => toViewProject()}
              />
              <Route
                exact
                path="/allinvites"
                render={() => toPendingInvitesPage()}
              />
              <Route
                exact
                path="/forgotpassword"
                render={() => checkForgotPassword()}
              />
              <Route exact path="/">
                {isAuthenticated}
              </Route>
              <Route component={PageNotFoundPage}></Route>
            </Switch>
          </>
        )}
      </ThemeProvider>
    </Router>
  );
}

export default App;
