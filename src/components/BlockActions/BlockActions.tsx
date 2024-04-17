/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/02/2024 11:59:09
*/
import React, { FC } from 'react';
import './BlockActions.css';

interface BlockActionsProps {
  blockId: string;
  isHovered: boolean;
  actionType: 'top' | 'bottom';
  handleAddBlock: (position: 'top' | 'bottom', blockId?: string) => void;
  handleDeleteBlock: (blockId?: string) => void;
  handleDuplicateBlock: (position: 'top' | 'bottom', blockId: string) => void; // Ajout de la fonction de duplication
  handleOptionBlock: (blockId?: string) => void;
}

const BlockActions: FC<BlockActionsProps> = ({ blockId, isHovered, actionType, handleAddBlock, handleDeleteBlock, handleDuplicateBlock, handleOptionBlock }) => {


  return (
    <div className={`d-flex gap-1 BlockActions  ${actionType} `}>
      {
        isHovered ?
          <>
            <span

              onClick={()=>handleOptionBlock(blockId)}
              className={`btn-action`}
            >
              <i className="fas fa-gear"></i> 
            </span>
            <span

              onClick={() => handleAddBlock(actionType, blockId)}
              className={`btn-action`}
            >
              <i className="fas fa-plus"></i> 
            </span>
            <span
              onClick={() => handleDuplicateBlock(actionType, blockId)}
              className={`btn-action`}
            >
              <i className="fas fa-clone"></i> 
            </span>
            <span
              onClick={() => handleDeleteBlock(blockId)}
              className={`btn-action`}
            >
              <i className="fas fa-trash"></i> 
            </span>
          </>
          :
          null
      }
    </div>
  );
};

export default BlockActions;
