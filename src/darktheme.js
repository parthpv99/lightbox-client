import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let darktheme = createMuiTheme({
  palette: {
    primary: {
      //   main: "#F7F9FB",
      main: "#0496FF",
      contrastText: "#fafafa",
    },
    secondary: {
      main: "#B6B6B6",
      contrastText: "#000",
      //   contrastText: "#F7F9FB",
    },
    background: { default: "#18191A", paper: "#242526" },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
});

// theme = responsiveFontSizes(theme);

export default darktheme;
