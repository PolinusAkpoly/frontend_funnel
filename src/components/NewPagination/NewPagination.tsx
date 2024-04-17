/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/02/2024 08:34:56
*/
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

interface NewPaginationProps {
  entityName: string;
  filter?: string
  action: (entity: string, searchTag: string, page: number, limit: number) => void;
  handleChange: (data: any[]) => void;
}

const NewPagination: React.FC<NewPaginationProps> = ({ entityName, filter, action, handleChange }) => {
  const [pageInfo, setPageInfo] = useState<any[]>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);

  useEffect(() => {
    const runLocalData = async () => {
      const datas: any = await action(entityName, filter || '', page, limit);
      if (datas.isSuccess) {
        setPageInfo(datas);
        handleChange(datas.results);
      }
    };

    runLocalData();
  }, [page, limit]);

  useEffect(() => {
    // Sauvegarder dans localStorage
    localStorage.setItem('currentPage', page.toString());
    localStorage.setItem('currentLimit', limit.toString());
  }, [page, limit]);

  // Récupérer la page et la limite depuis localStorage lors du chargement
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    const savedLimit = localStorage.getItem('currentLimit');

    if (savedPage) {
      setPage(Number(savedPage));
    }

    if (savedLimit) {
      setLimit(Number(savedLimit));
    }
  }, []);

  const { current, allCount }: any = pageInfo || {};
  const totalPages = Math.ceil(allCount / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPaginationItems = () => {
    if (totalPages <= 1) return null;

    const pagesToShow = 2;
    const items: JSX.Element[] = [];

    items.push(
      <Pagination.First key="first" onClick={() => handlePageChange(1)} disabled={current === 1} />
    );

    if (current) {
      for (let i = Math.max(1, current - pagesToShow); i < current; i++) {
        items.push(
          <Pagination.Item key={i} onClick={() => handlePageChange(i)}>
            {i}
          </Pagination.Item>
        );
      }

      items.push(
        <Pagination.Item key={current} active>
          {current}
        </Pagination.Item>
      );

      for (let i = current + 1; i <= Math.min(totalPages, current + pagesToShow); i++) {
        items.push(
          <Pagination.Item key={i} onClick={() => handlePageChange(i)}>
            {i}
          </Pagination.Item>
        );
      }
    }

    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={current === totalPages}
      />
    );

    return items;
  };

  return (
    <div className='d-flex justify-content-between'>
      <div>
        <select
          className='form-control'
          name="limit"
          value={limit}
          id="limit"
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <Pagination>{renderPaginationItems()}</Pagination>
    </div>
  );
};

export default NewPagination;
