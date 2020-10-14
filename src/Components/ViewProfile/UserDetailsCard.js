import {
  Avatar,
  Badge,
  Card,
  Grid,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import user from "../../assets/user.png";
import EditIcon from "@material-ui/icons/Edit";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";

const StyledBadge = withStyles((theme) => ({
  badge: {
    width: 25,
    height: 25,
    cursor: "pointer",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "15px 20px 15px 20px",
    position: "fixed",
    width: "22%",
  },
  avatar: {
    width: 90,
    height: 90,
    border: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
    // cursor: "pointer",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    paddingBottom: 0,
  },
  college: {
    fontSize: "1.1rem",
    fontWeight: 500,
    textAlign: "center",
  },
}));

function UserDetailsCard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <Card className={classes.card}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <StyledBadge
            overlap="circle"
            badgeContent={
              <label onClick={handleClickOpen}>
                <EditIcon fontSize="small" />
              </label>
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              src={user}
              alt="DP"
              aria-label="Name"
              className={classes.avatar}
            />
          </StyledBadge>
        </Grid>
        <Grid item>
          <Typography className={classes.name}>Nisarg Chokshi</Typography>
        </Grid>
        <Grid item>
          <Typography style={{ paddingBottom: 0 }}>
            Front-end Developer
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ paddingBottom: 0 }}>IT Semester 7</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.college}>
            Vishwakarma Government Enginnering College
          </Typography>
        </Grid>
      </Grid>
      <EditProfileDialog handleClickOpen={handleClickOpen} open={open} />
    </Card>
  );
}

export default UserDetailsCard;
