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
import { IListProduct, IProduct } from '../models/productModal';
import { styled, makeStyles } from '@mui/styles'
import { filterProducts, setDeleteProducts, setInitListProducts } from '../redux/product';
import { filterProductSearchSelector, filterProductSCSSelector, filterProductSCSSSelector, listDeleteProducts } from '../redux/selector';
import CheckBox from '../common/CheckBox';
import LoadingModal from '../common/LoadingModal';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { IVendor } from '../models/vendorModals';
import Button from '@mui/material/Button';

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
  const listDeletes = useSelector(listDeleteProducts);

  const [listNumberItemPerPage,setListNumberItemPerPage] = React.useState([10,25,50,75,100]);
  const [selectedPage,setSelectedPage] = React.useState(false);
  const [listProduct, setListProduct] = React.useState<undefined | Array<IProduct>>([]);
  const [listCategories, setListCategories] = React.useState<any>();
  const [listStock, setListStock] = React.useState([{name: 'Any stock status',value: 'all'},{name: 'In stock',value: 'in'},{name: 'Low stock',value: 'low'}, {name: 'SOLD',value: 'out'}]);
  const [listAvailable, setListAvailable] = React.useState([
    {
      name: 'Any availability status',
      value: 'all'
    },
    {
      name: 'Only enabled',
      value: '1'
    },
    {
      name: 'Only disabled',
      value: '0'
    },
  ])
  const [listVendors, setListVendors] = React.useState<undefined | Array<IVendor>>([]);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState(25);
  const [filters,setFilters] = React.useState({
    search: '',
    category: 'all',
    stock: 'all',
    status: 'all',
    searchType: new Array(),
  })
  const [loading, setLoading] = React.useState(false);


  const storeProductData = useSelector(filterProductSCSSSelector);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeNumberPerPage = (e:any)=>{
    setPagination(e.target.value);
  }

  

  const getListProduct = useCallback(async()=>{
    setLoading(true);
    const json = await dispatch(
      fetchThunk(`https://api.gearfocus.div4.pgtest.co/api/products/list`, 'get'),
    );
    setListProduct(json.data);
    dispatch(setInitListProducts(json.data));
    setLoading(false);
  },[dispatch]);

  const getListCategories = useCallback(async()=>{
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/api/categories/list', 'get'),
    );
    setListCategories(json.data);
  },[dispatch]);

  const getListVendors = useCallback(async()=>{
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/vendors/list', 'get'),
    );
    setListVendors(json.data);
  },[dispatch]);

  const deleteVendors = useCallback(async()=>{
    setLoading(true)
    const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/edit','post', {params: listDeletes}));
    getListProduct();
    setPage(1)
    setLoading(false)
  },[listDeletes])

  useEffect(()=>{
    getListProduct();
    getListCategories();
    getListVendors();
  },[getListProduct,getListCategories,getListVendors]);

  const handleChangeFilterSelect = (type: string, value: string)=>{
      if(type === 'category'){
        setFilters({...filters,category: value})
      }else if(type === 'stock'){
        setFilters({...filters,stock: value})
      }else if(type === 'status'){
        setFilters({...filters,status: value})
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

  const handleRemoveSelectedProducts = ()=>{
    deleteVendors();
    dispatch(setDeleteProducts([]));
  }
  console.log(listDeletes)
  
  const classes = usePaginationStyles();
  return (
    <div className="col-10 form-wrap">

      <div className='row'>
        <h2 className='col-12 form__header'>Products</h2>
      </div>
      
      <div className="row filters-wrap">
        {/* <div className='col-6'>
          <InputText text="Search keywords" data={[]} name='search' onChangeFilterInput={handleChangeFilterInput}/>
        </div> */}
        <div className="col-3">
          <SelectBox text="category" data={listCategories} onChangeFilters={handleChangeFilterSelect}/>
        </div>
        <div className="col-2">
          <SelectBox text="stock" data={listStock} onChangeFilters={handleChangeFilterSelect}/>
        </div>
        <div className="col-1 filters-btn">
          <CustomButton linkto='' text="Search" color='primary' onClick={handleChangeFilters}/>
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
          <SelectBox text="status" data={listAvailable} onChangeFilters={handleChangeFilterSelect}/>
        </div>
        {/* <div className="col-4 filters__item">
          <label htmlFor="#">Vendor</label>
          <InputText text="Vendor" data={listVendors} name='vendor' onChangeFilterInput={handleChangeFilterInput}/>
        </div> */}
      </div>

      <div className="row">
        <CustomButton linkto='/createProduct' text="Add Product" color='primary' onClick={handleChangeFilters}/>
      </div>

      <div className="row list-products">
        {/* <BasicTable data={storeProductData?.slice(page * pagination - pagination, page * pagination)}/> */}
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
      <div className='fixed-action d-flex'>
        <Button className="rdbtn rdbtn--orange me-3" variant="contained">
          Save changes
        </Button>
        <Button className="rdbtn rdbtn--orange me-3" variant="contained" onClick={handleRemoveSelectedProducts}>
          Remove selected
        </Button>
        <Button className="rdbtn rdbtn--orange" variant="contained">
          Export all: CSV
        </Button>
      </div>
    </div>
  )
}

export default ListProductForm