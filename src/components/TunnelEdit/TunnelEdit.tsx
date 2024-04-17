/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/02/2024 12:02:39
*/
import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TunnelEdit.css';
// import PageHeader from '../PageHeader/PageHeader';
import { Tunnel } from '../../models/Tunnel';
import { deleteData, getDatasById, sortData } from '../../api/api-entity';
import { useParams } from 'react-router-dom';
import TunnelStepItem from '../TunnelStepItem/TunnelStepItem';
import TunnelStepForm from '../TunnelStepForm/TunnelStepForm';
import { TunnelStep } from '../../models/TunnelStep';
import StepContent from '../StepContent/StepContent';
import ThemeContent from '../ThemeContent/ThemeContent';
import StepSetting from '../StepSetting/StepSetting';
import { ADD_TO_STORAGE } from '../../redux/actions/actionTypes';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCurrentStep } from '../../redux/selectors/selectors';
import { GlobalState } from '../../redux/selectors/types/GlobalState';

interface TunnelEditProps { }

const TunnelEdit: FC<TunnelEditProps> = () => {
  const [tunnel, setTunnel] = useState<Tunnel | null>(null);
  const [createStep, setCreateStep] = useState<boolean>(false);
  const [editingStep, setEditingStep] = useState<TunnelStep>();
  const dispatch = useDispatch()
  const { tunnelId } = useParams();
  const currentStep = useSelector((state: GlobalState) => getCurrentStep(state, tunnelId!));


  const runLocalData = async () => {
    if (tunnelId) {
      const data = await getDatasById('tunnel', tunnelId);
      if (data.isSuccess) {
        setTunnel(data.result);
        if(!currentStep && data?.result?.steps[0]){
          dispatch({
            type: ADD_TO_STORAGE,
            unique: true,
            key: tunnelId,
            payload: data.result.steps[0]
          })
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData();
  }, []);

  const tabs = [
    { href: '#theme', label: 'Theme', content: <ThemeContent currentStep={currentStep} tunnelId={tunnelId}/> },
    { href: '#setting', label: 'Settings', content: <StepSetting tunnelId={tunnelId}/> },
    // { href: '#rules', label: 'Rules', content: <div>Rules Content</div> },
    // { href: '#test', label: 'A/B Test', content: <div>A/B Test Content</div> },
    // { href: '#stats', label: 'Stats', content: <div>Stats Content</div> },
    // { href: '#leads', label: 'Leads', content: <div>Leads Content</div> },
    // { href: '#sales', label: 'Sales', content: <div>Sales Content</div> },
    // { href: '#deadline', label: 'Deadline', content: <div>Deadline Content</div> },
    // Add more tabs as needed with respective content
  ]

  const handleSaveStep = async (data: any) => {
    console.log(data)
    if(data.isSuccess && data.result){
      setTunnel((t)=>{
        t?.steps?.push(data.result)
        return t
      })
     
    }
    
    setCreateStep(false);
    setEditingStep(undefined)
  };

  const onDragEnd = (result: any) => {
    console.log({ result })
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
    const updatedSteps = [...(tunnel?.steps || [])];
    const [draggedItem] = updatedSteps.splice(source.index, 1);
    updatedSteps.splice(destination.index, 0, draggedItem);

    const pos = updatedSteps.map((d, index) => { return { _id: d._id, position: index } })
  
    sortData('TunnelStep', { datas: pos })


    // Update the state with the new order
    setTunnel((prevTunnel: any) => ({
      ...prevTunnel,
      steps: updatedSteps,
    }));
  };

  const handleStepClick = (clickedStep: TunnelStep) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: clickedStep?.tunnelId,
      payload: clickedStep
    })
  };

  const handleDeleteStep = async (clickedStepId: string) => {
    deleteData('tunnelstep', clickedStepId);
    const updatedSteps = [...(tunnel?.steps || [])].filter((t)=> t._id !== clickedStepId);
    // Update the state with the new order
    setTunnel((prevTunnel: any) => ({
      ...prevTunnel,
      steps: updatedSteps,
    }));
  };
  const handleEditItem = async (clickedStep: TunnelStep) => {
    setEditingStep(clickedStep)
    // deleteData('tunnelstep', clickedStep);
    
  };
  const handleCloseStepModal =() => {
    setCreateStep(false)
     setEditingStep(undefined)
    // deleteData('tunnelstep', clickedStep);
    
  };
  

  return (
    <>
      {/* <PageHeader name={tunnel?.name || ''} /> */}
     
        <TunnelStepForm
          title={(!!editingStep ? 'Update ' : 'Create ')+'Tunnel Step'}
          tunnelId={tunnelId!}
          show={createStep || !!editingStep}
          editingStep={editingStep}
          onHide={handleCloseStepModal}
          handleSubmit={handleSaveStep}
        />
     
      <div className='TunnelEdit container-fuild py-2 px-5'>
        <div className='d-flex gap-3'>
          <div className='col-md-3 content d-flex card p-1'>
            <div className="aside">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                  {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {tunnel?.steps?.map((step, index) => (
                        <Draggable key={step._id} draggableId={step._id as string} index={index}>
                          {(item: any) => (
                            <div
                              ref={item.innerRef}
                              {...item.draggableProps}
                              {...item.dragHandleProps}
                              onClick={() => handleStepClick(step)}
                            >
                              <TunnelStepItem 
                              isActive={currentStep?._id === step._id}
                              handleEdit={()=>handleEditItem(step)}
                              handleDelete={()=>handleDeleteStep(step._id!)}
                              step={step} 
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <button onClick={() => setCreateStep(true)} className='btn btn-primary'>
              <svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} fill='currentColor' className='bi bi-plus-lg' viewBox='0 0 16 16'>
                <path fillRule='evenodd' d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2' />
              </svg>
              Add Step
            </button>
          </div>
          <div className='col-md-9 content card'>
            <div className="step-content">
              <StepContent tabs={tabs}  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TunnelEdit;
