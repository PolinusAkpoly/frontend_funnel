/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 01/02/2024 16:11:12
*/
import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { addData, getDatas, updateData } from '../../api/api-entity';
import { TunnelStep } from '../../models/TunnelStep';

interface TunnelStepFormProps {
  title: string;
  tunnelId: string;
  show: boolean;
  editingStep?: TunnelStep;
  onHide: () => void;
  handleSubmit: (data: any) => void;
}

const TunnelStepForm: React.FC<TunnelStepFormProps> = ({ title, tunnelId,handleSubmit, editingStep, show, onHide }) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState([]);

  const initialValues = {
    name: editingStep?.name || '',
    type: editingStep?.type?._id || '',
    tunnelId: tunnelId,
  };
  const formik = useFormik({
    initialValues,
    validate: (values: any) => {
      const errors: any = {};

      // Add validation rules here
      if (!values.name) {
        errors.name = t('Name is required');
      }

      if (!values.type) {
        errors.type = t('Type is required');
      }

      return errors;
    },
    onSubmit: async (step: any) => {
      // onSubmit(step);
      let result 
      const newStep: TunnelStep = { ...step };
      if (editingStep) {
        // update
        result = await updateData('tunnelstep', editingStep._id!, { TunnelStep: newStep });
      } else {
        //create
        result = await addData('tunnelstep', { TunnelStep: newStep });
      }
      handleSubmit(result);
    },
  });



  useEffect(() => {
    formik.setValues({
      name: editingStep?.name || '',
      type: editingStep?.type?._id || '',
      tunnelId: tunnelId,
    })
  }, [editingStep])



  const loadData = async () => {
    const stepTypes = await getDatas('TunnelStepType');
    if (stepTypes?.isSuccess) {
      setOptions(stepTypes.results.map((s: any) => ({ _id: s._id, name: s.name })));
    }
  };

  useEffect(() => {
    loadData();
  }, []);



  return (
    <Modal show={show} centered size="lg" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div className="row py-2">
            <div className="form-floating mb-3 col-md-12">
              <input
                placeholder={t('Name')}
                type="text"
                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                name="name"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label htmlFor="name">{t('Name')}</label>
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="form-floating mb-3 col-md-12 p-0">
            <select
              name="type"
              id="type"
              onChange={formik.handleChange}
              className={`form-control ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
              value={formik.values.type}
            >
              <option value="">Choose tunnel type </option>
              {options.map((option: any) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <label htmlFor="type">{t('Type')}</label>
            {formik.touched.type && formik.errors.type && (
              <div className="invalid-feedback">{formik.errors.type}</div>
            )}
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            {editingStep ? (
              <Button variant="warning" type="submit">
                Update
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Save
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TunnelStepForm;
