import {
  Card,
  IconButton,
  Typography,
  Grid,
  Divider,
  makeStyles,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";

import { UserContext } from "../../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "15px 35px",
  },
  cardheading: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      padding: 3,
      fontSize: "1.2rem",
    },
  },
  skill: {
    color: theme.palette.primary.main,
    variant: "body1",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
}));

function SkillsCard({ self, data }) {
  const classes = useStyles();
  const { userProfile } = useContext(UserContext);
  self && (data = userProfile);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.cardheading}>Skills</Typography>
            </Grid>
            {self && (
              <>
                <Grid item>
                  <IconButton color="primary" onClick={handleClickOpen}>
                    <EditIcon />
                  </IconButton>
                </Grid>
                <EditProfileDialog
                  handleClickOpen={handleClickOpen}
                  open={open}
                />
              </>
            )}
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <Grid
            container
            alignItems="center"
            justify="flex-start"
            style={{ margin: "5px 10px" }}
          >
            {data.skillset.map((skill, index) => (
              <Grid key={index} item md={4} xs={6}>
                <Typography className={classes.skill}>{skill}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default SkillsCard;
