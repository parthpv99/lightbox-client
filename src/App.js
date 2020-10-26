import React, { useState, useEffect, useMemo, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUserProfile } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem("dark-theme") !== "true"
  );
  const { defaultTheme, setDefaultTheme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.getItem("dark-theme") === "true"
      ? setDefaultTheme("dark")
      : setDefaultTheme("light");

    fetch(kBaseUrl + "authenticate", {
      credentials: "include",
      method: "GET",
    }).then((res) => {
      if (res.status == 200) {
        fetch(kBaseUrl + "fetch_profile", {
          credentials: "include",
          method: "GET",
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => setUserProfile(data))
          .then(() => {
            setLogin();
            setLoading(false);
          });
      } else {
        setLoading(false);
        setLogout();
      }
    });
  }, []);

  const setLogin = () => {
    setIsLoggedIn(true);
  };

  const setLogout = () => {
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

  const toViewProfilePage = () => {
    return isLoggedIn ? <ViewProfilePage /> : <Redirect to="/login" />;
  };

  const toSuggestedConnectionPage = () => {
    return isLoggedIn ? <SuggestedConnectionPage /> : <Redirect to="/login" />;
  };

  const toPendingInvitesPage = () => {
    return isLoggedIn ? <PendingInvitesPage /> : <Redirect to="/login" />;
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
              <Route exact path="/home" render={() => toHome()} />
              <Route exact path="/connections" render={() => toConnections()} />
              <Route exact path="/chats" render={() => toChats()} />
              <Route exact path="/forums" render={() => toForums()} />
              <Route exact path="/services" component={OurServices} />
              <Route exact path="/careers" component={Careers} />
              <Route exact path="/developers" component={Developers} />
              <Route exact path="/terms" component={Terms} />
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
              <Route
                exact
                path="/allinvites"
                render={() => toPendingInvitesPage()}
              />
              <Route exact path="/login" render={() => checkLogin()} />
              <Route exact path="/register" render={() => checkRegister()} />
              <Route
                exact
                path="/forgotpassword"
                render={() => checkForgotPassword()}
              />
              <Route path="/">{isAuthenticated}</Route>
            </Switch>
          </>
        )}
      </ThemeProvider>
    </Router>
  );
}

export default App;
