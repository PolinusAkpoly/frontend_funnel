/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/02/2024 15:04:36
*/
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ListItem {
  id: string;
  className?: string;
  content: React.ReactNode;
}

interface DraggableListProps {
  items: ListItem[];
  onDragEnd: (result: any) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({ items, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id}  draggableId={item.id} index={index}>
                {(elt) => (
                  <div
                    ref={elt.innerRef}
                    className={item.className}
                    {...elt.draggableProps}
                    {...elt.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
