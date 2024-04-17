import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Response } from '../../models/Response';

interface CustomPaginationProps {
  pageInfo: Response<any>;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  pageInfo,
  onPageChange,
}) => {
  const { current, allCount, resultCount } = pageInfo;

  const totalPages = Math.ceil(allCount / resultCount);

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };
  
  

  const renderPaginationItems = () => {
    const pagesToShow = 2; // Nombre de pages à afficher avant et après la page actuelle
    const items: JSX.Element[] = [];

    // Afficher le bouton "First"
    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={current === 1}
      />
    );
    
    // Afficher les pages avant la page actuelle
    for (let i = current - pagesToShow; i < current; i++) {
      if (i > 0) {
        items.push(
          <Pagination.Item
            key={i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    // Afficher la page actuelle
    items.push(
      <Pagination.Item key={current} active>
        {current}
      </Pagination.Item>
    );

    // Afficher les pages après la page actuelle
    for (let i = current + 1; i <= current + pagesToShow; i++) {
      if (i <= totalPages) {
        items.push(
          <Pagination.Item
            key={i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    // Afficher le bouton "Last"
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={current === totalPages}
      />
    );

    return items;
  };

  return <Pagination>{renderPaginationItems()}</Pagination>;
};

export default CustomPagination;
