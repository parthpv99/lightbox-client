import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { useMyProjects } from '../../Context/MyProjectsProvider';
import ChatBox from './ChatBox';
import { useSocket } from '../../Context/SocketProvider';
import { Badge, Grid } from '@material-ui/core';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

function MobileChat({ chats, setChats }) {
  const { myprojects } = useMyProjects();
  const [expanded, setExpanded] = React.useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const socket = useSocket();
  const [count, setCount] = React.useState({});
  var room;

  socket.on("recieveMessage", (data) => {
    let dt = { ...count };
    dt[`${data.room}`] = dt[`${data.room}`] === undefined ? 1 : dt[`${data.room}`] + 1;
    setCount(dt);
    room = data.room;
  });

  const handleGetMessages = (id) => {
    let dt = { ...count };
    dt[`${id}`] = undefined;
    setCount(dt);
  };

  return (
    <div>
      {myprojects && myprojects.length !== 0 ? (
        myprojects.map((project) => (
          <div key={project._id}>
            <Accordion square expanded={expanded === `${project._id}`} onChange={handleChange(`${project._id}`)} onClick={() => handleGetMessages(project._id)}>
              <AccordionSummary aria-controls={`${project._id}-content`} id={`${project._id}-header`}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Grid
                    item
                    xs={10}
                    container
                    justify="center"
                    direction="column"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="h6"
                      noWrap={true}
                      style={{ fontSize: "1 rem", width: "95%" }}
                    >
                      {project.project_title}
                    </Typography>
                    <Typography
                      variant="body2"
                      noWrap={true}
                      style={{ fontSize: "0.8rem", width: "95%" }}
                    >
                      {project && project.project_members.length === 0
                        ? `1 member`
                        : `${project.project_members.length + 1} members`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Badge badgeContent={count[project._id]} max={9} color="primary" />
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <ChatBox id={project._id} title={project.project_title} chats={chats} setChats={setChats} />
              </AccordionDetails>
            </Accordion>
          </div>
        ))
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ textAlign: "center", fontSize: 25 }}
        >
          You have not created or joined any project.
        </Typography>
      )}
    </div>
  );
}

export default MobileChat;
