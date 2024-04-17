/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/02/2024 12:13:22
*/
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/css/css';
import { useDispatch } from 'react-redux';
import { ADD_TO_STORAGE } from '../../redux/actions/actionTypes';


interface CssEditorProps{
  templateId: string
}
const CssEditor: React.FC<CssEditorProps> = ({templateId}) => {
  const [code, setCode] = useState<string>('/* Votre code CSS ici */');
  const dispatch = useDispatch()
  const handleChange = (editor: any, data: any, value: string) => {
    console.log({editor,data,value});

    dispatch({
      type: ADD_TO_STORAGE,
      key: templateId,
      unique: true,
      payload: value
    })
    setCode(value);
  };

  return (
    <div>
      <h5>Éditeur CSS</h5>
      <CodeMirror
        value={code}
        options={{
          mode: 'css',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={handleChange}
      />
    </div>
  );
};

export default CssEditor;
