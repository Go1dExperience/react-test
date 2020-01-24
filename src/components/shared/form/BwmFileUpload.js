import React from 'react'

export default function BwmFileUpload(props) {

    const onChange = (event) => {
        const {input: {onChange}} = props;
        // onChange(''https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg'');
        onChange('https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p960x960/79987318_2488796688030147_275387874180857856_o.jpg?_nc_cat=102&_nc_oc=AQmQ77hFxup-6yrrq43_BGBQjZwpus4ka0j8hGAaGLbh_zWN40PChqjEvXJb9SHmd8M&_nc_ht=scontent.fsgn2-2.fna&_nc_tp=1&oh=61ce20d5d90ce1d5c290c672e0f520e1&oe=5E8FE6AD');
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
