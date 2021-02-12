import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { sendBio } from "../../redux/UserData/userdata.actions";

// Material-ui
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Components
import RichTextEditor from "../RichTextEditor";

// format content
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    // flexWrap: "wrap",
  },
  dividerMargin: {
    margin: theme.spacing(2),
  },
  justifyRight: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    height: "100%",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UserBio = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [content, setContent] = useState(props.bio ? props.bio : "");
  const [open, setOpen] = React.useState(false);
  const [contentLength, setContentLength] = useState(props.bio ? props.bio.length : 0);
  const prevContentRef = useRef();

  useEffect(() => {
    prevContentRef.current = content;
  });
  const prevContent = prevContentRef.current;

  const handleOpen = () => {
    setContentLength(content.length);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRichTextEditorChange = (content) => {
    if (content.length > 2000) {
      setContentLength(content.length);
      setContent(prevContent);
      return;
    }
    setContentLength(content.length);
    setContent(content);
  };

  const handleFormReset = () => {
    setContent(props.bio);
    setOpen(false);
  };

  const handleSendBio = () => {
    dispatch(sendBio(content));
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" align="center">
        Tell Everyone A Little About Yourself And Your Business
      </Typography>
      <Divider className={classes.dividerMargin} />
      {ReactHtmlParser(props.bio)}
      <Divider className={classes.dividerMargin} />
      <div className={classes.justifyRight}>
        <Button type="button" variant="contained" color="primary" onClick={handleOpen}>
          Edit
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <RichTextEditor
              handleRichTextEditorChange={handleRichTextEditorChange}
              contentToEdit={content}
              contentLength={contentLength}
              setContentLength={2000}
            />
            <Divider className={classes.dividerMargin} />
            <Grid item xs={12} container justify="flex-end" spacing={1}>
              <Grid item style={{ color: contentLength > 2000 ? "red" : null }}>
                {contentLength}/2000
              </Grid>
              <Grid className={classes.root} item />
              <Grid item>
                <Button type="button" variant="contained" color="primary" onClick={handleSendBio}>
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button type="button" variant="contained" color="primary" onClick={handleFormReset}>
                  Discard Changes
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserBio;
