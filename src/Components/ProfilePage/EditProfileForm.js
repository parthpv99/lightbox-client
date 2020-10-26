import React, { useImperativeHandle, useState } from "react";
import chroma from "chroma-js";
// import { v4 } from "uuid";
import SelectM from "react-select";
import {
  Grid,
  Badge,
  Avatar,
  withStyles,
  makeStyles,
  TextField,
  Select,
  MenuItem,
  InputBase,
  fade,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { generalSkillSet, branchList } from "../../constants";
// import Chip from "../Chip";

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
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    borderRadius: 4,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
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
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, 1),
      color: theme.palette.primary.main,
    },
  },
  textField: {
    [theme.breakpoints.down("md")]: {
      marginBottom: 10,
    },
  },
  menu: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
    overflow: "hidden",
  },
  Chip: {
    margin: "2px",
    fontWeight: "-moz-initial",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  skillSelect: {
    marginTop: 2,
  },
  FormHelper: {
    color: "red",
    fontSize: 15,
  },
}));

const skillStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: fade("#F7F9FB", 1),
      color: "#006BA6",
    },
  }),
  option: (styles) => {
    const color = chroma("#006BA6");
    return {
      ...styles,
      // backgroundColor: color.alpha(0.1).css(),
      color: "#006BA6",
      ":hover": {
        ...styles[":hover"],
        backgroundColor: color.alpha(0.3).css(),
      },
    };
  },
  multiValue: (styles) => {
    const color = chroma("#006BA6");
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
      color: "black",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#006BA6",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "data.color",
    ":hover": {
      backgroundColor: "#006BA6",
      color: "white",
    },
  }),
};

const EditProfileForm = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [title, setTitle] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [skillSet, setSkillSet] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    submitHandler() {
      if (!fname) {
        errors.fname = "Enter Firstname";
        setFname("");
      }
      if (!lname) {
        errors.lname = "Enter Lastname";
        setLname("");
      }
      if (!title) {
        errors.title = "Enter Title";
        setTitle("");
      }
      if (!branch) {
        errors.branch = "Select Branch";
        setBranch("");
      }
      if (!semester) {
        errors.semester = "Select Semester";
        setSemester("");
      }
      setErrors(errors);
      // setImage(user);
    },
  }));

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const fetchState = (label, isSelected) => {
    if (!isSelected) {
      skillSet.push(label);
      setSkillSet(skillSet);
    } else {
      setSkillSet(skillSet.filter((skill) => skill !== label));
    }
  };

  const displaySelectedImages = (event) => {
    const file = event.target.files[0];
    let flag = false;
    let sizeExceeded = false;
    let url;

    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg"
    ) {
      if (file.size >= 8388608) {
        sizeExceeded = true;
      }
      url = URL.createObjectURL(file);
    } else {
      flag = true;
    }

    flag && alert("Only Image Files are Supported !");
    sizeExceeded && alert("Please Select image smaller than 8 MB size!");
    !flag && !sizeExceeded ? setImage(url) : setImage(null);
  };

  const fnameHandler = (e) => {
    const firstname = e.target.value;
    !firstname.match(/(?=.[A-Za-z]+)/)
      ? (errors.fname = "Firstname is invalid")
      : (errors.fname = "");
    setErrors(errors);
    setFname(firstname);
  };

  const lnameHandler = (e) => {
    const lastname = e.target.value;
    !lastname.match(/(?=.[A-Za-z]+)/)
      ? (errors.lname = "Lastname is invalid")
      : (errors.lname = "");
    setErrors(errors);
    setLname(lastname);
  };

  const titleHandler = (e) => {
    const ttl = e.target.value;
    !ttl.match(/(?=.[A-Za-z]+)/)
      ? (errors.title = "Title is invalid")
      : (errors.title = "");
    setErrors(errors);
    setTitle(ttl);
  };

  return (
    <form style={{ width: "90%", margin: "auto" }}>
      <input
        accept="image/png,image/gif,image/jpeg,image/jpg"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={displaySelectedImages}
        hidden
      />
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
            badgeContent={
              <label htmlFor="icon-button-file">
                <EditIcon fontSize="small" />
              </label>
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              src={image}
              alt="DP"
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
          <Grid item md={5} xs={12}>
            <TextField
              id="fname"
              fullWidth
              autoFocus
              helperText={!fname && "Enter Name"}
              FormHelperTextProps={{
                className: classes.FormHelper,
              }}
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
              onChange={fnameHandler}
              // onChange={(e) => setFname(e.target.value)}
              required
            />
            {errors.fname && (
              <Typography color="error">{errors.fname}</Typography>
            )}
          </Grid>
          <Grid item md={5} xs={12}>
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
              onChange={lnameHandler}
              required
            />
            {errors.lname && (
              <Typography color="error">{errors.lname}</Typography>
            )}
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
            onChange={titleHandler}
            // onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && (
            <Typography color="error">{errors.title}</Typography>
          )}
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid
            item
            md={5}
            xs={12}
            container
            direction="column"
            justify="flex-start"
          >
            <Grid item>
              <Typography
                color="primary"
                style={{ marginRight: 10 }}
                variant="body2"
              >
                Semester:
              </Typography>
            </Grid>
            <Grid item>
              <Select
                id="semester"
                value={semester}
                label="Semester"
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldInputLabel,
                }}
                inputProps={{
                  className: classes.textFieldInput,
                }}
                onChange={(e) => setSemester(e.target.value)}
                input={<BootstrapInput />}
                // style={{ width: "60%" }}
                required
              >
                <MenuItem className={classes.menu} value="" disabled>
                  Select Semester
                </MenuItem>
                {semesters.map((sem, index) => (
                  <MenuItem className={classes.menu} key={index} value={sem}>
                    {sem}
                  </MenuItem>
                ))}
              </Select>
              {errors.semester && (
                <Typography color="error">{errors.semester}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            container
            direction="column"
            justify="flex-start"
          >
            <Grid item>
              <Typography
                color="primary"
                style={{ marginRight: 10 }}
                variant="body2"
              >
                Department:
              </Typography>
            </Grid>
            <Grid item>
              <Select
                id="branch"
                value={branch}
                label="Branch"
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldInputLabel,
                }}
                inputProps={{
                  className: classes.textFieldInput,
                }}
                onChange={(e) => {
                  setBranch(e.target.value);
                  skillSet.map((skill) => fetchState(skill, true));
                }}
                input={<BootstrapInput />}
                // style={{ width: "60%" }}
              >
                <MenuItem className={classes.menu} value="" disabled>
                  Select Branch
                </MenuItem>
                {branchList.map((branch, index) => (
                  <MenuItem className={classes.menu} key={index} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
              {errors.branch && (
                <Typography color="error">{errors.branch}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs container>
          <TextField
            id="college"
            fullWidth
            label="College"
            variant="outlined"
            value="Vishwakarma Government Engineering College, Chandkheda, Ahmedabad"
            InputLabelProps={{
              className: classes.textFieldInputLabel,
            }}
            inputProps={{
              className: classes.textFieldInput,
            }}
            className={classes.textField}
            input={<BootstrapInput />}
            disabled
          />
        </Grid>
      </Grid>
      <Typography
        color="primary"
        style={{ marginRight: 10, marginTop: 15 }}
        variant="body2"
      >
        Skills:
      </Typography>
      <SelectM
        isMulti
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#006BA6",
            primary25: chroma("#006BA6").alpha(0.3).css(),
          },
        })}
        name="skills"
        options={generalSkillSet}
        classNamePrefix="select"
        className={classes.skillSelect}
        styles={skillStyles}
      />
      {errors.skills && <Typography color="error">{errors.skills}</Typography>}
    </form>
  );
});

export default EditProfileForm;
