import { Card, Grid, makeStyles, Typography, Divider } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "15px 35px",
  },
  cardheading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: 8,
  },
  count: {
    fontSize: "3rem",
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 10,
    color: theme.palette.primary.main,
  },
  itemheading: {
    fonstSize: "1.5rem",
    fontWeight: 600,
  },
}));

function DashboardCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.cardheading}>Dashboard</Typography>
          <Divider />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography className={classes.count}>05</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.itemheading}>
                  Total Posts
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography className={classes.count}>03</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.itemheading}>
                  Total Blogs
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography className={classes.count}>45</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.itemheading}>
                  Total connections
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography className={classes.count}>03</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.itemheading}>
                  Total Projects
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default DashboardCard;
