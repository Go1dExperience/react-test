import React from 'react'

export default function BwmFileUpload(props) {

    const onChange = (event) => {
        const {input: {onChange}} = props;
        onChange('https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg');
    }
    const  {label, meta: {touched, error}} = props;
    return (
        
             <div className='form-group'>
      <label>{label}</label>
      <div className='input-group'>
        <input type='file' accept='.jpg, .png, .jpeg' className="form-control-file" onChange={onChange} />
        </div>
        {touched &&
          ((error && <div className='alert alert-danger'>{error}</div>))}
      
    </div>
      
    )
}
