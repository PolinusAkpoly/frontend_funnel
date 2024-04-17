/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/02/2024 17:05:10
*/
import React, { FC, useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './DraftHtmlEditor.css';
import { BlockTemplate } from '../../../models/BlockTemplate';
import { EditorStateToHtml, handleLoadTemplate } from '../../../helpers/utiles';
import Toolbar from '../../Toolbar/Toolbar';

interface DraftHtmlEditorProps {
  template: BlockTemplate;
  handleSetting: (option: { action: string, data?: any }) => void;
  handleContentChange: (content: string) => void;
  handleSave: () => void;
}

const DraftHtmlEditor: FC<DraftHtmlEditorProps> = ({ template, handleSave, handleSetting, handleContentChange }) => {

  const [startEditing, setStartEditing] = useState<boolean>(false);
  const [mouseLeave, setMouseLeave] = useState<boolean>(true);
  const [editorState, setEditorState] = useState(handleLoadTemplate(template.content || '') as EditorState);

  useEffect(() => {
    // Mise à jour de l'éditeur lorsque le modèle change
    setEditorState(handleLoadTemplate(template.content || '') as EditorState);
  }, []);

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);

    let htmlContent = EditorStateToHtml(newEditorState)

    if (htmlContent) {
      handleContentChange(htmlContent);
    }
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
      handleSave(); // Appel de la fonction pour sauvegarder
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
        <div style={template.styles}>
          <Editor
            editorState={editorState}
            onChange={handleChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={(e) => getDefaultKeyBinding(e)}
            onTab={onTab}
          />

        </div>

      </div>
    </div>
  )
};

export default DraftHtmlEditor;
