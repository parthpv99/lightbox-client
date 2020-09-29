import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GroupIcon from "@material-ui/icons/Group";

const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[0],
  },
}));

const NavigationMenu = ({ history }) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    switch (newValue) {
      case 1:
        history.push("/connections");
        break;
      case 2:
        history.push("/chats");
        break;
      case 3:
        history.push("/forums");
        break;
      default:
        history.push("/home");
    }
  };

  return (
    <Paper square className={classes.tabs}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            height: "0.25rem",
          },
        }}
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon tabs example"
      >
        <Tab icon={<HomeIcon />} aria-label="home" />
        <Tab icon={<GroupAddIcon />} aria-label="connection" />
        <Tab icon={<ForumIcon />} aria-label="chat" />
        <Tab icon={<GroupIcon />} aria-label="forum" />
      </Tabs>
    </Paper>
  );
};

export default NavigationMenu;
