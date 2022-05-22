import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { styled, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

export const SelectCustom = styled(Select)(() => ({
  backgroundColor: 'red',
}));

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <SelectCustom
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          size='small'
        >
        </SelectCustom>
      </FormControl>
    </Box>
  );
}