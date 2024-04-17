/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 27/01/2024 22:55:37
*/
import React, { FC, useEffect, useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './FormModel.css';
import { IColumn } from '../../models/IColumn';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import { useFormik } from 'formik';
import Loading from '../Loading/Loading';
import { addData, getDatasById, updateData, updateDataWithFile, addDataWithFile } from '../../api/api-entity';
import { getFields } from '../../helpers/manage-routes';
import TextEditorField from '../TextEditorField/TextEditorField';
import { ucfirst } from '../../helpers/utiles';
// import OptionsField from '../OptionsField/OptionsField';
import NewOptionField from '../NewOptionField/NewOptionField';
import { validateFormModal } from '../../validators/form-validator';


interface FormModelProps {
  modelId?: string;
  model: string;
  columns: IColumn[];
  handleClose: () => void;
}
interface FileItem {
  name: string;
  file: File;
}

const FormModel: FC<FormModelProps> = ({ handleClose, modelId, model, columns }) => {

  const [showForm, setShowForm] = useState(false);
  const [columnInputs, setColumnInputs] = useState<any>([]);
  const [uploadFile, setUploadFile] = useState<FileItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [options, setOptions] = useState<any[]>([]);


  const validate = (values: any) => validateFormModal(values, columns)

  const initialValues: Record<string, string> = {};

  const buildFormData = (uploadFileParam: FileItem[], modelParm: string, data: any) => {
    const formData = new FormData();
    for (let index = 0; index < uploadFileParam.length; index++) {
      const fileItem = uploadFileParam[index];
      formData.append(fileItem.name, fileItem.file);
    }
    formData.append(modelParm, JSON.stringify(data));
    formData.append(ucfirst(modelParm), JSON.stringify(data));
    return formData;
  }

  const handleFormSubmit = async (data: any, modelIdParam?: string, uploadFileParam?: FileItem[]) => {
    setIsSubmitting(true);
    try {
      if (modelIdParam) {
        // update
        if (uploadFileParam?.length) {
          const formData = buildFormData(uploadFileParam, model, data)
          await updateDataWithFile(model, modelIdParam, formData);
        } else {
          await updateData(model, modelIdParam, { [ucfirst(model)]: data, [model]: data });
        }
      } else {
        // create
        if (uploadFileParam?.length) {
          const formData = buildFormData(uploadFileParam, model, data)
          await addDataWithFile(model, formData);
        } else {
          await addData(model, { [ucfirst(model)]: data, [model]: data });
        }
      }

      setIsSubmitting(false);
      handleClose();
    } catch (error) {
      // Gérer les erreurs spécifiques ou afficher un message d'erreur générique
      console.error('Erreur lors de la soumission du formulaire :', error);
      setIsSubmitting(false);
    }
  };


  const formik = useFormik({
    initialValues, // Définir les valeurs initiales en fonction de vos besoins
    validate,
    onSubmit: async (data: any) => {

      if (options.length) {
        data.options = options
      }
      console.log(data);
      await handleFormSubmit(data, modelId, uploadFile);
    },

  });

  const runLocalData = useCallback(async () => {
    setShowForm(true);
    const newCol = getFields(model)  //columns?.map((column: IColumn) => getInputData(column.name)).filter((a) => !!a)
    setColumnInputs(newCol);

    let initValues: any = {}

    if (modelId) {
      // update
      const data = await getDatasById(model, modelId)
      if (data.isSuccess) {
        let result = data.result
        newCol?.forEach((column: any) => { initValues = { ...initValues, [column.name]: result[column.name] } })
      }
    } else {
      // create
      newCol?.forEach((column: any) => { initValues = { ...initValues, [column.name]: "" } })
    }
    console.log({ initValues })
    formik.setValues(initValues);
    if (initValues?.options) {
      setOptions(initValues?.options)
    }
  }, [modelId, columns]);

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData();
  }, [runLocalData]);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { type, files, name } = event.target;

    if (type === 'file' && files && files.length) {
      const newFileObject = { name: name, file: files[0] };
      const isNameExists = uploadFile.some((file) => file.name === name);

      if (isNameExists) {
        // If the name already exists, update the existing file
        setUploadFile((prevUploadFile: any) =>
          prevUploadFile.map((file: any) =>
            file.name === name ? { ...file, file: files[0] } : file
          )
        );
      } else {
        // If the name doesn't exist, add a new file
        setUploadFile((prevUploadFile: any) => [...prevUploadFile, newFileObject]);
      }
    }

    // Assuming you are using Formik, you need to call Formik's handleChange after updating the uploadFile state
    formik.handleChange(event);
  };

  const renderError = (fieldName: string) => {
    return formik.touched[fieldName] && formik.errors[fieldName] ?
    (
      <div className='text-danger'>{formik.errors[fieldName] as any}</div>
    )
    :
    null
  };

  return (
    <Modal centered show={showForm} scrollable onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          isSubmitting ?
            <Loading />
            :
            <Form onSubmit={formik.handleSubmit}>
              {columnInputs.map((data: any, index: number) => {

                if (data.type.startsWith('input')) {
                  return <div>
                    <InputField
                      key={index}
                      type={data.inputType}
                      name={data.name}
                      label={data.label}
                      value={formik.values[data.name] as any}
                      onChange={data.inputType !== 'file' ? formik.handleChange : handleChangeFile}
                    />
                    {renderError(data.name)}
                  </div>

                }
                if (data.type === 'select') {
                  return <div>
                    <SelectField
                      key={index}
                      label={data.label}
                      name={data.name}
                      model={data?.model}
                      options={data.options}
                      value={formik.values[data.name]}
                      onChange={formik.handleChange}
                    />
                    {renderError(data.name)}
                 </div>
                }
                if (data.type === 'editor') {
                  return (<div>
                    <TextEditorField
                      key={index}
                      label={data.label}
                      value={formik.values[data.name]}
                      onChange={(value) => formik.setFieldValue(data.name, value)}
                    />
                    {renderError(data.name)}
                    </div>
                  );
                }
                if (data.type === 'options') {
                  // console.log(formik.values?.options);

                  return <div>
                    <NewOptionField
                      key={index}
                      fields={data.options}
                      setOptions={setOptions}
                      optionValues={options}

                    />
                    
                  </div>
                }

                return null; // Vous pouvez ajuster cela en fonction de vos besoins
              })}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {
                  modelId ?
                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                    :
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                }
              </Modal.Footer>
            </Form>
        }
      </Modal.Body>
    </Modal>
  );
};

export default FormModel;
