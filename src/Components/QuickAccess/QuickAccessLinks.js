import { Grid, makeStyles, Card, Typography, Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      marginLeft: "4px",
    },
  },
  titleDark: {
    color: theme.palette.secondary.main,
    fontSize: "1.2rem",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      marginLeft: "4px",
    },
  },
  card: {
    boxShadow: theme.shadows[0],
    cursor: "pointer",
  },
  icon: {
    width: 35,
    height: 35,
    // border: `1.2px solid ${theme.palette.primary.main}`,
  },
}));

function QuickAccessLinks({ icon, title, link }) {
  const classes = useStyles();
  const history = useHistory();
  const { defaultTheme } = useContext(ThemeContext);

  const clickHandler = () => {
    history.push(link);
  };

  return (
    <Card className={classes.card} onClick={clickHandler}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={2}>
          <Avatar src={icon} className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <Typography
            className={
              defaultTheme === "dark" ? classes.titleDark : classes.title
            }
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default QuickAccessLinks;
