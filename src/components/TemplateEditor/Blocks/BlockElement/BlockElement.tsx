/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/02/2024 08:04:15
*/
import React, { useEffect, useState } from 'react';
import './BlockElement.css';
import BlockActions from '../../../BlockActions/BlockActions';
import { Block } from '../../../../models/Block';
import { BlockTemplate } from '../../../../models/BlockTemplate';
import { generateId } from '../../../../helpers/utils';
import DraggableList from '../../../DraggableList/DraggableList';
import ImageField from '../../../MyEditorFields/ImageField/ImageField';
import VideoField from '../../../MyEditorFields/VideoField/VideoField';
import AudioField from '../../../MyEditorFields/AudioField/AudioField';
import FileField from '../../../MyEditorFields/FileField/FileField';
import ButtonField from '../../../MyEditorFields/ButtonField/ButtonField';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NOTIFICATION, ADD_TO_STORAGE } from '../../../../redux/actions/actionTypes';
import { getBlocks, getCurrentBlock, getCurrentTemplate } from '../../../../redux/selectors/selectors';
// import HtmlEditor from '../../../MyEditorFields/HtmlEditor/HtmlEditor';
import DraftHtmlEditor from '../../../MyEditorFields/DraftHtmlEditor/DraftHtmlEditor';
import IconField from '../../../MyEditorFields/IconField/IconField';
import { getDefaultContent } from '../../../../helpers/utiles';
import LinkField from '../../../MyEditorFields/LinkField/LinkField';
import AccordionField from '../../../MyEditorFields/AccordionField/AccordionField';
import CarouselField from '../../../MyEditorFields/CarouselField/CarouselField';
import ReviewsField from '../../../MyEditorFields/ReviewsField/ReviewsField';


// import SortableList from '../../../SortableList/SortableList';
// import TextField from '../../../MyEditorFields/TextField/TextField';
// import Toolbar from '../../../Toolbar/Toolbar';







interface BlockElementProps {
  block: Block
}

const BlockElement: React.FC<BlockElementProps> = ({ block }) => {

  const [onOver, setOverIndex] = useState<string | undefined>()
  const [isHovered, setIsHovered] = useState(false);
  // const [isLoading, setLoading] = useState<boolean>(true)
  const [templates, setTemplates] = useState<BlockTemplate[]>([])
  const dispatch = useDispatch()
  const blocks = useSelector(getBlocks)
  const currentTemplate = useSelector(getCurrentTemplate)
  const currentBlock = useSelector(getCurrentBlock)
  



  const updateBlocks = (newBlocks: Block[]) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: 'blocks',
      payload: [...newBlocks]
    })
  }
  const updateCurrentBlock = (b?: Block) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: 'currentBlock',
      payload: b
    })
  }
  const updateCurrentTemplate = (tempalte?: BlockTemplate) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: 'currentTemplate',
      payload: tempalte
    })
  }
//   const getInitAccordion = () => {
//     const allTemplates = blocks[0].templates;
//     const accordionTemplates = allTemplates.filter((template: BlockTemplate) => template.type === 'ACCORDION');
//     if (accordionTemplates.length > 0) {
//         const contents = accordionTemplates.map((template: BlockTemplate) => {
//             const content = template.content;
//             console.log(content);
//             return content;
//         });
//         // return JSON.parse(contents[0]);
//         return contents[0];

//     } else {
//         return [
//             {
//                 title: "Accordion Title",
//                 content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", 
//                 position: 0,
//             }
//         ];
//     }
// }



  useEffect(() => {
    setTemplates(block.templates)
    // console.log(getInitAccordion());
    
  }, [block.templates])



  const updateTemplatePosition = (blockId: string, temp: BlockTemplate[]) => {
    const newBlocks = blocks.map((b: Block) => {
      if (b._id === blockId) {
        block.templates = temp
        return { ...b, templates: temp }
      }
      return b
    })

    updateBlocks(newBlocks)
  }
  const handleSetTemplate = (blockId: string, temp: BlockTemplate[]) => {
    let newBlocks = blocks.map((b: Block) => (b._id === blockId ? { ...b, templates: temp } : b))
    updateBlocks(newBlocks)
  };
  const handleSetTemplatePosition = (result: any) => {
    // console.log({ result })
    if (!result.destination) {
      // The item was dropped outside a droppable area
      return;
    }

    const { source, destination } = result;
    if (source.index === destination.index) {
      // The item was dropped at the same position
      return;
    }
    // Copy the array to avoid mutating the state directly
    const updatedTemplates = [...(templates || [])];
    const [draggedItem] = updatedTemplates.splice(source.index, 1);
    updatedTemplates.splice(destination.index, 0, draggedItem);

    const newTemplates = updatedTemplates.map((d, index) => { return { ...d, position: index } })


    updateTemplatePosition(block._id!, newTemplates)

  };


  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOverIndex(undefined);

    const item = JSON.parse(event.dataTransfer.getData('text'))

    // console.log({ item });

    let newTemplate: BlockTemplate = {
      _id: generateId(),
      type: item.type.toUpperCase(),
      position: templates.length,
      blockId: block._id!,
      columnIndex: event.currentTarget.dataset.columnIndex as any,
      content: '',
      containerStyles: { boxSizing: "borderBox" },
      attributes: {},
      styles: { boxSizing: "borderBox" }
    }

    newTemplate.content = getDefaultContent(newTemplate)

    if (item.type.toLowerCase() == 'icon') {
      newTemplate.content = `<i class='${item.icon}'></i>`
      newTemplate.styles = { boxSizing: "borderBox", fontSize: '60px' }
    }
    if (item.type.toLowerCase() == 'button') {
      newTemplate.content = `En savoir plus`
      newTemplate.attributes = {
        ...newTemplate.attributes,
        class: 'btn btn-success',
      }
      newTemplate.styles = { boxSizing: "borderBox", fontSize: '20px', marginTop: '20px' }
    }
    if (item.type.toLowerCase() == 'link') {
      newTemplate.content = `Link 1`
      newTemplate.attributes = {
        ...newTemplate.attributes,
        class: 'btn btn-success',
        href: 'https://mudey.fr',
        target: '_blank'
      }
      newTemplate.styles = { boxSizing: "borderBox", fontSize: '20px', marginTop: '20px' }
    }
    if (item.type.toLowerCase() == 'accordion') {
      newTemplate.content =
       [
        {
          title: "Accordion Title",
          content: "Lorem Ipsum is simply dummy. Lorem Ipsum has been the industry's standard dummy  the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", 
          position: 0,
        }
        // {
        //   title: "",
        //   content: { 
        //     title: "",
        //     content: ""
        //   }, 
        //   position: 0,
        // }
      ]
      newTemplate.attributes = {
        ...newTemplate.attributes,
        class: '',
        href: '',
        target: ''
      }
      newTemplate.styles = { boxSizing: "borderBox", fontSize: '20px', marginTop: '20px' }
    }

    if (item.type.toLowerCase() == 'carousel') {
      newTemplate.content = `Carousel`
      newTemplate.attributes = {
        ...newTemplate.attributes,
        class: 'btn btn-success',
        href: 'https://mudey.fr',
        target: '_blank'
      }
      newTemplate.styles = { boxSizing: "borderBox", fontSize: '20px', marginTop: '20px' }
    }
    if (item.type.toLowerCase() == 'reviews') {
      newTemplate.content = `Reviews`
      newTemplate.attributes = {
        ...newTemplate.attributes,
        class: 'btn btn-success',
        href: 'https://mudey.fr',
        target: '_blank'
      }
      newTemplate.styles = { boxSizing: "borderBox", fontSize: '20px', marginTop: '20px' }
    }
    let newdata: BlockTemplate[] = [...templates, newTemplate];

    // console.log({ newdata });

    handleSetTemplate(block._id!, newdata);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const index = event.currentTarget?.dataset.columnIndex;

    setOverIndex(index);
  };

  const onDragLeave = () => {
    setOverIndex(undefined);
  };

  const handleSetHovered = (value: boolean) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: "blockHovered",
      payload: value
    })
    setIsHovered(value)
  }
  const handleDuplicateBlock = (position: 'top' | 'bottom', blockId?: string) => {
    console.log("============== handleDuplicateBlock ===============");

    let newBlock: Block | undefined = blocks.find((b: Block) => b._id == blockId)
    if (newBlock) {
      newBlock = { ...newBlock, _id: generateId() }
      newBlock.templates = newBlock.templates.map((t: BlockTemplate) => ({
        ...t,
        _id: generateId(),
      }))
      // console.log({ templates: newBlock.templates.map(t => t.content) })



      let updatedBlocks = [...blocks];
      const index = updatedBlocks.findIndex((b: Block) => b._id === blockId);

      if (position === 'top') {
        updatedBlocks.splice(index, 0, newBlock);
      } else if (position === 'bottom') {
        updatedBlocks.splice(index + 1, 0, newBlock);
      }
      updatedBlocks = updatedBlocks.map((d: Block, pos) => ({ ...d, position: pos }))
      //console.log({newBlock})
      updateBlocks(updatedBlocks)
    }
  }

  const handleAddBlock = (position: 'top' | 'bottom', blockId?: string) => {
    const newBlock: Block = {
      _id: generateId(),
      columnCount: 1,
      position: blocks.length,
      templates: [],
      containerStyles: { boxSizing: "borderBox" },
      styles: { boxSizing: "borderBox" }
    };

    const updatedBlocks = [...blocks];
    const index = updatedBlocks.findIndex((b) => b._id === blockId);

    if (position === 'top') {
      updatedBlocks.splice(index, 0, newBlock);
    } else if (position === 'bottom') {
      updatedBlocks.splice(index + 1, 0, newBlock);
    }

    updateBlocks(updatedBlocks)
  };


  const handleDeleteBlock = (blockId?: string) => {
    let updatedBlocks = blocks.filter((b: Block) => b._id !== blockId)
    updateBlocks(updatedBlocks)
    console.log("========== handleDeleteBlock ===========");

    if (currentBlock && currentBlock._id === blockId) {
      updateCurrentBlock(undefined)
    }
  };

  const handleDeleteTemplate = (template: any) => {

    const newBlocks = blocks.map((b: Block) => {
      b.templates = b.templates.filter((item) => item._id !== template._id)
      return b
    })
    updateBlocks(newBlocks)
    if (currentTemplate && currentTemplate._id === template._id) {
      updateCurrentTemplate(undefined)
    }
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        _id: generateId(),
        message: "Template deleted !",
        status: "success",
        timeout: 2000
      }
    })
  }


  const handleDuplicate = (template: any) => {
    const newBlocks = blocks.map((b: Block) => {
      // Assuming that 'templates' is an array property in the 'block' object
      if (b.templates && b.templates.length > 0) {
        const index = b.templates.findIndex((item: any) => item._id === template._id);
        if (index !== -1) {
          // Insert the duplicated template immediately after the original template
          b.templates.splice(index + 1, 0, { ...template, _id: generateId() });
        }
      }
      return b;
    });

    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        _id: generateId(),
        message: "Template duplicated !",
        status: "success",
        timeout: 2000
      }
    })
    updateBlocks(newBlocks)
  };
  const handleSetting = (setting: any, template: BlockTemplate) => {
    updateCurrentTemplate(undefined)
    updateCurrentBlock(undefined)
    switch (setting.action) {
      case "DELETE":
        handleDeleteTemplate(template)
        break;
      case "DUPLICATE":
        handleDuplicate(template)
        break;
      case "SETTING":
        updateCurrentTemplate(template)
        updateCurrentBlock(undefined)
        break;

      default:
        break;
    }

  }

  const handleContentChange = (content: any, templateId: string) => {
    const newBlocks = blocks.map((b: Block) => {
      b.templates = b.templates.map((item) =>
        item._id === templateId ? { ...item, content } : item
      );
      return b
    })

    updateBlocks(newBlocks)
  };




  const handleOptionBlock = (blockId?: string) => {
    const newBlock = blocks.find((b: Block) => b._id == blockId)
    updateCurrentBlock(newBlock)
    updateCurrentTemplate(undefined)
  }

  function getContentByTemplateType(template: BlockTemplate) {
    // console.log(template.type);
    switch (template.type) {
      case "IMAGE":
        return (
          <ImageField
            template={template}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      case "AUDIO":
        return (
          <AudioField
            src={template?.attributes?.src as string}
            styles={template.styles}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      case "APPLICATION":
        return (
          <FileField
            src={template?.attributes?.src as string}
            styles={template.styles}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      case "BUTTON":
        return (
          <ButtonField
            template={template}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      case "VIDEO":
        return (
          <VideoField
            src={template?.attributes?.src as string}
            styles={template.styles}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      case "ICON":
        return (
          <IconField
            template={template}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      case "LINK":
        return (
          <LinkField
            template={template}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      case "ACCORDION":
        return (
          <AccordionField
            template={template}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      case "CAROUSEL":
        return (
          <CarouselField
            template={template}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
        case "REVIEWS":
        return (
          <ReviewsField
            template={template}
            handleSetting={(setting) => handleSetting(setting, template)}
          />
        );
      default:
        return (
          <>
            <DraftHtmlEditor
              template={template}
              handleSetting={(setting) => handleSetting(setting, template)}
              handleSave={() => { }}
              handleContentChange={(content: string) => handleContentChange(content, template._id!)}
            />
          </>
        );
    }
  }





  return (
    <div className='position-relative'
      onMouseEnter={() => handleSetHovered(true)}
      onMouseLeave={() => handleSetHovered(false)}
    >
      <BlockActions
        blockId={block._id!}
        actionType='top'
        isHovered={isHovered}
        handleOptionBlock={handleOptionBlock}
        handleAddBlock={handleAddBlock}
        handleDeleteBlock={handleDeleteBlock}
        handleDuplicateBlock={handleDuplicateBlock}
      />

      <div className={`BlockElement ${onOver ? 'over' : ''} ${(currentBlock?._id === block?._id) || (currentTemplate?.blockId === block?._id) ? 'currentBlock' : ''}`}
        style={block.styles}
      >
        <div className={block.container || 'container-fluid'}>
          {/* <SortableList
            containerClassName={`row g-0 ${(currentBlock?._id === block?._id) || (currentTemplate?.blockId === block?._id) ? 'currentBlockRow' : ''}`}
            itemClassName={`col-item col-md-${12 / block.columnCount} ${block.columnCount > 1 ? 'p-1' : ''}`}
            items={[...Array(block.columnCount)].map((_, index) => (
              {
                id: (block._id!) + index,
                content: (<div key={index} className={`col-item col-md-${12 / block.columnCount} ${block.columnCount > 1 ? 'p-1' : ''}`}>
                  <div className={"content-" + index}>
                    {
                      <DraggableList
                        items={
                          templates.filter(t => t.columnIndex == index).map((template: any) => {
                            return {
                              id: template._id,
                              content: getContentByTemplateType(template)
                            }
                          })
                        }
                        onDragEnd={handleSetTemplatePosition}
                      />
                    }
                  </div>

                  {
                    !isHovered ?
                      <div
                        className={"d-flex add-item btn btn-primary gap-1 align-items-center justify-content-center " + (parseInt(onOver || '') == index ? 'over' : '')}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        data-column-index={index}
                      >
                        <i className="fa-solid fa-plus" /> Add
                      </div>
                      :
                      null
                  }
                </div>)
              }
            ))}
            onOrderChange={handleOrderChange}
          /> */}
          <div className={`row g-0 ${(currentBlock?._id === block?._id) || (currentTemplate?.blockId === block?._id) ? 'currentBlockRow' : ''}`}>
            {[...Array(block.columnCount)].map((_, index) => (
              <div key={index} className={`col-item col-md-${12 / block.columnCount} ${block.columnCount > 1 ? 'p-1' : ''}`}>
                <div className={"content-" + index}>
                  {
                    <DraggableList
                      items={
                        templates.filter(t => t.columnIndex == index).sort((a, b) => a.position - b.position).map((template: any) => {
                          return {
                            id: template._id,
                            content: getContentByTemplateType(template)
                          }
                        })
                      }
                      onDragEnd={handleSetTemplatePosition}
                    />
                  }
                </div>

                {
                  !isHovered ?
                    <div
                      className={"d-flex add-item btn btn-primary gap-1 align-items-center justify-content-center " + (parseInt(onOver || '') == index ? 'over' : '')}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      data-column-index={index}
                    >
                      <i className="fa-solid fa-plus" /> Add
                    </div>
                    :
                    null
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      <BlockActions
        blockId={block._id!}
        isHovered={isHovered}
        actionType='bottom'
        handleOptionBlock={handleOptionBlock}
        handleAddBlock={handleAddBlock}
        handleDeleteBlock={handleDeleteBlock}
        handleDuplicateBlock={handleDuplicateBlock}
      />
    </div>
  );
};

export default BlockElement;
