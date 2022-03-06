import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled, makeStyles } from '@mui/styles'

const useTextStyles = makeStyles({
  root: {
    '& > label':{
      color: '#fff',
    },

    '& > div':{
      color: '#fff',
      border: '1px solid #1B1B38',
      '& > fieldset':{
        border: 'none',
      },

      '&:hover':{
        backgroundColor: '#1B1B38',
      }
    }
  },
});

interface Props{
  text: string,
  onChangeFilterInput(type: string,value: string): void
}

function InputText(props: Props) {
  const { text, onChangeFilterInput } = props;

  const onChangInput = (e:any)=>{
    onChangeFilterInput(e.target.placeholder,e.target.value);
  }

  const classText = useTextStyles();
  return (
    <input type="text" name="" id="" className='custom-input' placeholder={text} onChange={onChangInput}/>
  )
}

export default InputText
