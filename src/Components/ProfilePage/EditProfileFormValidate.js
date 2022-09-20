import React, { useState, useContext } from "react";
import chroma from "chroma-js";
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
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { generalSkillSet, branchList, kBaseUrl } from "../../constants";
import useForm from "../../hooks/useForm";
import validate from "../../validate/validateEditProfile";
import { UserContext } from "../../Context/UserContext";
import { ThemeContext } from "../../Context/ThemeContext";
// import user from "../../assets/user.png";
// import { useHistory } from "react-router-dom";
// import { Socket } from "socket.io-client";
import { useSocket } from "../../Context/SocketProvider";

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
  textFieldInputDark: {
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, 0.3),
      color: theme.palette.secondary.main,
    },
  },
  textField: {
    [theme.breakpoints.down("md")]: {
      marginBottom: 10,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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

const darkSkillStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#242526",
    "&:hover": {
      backgroundColor: fade("#B6B6B6", 0),
      color: "#fafafa",
    },
  }),
  input: (styles) => {
    return {
      ...styles,
      color: "#B6B6B6",
    };
  },
  option: (styles) => {
    const color = chroma("#242526");
    return {
      ...styles,
      backgroundColor: color.alpha(1).css(),
      color: "#0496FF",
      ":hover": {
        ...styles[":hover"],
        backgroundColor: color.alpha(0.8).css(),
      },
    };
  },
  multiValue: (styles) => {
    const color = chroma("#B6B6B6");
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
      color: "white",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#B6B6B6",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    // color: "data.color",
    ":hover": {
      backgroundColor: "#0496FF",
      color: "white",
    },
  }),
};

const DarkTextField = withStyles((theme) => ({
  root: {
    "& input:valid + fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor:
        localStorage.getItem("dark-theme") === "true"
          ? theme.palette.secondary.main
          : "grey",
      borderWidth: 1,
    },
    "& .MuiInputBase-root.Mui-disabled + fieldset": {
      borderColor:
        localStorage.getItem("dark-theme") === "true"
          ? theme.palette.secondary.main
          : "grey",
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: theme.palette.primary.main,
    },
  },
}))(TextField);

const EditProfileFormValidate = ({ handleClose }) => {
  const classes = useStyles();
  const [skillError, setSkillError] = useState();
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [skills, setSkills] = useState(
    userProfile ? [...userProfile.skillset] : []
  );
  const [imageChanged, setImageChanged] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [image, setImage] = useState([]);
  const [dp, setDp] = useState(null);
  const [fileData, setFileData] = useState(null);
  const { defaultTheme } = useContext(ThemeContext);
  // const history = useHistory();
  const socket = useSocket();

  const data = {
    fname: userProfile ? userProfile.fname : "",
    lname: userProfile ? userProfile.lname : "",
    title: userProfile ? userProfile.title : "",
    semester: userProfile ? userProfile.semester : "",
    branch: userProfile ? userProfile.branch : "",
  };

  var defaultSkills = [];
  userProfile &&
    userProfile.skillset &&
    userProfile.skillset.map((skill) =>
      defaultSkills.push({ label: skill, value: skill })
    );
  // userProfile.skillset && setSkills(defaultSkills);

  const errorData = {
    fname: "",
    lname: "",
    title: "",
    semester: "",
    branch: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate,
    data,
    errorData
  );

  // fname: `${req.body.fname.trim()}`,
  // lname: `${req.body.lname.trim()}`,
  // branch: `${req.body.branch}`,
  // college: req.body.college.trim(),
  // semester: req.body.semester.trim(),
  // skillset: req.body.skillset,
  // title: req.body.title.trim(),

  // function submitHome(e) {
  //   var profileData = {
  //     ...values,
  //     skillset: skills,
  //     profile_pic: image,
  //     college:
  //       "Vishwakarma Government Engineering College, Chandkheda, Ahmedabad",
  //     dp_changed: imageChanged,
  //   };
  //   console.log(profileData);

  //   fetch(kBaseUrl + "update_profile", {
  //     credentials: "include",
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(profileData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUserProfile(data);
  //       socket.emit("auth", { uid: data.uid });
  //       setLogin();
  //       history.replace("/home");
  //     })
  //     .catch((e) => console.log(e));
  // }

  function submit() {
    setBackdrop(true);
    var profileData = {
      ...values,
      skillset: skills,
      profile_pic: image,
      college:
        "Vishwakarma Government Engineering College, Chandkheda, Ahmedabad",
      dp_changed: imageChanged,
      thumbnail_pic: userProfile ? userProfile.thumbnail_pic : "",
    };
    // console.log(profileData);

    fetch(kBaseUrl + "update_profile", {
      credentials: "include",
      // mode: "no-cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(profileData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data);
        setBackdrop(false);
        handleClose();
      })
      .catch((e) => { setBackdrop(false); console.log(e); });
    setUserProfile({ ...userProfile, profileData });
  }

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const multiselectHandle = (selected) => {
    var value = [];
    if (selected) {
      selected.map((select) => {
        value.push(select.value);
      });
      setSkillError(false);
    } else {
      setSkillError(true);
    }
    setSkills(value);
  };

  const displaySelectedImages = (event) => {
    const file = event.target.files[0];
    setImage(file);
    let flag = false;
    let sizeExceeded = false;
    let url;

    if (file) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        if (file.size >= 8388608) {
          sizeExceeded = true;
        }
        url = URL.createObjectURL(file);
        setImageChanged(true);
      } else {
        flag = true;
      }
      setDp(url);

      const formData = new FormData();
      formData.append("post_images", file);
      setFileData(formData);
    }

    var base64image = [];
    let reader = new FileReader();
    reader.onload = function (e) {
      base64image.push({ data: e.target.result, name: file.name });
    };
    reader.readAsDataURL(file);

    flag && alert("Only Image Files are Supported !");
    sizeExceeded && alert("Please Select image smaller than 8 MB size!");
    !flag && !sizeExceeded ? setImage(base64image) : setImage([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    skills.length === 0 && defaultSkills.length === 0 && setSkillError(true);
    handleSubmit(e);
  };

  return (
    <form
      id="update-profile"
      onSubmit={submitHandler}
      style={{ width: "90%", margin: "auto" }}
      noValidate
    >
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
              // src={dp ? dp : user}
              src={dp ? dp : userProfile.thumbnail_pic}
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
            <DarkTextField
              name="fname"
              fullWidth
              autoFocus
              label="First Name"
              variant="outlined"
              value={values.fname}
              InputLabelProps={{
                className: classes.textFieldInputLabel,
              }}
              inputProps={{
                className:
                  defaultTheme === "dark"
                    ? classes.textFieldInputDark
                    : classes.textFieldInput,
              }}
              className={classes.textField}
              onChange={handleChange}
              // onChange={(e) => setFname(e.target.value)}
              required
            />
            {errors.fname && (
              <Typography color="error">{errors.fname}</Typography>
            )}
          </Grid>
          <Grid item md={5} xs={12}>
            <DarkTextField
              name="lname"
              fullWidth
              label="Last Name"
              variant="outlined"
              value={values.lname}
              onChange={handleChange}
              InputLabelProps={{
                className: classes.textFieldInputLabel,
              }}
              inputProps={{
                className:
                  defaultTheme === "dark"
                    ? classes.textFieldInputDark
                    : classes.textFieldInput,
              }}
              className={classes.textField}
              required
            />
            {errors.lname && (
              <Typography color="error">{errors.lname}</Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs container>
          <DarkTextField
            name="title"
            fullWidth
            label="Title"
            variant="outlined"
            value={values.title}
            InputLabelProps={{
              className: classes.textFieldInputLabel,
            }}
            inputProps={{
              className:
                defaultTheme === "dark"
                  ? classes.textFieldInputDark
                  : classes.textFieldInput,
            }}
            className={classes.textField}
            onChange={handleChange}
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
                name="semester"
                value={values.semester}
                label="Semester"
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldInputLabel,
                }}
                inputProps={{
                  className:
                    defaultTheme === "dark"
                      ? classes.textFieldInputDark
                      : classes.textFieldInput,
                }}
                onChange={handleChange}
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
                name="branch"
                value={values.branch}
                label="Branch"
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldInputLabel,
                }}
                inputProps={{
                  className:
                    defaultTheme === "dark"
                      ? classes.textFieldInputDark
                      : classes.textFieldInput,
                }}
                onChange={handleChange}
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
          <DarkTextField
            id="college"
            fullWidth
            label="College"
            variant="outlined"
            value="Vishwakarma Government Engineering College, Chandkheda, Ahmedabad"
            // InputLabelProps={{
            //   className: classes.textFieldInputLabel,
            // }}
            inputProps={{
              className:
                defaultTheme === "dark"
                  ? classes.textFieldInputDark
                  : classes.textFieldInput,
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
        defaultValue={defaultSkills}
        classNamePrefix="select"
        className={classes.skillSelect}
        styles={defaultTheme === "dark" ? darkSkillStyles : skillStyles}
        onChange={multiselectHandle}
      />
      {skillError && (
        <Typography color="error">Atleast one skill is required</Typography>
      )}
    </form>
  );
};

export default EditProfileFormValidate;
