// TextEditorField.tsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorFieldProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
}

const TextEditorField: React.FC<TextEditorFieldProps> = ({ label, value, onChange }) => {
  
  const editorStyle = {
    // minHeight: '150px', // Ajoutez la hauteur souhaitée en pixels
  };
  
  return (
    <>
    <div className="form-group ">
      <label>{label}</label>
      <ReactQuill
        style={editorStyle}
        theme="snow"
        value={value}
        onChange={(content, delta, source, editor) => {
          onChange(editor.getHTML());
        }}
      />
    </div>
    {/* <div className="mb-10 invisible"> s</div>
    <div className="mb-10 invisible"> s</div> */}
    </>
  );
};

export default TextEditorField;
