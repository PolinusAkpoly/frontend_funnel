/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 19:47:07
*/
import React, { FC, useEffect } from 'react';
import './Toolbar.css';
import { BlockTemplate } from '../../models/BlockTemplate';


interface ToolbarProps {
  name: string 
  mouseLeave: boolean
  startEditing?: boolean
  handleSetOption: (item: any) => void
  template?: BlockTemplate
  toggleAlignment?: (data: string) => void
  toggleInlineStyle?: (data: string) => void
  toggleList?: (data: string) => void
  toggleBlockType?: (data: string) => void
}


const Toolbar: FC<ToolbarProps> = ({
  name,
  mouseLeave,
  startEditing, 
  template, 
  handleSetOption,
  toggleAlignment,
  toggleInlineStyle,
  toggleList,
  toggleBlockType,
}) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="Toolbar">
      {
        startEditing && template?
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
                <button key={level.value} onMouseDown={() => toggleBlockType &&  toggleBlockType(`header-${level.name}`)} className='header-button btn btn-primary'>
                  H{level.value}
                </button>
              ))
            :
            null
        }
        {template.type === 'LIST' ? (
          <>
            <button onMouseDown={() => toggleList && toggleList('unordered-list-item')} className='header-button btn btn-primary'>
              <i className="fas fa-list-ul" />
            </button>
            <button onMouseDown={() => toggleList && toggleList('ordered-list-item')} className='header-button btn btn-primary'>
              <i className="fas fa-list-ol" />
            </button>
          </>
        ) : null}

        {/* Buttons for text styling */}
        <button onMouseDown={() => toggleInlineStyle && toggleInlineStyle('BOLD')} className='header-button btn btn-primary'>
          <b>B</b>
        </button>
        <button onMouseDown={() => toggleInlineStyle && toggleInlineStyle('ITALIC')} className='header-button btn btn-primary'>
          <i>I</i>
        </button>
        <button onMouseDown={() => toggleInlineStyle && toggleInlineStyle('UNDERLINE')} className='header-button btn btn-primary'>
          <u>U</u>
        </button>
        {/* <button onMouseDown={handleAddLink} className='header-button btn btn-primary'>
          Link
        </button>
        <button onMouseDown={handleToggleStrikethrough} className='header-button btn btn-primary'>
          <s>ABC</s>
        </button> */}

        <>
          <button onMouseDown={() => toggleAlignment && toggleAlignment('left')} className='header-button btn btn-primary'>
            <i className="fas fa-align-left" />
          </button>
          <button onMouseDown={() => toggleAlignment && toggleAlignment('center')} className='header-button btn btn-primary'>
            <i className="fas fa-align-center" />
          </button>
          <button onMouseDown={() => toggleAlignment && toggleAlignment('right')} className='header-button btn btn-primary'>
            <i className="fas fa-align-right" />
          </button>
          <button onMouseDown={() => toggleAlignment && toggleAlignment('justify')} className='header-button btn btn-primary'>
            <i className="fas fa-align-justify" />
          </button>
        </>
      </div>
        :
        <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
          <div>{name}</div>
          <div>
            {/* Icônes pour les actions d'édition */}
            {['gear', 'copy', 'save', 'trash'].map((icon) => (
              <span key={icon} onMouseDown={() => handleSetOption(icon)} className='header-button'>
                <i className={`fa-solid fa-${icon}`} />
              </span>
            ))}
          </div>
        </div>
      }
    </div>
  );
}

export default Toolbar;