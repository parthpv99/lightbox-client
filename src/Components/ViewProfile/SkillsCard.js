import {
  Card,
  IconButton,
  Typography,
  Grid,
  Divider,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "15px 35px",
  },
  cardheading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: 8,
  },
}));

function SkillsCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography className={classes.cardheading}>Skills</Typography>
            </Grid>
            <Grid item>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <Grid
            container
            alignItems="flex-start"
            style={{ margin: "8px 30px" }}
          >
            <Grid item xs={6}>
              <Typography variant="body1">Algorithm</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">User Interface Design</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">User Experience Design</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Data Mining</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Data Science</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default SkillsCard;
