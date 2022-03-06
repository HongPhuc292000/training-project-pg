import React, { useCallback, useEffect } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../scss/home.scss';
import SelectBox from '../common/SelectBox';
import InputText from '../common/InputText';
import CustomButton from '../common/CustomButton';
import BasicTable from './TableProduct';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { IListProduct } from '../models/productModal';
import { styled, makeStyles } from '@mui/styles'
import { filterProducts, setInitListProducts } from '../redux/product';
import { filterProductSearchSelector, filterProductSCSSelector } from '../redux/selector';
import CheckBox from '../common/CheckBox';

const usePaginationStyles = makeStyles({
  root: {
    '& ul':{
      '& li':{
        '& button, & div':{
          color: '#fff',
        },
      }
    }
  },
});

function ListProductForm() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [listNumberItemPerPage,setListNumberItemPerPage] = React.useState([10,25,50,75,100]);
  const [selectedPage,setSelectedPage] = React.useState(false);
  const [listProduct, setListProduct] = React.useState<any>();
  const [listCategories, setListCategories] = React.useState<any>();
  const [listStock, setListStock] = React.useState([{name: 'Any stock status',value: 'all'},{name: 'In stock',value: 'in'},{name: 'Low stock',value: 'low'}, {name: 'SOLD',value: 'out'}])
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState(25);
  const [filters,setFilters] = React.useState({
    search: '',
    category: 'all',
    stock: 'all',
    searchType: new Array(),
  })


  const storeProductData = useSelector(filterProductSCSSelector);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeNumberPerPage = (e:any)=>{
    setPagination(e.target.value);
  }

  const getListProduct = useCallback(async()=>{
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/list', 'get'),
    );
    setListProduct(json.data);
    dispatch(setInitListProducts(json.data));
  },[dispatch]);

  const getListCategories = useCallback(async()=>{
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/api/categories/list', 'get'),
    );
    setListCategories(json.data);
  },[dispatch]);

  useEffect(()=>{
    getListProduct()
  },[getListProduct]);
  
  useEffect(()=>{
    getListCategories();
  },[getListCategories]);

  const handleChangeFilterSelect = (type: string, value: string)=>{
      if(type === 'category'){
        setFilters({...filters,category: value})
      }else if(type === 'stock'){
        setFilters({...filters,stock: value})
      }
  }

  const handleChangeFilterInput = (type: string, value: string)=>{
    if(type === 'Search keywords'){
      setFilters({...filters,search: value})
    }
  }

  const handleChangeFilters = (type: string)=>{
    dispatch(filterProducts(filters));
  }

  const handleChangeFilterSearch = (checkStatus:boolean, type: string)=>{
    if(checkStatus){
      setFilters({...filters, searchType: [...filters.searchType, type]})
    }else{
      setFilters({...filters, searchType: [...filters.searchType.filter(item=>(item!=type))]})
    }
  }

  console.log(useSelector(state=>state))
  console.log(filters);
  
  const classes = usePaginationStyles();
  return (
    <div className="col-10 form-wrap">
      <div className='row'>
        <h2 className='col-12 form__header'>Products</h2>
      </div>
      
      <div className="row filters-wrap">
        <div className='col-6'>
          <InputText text="Search keywords" onChangeFilterInput={handleChangeFilterInput}/>
        </div>
        <div className="col-3">
          <SelectBox text="category" data={listCategories} onChangeFilters={handleChangeFilterSelect}/>
        </div>
        <div className="col-2">
          <SelectBox text="stock" data={listStock} onChangeFilters={handleChangeFilterSelect}/>
        </div>
        <div className="col-1 filters-btn">
          <CustomButton text="Search" color='primary' onClick={handleChangeFilters}/>
        </div>
      </div>

      <div className="row filters-wrap-2">
        <div className="col-4 filters__checkbox">
          <label htmlFor="#">Search in:</label>
          <ul>
            <li>
              <CheckBox type='Name' onChange={handleChangeFilterSearch}/>
            </li>
            <li>
              <CheckBox type='SKU' onChange={handleChangeFilterSearch} />
            </li>
            <li>
              <CheckBox type='Full description' onChange={handleChangeFilterSearch} />
            </li>
          </ul>
        </div>
        <div className="col-4 filters__item">
          <label htmlFor="#">Availability</label>
          <SelectBox text="Any availability status" data={listCategories} onChangeFilters={handleChangeFilterSelect}/>
        </div>
        <div className="col-4 filters__item">
          <label htmlFor="#">Vendor</label>
          <InputText text="Vendor" onChangeFilterInput={handleChangeFilterInput}/>
        </div>
      </div>

      <div className="row">
        <CustomButton text="Add Product" color='primary' onClick={handleChangeFilters}/>
      </div>

      <div className="row list-products">
        <BasicTable data={storeProductData?.slice(page * pagination - pagination, page * pagination)}/>
        <div className='pagination'>
          <Stack spacing={2}>
            <Pagination className={classes.root} count={Math.ceil(storeProductData?.length / pagination)} page={page} color="secondary" onChange={ handleChangePage } defaultPage={1} />
          </Stack>

          <div className='pagination__option'>
            <span className='total-item'><span>{storeProductData?.length}</span> items</span>
            <select name="number-item" id="number-item" defaultValue={25} onChange={handleChangeNumberPerPage}>
              {
                listNumberItemPerPage.map(item =>{
                  return <option selected={selectedPage} key={item} value={item}>{item}</option>
                })
              }
            </select>
            <label htmlFor="number-item">per page</label>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ListProductForm