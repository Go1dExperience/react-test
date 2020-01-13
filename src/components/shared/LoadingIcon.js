import React from 'react';
import Loader from 'react-loader-spinner';

export default function LoadingIcon() {
    return(
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
        <Loader
         type="Plane"
         color="#61dafb"
         height={200}
         width={200}
         timeout={3000} //3 secs
        ></Loader>
        </div>
    )
}
