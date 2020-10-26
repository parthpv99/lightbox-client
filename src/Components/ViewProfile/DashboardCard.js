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
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      padding: 3,
      fontSize: "1.2rem",
    },
  },
  count: {
    fontSize: "3rem",
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 10,
    color: theme.palette.primary.main,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
  },
  itemheading: {
    fonstSize: "1.5rem",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
  divider: {
    backgroundColor: "#5F5F5F",
  },
}));

function DashboardCard({ data }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.cardheading}>Dashboard</Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item md={3} xs={6}>
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
          <Grid item md={3} xs={6}>
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
          <Grid item md={3} xs={6}>
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
                  Total Connections
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} xs={6}>
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
