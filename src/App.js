import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import theme from "./theme";
import LandingPage from "./Components/LandingPage/LandingPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import Dashboard from "./Components/HomePage/Dashboard";
import { getCookies } from "./utility";
import RegisterPage from "./Components/RegisterPage/RegisterPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // console.log("didmouunt");
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
    return isLoggedIn ? <Dashboard /> : <Redirect to="/login" />;
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/home" render={() => toHome()} />
          <Route exact path="/login" render={() => checkLogin()} />
          <Route exact path="/register" render={() => checkRegister()} />
          <Route path="/">{isAuthenticated}</Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
