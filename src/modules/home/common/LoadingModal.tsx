import React from 'react';
import loadingImg from '../../../loading.png';
import '../scss/common.scss';

function LoadingModal() {
  return (
    <div className='modal__wrap'>
        <div className='modal__content'>
          <img src={loadingImg} alt="loading" />
        </div>
    </div>
  )
}

export default LoadingModal