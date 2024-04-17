/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 13/02/2024 14:03:19
*/ 
import React, { useEffect, useState } from 'react';
import './ElementOptions.css';
// import CssEditor from '../CssEditor/CssEditor';
import { BlockTemplate } from '../../../models/BlockTemplate';
import FileStorageModal from '../../FileStorageModal/FileStorageModal';
import { filterAttributes, ucfirst } from '../../../helpers/utiles';
import Accordion from '../../Accordion/Accordion';
import LayoutStyles from '../../Styles/LayoutStyles/LayoutStyles';
import BoxModelStyles from '../../Styles/BoxModelStyles/BoxModelStyles';
import TypographyStyles from '../../Styles/TypographyStyles/TypographyStyles';
import BorderStyles from '../../Styles/BorderStyles/BorderStyles';
import BackgroundStyles from '../../Styles/BackgroundStyles/BackgroundStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getBlocks, getCurrentBlock, getCurrentTemplate } from '../../../redux/selectors/selectors';
import { Block } from '../../../models/Block';
import { ADD_TO_STORAGE } from '../../../redux/actions/actionTypes';
import BlockContainerStyles from '../../Styles/BlockContainerStyles/BlockContainerStyles';
import ButtonStyles from '../../Styles/ButtonStyles/ButtonStyles';
import BoxShadowStyles from '../../BoxShadowStyles/BoxShadowStyles';
import TransitionStyles from '../../TransitionStyles/TransitionStyles';
import VisibilityStyles from '../../VisibilityStyles/VisibilityStyles';
import LinkStyles from '../../Styles/LinkStyles/LinkStyles';

interface MarginPaddingParams {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface ElementOptionsProps { }
interface ImageParams {
  src?: string;
  alt?: string;
}
interface InitialParams {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundClip?: string;
  backgroundOrigin?: string;
  backgroundRepeat?: string;
  boxShadowColor?: string, // Ajoutez cette propriété
  boxShadowBlur?: number,
  boxShadowSpread?: number,
  boxShadowX?: number,
  boxShadowY?: number,
  transition?: string,
  transitionProperty?: string,
  transitionDuration?: string,
  transitionTimingFunction?: string,
  transitionDelay?: string,
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  display?: string;
  position?: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  margin?: MarginPaddingParams;
  padding?: MarginPaddingParams;
  width?: number | 'auto';
  height?: number | 'auto';
  textAlign?: string;
  verticalAlign?: string;
  borderWidth?: string;
  borderRadius?: string;
  borderStyle?: string;
  borderColor?: string;
  background?: string;
  flexbox?: {
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
  };
  gridbox?: {
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridColumnGap?: string;
    gridRowGap?: string;
  };
};


const ElementOptions: React.FC<ElementOptionsProps> = ({ }) => {
  const [chooseFile, setChooseFile] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [localParams, setLocalParams] = useState<InitialParams>({});
  const [localImageParams, setLocalImageParams] = useState<ImageParams>({});
  const blocks = useSelector(getBlocks)
  const currentTemplate = useSelector(getCurrentTemplate)
  const currentBlock = useSelector(getCurrentBlock)
  const dispatch = useDispatch()

  const updateBlocks = (newBlocks: Block[]) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: 'blocks',
      payload: newBlocks
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
  const updateCurrentTemplate = (template?: BlockTemplate) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: 'currentTemplate',
      payload: template
    })
    setLocalParams(template?.styles || {})
  }

  useEffect(() => {
    if (currentTemplate) {
      setLocalParams(currentTemplate.styles || {})
    } else if (currentBlock) {
      setLocalParams(currentBlock.styles || {})
    }
    // setIsLoading(false)
  }, [currentTemplate?._id, currentBlock?._id])

  const handleCloseOption = () => {
    updateCurrentBlock(undefined)
    updateCurrentTemplate(undefined)
  }
  const onParamsChange = (data: any) => {
    if (currentTemplate || currentBlock) {
      const updatedBlocks = blocks.map((block: Block) => {
        if (currentTemplate) {
          // Update template styles
          block.templates = block.templates.map((item) => {
            if (item._id === currentTemplate._id) {

              if(data?.content){
                item.content = data.content
                delete data.content
              }

              const newData = filterAttributes(data as Record<string, any>)
              console.log(newData.attributes);
              
              
              return { ...item, 
                styles: { ...item.styles, ...newData.styles }, 
                attributes: { ...item.attributes, ...newData.attributes }, 
              }
            }

            return item
          });
        } else if (currentBlock && block._id === currentBlock._id) {
          // Update block styles
          block = { ...block, styles: { ...block.styles, ...data } };
          console.log({ block });

        }
        return block;
      });

      updateBlocks(updatedBlocks)
    }
  };

  const handleParamChange = (paramName: string, value: string | number) => {
    const newParams = { ...localParams, [paramName]: value };
    setLocalParams(newParams);
    onParamsChange(newParams);
  };
  const handleParamManyChange = (data: Record<string, any>) => {
    const newParams = { ...localParams, ...data };
    console.log(newParams);
    
    setLocalParams(newParams);
    onParamsChange(newParams);
  };

  const loadStyles = (styles: any) => {
    const result: any = { ...styles }

    Object.keys(styles).map((key) => {
      if (typeof styles[key] === "string") {
        result.key = styles[key]
      } else {
        Object.keys(styles[key]).map((newKey) => {
          if (key == 'margin') {
            result['margin' + ucfirst(newKey)] = styles[key][newKey]
          } else if (key == 'padding') {
            result['padding' + ucfirst(newKey)] = styles[key][newKey]
          } else {
            result[newKey] = styles[key][newKey]

          }
        })
      }
    })

    return result
  }

  const handleChangeParams = (data: any) => {
    if (currentTemplate) {
      currentTemplate.styles = { ...currentTemplate.styles, ...data }
     
      const newBlocks = blocks.map((block: Block) => {
        block.templates = block.templates.map((item) =>
          item._id === currentTemplate._id ? { ...item, ...data } : item
        );
        return block
      })
      updateBlocks(newBlocks)
    }
  }

  const handleImageParamChange = (paramName: string, value: string | number) => {
    const newParams = { ...localImageParams, [paramName]: value };
    setLocalImageParams(newParams);
    handleChangeParams(newParams);
  };


  const handleSubParamChange = (paramName: string, subParamName: string, value: string | number) => {
    const t = (localParams as any)[paramName] as any
    const newParams = { ...localParams, [paramName]: { ...t, [subParamName]: value } };
    setLocalParams(newParams);
    let newStyle = loadStyles(newParams)
    console.log({ newStyle });


    onParamsChange(newStyle);
  };

  const handleChooseFile = (event: any) => {
    event.preventDefault()
    setChooseFile(true)
  }
  const handleSelectFile = (link: string) => {
    handleParamChange('src', link)
    setChooseFile(false)
  }

  const handleSetContainer = (container: string) => {

    if (currentBlock) {
      const updatedBlocks = blocks.map((block: Block) => {
        if (currentBlock && block._id === currentBlock._id) {
          // Update block styles
          block = { ...block, container }
        }
        return block;
      });
      updateBlocks(updatedBlocks)
    }
  }

  let properties = []


  if (currentTemplate && currentTemplate.type == "BUTTON") {
    properties.push({
      id: 8541,
      href: '#ButtonStyles', label: 'Button ', content: <ButtonStyles
        handleParamChange={handleParamChange}
      />
    })
  }
  if (currentTemplate && currentTemplate.type == "LINK") {
    properties.push({
      id: 9651,
      href: '#LinkStyles', label: 'Link ', content: <LinkStyles
        handleParamChange={handleParamChange}
      />
    })
  }


  properties.push(...[
    {
      id: 967452,
      href: '#Typography', label: 'Typography', content: <TypographyStyles
        localParams={localParams}
        handleParamChange={handleParamChange}
        handleSubParamChange={handleSubParamChange} />
    },
    {
      id: 749651,
      href: '#layout', 
      label: 'Layout', 
      content: <LayoutStyles
        localParams={localParams}
        handleParamChange={handleParamChange}
        handleSubParamChange={handleSubParamChange}
      />
    },
    {
      id: 967452163,
      href: '#BoxModelStyles', 
      label: 'Box Model', 
      content: <BoxModelStyles
        localParams={localParams}
        handleParamChange={handleParamChange}
        handleSubParamChange={handleSubParamChange} />
    },
    
    {
      id: 478596,
      href: '#Border', label: 'Border', content: <BorderStyles
        localParams={localParams}
        handleParamChange={handleParamChange}
        handleSubParamChange={handleSubParamChange} />
    },
    {
      id: 748579,
      href: '#Background', label: 'Background', content: <BackgroundStyles
        localParams={localParams}
        handleParamChange={handleParamChange}
        handleSubParamChange={handleSubParamChange} />
    },
    {
      id: 96347,
      href: '#box-shadow', label: 'Box Shadow', content: <BoxShadowStyles
        localParams={localParams}
        handleParamChange={handleParamChange}
        handleParamManyChange={handleParamManyChange}
        />
    },
    {
      id: 1429549,
      href: '#Transition', label: 'Transitions', content: <TransitionStyles
        localParams={localParams}
        handleParamChange={handleParamChange}
        handleParamManyChange={handleParamManyChange}
        />
    },
    {
      id: 36251485,
      href: '#Visibility', label: 'Visibility', content: <VisibilityStyles
        localParams={localParams}
        handleParamChange={handleParamChange}
        handleParamManyChange={handleParamManyChange}
        />
    },
  ])

  if (currentBlock) {
    properties.push({
      id: 8965745,
      href: '#blockcontainer', label: 'Block Container', content: <BlockContainerStyles
        localParams={localParams}
        defaultContainer={currentBlock?.container}
        handleSetContainer={handleSetContainer}
        handleParamChange={handleParamChange}
        handleSubParamChange={handleSubParamChange} />
    },)
  }



  return (
    <div className="element-options">

      <FileStorageModal
        handleSelectFile={handleSelectFile}
        show={chooseFile}
        type={currentTemplate ? currentTemplate?.type : null}
        onHide={() => setChooseFile(false)}
      />
      <header className='d-flex align-items-center justify-content-between shadow-lg p-1'>
        {
          currentTemplate ?
            <h4>Element Options</h4>
            :
            <h4>Block Options</h4>
        }
        <span className="return btn btn-close" onClick={handleCloseOption}>
        </span>

      </header>
      <div className='element-options-content'>
        {
          currentTemplate && ["IMAGE", "VIDEO", "AUDIO", "APPLICATION"].includes(currentTemplate?.type)
          &&
          (
            <Accordion
              title={ucfirst(currentTemplate.type)}
              children={<>
                <form >
                  <label htmlFor="alt">Fichier :</label>
                  <button className='btn btn-success' onClick={handleChooseFile}>Choose</button>
                </form>
                <form >
                  <label htmlFor="alt">Text image :</label>
                  <input
                    type="alt"
                    id="alt"
                    value={localImageParams?.alt || ''}
                    onChange={(e) => handleImageParamChange('alt', e.target.value)}
                  />
                </form>
              </>}
            />
          )
        }

        {
          properties.map((property) => {
            return <Accordion
              key={property.id}
              title={property.label}
              children={property.content}
            />
          })
        }

      </div>
    </div>
  );
};

export default ElementOptions;
