/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 19/02/2024 08:20:06
*/
import React, { FC, useEffect } from 'react';
import './BlockElementList.css';
import DraggableList from '../DraggableList/DraggableList';
import BlockElement from '../TemplateEditor/Blocks/BlockElement/BlockElement';
import { Block } from '../../models/Block';
import { useDispatch, useSelector } from 'react-redux';
import { getBlocks } from '../../redux/selectors/selectors';
import {  ADD_TO_STORAGE } from '../../redux/actions/actionTypes';


interface BlockElementListProps {

}


const BlockElementList: FC<BlockElementListProps> = () => {

  const blocks = useSelector(getBlocks)
  const dispatch = useDispatch()

  const updateBlocks = (newBlocks: Block[]) => {
    dispatch({
      type: ADD_TO_STORAGE,
      unique: true,
      key: 'blocks',
      payload: newBlocks
    })
  }
  

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  const handleDragEnd = (result: any) => {
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
    const updatedBlocks = [...(blocks || [])];
    const [draggedItem] = updatedBlocks.splice(source.index, 1);
    updatedBlocks.splice(destination.index, 0, draggedItem);

    const newBlocks = updatedBlocks.map((d, index) => { return { ...d, position: index } })

    // console.log({ newBlocks });
    updateBlocks(newBlocks)
  };
  


  return (
    <div className="BlockElementList">
      <DraggableList
        items={blocks?.map((block: Block) => ({
          id: block._id!,
          content: <BlockElement
            block={block}
          />
        }))}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default BlockElementList;