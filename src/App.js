import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import LandingPage from "./Components/LandingPage/LandingPage";
import LoginPage from "./Components/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
