/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/02/2024 10:12:56
*/
import React, { FC, useEffect, useState } from 'react';
import './SiteEditor.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { generateId } from '../../helpers/utils';
import SiteEditorSideBar from '../SiteEditorSideBar/SiteEditorSideBar';
import { Block } from '../../models/Block';
import { getTunnelStepTemplate, saveTunnelStepTemplate } from '../../api/api-tunnel';
import Loading from '../Loading/Loading';
// import { EditorStateToHtml } from '../../helpers/utiles';
import { ADD_NOTIFICATION, ADD_TO_STORAGE } from '../../redux/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import FileDropModal from '../FileDropModal/FileDropModal';
import {  addDataWithFile, getDatasById } from '../../api/api-entity';
import FileStorageModal from '../FileStorageModal/FileStorageModal';
import { getBlocks, getCurrentBlock, getCurrentStep } from '../../redux/selectors/selectors';
import BlockElementList from '../BlockElementList/BlockElementList';
import { BlockTemplate } from '../../models/BlockTemplate';
import CustomLink from '../CustomLink/CustomLink';
import { Tunnel } from '../../models/Tunnel';
import { GlobalState } from '../../redux/selectors/types/GlobalState';
import TunnelStepForm from '../TunnelStepForm/TunnelStepForm';
// import { getItem } from '../../helpers/localsorage.service';



interface SiteEditorProps { }

const SiteEditor: FC<SiteEditorProps> = () => {

  
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true);
  const [blockDragOver, setBlockDragOver] = useState<boolean>(false);
  const { tunnelId, stepId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [addStep, setAddStep] = useState(false);
  const [showStorage, setShowStorage] = useState(false);
  const [tunnel, setTunnel] = useState<Tunnel | null>(null);
  const currentStep = useSelector((state: GlobalState) => getCurrentStep(state, tunnelId!));
  const navigate = useNavigate()
  const currentBlock = useSelector(getCurrentBlock)

  
  const blocks = useSelector(getBlocks)
  
  // console.log(blocks[0].templates);

// const getAccordions = (accordions: any) =>{
// let tempaltes = accordions[0].templates
// tempaltes.filter((tempalte: any)=> tempalte.type !== "LINK")
// return tempaltes


// }
// console.log(getAccordions(blocks));

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

  const updateBlocks = (newBlocks: Block[]) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: 'blocks',
      payload: newBlocks
    })
  }

  const runLocalData = async () => {

    const datas = await getTunnelStepTemplate(tunnelId!, stepId!);
    
    if (datas?.isSuccess && datas.blocks && datas.blocks.length) {
      // datas.blocks = datas.blocks.map((block: Block) => {
      //   const templates = block.templates.map((template) => {
      //     if (template.type === "BUTTON") {
      //       return template
      //     }
      //     return { ...template, content: handleLoadTemplate(template.content as string) }
      //   })

      //   return { ...block, templates }
      // })
      // console.log(datas.blocks);
      
      updateBlocks(datas.blocks)
    } else {
      updateBlocks([])
    }

    const data = await getDatasById('tunnel', tunnelId!);

    if (data.isSuccess) {
      setTunnel(data.result);
      if (!currentStep && data?.result?.steps[0]) {
        dispatch({
          type: ADD_TO_STORAGE,
          unique: true,
          key: tunnelId,
          payload: data.result.steps[0]
        })
      }
    }

    setLoading(false);
  };

  useEffect(() => {

    updateCurrentBlock(undefined)
    updateCurrentTemplate(undefined)
    runLocalData();
  }, [tunnelId, stepId]);

  const handleSaveTemplate = () => {
    try {

      const newBlock = blocks.map((block: Block) => {
        block.templates = block.templates.map((template) => {
          let content
          if (typeof template.content !== "string") {
          //  console.log( typeof JSON.stringify(getItem("accordion")));

           content = JSON.stringify(template.content)
                     
            // content = EditorStateToHtml(template.content) as string;
           
          } else {
            content = template.content
          }
          return { ...template, content };
        })
        return block
      })

      if (tunnelId) {
        saveTunnelStepTemplate(tunnelId, stepId!, newBlock);
        

        if (currentBlock) {
          saveTunnelStepTemplate(tunnelId, stepId!, currentBlock);
          
        }

        dispatch({
          type: ADD_NOTIFICATION,
          payload: {
            _id: generateId(),
            message: "Template saved !",
            status: "success",
            timeout: 2000
          }
        })
      }


    } catch (error) {
      console.log({ error });

    }
  };

  // const handleDropBlock = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();

  //   const item = JSON.parse(event.dataTransfer.getData('text'));
  //   console.log({item});
    
  //   if (item && item.type.includes('block')) {
  //     let count = 1;

  //     switch (true) {
  //       case item.type.includes('two'):
  //         count = 2;
  //         break;
  //       case item.type.includes('three'):
  //         count = 3;
  //         break;
  //       case item.type.includes('four'):
  //         count = 4;
  //         break;
  //       case item.type.includes('five'):
  //         count = 5;
  //         break;
  //       case item.type.includes('six'):
  //         count = 6;
  //         break;
  //       // Add more cases if needed

  //       default:
  //         // Handle the default case or leave count as 1
  //         break;
  //     }

  //     console.log({ type: item.type });

  //     const newBlock: Block = {
  //       _id: generateId(),
  //       columnCount: count,
  //       position: blocks.length,
  //       templates: [],
  //       containerStyles: { boxSizing: "borderBox" },
  //       styles: { boxSizing: "borderBox" }
  //     };

  //     let updatedBlocks = [...blocks, newBlock]
  //     updateBlocks(updatedBlocks)
  //   }

  //   setBlockDragOver(false);
  // }

  const handleDropBlock = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const itemString = event.dataTransfer.getData('text');
    if (!itemString) {
        console.log('No data transferred');
        return;
    }

    try {
        const item = JSON.parse(itemString);
        console.log({ item });
        
        if (item && item.type && item.type.includes('block')) {
          let count = 1;

          switch (true) {
            case item.type.includes('two'):
              count = 2;
              break;
            case item.type.includes('three'):
              count = 3;
              break;
            case item.type.includes('four'):
              count = 4;
              break;
            case item.type.includes('five'):
              count = 5;
              break;
            case item.type.includes('six'):
              count = 6;
              break;
            // Add more cases if needed

            default:
              // Handle the default case or leave count as 1
              break;
          }

          console.log({ type: item.type });

          const newBlock: Block = {
            _id: generateId(),
            columnCount: count,
            position: blocks.length,
            templates: [],
            containerStyles: { boxSizing: "borderBox" },
            styles: { boxSizing: "borderBox" }
          };

          let updatedBlocks = [...blocks, newBlock];
          updateBlocks(updatedBlocks);
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }

    setBlockDragOver(false);
}


  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setBlockDragOver(true)
    console.log("onDragOver");

  }

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setBlockDragOver(false)
    console.log("onDragLeave");

  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  }

  const handleChangePage = (event: any) => {
    const currentStepId = event.target.value
    const step = tunnel?.steps?.find(t => t._id == currentStepId)
    navigate(`/template/${currentStepId}/${step?.tunnelId}/editor`)
  }
  
  const handleFilesDrop = (files: FileList) => {
    // Faites quelque chose avec les fichiers déposés
    console.log('Fichiers déposés :', files);
    Array.from(files).forEach((file: File) => {
      const newFile = {
        name: file.name.split('.')[0],
        type: file.type
      }

      const formData = new FormData()
      formData.append('link', file)
      formData.append('filestorage', JSON.stringify(newFile))
      console.log({ newFile });
      addDataWithFile('filestorage', formData)

    });
    setShowModal(false);
  };

  const handleSaveStep = async (data: any) => {
    if(data.isSuccess && data.result){
      const newStep = data.result
      if(newStep && newStep?._id && newStep?.tunnelId){
        navigate(`/template/${newStep._id}/${newStep?.tunnelId}/editor`)
      }
      setAddStep(false)
    }
  };


  return (
    <div className="SiteEditor">

      <FileDropModal
        showModal={showModal}
        onClose={closeModal}
        onFilesDrop={handleFilesDrop}
      />
      <FileStorageModal
        show={showStorage}
        onHide={() => setShowStorage(false)}
      />
      <TunnelStepForm
          title={'Create Tunnel Step'}
          show={addStep}
          tunnelId={tunnelId!}
          onHide={()=>setAddStep(false)}
          handleSubmit={handleSaveStep}
        />
      <header className="Header bg-dark d-flex justify-content-between p-1 shadow">
        <div className="HeaderBrandWrapper d-flex gap-1">
          {/* <img
            src="/logo192.png"
            alt="Mudey Funnel editor"
            height="30"
            data-test-element="editor-logo"
          /> */}
          <div className="HeaderSettingsWrapperUi d-flex gap-1">
            <button title="Undo" className="GreenButtonUi btn btn-primary btn-sm">
              <span className="fas fa-undo"></span>
            </button>


            <button title="Redo" className="GreenButtonUi btn btn-primary btn-sm">
              <span className="fas fa-redo"></span>
            </button>

            <button title="Page settings" className="GreenButtonUi btn btn-primary btn-sm">
              Settings
            </button>
            <button title="Pop up" className="GreenButtonU btn btn-primary btn-sm">
              Popups
            </button>
            <button onClick={openModal} title="Pop up" className="GreenButtonU btn btn-primary btn-sm">
              Upload Files
            </button>
            <button onClick={() => setShowStorage(true)} title="Pop up" className="GreenButtonU btn btn-primary btn-sm">
              Storage
            </button>
            <button onClick={()=>setAddStep(true)} title="Pop up" className="GreenButtonU btn btn-primary btn-sm">
              Add Step
            </button>
            <select value={stepId} name='stepId' onChange={handleChangePage}>
              {
                tunnel?.steps?.map((step) => {
                  return <option key={step._id} value={step._id}>
                    {step.name}
                  </option>
                })
              }
            </select>

          </div>
        </div>

        <h4>Tunnel : {tunnel?.name}</h4>
        {/* <div className="tunnelData d-flex">
        <h4>Tunnel : </h4>
              <select name="tunnelId" id="">

              </select>
        </div> */}
        <div className="HeaderActionsWrapperUi-ynel5a-0 d-flex gap-1 ">

          <CustomLink
            stepId={stepId!}
            tunnelId={tunnelId!}
          />

          <button onClick={handleSaveTemplate} title="Save changes" data-test-element="button-save-changes"
            className="BlueButtonUi  btn btn-primary btn-sm">
            Save changes
          </button>

          <Link to={"/tunnel/" + tunnelId + "/custom"} title="Exit"
            className="GreenButtonUi  btn btn-primary btn-sm">
            <span className="fas fa-sign-out-alt"></span>
          </Link>
        </div>
      </header>
      <div className="SiteEditorContent row gx-0 gy-0">
        <aside className="col-md-2">
          <SiteEditorSideBar />
        </aside>
        <main className={"col position-static " + (blockDragOver ? 'over' : '')}
          onDrop={handleDropBlock}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}>
          {
            loading ?
              <Loading />
              :
              <BlockElementList />
          }
        </main>

      </div>
    </div>
  );
}

export default SiteEditor;