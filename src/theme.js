import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let lighttheme = createMuiTheme({
  palette: {
    primary: {
      main: "#006BA6",
      light: "#006BA6",
      contrastText: "#F7F9FB",
      dark: "#F7F9FB",
    },
    secondary: {
      main: "#F7F9FB",
      light: "#F7F9FB",
      contrastText: "#006BA6",
      dark: "#006BA6",
    },
    background: { default: "#F7F9FB" },
  },
});

lighttheme = responsiveFontSizes(lighttheme);

export default lighttheme;
