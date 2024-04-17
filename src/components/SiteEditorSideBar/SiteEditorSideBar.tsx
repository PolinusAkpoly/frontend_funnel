/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/02/2024 13:29:55
*/
import React, { FC,  useState } from 'react';
import './SiteEditorSideBar.css';

import Toolbox from '../Toolbox/Toolbox';
import ElementOptions from '../StyleOptions/ElementOptions/ElementOptions';
import {  useSelector } from 'react-redux';
import { getCurrentBlock, getCurrentTemplate } from '../../redux/selectors/selectors';
import Accordion from '../Accordion/Accordion';


interface SiteEditorSideBarProps {
}


const textTools = {
  name: 'Text',
  datas: [
    { icon: 'h', title: 'Headline', type: 'headline' },
    { icon: 'p', title: 'Paragraphe', type: 'paragraphe' },
    { icon: 'a', title: 'Text', type: 'text' },
    { icon: 's', title: 'Section', type: 'section' },
    { icon: 'e', title: 'Element', type: 'div' },
    { icon: 'home', title: 'Article', type: 'article' },
    { icon: 'list', title: 'List', type: 'list' },
    { icon: 'tablet', title: 'Content', type: 'content' },
    { icon: 'b', title: 'Button', type: 'button' },
    // Ajoutez d'autres éléments ici
  ]
}
const textComponents = {
  name: 'textComponents',
  datas: [
    { icon: 'link', title: 'Link', type: 'link' },
    { icon: 'angle-down', title: 'Accordion', type: 'Accordion' },
    { icon: 'image', title: 'Carousel', type: 'Carousel' }, // Choisir un icône approprié pour le carrousel
    { icon: 'star', title: 'Reviews', type: 'Reviews' }, // Choisir un icône approprié pour les avis
    // Ajoutez d'autres éléments ici
  ]
};
const textFormulaires = {
  name: 'textFormulaires',
  datas: [
    { icon: 'user-plus', title: 'Inscription', type: 'inscription' },
    // Ajoutez d'autres éléments ici
  ]
};

const blockTools = {
  name: 'Blocks',
  datas: [
    { icon: '1', title: 'One', type: 'one-block' },
    { icon: '2', title: 'Two', type: 'two-block' },
    { icon: '3', title: 'Three', type: 'three-block' },
    { icon: '4', title: 'Four', type: 'four-block' },
    { icon: '5', title: 'five', type: 'five-block' },
    { icon: '6', title: 'six', type: 'six-block' },
    // Ajoutez d'autres éléments ici
  ]
}
const mediaTools = {
  name: 'media',
  datas: [
    { icon: 'image', title: 'Image', type: 'image' },
    { icon: 'video', title: 'Video', type: 'video' },
    { icon: 'volume-high', title: 'Audio', type: 'audio' },
    { icon: 'file', title: 'File', type: 'application' },
    { icon: 'grip', title: 'Galerie', type: 'galerie' }
  ]
}
const iconTools = {
  name: 'Icones',
  datas: [
    { icon: 'image', title: 'Image', type: 'image' },
    { icon: 'video', title: 'Video', type: 'video' },
    { icon: 'volume-high', title: 'Audio', type: 'audio' },
    { icon: 'file', title: 'File', type: 'application' },
    { icon: 'grip', title: 'Galerie', type: 'galerie' }
  ]
}

const SiteEditorSideBar: FC<SiteEditorSideBarProps> = ({   }) => {

  const [displayOption, setDisplayOption] = useState<boolean>(false)

  const currentBlock = useSelector(getCurrentBlock)
  const currentTemplate = useSelector(getCurrentTemplate)


  const handleDrop = () => {

  }
  const elements = [
    { href: '#block', label: 'Conteneurs', content: <Toolbox toolboxData={blockTools} handleDrop={handleDrop} /> },
    { href: '#text', label: 'Elements', content: <Toolbox toolboxData={textTools} handleDrop={handleDrop} /> },
    { href: '#components', label: 'Components', content: <Toolbox toolboxData={textComponents} handleDrop={handleDrop} /> },
    { href: '#Formulaires', label: 'Formulaires', content: <Toolbox toolboxData={textFormulaires} handleDrop={handleDrop} /> },
    // { href: '#social', label: 'Social', content: <Toolbox toolboxData={textTools} handleDrop={handleDrop} /> },
    { href: '#medias', label: 'Medias', content: <Toolbox toolboxData={mediaTools} handleDrop={handleDrop} /> },
    { href: '#icon', label: 'Icones', content: <Toolbox toolboxData={iconTools} handleDrop={handleDrop} /> },
    // { href: '#column_layout', label: 'Column layout', content: <Toolbox toolboxData={mediaTools} handleDrop={handleDrop} /> },
    // { href: '#form', label: 'Form', content: <Toolbox toolboxData={mediaTools} handleDrop={handleDrop} /> },
    // { href: '#payment', label: 'Payment', content: <Toolbox toolboxData={mediaTools} handleDrop={handleDrop} /> },
    // { href: '#other', label: 'Other', content: <Toolbox toolboxData={mediaTools} handleDrop={handleDrop} /> },
    // { href: '#column', label: 'Columns', content:  <Toolbox toolboxData={columnTools} handleDrop={handleDrop} /> },
    // { href: '#test', label: 'Options', content: <div>A/B Test Content</div> },
    // { href: '#stats', label: 'Stats', content: <div>Stats Content</div> },
    // { href: '#leads', label: 'Leads', content: <div>Leads Content</div> },
    // { href: '#sales', label: 'Sales', content: <div>Sales Content</div> },
    // { href: '#deadline', label: 'Deadline', content: <div>Deadline Content</div> },
    // Add more tabs as needed with respective content
  ]

  const options = [
    { href: '#opt-in-forms', label: 'Opt-in-forms', content: <div>Opt-in-forms Content</div> },
    { href: '#features', label: 'Features', content: <div>Features Content</div> },
    { href: '#page_footer', label: 'Page footers', content: <div>Page footers Content</div> },
    { href: '#team_presentation', label: 'Team presentation', content: <div>Team Présentation Content</div> },
    { href: '#welcome', label: 'Welcome', content: <div>Team Présentation Content</div> },
    { href: '#price_plans', label: 'Price plans', content: <div>Team Présentation Content</div> },
    { href: '#page_headers', label: 'Page headers', content: <div>Team Présentation Content</div> },
    { href: '#testimonials', label: 'Testimonials', content: <div>Team Présentation Content</div> },
  ]

  return (
    <div className="SiteEditorSideBar">
      {
        currentTemplate || currentBlock ?
          <ElementOptions />
          :
          <>
            <div className="aside-title d-flex justify-content-between">
              <span className={displayOption ? 'selected' : ''} onClick={() => setDisplayOption(!displayOption)} >
                Elements
              </span>
              <span className={displayOption ? '' : 'selected'} onClick={() => setDisplayOption(!displayOption)} >
                Blocks
              </span>
            </div>
            <div className={"option text-center " + (displayOption ? '' : 'd-none')}>
              {
                options.map((option) => {
                  return <Accordion
                    key={Math.round(Math.random() * 88542144 + 1425)}
                    title={option.label}
                    children={option.content} />
                })
              }
            </div>

            <div className={"option text-center " + (displayOption ? 'd-none' : '')}>
              {
                elements.map((element) => {
                  return <Accordion 
                    key={Math.round(Math.random() * 9684544 + 521)}
                    title={element.label}
                    children={element.content}
                  />
                })
              }
            </div>
          </>
      }
    </div>
  );
}

export default SiteEditorSideBar;