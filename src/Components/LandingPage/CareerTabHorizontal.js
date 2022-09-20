import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, Grid } from "@material-ui/core";
import { ThemeContext } from "../../Context/ThemeContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  darkLink: {
    background: theme.palette.primary.main,
    padding: "8px 12px",
    borderRadius: 5,
    color: "white",
    textDecoration: "none",
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
    },
  },
  link: {
    color: "white",
    background: theme.palette.primary.main,
    padding: "8px 12px",
    borderRadius: 5,
    textDecoration: "none",
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
    },
  },
}));

export default function CareerTabHorizontal() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { defaultTheme } = React.useContext(ThemeContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          variant="scrollable"
          scrollButtons="on"
        >
          {/* <Tab
            value="one"
            label="New Arrivals in the Longest Text of Nonfiction"
            wrapped
            {...a11yProps("one")}
          />
          <Tab value="two" label="Item Two" {...a11yProps("two")} />
          <Tab value="three" label="Item Three" {...a11yProps("three")} /> */}

          <Tab label="Full Stack Developer" {...a11yProps(0)} />
          <Tab label="Front End Developer" {...a11yProps(1)} />
          <Tab label="UI / UX Designer" {...a11yProps(2)} />
          <Tab label="Back End Developer" {...a11yProps(3)} />
          <Tab label="DevOps Engineer" {...a11yProps(4)} />
          <Tab label="Internship Opportunities" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              Full Stack Developer
            </Typography>
          </Grid>
          <Grid item>
            <a
              href="https://forms.gle/6kvUGF4SUC62Qgv49"
              target="_blank"
              className={
                defaultTheme === "dark" ? classes.darkLink : classes.link
              }
            >
              Apply Now
            </a>
          </Grid>
        </Grid>
        <Typography variant="h6" color="primary" style={{ marginTop: 15 }}>
          Job Requirements
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            <li>Keen to Learn New Technologies</li>
            <li>Knowledge of Functional and Object-Oriented Programming</li>
            <li>Strong Expertise in Design patterns, Data structures, and Algorithms</li>
            <li>Familiarity with Javascript frameworks such as AngularJS, VueJS, ReactJS</li>
            <li>Knowledge of Data modeling and Database performance using NoSQL/SQL</li>
            <li>Ability to translate designs and wireframes into Clean and Responsible design</li>
            <li>Build Responsive and Mobile First Design</li>
            <li>Good understanding of asynchronous request handling, MVC Architecture</li>
            <li>Knowledge of Code versioning tools such as Git, Github, Bitbucket</li>
            <li>Strong Analytical and Creative problem-solving skills</li>
            <li>Excellent Communication and Interpersonal skills focusing on Teamwork</li>
          </ul>
        </Typography>
        <Typography variant="h6" color="primary">
          Job Responsibilities
        </Typography>
        <ul>
          <li>Meeting with the development team to discuss User interface ideas and applications</li>
          <li>Architect, Build and Maintain reusable code with best coding practices</li>
          <li>Implementing pixel perfect and intuitive UIs that match design requirements</li>
          <li>Developing, Maintaining, Integrating, and Enhancing Back-end REST APIs</li>
          <li>Creating Scalable and distributed Databases and Servers</li>
          <li>Work with the DevOps team to ensure continuous deployment of our applications</li>
          <li>Load testing and Optimization</li>
          <li>Optimization of the application for maximum speed and scalability</li>
          <li>Optimizing components for maximum performance across a vast array of web-enabled devices and browsers</li>
          <li>Troubleshooting and Debugging application code</li>
          <li>Work with the DevOps team to ensure continuous deployment of our applications</li>
          <li>Exploring Cloud computing platforms like AWS or GCP as well as using Docker and Kubernetes</li>
          <li>Ensuring responsiveness of the applications</li>
          <li>Maintaining Code Quality and Integrity</li>
          <li>Discover, evaluate, and implement new technologies to maximize development efficiency</li>
          <li>Interact and support members of the Cross-functional implementation team</li>
          <li>Provide technical assistance, and seek advice from, other team members</li>
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              Front End Developer
            </Typography>
          </Grid>
          <Grid item>
            <a
              href="https://forms.gle/6kvUGF4SUC62Qgv49"
              target="_blank"
              className={
                defaultTheme === "dark" ? classes.darkLink : classes.link
              }
            >
              Apply Now
            </a>
          </Grid>
        </Grid>
        <Typography variant="h6" color="primary" style={{ marginTop: 15 }}>
          Job Requirements
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            <li>Keen to Learn New Technologies</li>
            <li>Knowledge of Functional and Object-Oriented Programming</li>
            <li>In-depth knowledge of HTML, CSS, and JavaScript</li>
            <li>Knowledge of Design patterns, Data structures, and Algorithms</li>
            <li>Familiarity with Javascript frameworks such as AngularJS, VueJS, ReactJS</li>
            <li>Ability to translate designs and wireframes into Clean and Responsible design</li>
            <li>Build Responsive and Mobile First Design </li>
            <li>Knowledge of Code versioning tools such as Git, Github, Bitbucket</li>
            <li>Strong Analytical and Creative problem-solving skills</li>
            <li>Excellent Communication and Interpersonal skills focusing on Teamwork</li>
          </ul>
        </Typography>
        <Typography variant="h6" color="primary">
          Job Responsibilities
        </Typography>
        <ul>
          <li>Architect, Build and Maintain reusable production-ready code with best coding practices</li>
          <li>Implementing pixel perfect and intuitive UIs that match design requirements</li>
          <li>Integrating Back-end REST APIs</li>
          <li>Load testing and Optimization</li>
          <li>Meet with the development team to discuss User interface ideas and applications</li>
          <li>Work with the DevOps team to ensure continuous deployment of our applications</li>
          <li>Troubleshooting and Debugging application code</li>
          <li>Ensuring Responsiveness of the applications</li>
          <li>Maintaining Code Quality and Integrity</li>
          <li>Optimizing components for maximum performance across a vast array of web-enabled devices and browsers</li>
          <li>Interact and support members of the Cross-functional implementation team</li>
          <li>Provide technical assistance, and seek advice from, other team members</li>
        </ul>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              UI/UX Designer
            </Typography>
          </Grid>
          <Grid item>
            <a
              href="https://forms.gle/6kvUGF4SUC62Qgv49"
              target="_blank"
              className={
                defaultTheme === "dark" ? classes.darkLink : classes.link
              }
            >
              Apply Now
            </a>
          </Grid>
        </Grid>
        <Typography variant="h6" color="primary" style={{ marginTop: 15 }}>
          Job Requirements
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            <li>Keen to Learn New Technologies</li>
            <li>Knowledge of Functional and Object-Oriented Programming</li>
            <li>Hands-on experience working with HTML, CSS, JavaScript</li>
            <li>Passion for Solving Big and Complicated design problems</li>
            <li>Ability to translate designs and wireframes into Clean and Responsible design </li>
            <li>Experience with a variety of wireframing, prototyping, and visual design tools</li>
            <li>Ability to clearly express justifications for your designs, and know-how to effectively give design feedback to others</li>
            <li>Familiarity with Javascript frameworks such as AngularJS, VueJS, ReactJS</li>
            <li>Detail-oriented person with Excellent Communication and Interpersonal skills focusing on Teamwork</li>
          </ul>
        </Typography>
        <Typography variant="h6" color="primary">
          Job Responsibilities
        </Typography>
        <ul>
          <li>Brainstorm and create wireframes, mockups, and similar artifacts that communicate design ideas to others</li>
          <li>Bring simplicity to complex design and user scenarios</li>
          <li>Create Quality wireframes, mockups, and Prototypes</li>
          <li>Meeting with the development team to discuss User interface ideas and applications</li>
          <li>Implementing pixel perfect and intuitive UIs that match design requirements</li>
          <li>Ensuring responsiveness of the applications</li>
          <li>Stay current with UI trends and innovations</li>
          <li>Interact and support members of the Cross-functional implementation team</li>
        </ul>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              Back End Developer
            </Typography>
          </Grid>
          <Grid item>
            <a
              href="https://forms.gle/6kvUGF4SUC62Qgv49"
              target="_blank"
              className={
                defaultTheme === "dark" ? classes.darkLink : classes.link
              }
            >
              Apply Now
            </a>
          </Grid>
        </Grid>
        <Typography variant="h6" color="primary" style={{ marginTop: 15 }}>
          Job Requirements
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            <li>Keen to Learn New Technologies</li>
            <li>Knowledge of Functional and Object-Oriented Programming</li>
            <li>Strong expertise in Data structures, and Algorithms</li>
            <li>Hands-on experience with programming languages like Java, PHP, or Python</li>
            <li>Good understanding of Data modeling and Database performance using NoSQL/SQL</li>
            <li>Ability to translate designs and wireframes into Clean and Responsible design</li>
            <li>Good understanding of asynchronous request handling, MVC Architecture</li>
            <li>Knowledge of code versioning tools (Git or Bitbucket) </li>
            <li>Strong Analytical and Creative problem-solving skills</li>
            <li>Excellent Communication and Interpersonal skills focusing on Teamwork</li>
          </ul>
        </Typography>
        <Typography variant="h6" color="primary">
          Job Responsibilities
        </Typography>
        <ul>
          <li>Creating Scalable and distributed Databases and Servers</li>
          <li>Developing, Maintaining, Integrating, and Enhancing Back-end REST APIs</li>
          <li>Gather and address technical and design requirements</li>
          <li>Building reusable code and libraries for future use</li>
          <li>Optimization of the application for maximum speed and scalability</li>
          <li>Conduct unit/integration/system tests and optimize performance</li>
          <li>Architect, Build and Maintain reusable code with best coding practices</li>
          <li>Exploring Cloud computing platforms like AWS or GCP as well as using Docker and Kubernetes</li>
          <li>Work with the DevOps team to ensure continuous deployment of our applications</li>
          <li>Troubleshooting and Debugging application code</li>
          <li>Maintaining Code Quality and Integrity</li>
          <li>Discover, evaluate, and implement new technologies to maximize development efficiency</li>
          <li>Interact and support members of the Cross-functional implementation team</li>
          <li>Provide technical assistance, and seek advice from, other team members</li>
        </ul>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              DevOps Engineer
            </Typography>
          </Grid>
          <Grid item>
            <a
              href="https://forms.gle/6kvUGF4SUC62Qgv49"
              target="_blank"
              className={
                defaultTheme === "dark" ? classes.darkLink : classes.link
              }
            >
              Apply Now
            </a>
          </Grid>
        </Grid>
        <Typography variant="h6" color="primary" style={{ marginTop: 15 }}>
          Job Requirements
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            <li>Keen to Learn New Technologies</li>
            <li>Knowledge of Functional and Object-Oriented Programming</li>
            <li>Experience in Networking, Git, LINUX scripting, Data structures, and algorithmic efficiency </li>
            <li>Experience deploying applications using NodeJS, Python, Java</li>
            <li>Ability to write intermediate level Database queries</li>
            <li>Any experience in working with AWS, GCP, Azure, Docker, Kubernetes</li>
            <li>Knowledge of code versioning tools (Git or Bitbucket)</li>
            <li>Strong Analytical and Creative problem-solving skills</li>
            <li>Excellent Communication and Interpersonal skills focusing on Teamwork</li>
          </ul>
        </Typography>
        <Typography variant="h6" color="primary">
          Job Responsibilities
        </Typography>
        <ul>
          <li>Ability to measure system performance and recommend modifications as necessary</li>
          <li>Automating software builds or tests or support processes</li>
          <li>Database Data Warehousing and Datastore management</li>
          <li>Designing, developing and managing core infrastructure and pipelines</li>
          <li>Automating test and validation pipelines</li>
          <li>Driving automation and building out CI/CD pipelines</li>
          <li>Developing and Using Back-end REST APIs</li>
          <li>Interact and support members of the Cross-functional implementation team</li>
          <li>Provide technical assistance, and seek advice from, other team members</li>
        </ul>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              Internship Opportunities
            </Typography>
          </Grid>
          <Grid item>
            <a
              href="https://forms.gle/6kvUGF4SUC62Qgv49"
              target="_blank"
              className={
                defaultTheme === "dark" ? classes.darkLink : classes.link
              }
            >
              Apply Now
            </a>
          </Grid>
        </Grid>
        <Typography variant="h6" color="primary" style={{ marginTop: 15 }}>
          Job Requirements
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            <li> Keen to learn New technologies</li>
            <li> Proficiency in at least one programming language</li>
            <li>Knowledge of Functional and Object-Oriented Programming</li>
            <li>
              Good understanding of Data structures, and Algorithms
            </li>
            <li>
              Hands-on experience working with HTML, CSS, JavaScript
            </li>
            <li> Knowledge of Databases (NoSQL/SQL)</li>
            <li>Strong Analytical and Creative problem-solving skills</li>
            <li>Knowledge of code versioning tools (Git or Bitbucket)</li>
            <li>
              A desire to be a part of a values-driven Engineering team
            </li>
          </ul>
        </Typography>
        <Typography variant="h6" color="primary">
          Job Responsibilities
        </Typography>
        <ul>
          <li>
            {" "}
            Understanding the basic areas of Front-end web development including designing layouts, writing business logic, etc.
          </li>
          <li>
            {" "}
            Architect, Build and Maintain reusable code with best coding practices
          </li>
          <li>
            {" "}
            Ensuring responsiveness of the applications
          </li>
          <li>
            Understanding APIs and connecting front-end with back-end
          </li>
          <li> Developing and Integrating Back-end REST APIs</li>
          <li>
            {" "}
            Create and maintain software documentation
          </li>
          <li>
            {" "}
            Troubleshooting and Debugging application code
          </li>
          <li>
            {" "}
            Prioritize tasks and handle numerous assignments simultaneously
          </li>
          <li>
            {" "}
            Maintaining Code Quality and Integrity
          </li>
          <li>
            {" "}
            Discover, evaluate, and implement new technologies to maximize development efficiency
          </li>
        </ul>
      </TabPanel>
    </div>
  );
}
