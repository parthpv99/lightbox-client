import { createMuiTheme } from "@material-ui/core/styles";

const navbartheme = createMuiTheme({
  palette: {
    primary: { main: "#006BA6", contrastText: "#F7F9FB" },
    secondary: { main: "#F7F9FB", contrastText: "#006BA6" },
    background: { default: "#F7F9FB" },
    text: { primary: "#F7F9FB", secondary: "rgba(247, 249, 251,0.54)" },
  },
});

export default navbartheme;
