import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GroupIcon from "@material-ui/icons/Group";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[0],
  },

  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
}));

const NavigationMenu = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();

  history.listen((location, action) => {
    let pathName = location.pathname;
    if (action === "PUSH") return;
    let index = 0;
    switch (pathName) {
      case "/home":
        index = 0;
        break;
      case "/connections":
        index = 1;
        break;
      case "/chats":
        index = 2;
        break;
      case "/forums":
        index = 3;
        break;
      default:
        index = 0;
    }

    setValue(index);
  });

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

  // return (
  // <Paper square className={classes.root}>
  //   <Tabs
  //     value={value}
  //     onChange={handleChange}
  //     variant="fullWidth"
  //     indicatorColor="primary"
  //     textColor="primary"
  //     aria-label="icon tabs example"
  //   >
  //     <Tab icon={<HomeIcon />} aria-label="phone" />
  //     <Tab icon={<GroupIcon />} aria-label="favorite" />
  //     <Tab icon={<ForumIcon />} aria-label="person" />
  //     <Tab icon={<GroupAddIcon />} aria-label="person" />
  //   </Tabs>
  // </Paper>
  // );

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
        <Tab style={{ width: "50%" }} icon={<HomeIcon />} aria-label="home" />
        <Tab
          style={{ width: "50%" }}
          icon={<GroupAddIcon />}
          aria-label="connection"
        />
        <Tab style={{ width: "50%" }} icon={<ForumIcon />} aria-label="chat" />
        <Tab style={{ width: "50%" }} icon={<GroupIcon />} aria-label="forum" />
      </Tabs>
    </Paper>
  );
};

export default NavigationMenu;
