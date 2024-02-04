// src/components/Editor.js
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js';


const DraftEditor = ({ onSave }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const savedContent = localStorage.getItem('draftEditorContent');
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem('draftEditorContent', JSON.stringify(rawContentState));
    onSave();
  };

  const handleEditorChange = (newEditorState) => {
    const selection = newEditorState.getSelection();
    const currentContent = newEditorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const text = currentBlock.getText();

    let nextEditorState = newEditorState;

    if (text.startsWith('# ') && selection.getStartOffset() === 2) {
      nextEditorState = RichUtils.toggleBlockType(newEditorState, 'header-one');
    } else if (text.startsWith('* ') && selection.getStartOffset() === 2) {
      nextEditorState = RichUtils.toggleInlineStyle(newEditorState, 'BOLD');
      } else if (text.startsWith('** ') && selection.getStartOffset() === 3) {
        nextEditorState = RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE_RED');
    } else if (text.startsWith('*** ') && selection.getStartOffset() === 4) {
      nextEditorState = RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE');
    }  else if (text === '') {
      nextEditorState = EditorState.setInlineStyleOverride(newEditorState, null);
    }

    setEditorState(nextEditorState);
  };

  const customStyleMap = {
    UNDERLINE_RED: {
      borderBottom: '2px solid red',
    },
  }

  return (
    <div className='editor-container'>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        customStyleMap={customStyleMap}
      />
      <button className='save-button' onClick={handleSave}>Save</button>
    </div>
  );
};

export default DraftEditor;
