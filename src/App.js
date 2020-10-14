import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import theme from "./theme";
import navbartheme from "./navbartheme";
import LandingPage from "./Components/LandingPage/LandingPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
import { getCookies } from "./utility";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import Navbar from "./Components/Navbar/Navbar";
import ConnectionPage from "./Components/ConnectionPage/ConnectionPage";
import ForumPage from "./Components/ForumPage/ForumPage";
import ChatPage from "./Components/ChatPage/ChatPage";
import ViewProfilePage from "./Components/ViewProfile/ViewProfilePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const at = "access-token";
    const token = getCookies(at);
    if (token != null) {
      setIsLoggedIn(true);
    }
  }, []);

  const setLogin = () => {
    setIsLoggedIn(true);
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

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn && (
          <ThemeProvider theme={navbartheme}>
            <Navbar />
          </ThemeProvider>
        )}
        <Switch>
          <Route exact path="/home" render={() => toHome()} />
          <Route exact path="/connections" render={() => toConnections()} />
          <Route exact path="/chats" render={() => toChats()} />
          <Route exact path="/forums" render={() => toForums()} />
          <Route exact path="/login" render={() => checkLogin()} />
          <Route exact path="/register" render={() => checkRegister()} />
          <Route exact path="/viewprofile" render={() => toViewProfilePage()} />
          <Route path="/">{isAuthenticated}</Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
