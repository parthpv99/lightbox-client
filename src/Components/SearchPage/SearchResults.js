import React, { useState } from "react";
import PageHeading from "../PageHeading/PageHeading";
import SearchIcon from "@material-ui/icons/Search";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import userPhoto from "../../assets/user.png";
import Project from "../ProjectsPage/Project";
import Post from "../HomePage/Post";
import Connection from "../ConnectionPage/Connection";
import MyConnections from "../ConnectionPage/MyConnections";

const useStyle = makeStyles((theme) => ({
  heading: {
    fontSize: 25,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
    padding: "10px 0px",
  },
}));

function SearchResults({ users, posts, projects }) {
  // const [users, setUsers] = useState(data.users);
  // const [posts, setPosts] = useState(data.posts);
  // const [projects, setProjects] = useState(data.projects);
  const classes = useStyle();

  return (
    <Grid container direction="column">
      <Box>
        {users && users.length > 0 && (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                color="textSecondary"
                variant="h6"
                className={classes.heading}
              >
                Users
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                {users.length}
              </Typography>
            </Grid>
          </Grid>
        )}
        {users && users.length > 0 && <MyConnections data={users} search={true} />}
        {/* {users.map((user) => (
          <div key={user._id}>
            <Connection
              data={user}
              photo={user.thumbnail_pic != "" ? user.thumbnail_pic : userPhoto}
              suggested={false}
              invite={true}
            />
          </div>
        ))} */}
        {projects && projects.length > 0 && (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                color="textSecondary"
                variant="h6"
                className={classes.heading}
              >
                Projects
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                {projects.length}
              </Typography>
            </Grid>
          </Grid>
        )}
        {projects && projects.length > 0 &&
          projects.map((project) => (
            <div key={project._id}>
              <Project project={project} />
            </div>
          ))}
        {posts && posts.length > 0 && (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                color="textSecondary"
                variant="h6"
                className={classes.heading}
              >
                Posts
            </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                {posts.length}
              </Typography>
            </Grid>
          </Grid>
        )}
        {posts && posts.length > 0 &&
          posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ))}
      </Box>
    </Grid>
  );
}

export default SearchResults;
