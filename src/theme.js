import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#006BA6", contrastText: "#F7F9FB" },
    secondary: { main: "#F7F9FB", contrastText: "#006BA6" },
    background: { default: "#F7F9FB" },
  },
});

export default theme;
