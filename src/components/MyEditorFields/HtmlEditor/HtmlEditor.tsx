/*
  Auteur : Mudey Formation
  Site Web : https://mudey.fr/
  Nom de l'application : E-commerce avec React.Js
  Date de création : 04/02/2024 19:27:51
*/
import React, { FC, useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Assurez-vous d'importer les styles CSS
import './HtmlEditor.css';
import { BlockTemplate } from '../../../models/BlockTemplate';
import { getDefaultTitle, handleLoadTemplate } from '../../../helpers/utiles';
import Toolbar from '../../Toolbar/Toolbar';

interface HtmlEditorProps {
  handleSetting: (option: { action: string, data?: any }) => void
  template: BlockTemplate
  handleSave: (content: EditorState) => void;
  handleContentChange: (content: EditorState) => void
}


const HtmlEditor: FC<HtmlEditorProps> = ({ template, handleSetting, handleSave, handleContentChange }) => {
 
  let content = ''

  try {
    content = (handleLoadTemplate(template.content) as EditorState)?.getCurrentContent()?.getPlainText();
  } catch (error) {
    content = ""
  }
 

 
  const defaultTitle = getDefaultTitle(template);
  const contentState = ContentState.createFromText(defaultTitle as string);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
  // const [color, setColor] = useState("#000");
  const [startEditing, setStartEditing] = useState<boolean>(false);
  const [mouseLeave, setMouseLeave] = useState<boolean>(true);

  useEffect(() => {
    if (content) {
      setEditorState(template.content as EditorState)
      handleContentChange(template.content as EditorState)
    } else {
      handleContentChange(editorState)
    }
    // setLoading(false)
  }, [])

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    handleContentChange(newEditorState)
  };


  const handleKeyCommand = (command: string, editorState_: EditorState): 'handled' | 'not-handled' => {
    const newState = RichUtils.handleKeyCommand(editorState_, command);

    if (newState) {
      handleChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const onTab = (e: React.KeyboardEvent<{}>) => {
    const maxDepth = 4; // Profondeur maximale pour l'indentation
    handleChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  const toggleBlockType = (blockType: string) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleStartEditing = (value: boolean) => {
    setStartEditing(value);
  };

  const handleMouseLeave = (value: boolean) => {
    setMouseLeave(value);
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
      handleSave(editorState); // Appel de la fonction pour sauvegarder
    }
  }

  const toggleInlineStyle = (style: string) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleAddLink = () => {
    const link = window.prompt('Enter a URL:');
    if (link) {
      const contentWithLink = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', { url: link });
      const entityKey = contentWithLink.getLastCreatedEntityKey();
      const newEditorState = EditorState.push(
        editorState,
        contentWithLink,
        'apply-entity',
      );
      handleChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    }
  };


  const handleToggleStrikethrough = () => {
    toggleInlineStyle('STRIKETHROUGH');
  };

  const toggleList = (listType: string) => {
    handleChange(RichUtils.toggleBlockType(editorState, listType));
  };

  const toggleAlignment = (alignment: string) => {
    console.log(alignment)
    handleChange(RichUtils.toggleBlockType(editorState, alignment));
  };




  return (
    <div className={'HtmlEditor '}
      onMouseLeave={() => handleMouseLeave(true)}
      onMouseEnter={() => handleMouseLeave(false)}>
      {startEditing ? (
        <div className={'toolbar d-flex align-items-center view ' + (mouseLeave ? " mouseLeave" : '')}>
          {
            template.type == 'HEADLINE' ?
              [
                { value: 1, name: 'one' },
                { value: 2, name: 'two' },
                { value: 3, name: 'three' },
                { value: 4, name: 'four' },
                { value: 5, name: 'five' },
                {
                  value: 6, name: 'six'
                }].map((level) => (
                  <button key={level.value} onMouseDown={() => toggleBlockType(`header-${level.name}`)} className='header-button btn btn-primary'>
                    H{level.value}
                  </button>
                ))
              :
              null
          }
          {template.type === 'LIST' ? (
            <>
              <button onMouseDown={() => toggleList('unordered-list-item')} className='header-button btn btn-primary'>
                <i className="fas fa-list-ul" />
              </button>
              <button onMouseDown={() => toggleList('ordered-list-item')} className='header-button btn btn-primary'>
                <i className="fas fa-list-ol" />
              </button>
            </>
          ) : null}

          {/* Buttons for text styling */}
          <button onMouseDown={() => toggleInlineStyle('BOLD')} className='header-button btn btn-primary'>
            <b>B</b>
          </button>
          <button onMouseDown={() => toggleInlineStyle('ITALIC')} className='header-button btn btn-primary'>
            <i>I</i>
          </button>
          <button onMouseDown={() => toggleInlineStyle('UNDERLINE')} className='header-button btn btn-primary'>
            <u>U</u>
          </button>
          <button onMouseDown={handleAddLink} className='header-button btn btn-primary'>
            Link
          </button>
          <button onMouseDown={handleToggleStrikethrough} className='header-button btn btn-primary'>
            <s>ABC</s>
          </button>

          <>
            <button onMouseDown={() => toggleAlignment('left')} className='header-button btn btn-primary'>
              <i className="fas fa-align-left" />
            </button>
            <button onMouseDown={() => toggleAlignment('center')} className='header-button btn btn-primary'>
              <i className="fas fa-align-center" />
            </button>
            <button onMouseDown={() => toggleAlignment('right')} className='header-button btn btn-primary'>
              <i className="fas fa-align-right" />
            </button>
            <button onMouseDown={() => toggleAlignment('justify')} className='header-button btn btn-primary'>
              <i className="fas fa-align-justify" />
            </button>
          </>
        </div>
      ) : (
        <Toolbar
        name="Texte en tête"
        startEditing={startEditing}
        mouseLeave={mouseLeave}
        handleSetOption={handleSetOption}
        />
      )}
      <div
        onClick={() => handleStartEditing(true)}
        className={`editor ${startEditing ? " view " : ""} ${!mouseLeave && !startEditing ? " d-mouseLeave " : ""}`}
      >
        <div style={{}}>
          <Editor
            // customStyleMap={styles}
            editorState={editorState}
            onChange={handleChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={(e) => getDefaultKeyBinding(e)}
            onTab={onTab}
          />

        </div>

      </div>
    </div>
  );
};

export default HtmlEditor;
