import React, { useEffect, useState } from "react";

// wysiwyg
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = (props) => {
  const [editor, setEditor] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (props.contentToEdit) {
      const blocksFromHtml = htmlToDraft(props.contentToEdit);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditor(EditorState.moveFocusToEnd(editorState));
    }
  }, [props.contentToEdit]);

  const onEditorChange = (editorState) => {
    setEditor(editorState, props.handleRichTextEditorChange(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
  };

  return (
    <Editor
      editorState={editor}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorChange}
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
    />
  );
};

export default RichTextEditor;
