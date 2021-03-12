import React from "react";

// Material-ui
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Material-ui Styles
import { withStyles } from "@material-ui/core/styles";

// Components
import ImageUploadButton from "../ImageUploadButton";

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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h6">{children}</Typography>
        </Grid>
        <Grid item>
          <ImageUploadButton />
        </Grid>
        <Grid item>
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const CustomDialog = (props) => {
  return (
    <div>
      <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={props.open} fullWidth={true} maxWidth="lg">
        <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
