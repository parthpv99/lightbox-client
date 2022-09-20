import React, { useState, useContext, useEffect } from "react";
import chroma from "chroma-js";
import SelectM from "react-select";
import {
  Grid,
  withStyles,
  makeStyles,
  TextField,
  fade,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { generalSkillSet, branchList, kBaseUrl } from "../../constants";
import useForm from "../../hooks/useForm";
import validate from "../../validate/validateStartProject";
import { ThemeContext } from "../../Context/ThemeContext";
import clsx from "clsx";
import { MoonLoader } from "react-spinners";
import { useProjects } from "../../Context/ProjectsProvider";
import { useToast } from "../../Context/ToastProvider";
import { useMyProjects } from "../../Context/MyProjectsProvider";
import { useMyPosts } from "../../Context/MyPostsProvider";
import { useChats } from "../../Context/ChatsProvider";

const useStyles = makeStyles((theme) => ({
  textFieldInputLabel: {
    color: theme.palette.primary.main,
    zIndex: 0,
  },
  textFieldInput: {
    color: "black",
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
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.text.secondary,
      cursor: "pointer",
    },
  },
  textFieldInputDark: {
    color: theme.palette.secondary.main,
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
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.text.secondary,
      cursor: "pointer",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  textField: {
    marginTop: 15,
    [theme.breakpoints.down("md")]: {
      marginBottom: 10,
    },
  },
  skillSelect: {
    marginTop: 2,
  },
  FormHelper: {
    color: "red",
    fontSize: 15,
  },
  expand: {
    height: 0,
    transition: theme.transitions.create("height", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    height: 70,
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
    "& .MuiOutlinedInput-multiline": {
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

const DarkMultilineTextField = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-multiline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },
}))(TextField);

const PrimaryRadio = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    "&$checked": {
      color: theme.palette.primary.main,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const StartProjectForm = ({ handleWarningDiscard, edit, projectdata }) => {
  const classes = useStyles();
  const [teamMembersError, setTeamMembersError] = useState();
  const [technologyError, setTechnologyError] = useState();
  const [requirementError, setRequirementError] = useState();
  const [backdrop, setBackdrop] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [technologies, setTechnologies] = useState(
    edit ? [...projectdata.project_domain] : []
  );
  const [requirements, setRequirements] = useState(
    edit ? [...projectdata.project_requirement] : []
  );
  const { defaultTheme } = useContext(ThemeContext);
  const [value, setValue] = useState(
    edit && projectdata.project_members.length > 0 ? "yes" : "no"
  );
  var myConnections = [];
  const [connections, setConnections] = useState([]);
  const [loading, setloading] = useState(edit);
  const [members, setMembers] = useState([]);
  const { projects, setProjects } = useProjects();
  const { myprojects, setMyProjects } = useMyProjects();
  const { setToast, setMessage, setMessageType } = useToast();
  const { myposts, setMyPosts } = useMyPosts();
  const { chats, setChats } = useChats();

  var defaultprojectrequirements = [];
  edit &&
    projectdata.project_requirement.map((requirement) =>
      defaultprojectrequirements.push({
        label: requirement,
        value: requirement,
      })
    );

  var defaulttechnologies = [];
  edit &&
    projectdata.project_domain.map((domain) =>
      defaulttechnologies.push({ label: domain, value: domain })
    );

  useEffect(() => {
    fetch(kBaseUrl + "myconnections", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setConnections(data);
      })
      // .then(() => setloading(false))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    edit &&
      fetch(kBaseUrl + "project_members?pid=" + projectdata._id, {
        credentials: "include",
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setMembers(data);
        })
        .then(() => setloading(false))
        .catch((e) => console.log(e));
  }, []);

  var defaultConnections = [];
  var tms = [];
  edit &&
    members &&
    members.map((member) => {
      defaultConnections.push({
        label: member.fname + " " + member.lname + " (" + member.email + ") ",
        value: member._id,
      });
      tms.push(member._id);
    });

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  connections &&
    connections.map((connection) =>
      myConnections.push({
        label:
          connection.fname +
          " " +
          connection.lname +
          " (" +
          connection.email +
          ") ",
        value: connection.uid,
        uid: connection.uid,
      })
    );

  var unique = [...defaultConnections, ...myConnections].filter(onlyUnique);

  const data = {
    title: edit ? projectdata.project_title : "",
    description: edit ? projectdata.project_description : "",
    requirementDescription: edit ? projectdata.requirement_description : "",
  };

  const errorData = {};

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate,
    data,
    errorData
  );

  function submit() {
    !requirementError && !teamMembersError && !technologyError && setBackdrop(true);
    !requirementError && !teamMembersError && !technologyError && fetch(kBaseUrl + "update_project", {
      credentials: "include",
      // mode: "no-cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        _id: edit && projectdata._id,
        project_title: values.title,
        project_domain: technologies,
        project_requirement: requirements,
        project_description: values.description,
        requirement_description: values.requirementDescription,
        project_members: value === 'yes' ? (teamMembers.length !== 0 ? teamMembers : tms) : [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let prj = projects.filter((prjc) => prjc._id === data._id);
        const eprj = projects.filter((prjc) => prjc._id !== data._id);
        prj = data;
        setProjects([prj, ...eprj]);
        let mprj = myprojects && myprojects.filter((prjc) => prjc._id === data._id);
        const emprj = myprojects && myprojects.filter((prjc) => prjc._id !== data._id);
        mprj = data;
        setMyProjects([mprj, ...emprj]);
        let mpst = myposts && myposts.filter((pst) => pst._id === data._id);
        const empst = myposts && myposts.filter((pst) => pst._id !== data._id);
        mpst = data;
        setMyPosts([mpst, ...empst]);
        let cts = { ...chats };
        cts[data._id] = [];
        setChats(cts);
        setTeamMembers([]);
        setTechnologies([]);
        setRequirements([]);
        values.description = values.requirementDescription = values.title = "";
        setToast(true);
        setMessage(
          edit ? "Project Edited Successfully" : "Project Created Successfully"
        );
        setMessageType("success");
        setBackdrop(false);
        handleWarningDiscard();
      })
      .catch((e) => {
        console.log(e);
        setBackdrop(false);
        setToast(true);
        setMessage("Something Went Wrong! Please try again");
        setMessageType("error");
      });
  }

  const multiselectHandle = (selected) => {
    var value = [];
    if (selected) {
      selected.map((select) => {
        value.push(select.value);
      });
      setTeamMembersError(false);
    } else {
      setTeamMembersError(true);
    }
    setTeamMembers(value);
  };

  const technologySelectHandle = (selected) => {
    var value = [];
    if (selected) {
      selected.map((select) => {
        value.push(select.value);
      });
      setTechnologyError(false);
    } else {
      setTechnologyError(true);
    }
    setTechnologies(value);
  };

  const requirementSelectHandle = (selected) => {
    var value = [];
    if (selected) {
      selected.map((select) => {
        value.push(select.value);
      });
      setRequirementError(false);
    } else {
      setRequirementError(true);
    }
    setRequirements(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    value === "yes" &&
      teamMembers.length === 0 &&
      members.length === 0 &&
      setTeamMembersError(true);
    technologies.length === 0 && setTechnologyError(true);
    requirements.length === 0 && setRequirementError(true);
    handleSubmit(e);
  };

  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      id="start-project"
      onSubmit={submitHandler}
      style={{ width: "90%", margin: "auto" }}
      noValidate
    >
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DarkTextField
        name="title"
        fullWidth
        autoFocus
        label="Project Title"
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
        required
      />
      {errors.title && <Typography color="error">{errors.title}</Typography>}
      <DarkMultilineTextField
        name="description"
        fullWidth
        label="Project Description"
        variant="outlined"
        value={values.description}
        multiline
        rows={5}
        rowsMax={5}
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
        required
      />
      {errors.description && (
        <Typography color="error">{errors.description}</Typography>
      )}
      <Typography
        color="primary"
        style={{ marginRight: 10, marginTop: 15 }}
        variant="body2"
      >
        Technology:
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
        name="technologies"
        options={generalSkillSet}
        defaultValue={defaulttechnologies}
        classNamePrefix="select technology"
        className={classes.skillSelect}
        styles={defaultTheme === "dark" ? darkSkillStyles : skillStyles}
        onChange={technologySelectHandle}
      />
      {technologyError && (
        <Typography color="error">
          Atleast one Technology is required
        </Typography>
      )}
      <FormControl component="fieldset" style={{ marginTop: 15 }}>
        <RadioGroup
          row
          aria-label="team"
          name="team"
          value={value}
          style={{ alignItems: "center" }}
          onChange={handleRadioChange}
        >
          <Typography
            color="primary"
            style={{ marginRight: 15 }}
            variant="body2"
          >
            Existing Team:
          </Typography>
          <FormControlLabel
            value="yes"
            control={<PrimaryRadio />}
            label="Yes"
          />
          <FormControlLabel value="no" control={<PrimaryRadio />} label="No" />
        </RadioGroup>
      </FormControl>

      <div
        className={clsx(classes.expand, {
          [classes.expandOpen]: value === "yes",
        })}
      >
        {value === "yes" && (
          <>
            <Typography
              color="primary"
              style={{ marginRight: 10, marginTop: 15 }}
              variant="body2"
            >
              Team Members:
            </Typography>
            {loading ? (
              <Grid container direction="row" justify="center">
                <MoonLoader
                  size={30}
                  color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
                  loading={loading}
                />
              </Grid>
            ) : (
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
                name="connections"
                options={edit ? unique : myConnections}
                defaultValue={
                  value === "yes" && members.length > 0 && defaultConnections
                }
                classNamePrefix="select team members"
                className={classes.skillSelect}
                styles={defaultTheme === "dark" ? darkSkillStyles : skillStyles}
                onChange={multiselectHandle}
              />
            )}
            {teamMembersError && (
              <Typography color="error">
                Atleast one Member is required
              </Typography>
            )}
          </>
        )}
      </div>
      <Typography
        color="primary"
        style={{ marginRight: 10, marginTop: 15 }}
        variant="body2"
      >
        Required Skills:
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
        defaultValue={defaultprojectrequirements}
        classNamePrefix="select"
        className={classes.skillSelect}
        styles={defaultTheme === "dark" ? darkSkillStyles : skillStyles}
        onChange={requirementSelectHandle}
      />
      {requirementError && (
        <Typography color="error">
          Atleast one Technology Requirement is required
        </Typography>
      )}
      <DarkTextField
        name="requirementDescription"
        fullWidth
        label="Requirement Description"
        variant="outlined"
        value={values.requirementDescription}
        multiline
        rows={5}
        rowsMax={5}
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
        required
      />
      {errors.requirementDescription && (
        <Typography color="error">{errors.requirementDescription}</Typography>
      )}
    </form>
  );
};

export default StartProjectForm;
