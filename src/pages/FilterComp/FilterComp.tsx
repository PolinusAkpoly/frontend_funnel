/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 29/01/2024 13:53:39
*/

import React, { FC, useEffect, useRef, Fragment } from 'react';
import './FilterComp.css';

interface FilterCompProps {
  handleSearch: (tag: string) => void;
}

const FilterComp: FC<FilterCompProps> = ({ handleSearch }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      // setLoading(false);
    };
    runLocalData();
  }, []);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      const tagValue = inputRef.current.value;
      handleSearch(tagValue);
    }
  };

  return (
    <Fragment>
      <div className="FilterComp">
        <form onSubmit={onSubmit} className="d-flex gap-2 align-items-center">
          <input ref={inputRef} placeholder='Search ...' type="search" name="tag" className="form-control" />
          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default FilterComp;
