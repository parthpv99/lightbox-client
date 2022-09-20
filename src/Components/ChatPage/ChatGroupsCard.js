import {
  Card,
  CardHeader,
  fade,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { MoonLoader } from "react-spinners";
import { useMyProjects } from "../../Context/MyProjectsProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import GroupCard from "./GroupCard";

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
    // position: "fixed",
  },
  scroll: {
    height: "480px",
    maxHeight: "480px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.6rem",
    },
    "&::-webkit-scrollbar-track:hover": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      background: "rgba(180,180,180,0.2)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      // backgroundColor: "rgba(0,0,0,.1)",
      // outline: "1px solid slategrey",
      // background: "#B4B4B4",
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      // background: "#A3A3A3",
      background: fade(theme.palette.primary.main, 0.8),
      cursor: "pointer",
    },
  },
}));

function ChatGroupsCard({ setId, setTitle, activeId }) {
  const classes = useStyles();
  const { myprojects } = useMyProjects();
  const { defaultTheme } = useContext(ThemeContext);
  console.log(myprojects);
  return (
    <Card className={classes.card}>
      <CardHeader
        styles={{ marginTop: "0px" }}
        className={classes.title}
        title="All Groups"
      />
      <div className={classes.scroll}>
        {myprojects ? (myprojects.length !== 0 ? (
          myprojects.map((project) => (
            <div key={project._id}>
              <GroupCard data={project} setId={setId} setTitle={setTitle} activeId={activeId} />
            </div>
          ))
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ textAlign: "center", fontSize: 25 }}
          >
            You have not created or joined any project.
          </Typography>
        )) : <Grid container direction="row" justify="center">
          <MoonLoader
            size={30}
            color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
            loading={true}
          />
        </Grid>}
        {/* <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard /> */}
      </div>
    </Card>
  );
}

export default ChatGroupsCard;
