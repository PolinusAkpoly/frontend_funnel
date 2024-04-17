import React, { FC, useEffect, useState } from 'react';
import './ModelContent.css';
import FormModel from '../FormModel/FormModel';
import { ucfirst } from '../../helpers/utiles';
import { IColumn } from '../../models/IColumn';
import CustomPagination from '../CustomPagination/CustomPagination';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { getItem, setItem } from '../../helpers/localsorage.service';
import { deleteData, getDatas, getDatasByPage, searchDatas, updateData, updateDataById } from '../../api/api-entity';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import ViewModel from '../ViewModel/ViewModel';
import ImagePreview from '../ImagePreview/ImagePreview';
import { Formule } from '../../models/Formule';



interface ModelContentProps {
  page: number
  limit: number
  model: string
}

const ModelContent: FC<ModelContentProps> = ({ model, page, limit }) => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<any>(null);
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate()
  const [datas, setDatas] = useState<any>(null);
  const [formules, setFormules] = useState<any>(null);
  const location = useLocation();
  const querys = new URLSearchParams(location.search);
  let query: any = querys.get('query');
  let tag: any = querys.get('tag');

  



  const runLocalData = async () => {
    let data
    if (query && tag) {
      let newQuery = query.split(',').filter((name: string) => !!name).map((name: string) => `${name}=${tag}`).join('&')
      console.log({ newQuery });
      data = await searchDatas(model || 'user', newQuery, page, limit)
    } else {
      data = await getDatasByPage(model || 'user', page, limit)
    }
    setItem('adminPage', page);
    setItem('adminLimit', limit);

    if (data.isSuccess) {
      setDatas(data)
      const storedInitialColumns: any = getItem(model + 'Column')
      // if (model == "avantage") {
      const allFormules = await getDatas('formule')

      setFormules(allFormules)
      // }
      console.log(model + 'Column');
      console.log({ storedInitialColumns });

      if (storedInitialColumns && storedInitialColumns.length) {
        setColumns(storedInitialColumns);
      } else if (data && data.results && data.results.length) {
        const initialColumns = Object.keys(data.results[0]).filter((d: any) => d !== '_id')
          .map((name, index) => ({ name, checked: index <= 2 }))
        setColumns(initialColumns);
        setItem(model + 'Column', initialColumns)
      } else {
        setDatas(null)
      }
    }
    // setLoading(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData()
  }, [model, page, limit]);



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const initialColumns = columns.map((column: any) => column.name === name ? { ...column, checked: event.target.checked } : column)
    setColumns(initialColumns)
    setItem(model + 'Column', initialColumns)
  };

  const handlePageChange = (pageNumber: number) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', String(pageNumber));
    navigate(window.location.pathname + "?" + queryParams.toString());
  }

  const handleChangeLimit = (event: any) => {
    const newLimit: number = parseInt(event.target.value, 10);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('limit', String(newLimit));
    navigate(window.location.pathname + "?" + queryParams.toString());
  };

  const handleSearch = (params: string, tagValue: string) => {
    const queryParams = new URLSearchParams(window.location.search);

    // Update the 'limit' parameter
    queryParams.set('query', params);
    queryParams.set('tag', tagValue);
    navigate(window.location.pathname + "?" + queryParams.toString());
  }

  const handleDeleteConfirm = () => {
    // Logique de suppression ici
    // ...
    console.log({ currentData });
    if (model) {
      deleteData(model, currentData._id)
    }
    const newData = datas
    newData.results = newData.results.filter((c: any) => c._id !== currentData._id)
    setDatas(newData)
    setCurrentData(null)
    // Fermer le modal après la suppression
    setShowDeleteModal(false);
  };

  const handleEditClick = (data: any) => {
    setCurrentData(data)
    setModal(true);
  };
  const handleViewClick = (data: any) => {
    setCurrentData(data)
    setShowViewModal(true);
  };
  const handleDeleteClick = (data: any) => {
    setCurrentData(data)
    setShowDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    // Annuler la suppression
    setCurrentData(null)
    setShowDeleteModal(false);
  };
  const handleCloseFormModal = () => {
    setCurrentData(null)
    setShowDeleteModal(false);
    setShowViewModal(false)
    setModal(false)
    runLocalData()
  }

  const handleChangeFormul = async (event: React.ChangeEvent<HTMLInputElement>, data: any, formule: any) => {
    const { checked } = event.target;
    let updatedAvantage: any = { ...data };

    if (checked) {
      if (!data.formules.includes(formule._id)) {
        updatedAvantage.formules = [...data.formules, formule._id];
      }
    } else {
      updatedAvantage.formules = data.formules.filter((_id: string) => _id !== formule._id);
    }

    await updateDataById('avantage', data._id, {
      [model]: updatedAvantage,
      [ucfirst(model)]: updatedAvantage,
    });

    // console.log(updateOnedata);
  }

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          {columns?.filter((column: any) => column.checked).map((column: any, index: number) => (
            <th key={index}>{ucfirst(column.name)}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
    );
  };

  const handleUpdateBoolean = async (event: React.ChangeEvent<HTMLInputElement>, data: any) => {
    const { name, checked } = event.target;
    console.log({ [name]: checked });
    const newData = { [name]: checked }
    if (data) {
      await updateData(model, data._id, { [ucfirst(model)]: newData, [model]: newData });
    }
  };

  const getHTMLContent = (data: any, name: string) => {
    if (typeof data[name] === 'string' && data[name].match(/\.(jpeg|jpg|gif|png|webp)$/) != null) {
      // Si data[name] est une URL d'image, retourne l'élément React <img>.
      // return <img className="border" width="100" src={data[name]} alt="Image" />;
      return <ImagePreview width="100" imageUrl={data[name]} altText="Image" />
    }
    if (typeof data[name] === 'string' && data[name].match(/\.(mp4)$/) != null) {
      // Si data[name] est une URL d'image, retourne l'élément React <img>.
      return <video
        className="border"
        controls
        width="100" src={data[name]}
      />;
    }

    if (typeof name === 'string' && name.toLowerCase().startsWith('is')) {
      // Si le nom commence par 'is', retourne l'élément React <input> avec la classe CSS appropriée.
      return (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
            name={name}
            onChange={(event) => handleUpdateBoolean(event, data)}
            defaultChecked={!!data[name]}
          />
        </div>
      );
    }
    if (typeof data[name] !== 'string') {
      if (name === 'formules') {
        return <div className="d-flex gap-1">
          {formules?.results?.map((formule: Formule) => {
            return <div key={formule._id} className='d-flex gap-1'>             
              {formule.name}
              <div className="form-check form-switch">
                <input
                  onChange={(event) => handleChangeFormul(event, data, formule)}
                  className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                  defaultChecked={data[name]?.includes(formule._id)}
                />
              </div>

            </div>
          })}
        </div>
      }      
      else {
        return 'nothing'

      }

    }

    // Si ce n'est pas une URL d'image ou un nom qui commence par 'is', retourne les données telles quelles.
    return data[name];
  };


  const renderTableBody = () => {
    if (!datas || !datas.results || datas.results.length === 0) {
      return null;
    }

    return (
      <tbody>
        {datas.results.map((data: any, index: number) => (
          <tr key={index}>
            <td>{datas.allCount - ((datas.current - 1) * limit) - index}</td>

            {columns?.filter((column: IColumn) => column.checked).map((column: IColumn, index2: number) => (
              <td key={column.name + index2}  >
                {getHTMLContent(data, column.name)}

              </td>
            ))}

            <td>
              <div className="d-flex">
                <button className="btn btn-success me-1" onClick={() => handleViewClick(data)}>View</button>
                <button className="btn btn-warning me-1" onClick={() => handleEditClick(data)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(data)}>Delete</button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };


  return (
    <div className="ModelContent w-100 p-2">
      <h2>{ucfirst(model || 'model')} Table</h2>
      <DeleteConfirmModal show={showDeleteModal} onHide={handleDeleteCancel} onConfirm={handleDeleteConfirm} />
      {modal &&
        (<FormModel
          model={model}
          columns={columns}
          modelId={currentData?._id}
          handleClose={handleCloseFormModal}
        />)}

      {
        showViewModal &&
        (<ViewModel
          modelId={currentData?._id}
          model={model}
          handleClose={handleCloseFormModal}
        />)
      }
      <div className="lines d-flex justify-content-between my-1">
        <button className="btn btn-primary" onClick={() => setModal(!modal)}>
          Create
        </button>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Columns
          </button>
          <ul className="dropdown-menu">
            {columns?.map((column: any) => (
              <li className="d-flex m-1 align-items-center form-check form-switch" key={column.name}>
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
      </div>
      {
        datas?.allCount ?
          <>
            <div className="data-pagination d-flex justify-content-between">
              <div>
                {datas && (datas.next || datas.previous) && <CustomPagination pageInfo={datas} onPageChange={handlePageChange} />}
              </div>
              <div>
                <SearchBar columns={columns} onSearch={handleSearch} />
              </div>
              <div className='mb-1'>
                <select onChange={handleChangeLimit} name="pageLimit" className='form-control ' id="pageLimit" defaultValue={String(limit)}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            <div className="content w-100 card">
              <table className="table table-bordered">
                {renderTableHeader()}
                {renderTableBody()}
              </table>

            </div>
            <div className="data-pagination">
              {datas && (datas.next || datas.previous) && <CustomPagination pageInfo={datas} onPageChange={handlePageChange} />}
            </div>
          </>
          :
          <div className="card p-5">
            Empty
          </div>
      }
    </div>
  );
};

export default ModelContent;
