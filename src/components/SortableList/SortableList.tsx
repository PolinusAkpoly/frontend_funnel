/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/02/2024 21:33:12
*/
import React, { useEffect, useRef } from 'react';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
interface SortableListProps {
  containerClassName?: string
  itemClassName?: string
  items: { id: string, content: React.ReactNode }[];
  onOrderChange?: (newOrder: { id: string, position: number }[]) => void;
}

const SortableList: React.FC<SortableListProps> = ({ items,containerClassName,itemClassName, onOrderChange }) => {

  const sortableRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (sortableRef.current) {
      const sortable = $(sortableRef.current).sortable({
        update: (event: any ) => {
          if (onOrderChange) {
            const newOrder: { id: string, position: number }[] = []
            Array.from(event.target.children).forEach((item: any, index: number)=>{
              newOrder.push({id: item.dataset.id, position: index })
            })
            onOrderChange(newOrder)
          }
        }
      });
      return () => {
        sortable.sortable('destroy');
      };
    }

  }, [items, onOrderChange]);

  return (
    <div ref={sortableRef} className={`sortable ${containerClassName ? containerClassName :  ''}`}>
      {items.map((item, index) => (
        <div key={item.id} data-id={item.id} data-position={index} className={`ui-state-default ${itemClassName ? itemClassName :  ''}`}>
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default SortableList;


