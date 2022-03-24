import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled, makeStyles } from '@mui/styles'
import '../scss/home.scss'
import { ICategory, IStock } from '../models/productModal';

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
    text: string,
    data: Array<any>,
    onChangeFilters(type: string,value: string):void
}

function SelectBox(props:Props) {
    const { text, data, onChangeFilters } = props;

    const handleChangeSelect = (e:any)=>{
        if(e.target.id === 'list-category'){
            onChangeFilters('category', e.target.value);
        }else if(e.target.id === 'list-stock'){
            onChangeFilters('stock', e.target.value);
        }else if(e.target.id === 'list-status'){
            onChangeFilters('status',e.target.value);
        }
    }

    const classes = useSelectStyles();
    return (
        <div>
            <select
                name={`list-${text}`}
                id={`list-${text}`}
                className='custom-select'
                onChange={handleChangeSelect}
            >
                {
                    (text==='category'?<option value='all'>Any category</option>:'')
                }

                {
                    data?.map(item => {
                        if(text === 'category'){
                            return (<option key={item?.id} value={item.name}>{item.name}</option>);
                        }else if(text === 'stock' || text === 'status'){
                            return (<option key={item?.value} value={item.value}>{item.name}</option>);
                        }
                    })
                }
            </select>
        </div> 
    )
}

export default SelectBox
