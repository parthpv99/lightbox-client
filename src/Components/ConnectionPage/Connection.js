import React from "react";
import {
  Card,
  Grid,
  Typography,
  Avatar,
  makeStyles,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ChatIcon from "@material-ui/icons/Chat";
import user from "../../assets/user.png";

const useStyle = makeStyles((theme) => ({
  btn: {
    color: theme.palette.primary.main,
  },
  // acceptbtn: {
  //   color: "#fff",
  //   background: "#01c15b",
  //   "&:hover": {
  //     background: "#009926",
  //   },
  // },
  avatar: {
    width: 65,
    height: 65,
    marginLeft: 5,
    border: "2px solid black",
    backgroundColor: "transparent",
  },
  card: {
    padding: 8,
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("sm")]: {
      padding: 5,
    },
  },
}));

const Connection = ({ photo, name, role, semester, branch, count }) => {
  const classes = useStyle();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Card variant="outlined" className={classes.card}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={matches && 3}>
          <Avatar
            src={user}
            alt="N"
            aria-label="Name"
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={matches && 8}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="flex-start"
          >
            <Typography variant="h6">{"Nisarg"}</Typography>
            <Typography variant="body2" style={{ fontSize: "1rem" }}>
              {"Full-stack Developer"}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "1rem" }}>
              {"IT Semester 7"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={matches && 1}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            spacing={1}
          >
            <Grid item>
              <IconButton
                color="primary"
                size="small"
                variant="outlined"
                className={classes.btn}
              >
                <ChatIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                size="small"
                variant="outlined"
                className={classes.btn}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Avatar className={classes.avatar} src={photo} title={name} />
      <CardContent>
        <Typography className={classes.name}>{name}</Typography>
        <Typography className={classes.role}>{role}</Typography>
        {/* <Typography className={classes.sem}> Sem {semester} </Typography> 
        <Typography className={classes.branch}>{branch}</Typography>
        <Typography className={classes.count}>
          {count} mutual friends{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          alignItem="center"
          justify="space-evenly"
        >
          <Grid>
            {" "}
            <Button color="primary" variant="outlined" className={classes.btn}>
              <ChatOutlinedIcon />
            </Button>{" "}
          </Grid>
          <Grid>
            {" "}
            <Button color="primary" variant="outlined" className={classes.btn}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      </CardActions> */}
    </Card>
  );
};

export default Connection;
