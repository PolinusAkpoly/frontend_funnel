/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 13:43:36
*/
import React, { FC, useEffect, useState } from 'react';
import './ProfileForm.css';
import { useFormik } from 'formik';
import { User } from '../../models/User';
import { getDatasById, updateData } from '../../api/api-entity';
import TextEditorField from '../TextEditorField/TextEditorField';


interface ProfileFormProps {
  userId: string
}


const ProfileForm: FC<ProfileFormProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      civility: '',
      firstname: '',
      lastname: '',
      username: '',
      website: '',
      publicinfo: '',
    },
    onSubmit: async (data: any) => {
      if (user?._id && !isSubmitting) {
        setIsSubmitting(true);
        await updateData('user', user?._id, { user: data });
        setIsSubmitting(false);
      }
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.username) {
        errors.username = 'Le nom d\'utilisateur est requis.';
      }

      return errors;
    },
  });

  useEffect(() => {
    const runLocalData = async () => {
      const data: any = await getDatasById('user', userId);
      if (data.isSuccess) {
        setUser(data.result);
        formik.setValues({
          civility: data.result?.civility || '',
          firstname: data.result?.firstname || '',
          lastname: data.result?.lastname || '',
          username: data.result?.username || '',
          website: data.result?.website || '',
          publicinfo: data.result?.publicinfo || '',
        });
      }
    };
    runLocalData();
  }, [userId]);

  return (
    <div className="ProfileForm">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group row my-1">
          <label htmlFor="civility" className="col col-form-label">
            Civility*
          </label>
          <div className="col-md-8">
            <select
              id="civility"
              className={`form-control here ${formik.touched.civility && formik.errors.civility ? 'is-invalid' : ''}`}
              required={true}
              {...formik.getFieldProps('civility')}
            >
              <option value="" disabled>Select Civility</option>
              <option value="mr">Mr.</option>
              <option value="mrs">Mrs.</option>
              <option value="miss">Miss</option>
              {/* Ajoutez d'autres options selon vos besoins */}
            </select>
            {formik.touched.civility && formik.errors.civility && (
              <div className="invalid-feedback">{formik.errors.civility}</div>
            )}
          </div>
        </div>
        <div className="form-group row my-1">
          <label htmlFor="username" className="col col-form-label">User Name*</label>
          <div className="col-md-8">
            <input id="username"
              {...formik.getFieldProps('username')}
              value={formik.values.username}
              placeholder="Username" className="form-control here" required={true} type="text" />
          </div>
        </div>
        <div className="form-group row my-1">
          <label htmlFor="name" className="col col-form-label">First Name</label>
          <div className="col-md-8">
            <input
              id="firstname"
              {...formik.getFieldProps('firstname')}
              placeholder="First Name"
              className="form-control here"
              type="text" />
          </div>
        </div>
        <div className="form-group row my-1">
          <label htmlFor="lastname" className="col col-form-label">Last Name</label>
          <div className="col-md-8">
            <input
              {...formik.getFieldProps('lastname')}
              id="lastname" name="lastname" placeholder="Last Name" className="form-control here" type="text" />
          </div>
        </div>

        <div className="form-group row my-1">
          <label htmlFor="website" className="col col-form-label">Website</label>
          <div className="col-md-8">
            <input
              id="website"
              {...formik.getFieldProps('website')}
              placeholder="website"
              className="form-control here" type="text" />
          </div>
        </div>
        <div className="form-group row my-1">
          <label htmlFor="publicinfo" className="col col-form-label">Public Info</label>
          <div className="col-md-8">
            <TextEditorField
              label='Public Info'
              value={formik.values.publicinfo}
              onChange={(value) => formik.setFieldValue('publicinfo', value)}
            />
            {formik.touched.publicinfo && formik.errors.publicinfo && (
              <div className="invalid-feedback">{formik.errors.publicinfo}</div>
            )}
          </div>
        </div>

        <div className="form-group row my-1">
          <div className="offset-4 col-md-8">
            <button name="submit" type="submit" className="btn btn-primary">Update My Profile</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;