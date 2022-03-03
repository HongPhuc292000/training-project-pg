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
  text: string
}

function InputText(props: Props) {
  const { text } = props;

  const classText = useTextStyles();
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField className={classText.root} id="outlined-basic" placeholder={text} variant="outlined" />
    </Box>
  )
}

export default InputText
