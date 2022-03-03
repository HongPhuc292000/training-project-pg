import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled, makeStyles } from '@mui/styles'
import '../scss/home.scss'

const useSelectStyles = makeStyles({
    root: {
        width: "100%",
        '& > label':{
            color: '#fff', 
        },

        '& > div':{
            '& > div':{
                color: '#fff',
                border: '1px solid #1B1B38',
                transition: 'all linear .15s',
            },

            '& > div:hover':{
                backgroundColor: '#1B1B38',
            },

            '& > svg':{
                color: '#fff',
            },

            '& > fieldset':{
                border: 'none',
            }
        } 
    },
});

interface Props{
    text: string
}

function SelectBox(props:Props) {
    const { text } = props;
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const classes = useSelectStyles();
    return (
        <div>
            <FormControl sx={{ m: 1 }} className={classes.root}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>{text}</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div> 
    )
}

export default SelectBox
