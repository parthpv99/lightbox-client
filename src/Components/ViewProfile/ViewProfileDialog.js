import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import UserDetailsCard from "./UserDetailsCard";
import DashboardCard from "./DashboardCard";
import SkillsCard from "./SkillsCard";
import PageHeading from "../PageHeading/PageHeading";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Posts from "../HomePage/Posts";

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  description: {
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: "5%",
  },
  background: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ViewProfileDialog = ({ open, setOpen, uid }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const data = {
    //   CHANGE THIS LATER
    fname: "FirstName",
    lname: "LastName",
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        className={classes.dialog}
        onClose={setOpen}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="inherit" position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={setOpen}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {data.fname + " " + data.lname}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.background}>
          <Box my={matches ? 10 : 15} mx={3}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignContent="center"
            >
              {matches && (
                <Grid item xs={3}>
                  <UserDetailsCard self={true} data={data} />
                </Grid>
              )}
              <Grid item xs={matches ? 6 : 12}>
                <Grid container direction="column" spacing={3}>
                  <Grid item>
                    <DashboardCard self={true} data={data} />
                  </Grid>
                  <Grid item>
                    <SkillsCard self={true} data={data} />
                  </Grid>
                  <Grid item>
                    <PageHeading
                      title="Activities"
                      countTitle="Total Activities"
                      count="10"
                      icon={
                        <PostAddIcon
                          style={{ fontSize: "300%", color: "#5F5F5F" }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Posts />
                  </Grid>
                </Grid>
              </Grid>
              {matches && (
                <Grid item xs={3}>
                  <QuickAccessCard />
                </Grid>
              )}
            </Grid>
          </Box>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewProfileDialog;
