import React, { useState } from "react";
import {
  Grid,
  Badge,
  Avatar,
  withStyles,
  makeStyles,
  TextField,
  // Divider,
  Select,
  MenuItem,
  InputBase,
  fade,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import user from "../../assets/user.png";

const StyledBadge = withStyles((theme) => ({
  badge: {
    width: 30,
    height: 30,
    cursor: "pointer",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 120,
    height: 120,
    border: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
    // cursor: "pointer",
  },
  textFieldInputLabel: {
    color: theme.palette.primary.main,
  },
  textFieldInput: {
    color: "black",
  },
  textField: {
    // width: "125%",
    // margin: 10,
    [theme.breakpoints.down("md")]: {
      marginBottom: 5,
    },
  },
  menu: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
}));

const EditProfileForm = () => {
  const classes = useStyles();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [title, setTitle] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState(null);

  const submitHandler = () => {
    console.log("submitted");
  };

  return (
    <form onSubmit={submitHandler} style={{ width: "90%", margin: "auto" }}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <StyledBadge
            overlap="circle"
            badgeContent={<EditIcon fontSize="small" />}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              src={user}
              alt="N"
              aria-label="Name"
              className={classes.avatar}
            />
          </StyledBadge>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item md={5}>
            <TextField
              id="fname"
              fullWidth
              label="First Name"
              variant="outlined"
              value={fname}
              InputLabelProps={{
                className: classes.textFieldInputLabel,
              }}
              inputProps={{
                className: classes.textFieldInput,
              }}
              className={classes.textField}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              id="lname"
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lname}
              InputLabelProps={{
                className: classes.textFieldInputLabel,
              }}
              inputProps={{
                className: classes.textFieldInput,
              }}
              className={classes.textField}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Grid item xs container>
          <TextField
            id="title"
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            InputLabelProps={{
              className: classes.textFieldInputLabel,
            }}
            inputProps={{
              className: classes.textFieldInput,
            }}
            className={classes.textField}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item md={5}>
            <Select
              id="semester"
              value={semester}
              InputLabelProps={{
                className: classes.textFieldInputLabel,
              }}
              inputProps={{
                className: classes.textFieldInput,
              }}
              onChange={(e) => setSemester(e.target.value)}
              input={<BootstrapInput />}
            >
              <MenuItem className={classes.menu} value="">
                Select Semester
              </MenuItem>
              <MenuItem className={classes.menu} value={1}>
                1
              </MenuItem>
              <MenuItem className={classes.menu} value={2}>
                2
              </MenuItem>
              <MenuItem className={classes.menu} value={3}>
                3
              </MenuItem>
              <MenuItem className={classes.menu} value={4}>
                4
              </MenuItem>
              <MenuItem className={classes.menu} value={5}>
                5
              </MenuItem>
              <MenuItem className={classes.menu} value={6}>
                6
              </MenuItem>
              <MenuItem className={classes.menu} value={7}>
                7
              </MenuItem>
              <MenuItem className={classes.menu} value={8}>
                8
              </MenuItem>
            </Select>
          </Grid>
          <Grid item md={5}>
            <Select
              id="branch"
              value={branch}
              InputLabelProps={{
                className: classes.textFieldInputLabel,
              }}
              inputProps={{
                className: classes.textFieldInput,
              }}
              onChange={(e) => setBranch(e.target.value)}
              input={<BootstrapInput />}
            >
              <MenuItem className={classes.menu} value="">
                Select Branch
              </MenuItem>
              <MenuItem className={classes.menu} value="CE">
                Computer
              </MenuItem>
              <MenuItem className={classes.menu} value="IT">
                Information Technology
              </MenuItem>
              <MenuItem className={classes.menu} value="EC">
                Electronics Comm.
              </MenuItem>
              <MenuItem className={classes.menu} value="EE">
                Electrical
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid item xs container>
          <TextField
            id="college"
            fullWidth
            label="College"
            value="Vishwakarma Government Engingeering College"
            variant="outlined"
            // value={title}
            // InputLabelProps={{
            //   className: classes.textFieldInputLabel,
            // }}
            // inputProps={{
            //   className: classes.textFieldInput,
            // }}
            className={classes.textField}
            // onChange={(e) => setTitle(e.target.value)}
            // required
            disabled
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditProfileForm;
