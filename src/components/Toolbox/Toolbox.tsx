/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 04/02/2024 12:59:54
*/
import React, { useState } from 'react';
import './Toolbox.css';
import { icones } from './icones';
import { Pagination } from 'react-bootstrap';

interface ToolboxItem {
  icon: string;
  title: string;
  type: string;
}

interface ToolboxData {
  name: string;
  datas: ToolboxItem[];
}

interface ToolboxProps {
  toolboxData: ToolboxData;
  handleDrop: (e: ToolboxItem) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({ toolboxData, handleDrop }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(25);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredIcons = icones.filter((icon) => icon.includes(searchTerm));
  const indexOfLastIcon = currentPage * itemsPerPage;
  const indexOfFirstIcon = indexOfLastIcon - itemsPerPage;
  const currentIcons = filteredIcons.slice(indexOfFirstIcon, indexOfLastIcon);

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, item: ToolboxItem) => {
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
    event.currentTarget.style.backgroundColor = 'green';
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);

    if (totalPages <= 1) {
      return null;
    }

    const pagesToShow = 5; // Number of pages to show in pagination (including current page)
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (totalPages - endPage < halfPagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const pageItems = [];


    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    return (
      <Pagination>
        {currentPage > 1 && <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />}
        {pageItems}
        {currentPage < totalPages && <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />}
      </Pagination>
    );
  };


  return (
    <div className="Toolbox">
      <div key={toolboxData.name} className="ToolboxGroupUi mb-10">
        <div className="ToolboxGroupTitleUi"></div>
        <div className="d-flex flex-wrap gap-2">
          {toolboxData.name.toLowerCase() !== 'icones'
            ? toolboxData.datas?.map((item: ToolboxItem, index: number) => (
                <section onClick={() => handleDrop(item)} key={index} className="ToolboxItemListUi d-flex">
                  <div className="ToolboxItemUi" draggable={true} onDragStart={(event) => onDragStart(event, item)}>
                    <div className="ToolboxItemIconWrapperUi-lj0012-0 bdtHnS">
                      <div className={"ToolboxItemIconUi fa-solid fa-" + item.icon}></div>
                    </div>
                    <span className="ToolboxItemTitleUi title">{item.title}</span>
                  </div>
                </section>
              ))
            : currentIcons.map((item: string, index: number) => (
                <section onClick={() => handleDrop({ type: 'icon', icon: item, title: 'Icon' })} key={index} className="ToolboxItemListUi d-flex">
                  <div className="ToolboxItemUi" title={item} draggable={true} onDragStart={(event) => onDragStart(event, { type: 'icon', icon: item, title: 'Icon' })}>
                    <div className="ToolboxItemIconWrapperUi-lj0012-0 bdtHnS">
                      <div className={"ToolboxItemIconUi " + item}></div>
                    </div>
                    <span className="ToolboxItemTitleUi title" >{item}</span>
                  </div>
                </section>
              ))}
        </div>
        {toolboxData.name.toLowerCase() === 'icones' && (
          <div>
            <div className="d-flex justify-content-center py-2">
            <input type="search" placeholder="Search icons" value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className='form-control my-1'
            />
            </div>
            <div className="d-flex justify-content-center py-2">
             {renderPagination()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbox;

