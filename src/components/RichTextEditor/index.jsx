import React from "react";
import { Editor } from "@tinymce/tinymce-react";

// Material-ui
import Snackbar from "@material-ui/core/Snackbar";

// Material-ui Lab
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RichTextEditor = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Editor
        apiKey="ui0x00y6ebx3527n5fgrwgtymf8fp98pc4933pvgz15nlozm"
        initialValue={props.contentToEdit}
        init={{
          height: 500,
          selector: "#editor",
          plugins:
            "print preview paste directionality code visualblocks visualchars fullscreen link codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern help charmap emoticons",
          menubar: "file edit view insert format tools table help",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | link anchor codesample | ltr rtl",
          template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
          template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup: function (editor) {
            editor.on("keydown", function (event) {
              const wordCount = window.tinymce.activeEditor.plugins.wordcount.getCount();

              if (wordCount > props.maxContentLength && event.key !== "Backspace") {
                event.preventDefault();
                handleOpen();
                return false;
              }
            });
          },
        }}
        onInit={props.handleRichTextEditorWordCount}
        onEditorChange={props.handleRichTextEditorChange}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          You have reached the maximum word limit.
        </Alert>
      </Snackbar>
    </>
  );
};

export default RichTextEditor;
