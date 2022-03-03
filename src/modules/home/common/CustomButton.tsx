import React from 'react';
import '../scss/home.scss';
import Button from '@mui/material/Button';

interface Props{
    text: string,
    color: string
}

function CustomButton(props: Props) {
    const { text, color } = props;

  return (
    <Button className={`rdbtn rdbtn--${color}`} variant="contained" fullWidth>{text}</Button>
  )
}

export default CustomButton