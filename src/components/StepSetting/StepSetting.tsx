/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 03/02/2024 12:52:55
*/
import React, { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './StepSetting.css';
import { useSelector } from 'react-redux';
import { getCurrentStep } from '../../redux/selectors/selectors';
import { GlobalState } from '../../redux/selectors/types/GlobalState';
import { getTunnelSetting } from '../../api/api-tunnel';
import { addData } from '../../api/api-entity';

interface StepSettingProps {
  tunnelId?: string;
}

const StepSetting: FC<StepSettingProps> = ({tunnelId}) => {

  const currentStep = useSelector((state: GlobalState) => getCurrentStep(state, tunnelId!));


  const formik = useFormik({
    initialValues: {
      name: '',
      urlPath: '',
      tunnelId
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      urlPath: Yup.string().required('Url Path is required'),
    }),
    onSubmit: (values) => {
      // Add logic to handle form submission with validated values
      const data = {...values, tunnelId, stepId: currentStep._id}
      addData('stepsettings', {'stepsettings': data})
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      // Code for any local data initialization
      const stepId = currentStep?._id
      if(tunnelId && stepId){
        const data = await getTunnelSetting(tunnelId!, stepId)
        if(data?.isSuccess){
          formik.setValues({
            name: data.result.name || '',
            urlPath: data.result.urlPath || '',
            tunnelId
          })
        }else{
          formik.setValues({
            name: '',
            urlPath: '',
            tunnelId
          })
        }
      }
      
    };
    runLocalData();
  }, [tunnelId, currentStep?._id]);

  return (
    <div className="StepSetting">
      <h4>Setting of step : {currentStep?.name}</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            placeholder="Enter Name"
            required
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="urlPath">Url Path:</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">{window.origin}</span>
            </div>

            <input
              type="text"
              id="urlPath"
              name="urlPath"
              value={formik.values.urlPath}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.touched.urlPath && formik.errors.urlPath ? 'is-invalid' : ''}`}
              placeholder="Enter Url Path"
              required
            />
            {formik.touched.urlPath && formik.errors.urlPath && (
              <div className="invalid-feedback">{formik.errors.urlPath}</div>
            )}

          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StepSetting;
