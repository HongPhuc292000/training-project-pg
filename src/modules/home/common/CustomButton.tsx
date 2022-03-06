import React from 'react';
import '../scss/home.scss';
import Button from '@mui/material/Button';

interface Props{
  text: string,
  color: string,
  onClick(type: string):void
}

function CustomButton(props: Props) {
  const { text, color, onClick } = props;

  const handleSaveChangeFilters = (e:any)=>{
    onClick(text);
  }

  return (
    <Button className={`rdbtn rdbtn--${color}`} variant="contained" onClick={handleSaveChangeFilters}>{text}</Button>
  )
}

export default CustomButton