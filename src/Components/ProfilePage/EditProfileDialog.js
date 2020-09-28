import React from "react";
import {
  Button,
  Dialog,
  makeStyles,
  Typography,
  withStyles,
  IconButton,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import EditProfileForm from "./EditProfileForm";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  action: {
    // flexGrow: 1,
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const EditProfileDialog = ({ open, handleClickOpen }) => {
  const classes = useStyles();
  const [openWarning, setOpenWarning] = React.useState(false);

  const handleWarningClickOpen = () => {
    false ? setOpenWarning(true) : handleClickOpen();
  };

  const handleWarningClose = () => {
    setOpenWarning(false);
  };

  const handleWarningDiscard = () => {
    setOpenWarning(false);
    handleClickOpen();
  };

  const WarningDialog = (
    <Dialog
      open={openWarning}
      onClose={handleWarningClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle style={{ color: "black" }} id="alert-dialog-title">
        {"Are you sure you want to discard the changes?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleWarningClose} color="primary">
          Keep
        </Button>
        <Button onClick={handleWarningDiscard} color="primary" autoFocus>
          Discard
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Dialog
      disableBackdropClick
      maxWidth="md"
      fullWidth
      open={open}
      onClose={handleWarningClickOpen}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleWarningClickOpen}
        style={{ color: "black", textAlign: "center" }}
      >
        Edit Profile
      </DialogTitle>
      <DialogContent>
        {WarningDialog}
        <EditProfileForm />
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button
          autoFocus
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
