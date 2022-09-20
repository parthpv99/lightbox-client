import { Button, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import light from "../../assets/pagenotfound.png";
import dark from "../../assets/pagenotfounddark.png";
import { ThemeContext } from "../../Context/ThemeContext";

function PageNotFoundPage() {
  const history = useHistory();
  const { defaultTheme } = useContext(ThemeContext);

  const handleGotoHome = (e) => {
    e.preventDefault();
    history.push("/home");
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <img src={defaultTheme == "dark" ? dark : light} />
      </Grid>
      <Grid item>
        <Typography variant="h3">Page Not Found</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "5%" }}
          onClick={handleGotoHome}
        >
          Go to Home Page
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageNotFoundPage;
