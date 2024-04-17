/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/02/2024 12:55:24
*/
import React, { FC, useEffect, useState } from 'react';
import './TunnelStepItem.css';
import { ucfirst } from '../../helpers/utiles';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';


interface TunnelStepItemProps {
  step: any,
  isActive: boolean
  handleDelete: ()=>void
  handleEdit: ()=>void
}


const TunnelStepItem: FC<TunnelStepItemProps> = ({ step, isActive, handleDelete, handleEdit }) => {

const [isDeleting, setDeleting] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  const handleDeleteItem = ()=>{
    setDeleting(true)
  }
  const onConfirm = ()=>{
    setDeleting(false)
    handleDelete()
  }
  


  return (
    <>
    {
      isDeleting 
      &&
      <DeleteConfirmModal
      show={isDeleting} 
      onHide={()=>setDeleting(false)} 
      onConfirm={onConfirm}
      />
    }
    <div className={isActive ? "TunnelStepItem active" : "TunnelStepItem"}>
      <div className={"card p-1 mb-1 d-flex flex-row justify-content-between align-items-center "+(isActive ? 'bg-primary' : '')}>
        <div className="step-name">
          <h6>{ucfirst(step?.name)}</h6>
          <p>Type ({step?.type?.name})</p>
        </div>
        <div className="icon d-flex gap-3">
          <div className="icon-edit" onClick={handleEdit}>
            <i className="fa-solid fa-edit" />
          </div>
          <div className="icon-delete" onClick={handleDeleteItem}>
            <i className="fa-solid fa-trash" />
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default TunnelStepItem;