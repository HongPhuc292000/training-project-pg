import React from 'react';
import '../scss/home.scss';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface Props{
  linkto: string,
  text: string,
  color: string,
  onClick(type: string):void
}

function CustomButton(props: Props) {
  const { linkto, text, color, onClick } = props;

  const handleSaveChangeFilters = (e:any)=>{
    onClick(text);
  }

  return (
    <>
      {
        linkto != ''?
        (<Button className={`rdbtn rdbtn--${color}`} variant="contained">
          <Link to={linkto}>{text}</Link>
        </Button>):
        (<Button className={`rdbtn rdbtn--${color}`} variant="contained" onClick={handleSaveChangeFilters}>
          {text}
        </Button>)
      }
      
    </>
  )
}

export default CustomButton