import React from "react";
import { makeStyles, Card, Grid } from "@material-ui/core";
import QuickAccessLinks from "./QuickAccessLinks";

import user from "../../assets/user.png";
import forum from "../../assets/group.png";
import connection from "../../assets/connection.png";
import blog from "../../assets/blog.png";
import myblog from "../../assets/myblogs.png";
import projects from "../../assets/projects.png";
import myprojects from "../../assets/myprojects.png";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "15px 20px 15px 20px",
    position: "fixed",
    width: "22%",
    marginLeft: 32.8,
  },
}));

function QuickAccessCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <QuickAccessLinks icon={user} link="/" title="Nisarg Chokshi" />
        </Grid>
        <Grid item xs={12}>
          <QuickAccessLinks
            icon={connection}
            link="/connections"
            title="Connections"
          />
        </Grid>
        <Grid item xs={12}>
          <QuickAccessLinks icon={forum} link="/" title="Forum" />
        </Grid>
        <Grid item xs={12}>
          <QuickAccessLinks icon={blog} link="/" title="Blogs" />
        </Grid>
        <Grid item xs={12}>
          <QuickAccessLinks icon={myblog} link="/" title="My Blogs" />
        </Grid>
        <Grid item xs={12}>
          <QuickAccessLinks icon={projects} title="Projects" />
        </Grid>
        <Grid item xs={12}>
          <QuickAccessLinks icon={myprojects} title="My Projects" />
        </Grid>
      </Grid>
    </Card>
  );
}

export default QuickAccessCard;
