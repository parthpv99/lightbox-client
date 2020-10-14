import {
  Avatar,
  Card,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import user from "../../assets/user.png";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  acceptbtn: {
    color: "#fff",
    background: "#01c15b",
    "&:hover": {
      background: "#009926",
    },
  },
  rejectbtn: {
    color: "#fff",
    background: "#bf011e",
    "&:hover": {
      background: "#9b0017",
    },
  },
  avatar: {
    width: 60,
    height: 60,
    border: "2px solid black",
    backgroundColor: "transparent",
  },
  card: {
    background: theme.palette.secondary.main,
    boxShadow: theme.shadows[1],
    padding: 8,
    borderRadius: 5,
  },
}));

const InviteCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={3}>
          <Avatar
            src={user}
            alt="N"
            aria-label="Name"
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="flex-start"
          >
            <Typography variant="h6">{"Nisarg"}</Typography>
            <Typography variant="body2" style={{ fontSize: "0.8rem" }}>
              {"Full-stack Developer"}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "0.8rem" }}>
              {"IT Semester 7"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            spacing={1}
          >
            <Grid item>
              <IconButton
                size="small"
                variant="outlined"
                className={classes.acceptbtn}
              >
                <CheckIcon></CheckIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                variant="outlined"
                className={classes.rejectbtn}
              >
                <CloseIcon></CloseIcon>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InviteCard;
