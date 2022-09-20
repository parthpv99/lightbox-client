import { fade, Grid, makeStyles, Tooltip, useMediaQuery } from "@material-ui/core";
import { Chat, Group, Home, PostAdd, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tab: {
    cursor: "pointer",
    padding: "16px 8%",
    "&:hover": {
      background: fade(theme.palette.secondary.main, 0.3),
      borderRadius: 5,
    },
    "&:active": {
      background: fade(theme.palette.secondary.main, 0.3),
      borderRadius: 5,
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px 8%",
      // padding: "10px 10%",
    },
  },
  activetab: {
    cursor: "pointer",
    padding: "16px 8%",
    borderBottom:
      localStorage.getItem("dark-theme") === "true"
        ? `4px solid ${theme.palette.primary.main}`
        : `4px solid ${theme.palette.secondary.main}`,
    [theme.breakpoints.down("sm")]: {
      // padding: "3px 8%",
      padding: "3px 10%",
    },
    // "&:hover": {
    //   // background: "lightgrey",
    //   borderRadius: 5,
    //   borderBottom: "none",
    // },
  },
  activeicon: {
    fontSize: 28,
    color:
      localStorage.getItem("dark-theme") === "true"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 28,
    color:
      localStorage.getItem("dark-theme") === "true"
        ? fade(theme.palette.text.secondary, 0.4)
        : fade(theme.palette.secondary.main, 0.6),
  },
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    // history.listen((location, action) => {
    // let pathName = location.pathname;
    let pathName = window.location.pathname;
    let index = 0;
    switch (pathName) {
      case "/home":
        index = 0;
        break;
      case "/connections":
        index = 1;
        break;
      case "/projects":
        index = 2;
        break;
      case "/chats":
        index = 3;
        break;
      default:
        index = -1;
    }

    setValue(index);
    // });
  });

  // history.listen((location, action) => {
  //   let pathName = location.pathname;
  //   console.log(pathName);

  //   if (action === "PUSH") return;
  //   let index = 0;

  //   switch (pathName) {
  //     case "/home":
  //       index = 0;
  //       break;
  //     case "/connections":
  //       index = 1;
  //       break;
  //     // case "/chats":
  //     //   index = 2;
  //     //   break;
  //     // case "/forums":
  //     //   index = 3;
  //     //   break;
  //     default:
  //       index = 0;
  //   }

  //   setValue(index);
  // });

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);

    switch (newValue) {
      case 1:
        history.push("/connections");
        break;
      case 2:
        history.push("/projects");
        break;
      case 3:
        history.push("/chats");
        break;
      default:
        history.push("/home");
    }
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        wrap="wrap"
      >
        <Tooltip title="Home">
          <Grid
            item
            className={value === 0 ? classes.activetab : classes.tab}
            onClick={(e) => handleChange(e, 0)}
          >
            <Home className={value === 0 ? classes.activeicon : classes.icon} />
          </Grid>
        </Tooltip>
        <Tooltip title="Connections">
          <Grid
            item
            className={value === 1 ? classes.activetab : classes.tab}
            onClick={(e) => handleChange(e, 1)}
          >
            <Group className={value === 1 ? classes.activeicon : classes.icon} />
          </Grid>
        </Tooltip>
        <Tooltip title="Projects">
          <Grid
            item
            className={value === 2 ? classes.activetab : classes.tab}
            onClick={(e) => handleChange(e, 2)}
          >
            <PostAdd
              className={value === 2 ? classes.activeicon : classes.icon}
            />
          </Grid>
        </Tooltip>
        <Tooltip title="Chat">
          <Grid
            item
            className={value === 3 ? classes.activetab : classes.tab}
            onClick={(e) => handleChange(e, 3)}
          >
            <Chat className={value === 3 ? classes.activeicon : classes.icon} />
          </Grid>
        </Tooltip>
        {/* {!matches && (
          <Grid
            item
            className={value === 3 ? classes.activetab : classes.tab}
            onClick={(e) => handleChange(e, 3)}
          >
            <Search
              className={value === 3 ? classes.activeicon : classes.icon}
            />
          </Grid>
        )} */}
      </Grid>
    </div>
  );
}

// import React from "react";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import HomeIcon from "@material-ui/icons/Home";
// import ForumIcon from "@material-ui/icons/Forum";
// import GroupAddIcon from "@material-ui/icons/GroupAdd";
// import GroupIcon from "@material-ui/icons/Group";
// import { useHistory } from "react-router-dom";
// import { CssBaseline } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   tabs: {
//     backgroundColor: theme.palette.primary.main,
//     boxShadow: theme.shadows[0],
//     flexGrow: 1,
//     maxWidth: 600,
//   },
// }));

// const CustomTab = withStyles((theme) => ({
//   root: {
//     [theme.breakpoints.up("sm")]: {
//       "&.MuiTab-root": {
//         minWidth: 0,
//       },
//     },
//   },
// }))(Tab);

// const NavigationMenu = () => {
//   const [value, setValue] = React.useState(0);
//   const classes = useStyles();
//   const history = useHistory();

//   history.listen((location, action) => {
//     let pathName = location.pathname;
//     if (action === "PUSH") return;
//     let index = 0;
//     switch (pathName) {
//       case "/home":
//         index = 0;
//         break;
//       case "/connections":
//         index = 1;
//         break;
//       // case "/chats":
//       //   index = 2;
//       //   break;
//       // case "/forums":
//       //   index = 3;
//       //   break;
//       default:
//         index = 0;
//     }

//     setValue(index);
//   });

//   const handleChange = (event, newValue) => {
//     event.preventDefault();
//     setValue(newValue);
//     switch (newValue) {
//       case 1:
//         history.push("/connections");
//         break;
//       // case 2:
//       //   history.push("/chats");
//       //   break;
//       // case 3:
//       //   history.push("/forums");
//       //   break;
//       default:
//         history.push("/home");
//     }
//   };

//   // return (
//   // <Paper square className={classes.root}>
//   //   <Tabs
//   //     value={value}
//   //     onChange={handleChange}
//   //     variant="fullWidth"
//   //     indicatorColor="primary"
//   //     textColor="primary"
//   //     aria-label="icon tabs example"
//   //   >
//   //     <Tab icon={<HomeIcon />} aria-label="phone" />
//   //     <Tab icon={<GroupIcon />} aria-label="favorite" />
//   //     <Tab icon={<ForumIcon />} aria-label="person" />
//   //     <Tab icon={<GroupAddIcon />} aria-label="person" />
//   //   </Tabs>
//   // </Paper>
//   // );

//   return (
//     <Paper square className={classes.tabs}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         variant="fullWidth"
//         TabIndicatorProps={{
//           style: {
//             height: "0.25rem",
//           },
//         }}
//         indicatorColor="secondary"
//         textColor="secondary"
//         aria-label="icon tabs example"
//       >
//         <CustomTab icon={<HomeIcon />} aria-label="home" />
//         <CustomTab icon={<GroupAddIcon />} aria-label="connections" />
//         {/* <CustomTab icon={<ForumIcon />} aria-label="chat" />
//         <CustomTab icon={<GroupIcon />} aria-label="forum" /> */}
//       </Tabs>
//     </Paper>
//   );
// };

// export default NavigationMenu;
