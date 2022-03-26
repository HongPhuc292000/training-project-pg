import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/common.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props{
    linkto: string,
}

function AroundButton(props: Props) {
    const { linkto } = props;
  return (
    <button className='around-btn mb-2'>
        <Link to={linkto}><ArrowBackIcon /></Link>
    </button>
  )
}

export default AroundButton