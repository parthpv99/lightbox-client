import { createMuiTheme } from "@material-ui/core";

const darknavbartheme = createMuiTheme({
  palette: {
    primary: { main: "#242526", contrastText: "#F7F9FB" },
    secondary: { main: "#F7F9FB", contrastText: "#006BA6" },
    background: { default: "#F7F9FB", paper: "#242526" },
    text: { primary: "#F7F9FB", secondary: "rgba(247, 249, 251,0.54)" },
  },
});

export default darknavbartheme;
