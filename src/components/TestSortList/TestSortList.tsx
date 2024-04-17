/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/02/2024 21:59:10
*/
import React, { FC, useEffect } from 'react';
import './TestSortList.css';
import SortableList from '../SortableList/SortableList';


interface TestSortListProps {

}


const TestSortList: FC<TestSortListProps> = () => {

  const items = [
    {
      id: "1",
      content: <div key="1">Item 1</div>
    },
    {
      id: "2",
      content: <span key="2">Item 2</span>
    },
    {
      id: "3",
      content: <span key="3">Item 3</span>
    },
    {
      id: "4",
      content: <span key="4">Item 4</span>
    },
    {
      id: "5",
      content: <span key="5">Item 5</span>
    },
    {
      id: "6",
      content: <span key="6">Item 6</span>
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  }, [])

  const handleOrderChange = (newOrder: any) => {
    console.log({ newOrder });
  };

  return (
    <div className="TestSortList container">
      TestSortList Component
      <SortableList
        items={items}
        onOrderChange={handleOrderChange}
      />
    </div>
  );
}

export default TestSortList;