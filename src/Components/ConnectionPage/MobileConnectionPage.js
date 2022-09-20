import { Grid, GridList, GridListTile, makeStyles, Typography, Avatar, Card, fade } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import user from "../../assets/user.png";
import { useConnections } from '../../Context/ConnectionProvider';

const useStyles = makeStyles((theme) => ({
    gridList: {
        flexWrap: "nowrap",
        overflowX: "auto",
        padding: 5,
        marginTop: 5,
        marginBottom: 8,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5
    },
    avatar: {
        marginLeft: 5,
        border: `2px solid ${theme.palette.primary.main}`,
        backgroundColor: "transparent",
        width: 55,
        height: 55,
    },
    card: {
        padding: 5,
        boxShadow: theme.shadows[1],
        width: 150,
        background: fade(theme.palette.secondary.main, 0.15),
        border: `1px solid ${theme.palette.primary.main}`,
    }
}));

function MobileConnectionPage() {
    const classes = useStyles();
    const { invites, connections, suggestions } = useConnections();
    const history = useHistory();

    return (
        <Grid container direction="column" justify="flex-start">
            <Grid item>
                <Typography variant="h6" color="textSecondary">My Connections</Typography>
            </Grid>
            <Grid item container direction="row" className={classes.gridList} spacing={1}>
                {connections && connections.length !== 0 ? connections.map((connection) => (
                    <Grid item key={connection.uid}>
                        <Card variant="outlined" className={classes.card} onClick={() => { history.push("/connections/" + connection.uid); }}>
                            <Grid container direction="column" alignItems="center">
                                <Grid item>
                                    <Avatar
                                        src={connection.thumbnail_pic === "" ? user : connection.thumbnail_pic}
                                        alt="N"
                                        aria-label="Name"
                                        className={classes.avatar}
                                    />
                                </Grid>
                                <Grid item container direction="column" alignItems="center">
                                    <Grid item xs={12}>
                                        <Typography variant="body1" style={{ fontSize: 12, fontWeight: "bold", width: "90%" }} noWrap={true}>
                                            {connection.fname + " " + connection.lname}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            noWrap={true}
                                            style={{ fontSize: 12, width: "90%" }}
                                        >
                                            {connection.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" style={{ fontSize: 11, width: "90%" }} noWrap={true}>
                                            {connection.branch}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" style={{ fontSize: 11 }}>
                                            {"Semester " + connection.semester}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                )) : <Typography
                    color="textSecondary"
                    variant="h6"
                    style={{ textAlign: "center" }}
                >
                    No Connections! Create a new connection.
              </Typography>}
            </Grid>
            <Grid item>
                <Typography variant="h6" color="textSecondary">Pending Invites</Typography>
            </Grid>
            <Grid item container direction="row" className={classes.gridList} spacing={1}>
                {invites && invites.length !== 0 ? invites.map((invite) => (
                    <Grid item key={invite.uid}>
                        <Card variant="outlined" className={classes.card} onClick={() => { history.push("/connections/" + invite.uid); }}>
                            <Grid container direction="column" alignItems="center">
                                <Grid item>
                                    <Avatar
                                        src={invite.thumbnail_pic === "" ? user : invite.thumbnail_pic}
                                        alt="N"
                                        aria-label="Name"
                                        className={classes.avatar}
                                    />
                                </Grid>
                                <Grid item container direction="column" alignItems="center">
                                    <Grid item xs={12}>
                                        <Typography variant="body1" style={{ fontSize: 12, fontWeight: "bold", width: "90%" }} noWrap={true}>
                                            {invite.fname + " " + invite.lname}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            noWrap={true}
                                            style={{ fontSize: 12, width: "90%" }}
                                        >
                                            {invite.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" style={{ fontSize: 11, width: "90%" }} noWrap={true}>
                                            {invite.branch}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" style={{ fontSize: 11 }}>
                                            {"Semester " + invite.semester}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                )) : <Typography
                    color="textSecondary"
                    variant="h6"
                    style={{ textAlign: "center" }}
                >
                    No pending invites!
              </Typography>}
            </Grid>
            <Grid item>
                <Typography variant="h6" color="textSecondary">Suggested Connections</Typography>
            </Grid>
            <Grid item container direction="row" className={classes.gridList} spacing={1}>
                {suggestions && suggestions.length !== 0 ? suggestions.map((suggestion) => (
                    <Grid item key={suggestion.uid}>
                        <Card variant="outlined" className={classes.card} onClick={() => { history.push("/connections/" + suggestion.uid); }}>
                            <Grid container direction="column" alignItems="center">
                                <Grid item xs={12}>
                                    <Avatar
                                        src={suggestion.thumbnail_pic === "" ? user : suggestion.thumbnail_pic}
                                        alt="N"
                                        aria-label="Name"
                                        className={classes.avatar}
                                    />
                                </Grid>
                                <Grid item container direction="column" alignItems="center">
                                    <Grid item xs={12}>
                                        <Typography variant="body1" style={{ fontSize: 12, fontWeight: "bold", width: "90%" }} noWrap={true}>
                                            {suggestion.fname + " " + suggestion.lname}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            noWrap={true}
                                            style={{ fontSize: 12, width: "90%" }}
                                        >
                                            {suggestion.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" style={{ fontSize: 11, width: "90%" }} noWrap={true}>
                                            {suggestion.branch}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" style={{ fontSize: 11 }}>
                                            {"Semester " + suggestion.semester}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                )) : <Typography
                    color="textSecondary"
                    variant="h6"
                    style={{ textAlign: "center" }}
                >
                    No Suggestions!
              </Typography>}
            </Grid>
        </Grid>
    );
}

export default MobileConnectionPage;
