import React, { FC, useEffect, Fragment, useState } from 'react';
import './TunnelComp.css';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import FilterComp from '../FilterComp/FilterComp';
import TunnelForm from '../../components/TunnelForm/TunnelForm';
import { Tunnel } from '../../models/Tunnel';
import { deleteData, getDatasByUserId, updateData } from '../../api/api-entity';
import moment from 'moment';
import { Response } from '../../models/Response';
import CustomPagination from '../../components/CustomPagination/CustomPagination';
import { useNavigate } from 'react-router-dom';
import { ucfirst } from '../../helpers/utiles';
import { Link } from 'react-router-dom';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';

interface TunnelCompProps { }

const TunnelComp: FC<TunnelCompProps> = () => {
  const { t } = useTranslation();
  const [tunnels, setTunnels] = useState<Response<Tunnel> | undefined>();
  const [isCreating, setCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTunnel, setCurrentTunnel] = useState<Tunnel | undefined>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const querys = new URLSearchParams(location.search);
  let page: any = querys.get('page') || 1;
  let limit: any = querys.get('limit') || 5;
  let tag: any = querys.get('tag');

  const runLocalData = async () => {

    const data = await getDatasByUserId('tunnel', tag, page, limit);

    if (data.isSuccess) {
      console.log(data);
      
      setTunnels(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    runLocalData();
  }, [page, tag, limit]);


  const handleCloseModal = () => {
    setIsUpdating(false)
    setCreating(false)
    setIsDeleting(false)
    setCurrentTunnel(undefined)
  }

  const handleUpdate = (data: Tunnel) => {
    let newTunnel: any = { ...tunnels }; // Create a shallow copy to avoid modifying the original state directly

    const existingIndex: any = newTunnel?.results?.findIndex((tunnel: Tunnel) => tunnel._id === data._id);

    if (existingIndex !== -1) {
      // If data with the same _id exists, modify it
      if(newTunnel.results){
        newTunnel.results[existingIndex] = data;
      }

    } else {
      // If data does not exist (search by _id), add it
      newTunnel.results?.unshift(data);

      if (newTunnel?.allCount === 0) {
        newTunnel.allCount = 1;
      } else if (newTunnel?.allCount) {
        newTunnel.allCount++;
      }
    }

    setTunnels(newTunnel);
    handleCloseModal();
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
  const handleSearch = (newTag: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('tag', String(newTag));
    queryParams.set('page', String(1));
    navigate(window.location.pathname + "?" + queryParams.toString());
  };

  const handleUpdateBoolean = async (event: React.ChangeEvent<HTMLInputElement>, data: any) => {
    const { name, checked } = event.target;
    console.log({ [name]: checked });
    const newData = { [name]: checked }
    if (data) {
      let model = 'tunnel'
      await updateData(model, data._id, { [ucfirst(model)]: newData, [model]: newData });
    }
  };

  const startUpdatedTunnel = (tunnel: Tunnel) => {
    console.log({tunnel});    
    setIsUpdating(true)
    setCurrentTunnel(tunnel)
  }
  const startDeletedTunnel = (tunnel: Tunnel) => {
    console.log({tunnel});    
    setIsDeleting(true)
    setCurrentTunnel(tunnel)
  }
  const handleDelete = () => {
    if(currentTunnel && currentTunnel._id){
      deleteData('tunnel', currentTunnel._id)   
    }
    let newTunnel: any = { ...tunnels }; // Create a shallow copy to avoid modifying the original state directly

    newTunnel.results = newTunnel?.results?.filter((tunnel: Tunnel) => tunnel._id !== currentTunnel?._id);

    setTunnels(newTunnel)
    setIsDeleting(false)
    setCurrentTunnel(undefined)
  }

  


  return (
    <Fragment>
  
        <DeleteConfirmModal 
          show={isDeleting}
          onHide={handleCloseModal}
          onConfirm={handleDelete}
        />
     
      {loading ? (
        <Loading />
      ) : (
        <>
          {isCreating || (isUpdating && currentTunnel) ? (
            <TunnelForm
              handleClose={handleCloseModal}
              currentTunnel={currentTunnel}
              handleUpdate={handleUpdate}
            />
          ) : null}
          <div className="TunnelCompHeader">
            <div className="container-fluid p-3 border">
              <div className="d-flex justify-content-between">
                <h2>{t('Tunnel')}</h2>

                <div className="d-flex gap-2 align-items-center">
                  <FilterComp handleSearch={handleSearch} />
                  <button onClick={() => setCreating(true)} className="btn btn-primary">
                    Create funnel
                  </button>
                </div>
              </div>

            </div>
          </div>




          <div className="TunnelComp bg-light p-5">
            <div className="container-fluid">
              <div className="data-pagination d-flex justify-content-between">
                <div>
                  {tunnels?.results && (tunnels?.next || tunnels?.previous) && <CustomPagination pageInfo={tunnels} onPageChange={handlePageChange} />}
                </div>

                <div className='mb-1'>
                  <select onChange={handleChangeLimit}
                  name="pageLimit" 
                  className='form-control ' 
                  id="pageLimit" 
                  defaultValue={limit}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> N° </th>
                        <th>{t('Name')}</th>
                        <th>{t('Status')}</th>
                        <th>{t('Type')}</th>
                        <th>{t('Created')}</th>
                        <th>{t('Actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tunnels?.results?.map((tunnel, index) => (
                        <tr key={index}>
                          <td>{tunnels.allCount - ((tunnels.current - 1) * 5) - index}</td>
                          <td>
                          <Link className="dropdown-item" to={"/tunnel/" + tunnel._id + "/custom"}>
                            {tunnel.name}
                          </Link>
                            
                            </td>
                          <td>

                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox" role="switch"
                                id="flexSwitchCheckChecked"
                                name='isActive'
                                onChange={(event) => handleUpdateBoolean(event, tunnel)}
                                defaultChecked={tunnel.isActive} />
                            </div>

                          </td>
                          <td>{tunnel.type}</td>
                          <td>{moment(tunnel?.created_at).format('DD/MM/YYYY, HH:mm')}</td>
                          <td>
                            <div className="dropdown">
                              <button className="btn btn-outline-success" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                </svg>
                              </button>
                              <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to={"/tunnel/" + tunnel._id + "/custom"}>Custom</Link></li>
                                <li><a className="dropdown-item"  href="#" onClick={() => startUpdatedTunnel(tunnel)}>Edit</a></li>
                                <li><a className="dropdown-item" href="#">View</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => startDeletedTunnel(tunnel)}>Delete</a></li>
                                <li><a className="dropdown-item" href="#">Duplicate</a></li>
                              </ul>
                            </div>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default TunnelComp;
