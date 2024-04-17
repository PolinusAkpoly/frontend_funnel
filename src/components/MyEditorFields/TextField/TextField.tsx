/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 20/02/2024 09:20:39
*/
import React, { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextField.css'; // Assurez-vous que le nom du fichier CSS est correct
import { BlockTemplate } from '../../../models/BlockTemplate';
import Toolbar from '../../Toolbar/Toolbar';

interface TextFieldProps {
  template: BlockTemplate;
  handleSetting: (option: { action: string, data?: any }) => void
  onContentChange: (newTitle: string) => void;
}


const TextField: FC<TextFieldProps> = ({ template, handleSetting, onContentChange }) => {

  const [defaultText, setDefaultText] = useState<string>(template.content)
  const [startEditing, setStartEditing] = useState<boolean>(false);
  const [mouseEnter, setMouseEnter] = useState<boolean>(true);

  const fontOptions: string[] = [
    // 'Arial',
    // 'Helvetica',
    // 'Times New Roman',
    // 'Courier New',
    // 'Verdana',
    // 'Georgia',
    // 'Palatino',
    // 'Garamond',
    // 'Bookman',
    // 'Comic Sans MS',
    // 'Trebuchet MS',
    // 'Arial Black',
  ];
  const quillModules: { toolbar: { container: any[] } } = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ font: fontOptions }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    },
  };
  let quillFormats: string[] = [
    'header',
    'size',
    'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'align',
    'list', 'bullet',
    'link', 'image', 'video',
  ];



  if (template.type == 'HEADLINE') {
    quillModules.toolbar.container = [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link'],
      ['clean']
    ]
    quillFormats = [
      'header',
      // 'size',
      // 'font',
      // 'bold', 'italic', 'underline', 'strike', 'blockquote',
      'color', 'background',
      'align',
      'list', 'bullet',
      'link', 'image', 'video',
    ]
  }
  else if (template.type == 'PARAGRAPHE') {
    quillModules.toolbar.container = [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean']
    ]
    quillFormats = [
      'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'color', 'background',
      'align',
      'list', 'bullet',
      'link', 'image', 'video',
    ]

  }
  else if (template.type == 'LIST') {
    quillModules.toolbar.container = [
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link'],
      ['clean'],

    ]
    quillFormats = [
      'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'color', 'background',
      'align',
      'list', 'bullet',
      'link', 'image', 'video',
    ]

  }

  if (!template.content) {
    switch (template.type) {
      case 'HEADLINE':
        setDefaultText('Heading');
        break;
      case 'PARAGRAPHE':
        setDefaultText('Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quos dignissimos, id esse mollitia distinctio error quasi, a, reiciendis assumenda recusandae veritatis tenetur officiis! Ea nisi accusamus culpa? Sint, aliquid!');
        break;
      case 'TEXT':
        setDefaultText('Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quos dignissimos, id esse mollitia distinctio error quasi, a, reiciendis assumenda recusandae veritatis tenetur officiis! Ea nisi accusamus culpa? Sint, aliquid!');
        break;
      case 'SECTION':
        setDefaultText('Section Content');
        break;
      case 'DIV':
        setDefaultText('Div Content');
        break;
      case 'ARTICLE':
        setDefaultText('Article Content');
        break;
      case 'ICON':
        setDefaultText('icon');
        break;
      case 'LIST':
        setDefaultText('List Item 1\nList Item 2\nList Item 3');
        break;
      default:
        setDefaultText('Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quos dignissimos, id esse mollitia distinctio error quasi, a, reiciendis assumenda recusandae veritatis tenetur officiis! Ea nisi accusamus culpa? Sint, aliquid!');
        break;
    }
  }

  const handleMouseEnter = (value: boolean) => {
    setMouseEnter(value);
    setStartEditing(false)
  };

  const handleSetOption = (option: string) => {
    if (option === 'gear') {
      handleSetting({ action: 'SETTING' });
    } else if (option === 'trash') {
      handleSetting({ action: 'DELETE' });
    } else if (option === 'copy') {
      handleSetting({ action: 'DUPLICATE' });
    } else if (option === 'save') {
      // handleSave(editorState); // Appel de la fonction pour sauvegarder
    }
  }


  return (
    <div className="TextField" >
      <div
        className={`${mouseEnter ? 'onMouseEnter' : ''} ${startEditing ? 'startEditing' : ''}`}
        onMouseEnter={() => handleMouseEnter(true)}
        onMouseLeave={() => handleMouseEnter(false)}>

        {
          !startEditing &&
        <Toolbar
          name={""}
          mouseLeave={!mouseEnter}
          handleSetOption={handleSetOption} 
          />
        }
        <ReactQuill
          value={defaultText}
          modules={quillModules}
          formats={quillFormats}
          style={template.styles}
          theme="snow"
          onChange={(content, delta, source, editor) => {
            setStartEditing(true)
            setDefaultText(editor.getHTML())
            onContentChange(editor.getHTML());
          }}
        />
      </div>
    </div>
  );
};



export default TextField;
