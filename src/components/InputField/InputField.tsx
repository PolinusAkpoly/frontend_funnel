import React, { ChangeEvent } from 'react';
import { ucfirst } from '../../helpers/utiles';

interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  errorMessage?: string;
  value: string | number | boolean | FileList | Date;
  onChange: (value: any) => void;
  
}

const InputField: React.FC<InputFieldProps> = ({ type, label, name, value, errorMessage, onChange}) => {

  const [previewUrl, setPreviewUrl] = React.useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // let newValue: string | number | boolean | FileList | Date = event.target.value;
    // let { name } = event.target

    /*if (type === 'number') {
      newValue = parseFloat(newValue);
    } else if (type === 'checkbox') {
      newValue = event.target.checked;
    } else*/ if (type === 'file') {
      const files = event.target.files as FileList;
      // newValue = files;
      // Si c'est une image, affiche la prévisualisation
      if (files && files[0]) {
        if (files[0].type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageDataUrl = e.target?.result as string;
            setPreviewUrl(imageDataUrl);
          };
          reader.readAsDataURL(files[0]);
        }
        // Si c'est une vidéo, affiche la vidéo
        else if (files[0].type.startsWith('video/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const videoDataUrl = e.target?.result as string;
            setPreviewUrl(videoDataUrl);
          };
          reader.readAsDataURL(files[0]);
        } else {
          setPreviewUrl('');
        }
      }
      
    } /*else if (type === 'date' || type === 'datetime-local') {
      newValue = new Date(newValue);
    }*/

    onChange(event);
  };

  

  return (
    <div  className="form-group">
      <label>{ucfirst(label)}</label>
      {type === 'checkbox' ? (
        <input className='form-control' type={type} name={name} checked={value as boolean} onChange={handleInputChange} />
      ) : type === 'file' ? (
        <div>
          <input className='form-control' type={type} name={name} onChange={handleInputChange} />
          {previewUrl && (
            <div>
              {previewUrl.startsWith('data:image/') ? (
                <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
              ) : previewUrl.startsWith('data:video/') ? (
                <video controls style={{ maxWidth: '100%', maxHeight: '200px' }}>
                  <source src={previewUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <input type={type} 
        className='form-control'
        name={name}
        defaultValue={
          value instanceof Date ? 
          value.toISOString().substring(0, 16) : 
          value as  string | number | readonly string[] | undefined} 
        onChange={handleInputChange} />
      )}

      {errorMessage &&(<div>{errorMessage}</div>)}


    </div>
  );
};

export default InputField;
