import { Button, Card, CardHeader, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "0px 20px 15px 20px",
    position: "fixed",
    width: "22%",
  },
  title: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
  },
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

function TopBlogsCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        styles={{ marginTop: "0px" }}
        className={classes.title}
        title="Top Blogs"
      />
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <a href="/home" className={classes.link}>
            Top 10 ways to enhance your Web Designinig skills
          </a>
        </Grid>
        <Grid item>
          <a href="/home" className={classes.link}>
            Roradmap to React Js
          </a>
        </Grid>
        <Grid item>
          <a href="/home" className={classes.link}>
            JavaScript Overview in 2 Hours
          </a>
        </Grid>
        <Grid item>
          <a href="/home" className={classes.link}>
            Top 10 Machine Learning Algorithms
          </a>
        </Grid>
        <Grid item>
          <Grid container justify="flex-end">
            <Button color="primary">See more...</Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default TopBlogsCard;
