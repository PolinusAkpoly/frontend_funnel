import React, { FC, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './TunnelForm.css';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { addData, updateData } from '../../api/api-entity';
import { Tunnel } from '../../models/Tunnel';
import Loading from '../Loading/Loading';

interface TunnelFormProps {
  handleClose: () => void
  currentTunnel?: Tunnel
  handleUpdate: (data: Tunnel) => void
}

const TunnelForm: FC<TunnelFormProps> = ({ handleClose, currentTunnel, handleUpdate }) => {
  const { t } = useTranslation();
  const model = 'tunnel'
  const [isSubmitting, setSubmitting] = useState<boolean>(false)

  const formik = useFormik({
    initialValues:  {
      name: '',
      domaine: '',
      type: '',
      isActive: false
    },
    validate: (values: Tunnel) => {
      const errors: any = {};

      // Ajoutez des règles de validation ici
      if (!values.name) {
        errors.name = t('Name is required');
      }

      if (!values.domaine) {
        errors.domaine = t('Domaine is required');
      }

      if (!values.type) {
        errors.type = t('Funnel Type is required');
      }

      return errors;
    },
    onSubmit: async (tunnel: Tunnel) => {
      try {
        // Set isSubmitting to true to disable the submit button
        setSubmitting(true);

        let data: { result: Tunnel };
        
        if (currentTunnel) {
          if (currentTunnel._id) {
            data = await updateData('tunnel', currentTunnel._id, { [model]: tunnel, [model.charAt(0).toUpperCase() + model.slice(1)]: tunnel });
            handleUpdate(data.result);
          }else{
            console.log(currentTunnel);
            
          }
        } else {
          data = await addData('tunnel', { [model]: tunnel, [model.charAt(0).toUpperCase() + model.slice(1)]: tunnel });
          handleUpdate(data.result);
        }
      } finally {
        // Set isSubmitting back to false after submission is complete
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      // Votre logique ici
      if(currentTunnel){
        
        
        const data: any = {
          name: currentTunnel?.name,
          domaine: currentTunnel?.domaine,
          isActive: currentTunnel?.isActive,
          type: currentTunnel?.type,
        }
        formik.setValues(data)
      }
    };
    runLocalData();
  }, [currentTunnel]);




  return (
    <Modal centered show={true} scrollable onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title> {t('Create Tunnel')} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          isSubmitting ?
            <Loading />
            :
            <Form onSubmit={formik.handleSubmit}>
              <div className="row py-2">
                <div className="form-floating mb-3 col-md-6">
                  <input
                    placeholder={t('enter_name')}
                    type="text"
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    name='name'
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
                <div className="form-floating col-md-6">
                  <input
                    placeholder={t('enter_domaine')}
                    type="text"
                    className={`form-control ${formik.touched.domaine && formik.errors.domaine ? 'is-invalid' : ''}`}
                    name='domaine'
                    id="domaine"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.domaine}
                  />
                  <label htmlFor="domaine">{t('Domaine')}</label>
                  {formik.touched.domaine && formik.errors.domaine && (
                    <div className="invalid-feedback">{formik.errors.domaine}</div>
                  )}
                </div>
              </div>

              {/* ... (rest of the form) ... */}
              {/* ... (rest of the form) ... */}
              <div className="row">
                <h5>{t('Choose your funnel goal')}* </h5>
                <div className="col-md-6">
                  <input
                    type="radio"
                    name='type'
                    value="audience"
                    className={`btn-check ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
                    id="btn-check-1-outlined"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.type === 'audience'}
                  />
                  <label className="card btn btn-outline-secondary" htmlFor="btn-check-1-outlined">
                    <div className="rounded p-3">
                      <h5>Build an audience</h5>
                      <div>
                        Collect email addresses and build your email list
                      </div>
                    </div>
                  </label>
                </div>
                <div className="col-md-6">
                  {/* Ajoutez des éléments similaires pour les autres options radio */}
                  <input
                    type="radio"
                    name='type'
                    value="sell"
                    className={`btn-check ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
                    id="btn-check-2-outlined"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.type === 'sell'}
                  />
                  <label className="card btn btn-outline-secondary" htmlFor="btn-check-2-outlined">
                    <div className="rounded p-3">
                      <h5>Sell</h5>
                      <div>
                        Sell a product or a service
                      </div>
                    </div>
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="radio"
                    name='type'
                    value='custom'
                    className={`btn-check ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
                    id="btn-check-3-outlined"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.type === 'custom'}
                  />
                  <label className="card btn btn-outline-secondary" htmlFor="btn-check-3-outlined">
                    <div className="rounded p-3">
                      <h5>Custom</h5>
                      <div>
                        Build a custom funnel from scratch
                      </div>
                    </div>
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="radio"
                    name='type'
                    value="webinar"
                    className={`btn-check ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
                    id="btn-check-4-outlined"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.type === 'webinar'}
                  />
                  <label className="card btn btn-outline-secondary" htmlFor="btn-check-4-outlined">
                    <div className="rounded p-3">
                      <h5>Run an evergreen webinar</h5>
                      <div>
                        Run evergreen webinars to automate your business
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              {
                currentTunnel ?
                  <Button variant="warning" type="submit" className='w-100'>
                    Update
                  </Button>
                  :
                  <Button variant="primary" type="submit" className='w-100'>
                    Save
                  </Button>
              }
            </Form>
        }
      </Modal.Body>
    </Modal>
  );
};

export default TunnelForm;
