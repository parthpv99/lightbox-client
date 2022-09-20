import React from "react";
import {
  // Avatar,
  Card,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  CardMedia,
} from "@material-ui/core";
// import user from "../../assets/user.png";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PageviewIcon from "@material-ui/icons/Pageview";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 5,
    width: "100%",
    height: 270,
    cursor: "pointer",
    marginBottom: 50,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "&:hover": {
      transform: "scale(1.1,1.1)",
      height: 350,
      transition: theme.transitions.create(["transform", "height"], {
        duration: theme.transitions.duration.standard,
      }),
      boxShadow: theme.shadows[3],
    },
    // backgroundImage:
    //   "url('https://images.unsplash.com/photo-1505929827248-229a1756864d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
    // objectFit: "cover",
  },
  data: {
    padding: "5px 15px 5px 15px",
  },
  avatar: {
    width: 120,
    height: 120,
    border: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
    // cursor: "pointer",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    paddingBottom: 0,
    color: theme.palette.primary.main,
  },
  college: {
    fontSize: "1.1rem",
    fontWeight: 500,
    textAlign: "center",
  },
  text: {
    paddingBottom: 0,
  },
  media: {
    height: 220,
    // "&:hover": {
    //   height: 200,
    //   transform: "scale(1.1,1.1)",
    //   transition: theme.transitions.create(["transform", "height"], {
    //     duration: theme.transitions.duration.shorter,
    //   }),
    // },
  },
}));

function DeveloperCard({
  name,
  role,
  photo,
  linkedin,
  github,
  scholar,
  readmore,
  mentor,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={photo} title={name} />
      <div className={classes.data}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          {/* <Grid item>
            <Avatar
              src="https://images.unsplash.com/photo-1505929827248-229a1756864d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              alt="User Profile"
              aria-label="Name"
              className={classes.avatar}
            />
          </Grid> */}
          <Grid item>
            <Typography className={classes.name}>{name}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{role}</Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="space-evenly"
          >
            <Grid item>
              <IconButton>
                {mentor ? (
                  <PageviewIcon
                    style={{ color: "#0A66C2" }}
                    onClick={() => window.open(readmore, "_blank")}
                  />
                ) : (
                  <LinkedInIcon
                    style={{ color: "#0A66C2" }}
                    onClick={() => window.open(linkedin, "_blank")}
                  />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                {mentor ? (
                  <AssignmentIndIcon
                    style={{
                      color:
                        localStorage.getItem("dark-theme") === "true"
                          ? "white"
                          : "black",
                    }}
                    onClick={() => window.open(scholar, "_blank")}
                  />
                ) : (
                  <GitHubIcon
                    style={{
                      color:
                        localStorage.getItem("dark-theme") === "true"
                          ? "white"
                          : "black",
                    }}
                    onClick={() => window.open(github, "_blank")}
                  />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

export default DeveloperCard;
