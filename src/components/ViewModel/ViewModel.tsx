/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 27/01/2024 22:55:37
*/
import React, { FC, useEffect, useState } from 'react';
import { Modal , Button} from 'react-bootstrap';
import './ViewModel.css';
import Loading from '../Loading/Loading';
import { getFields } from '../../helpers/manage-routes';
import { getDatasById } from '../../api/api-entity';
import { ucfirst } from '../../helpers/utiles';

interface ViewModelProps {
  model: string;
  modelId: string;
  handleClose: () => void;
}

const ViewModel: FC<ViewModelProps> = ({ handleClose, model, modelId }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [columnInputs, setColumnInputs] = useState<any>([]);
  const [data, setData] = useState<any>();

  const runLocalData = async () => {
    setShowForm(true);
    setLoading(false);

    const newCol = getFields(model); //columns?.map((column: IColumn) => getInputData(column.name)).filter((a) => !!a)
    setColumnInputs(newCol);

    if (modelId) {
      // update
      const newData = await getDatasById(model, modelId);
      console.log({ newData, newCol });

      if (newData.isSuccess) {
        setData(newData.result); // Fix: Update the state with the retrieved data
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData();
  }, [model, modelId]);

  const renderTableHeader = () => {
    console.log({ data });

    return (
      <table className='table table-bordered table-striped'>
        <tbody>
          {columnInputs?.map((column: any, index: number) => (
            <React.Fragment key={index}>
              <tr>
                <th scope="col" >{ucfirst(column.name)}</th>
                <td scope="row">{data && data[column.name]}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Modal centered show={showForm} scrollable onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View</Modal.Title>
      </Modal.Header>
      <Modal.Body>{loading ? <Loading /> : <>{renderTableHeader()}</>}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModel;
