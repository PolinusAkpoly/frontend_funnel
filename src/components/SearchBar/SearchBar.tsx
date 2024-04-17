import React, { useState, ChangeEvent, useEffect } from 'react';
import { IColumn } from '../../models/IColumn';
import { ucfirst } from '../../helpers/utiles';
import { useLocation } from 'react-router-dom';

interface SearchBarProps {
  columns: IColumn[];
  onSearch: (params: string, query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, columns }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchColumns, setSearchColumns] = useState<any[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let tag: any = queryParams.get('tag');
  let query: any = queryParams.get('query');

  useEffect(() => {
   
    let queryArray: any[] = []

    if(query){
      queryArray = query.split(',')
    }
    
    setSearchColumns(
      columns.map((column, index) => { return { name: column.name, checked: (index == 0)|| (queryArray.includes(column.name)) } })
    )
  }, [columns])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event: any) => {
    event.preventDefault()
    const params = searchColumns.filter(s => s.checked).map(c => c.name).join(',')
    onSearch(params, searchQuery);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setSearchColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.name === name ? { ...column, checked: event.target.checked } : column
      )
    );
  };


  return (
    <div className='d-flex gap-1'>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Search By
        </button>
        <ul className="dropdown-menu">
          {searchColumns?.map((column: any,  index) => (
            <li className="d-flex m-1 align-items-center form-check form-switch" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                onChange={(event) => handleChange(event, column.name)}
                checked={column.checked}
              />
              <a className="dropdown-item" href="#">
                {ucfirst(column.name)}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSearch} className='d-flex gap-1'>
        <input
          type="search"
          className='form-control'
          placeholder="Search..."
          value={searchQuery || tag}
          onChange={handleInputChange}
        />
        <button className='btn btn-success' onClick={handleSearch}>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
