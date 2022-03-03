import React from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../scss/home.scss';
import SelectBox from '../common/SelectBox';
import InputText from '../common/InputText';
import Button from '@mui/material/Button';
import CustomButton from '../common/CustomButton';

function ListProductForm() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div className="col-10 form-wrap">
      <div className='row'>
        <h2 className='col-12 form__header'>Products</h2>
      </div>
      
      <div className="row filters-wrap">
        <div className='col-6'>
          <InputText text="Search keywords"/>
        </div>
        <div className="col-3">
          <SelectBox text="Any category"/>
        </div>
        <div className="col-2">
          <SelectBox text="Any stock status"/>
        </div>
        <div className="col-1 filters-btn">
          <CustomButton text="Search" color='primary'/>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <label htmlFor="#">Search in:</label>
          <ul>
            <li>
              <input type="checkbox" name="by-name" id="search-name" />
              <label htmlFor="search-name">Name</label>
            </li>
            <li>
              <input type="checkbox" name="by-sku" id="search-sku" />
              <label htmlFor="search-sku">SKU</label>
            </li>
            <li>
              <input type="checkbox" name="by-fdes" id="search-fdes" />
              <label htmlFor="search-fdes">Full Description</label>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <label htmlFor="#">Availability</label>
          <SelectBox text="Any availability status"/>
        </div>
        <div className="col-4">
          
        </div>
      </div>
    </div>
  )
}

export default ListProductForm