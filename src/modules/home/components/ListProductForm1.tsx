import React,{useCallback, useEffect} from 'react'
import '../scss/home.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { makeStyles } from '@mui/styles'
import { setDeleteProducts } from '../redux/product';
import LoadingModal from '../common/LoadingModal';
import Button from '@mui/material/Button';
import { listDeleteProducts } from '../redux/selector';
import BasicTable from './TableProduct';
import { ICategory, IProduct } from '../models/productModal';
import InputText from '../common/InputText';
import { IVendor } from '../models/vendorModals';
import SelectBox from '../../common/components/SelectBox';

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

function ListProductsForm() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const listDeletes = useSelector(listDeleteProducts);
  
  const [listNumberItemPerPage,setListNumberItemPerPage] = React.useState([10,25,50,75,100]);
  const [selectedPage,setSelectedPage] = React.useState(false);
  const [listProducts, setListProducts] = React.useState<Array<IProduct> | undefined>();
  const [listCategories, setListCategories] = React.useState<Array<ICategory> | undefined>();
  const [listVendors, setListVendors] = React.useState<Array<IVendor> | undefined>();
  const [filterRecordTotal, setFilterRecordTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState(25);
  const [listStock, setListStock] = React.useState([{name: 'Any stock status',value: 'all'},{name: 'In stock',value: 'in'},{name: 'Low stock',value: 'low'}, {name: 'SOLD',value: 'out'}]);
  const [listSearchType, setListSearchType] = React.useState<Array<string>>([]);
  const [showModal, setShowModal] = React.useState(false);
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
  const [filters,setFilters] = React.useState({
    search:"",
    category:"0",
    stock_status:"all",
    availability:"all",
    vendor:"",
    sort:"name",
    order_by:"ASC",
    search_type:""
  })

  const [filterTemp, setFilterTemp] = React.useState({
    search:"",
    category:"0",
    stock_status:"all",
    availability:"all",
    vendor:"",
    sort:"name",
    order_by:"ASC",
    search_type:""
  })
  const [loading, setLoading] = React.useState(false);

  const getListProducts = useCallback(async()=>{
    setLoading(true)
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/list', 'post', 
        {
          page:page,
          count: pagination,
          ...filters
        }
      ),
    );
    setListProducts(json.data);
    setFilterRecordTotal(json.recordsFiltered);
    setLoading(false);
  },[page,pagination,filters]);

  const getListCategories = useCallback(async()=>{
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/api/categories/list','get')
    );
    setListCategories(json.data)
  },[])

  const getListVendors = useCallback(async()=>{
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/vendors/list', 'get')
    );
    setListVendors(json.data);
  },[]);

  const deleteProducts = useCallback(async()=>{
    setLoading(true)
    const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/edit','post', {params: listDeletes}));
    getListProducts();
    setPage(1)
    setLoading(false)
  },[listDeletes])

  useEffect(()=>{
    getListProducts();
    getListCategories();
    getListVendors()
  },[getListProducts]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeNumberPerPage = (e:any)=>{
    setPagination(e.target.value)
  }

  const handleChangeSearchInput = (e:any)=>{
    setFilterTemp({...filterTemp, search: e.target.value})
  }

  const handleChangeSelectCategory = (e:any)=>{
    setFilterTemp({...filterTemp, category: e.target.value})
  }

  const handleChangeSelectStock = (e:any)=>{
    setFilterTemp({...filterTemp, stock_status: e.target.value})
  }

  const handleChangeSearchType = useCallback(async(e:any)=>{
    if(e.target.checked){
      if(listSearchType.includes(e.target.value)){
        return;
      }else{
        setListSearchType([...listSearchType,e.target.value])
      }
    }else{
      setListSearchType(listSearchType.filter(item=>{
        return item != e.target.value;
      }))
    }
  },[listSearchType])

  const handleChangeSelectAvailability = (e:any)=>{
    setFilterTemp({...filterTemp, availability: e.target.value})
  }

  const handleChangeVendor = (value: string)=>{
    setFilterTemp({...filterTemp, vendor: value})
  }

  const handleSaveChangeFilters = ()=>{
    setFilters(filterTemp)
  }

  const handleDeleteProducts = ()=>{
    setShowModal(true);
  }

  const handleAcceptUpdateProducts = (e:any)=>{
    if(e.target.innerText === 'YES'){
      deleteProducts();
      dispatch(setDeleteProducts([]));
      setShowModal(false);
    }else{
      setShowModal(false);
    }
  }

  const handleRefreshData = ()=>{
    getListProducts();
  }

  useEffect(()=>{
    setFilterTemp({...filterTemp, search_type: listSearchType.toString()})
  },[listSearchType])
  
  const classes = usePaginationStyles();
  return (
    <div className="col-10 form-wrap">
      <div className='row'>
        <h2 className='col-12 form__header'>Products</h2>
      </div>

      <div className="row filters-wrap">
        <div className='col-6'>
            <input type="text" name="search-input" id="search-input" className='custom-input' placeholder="Search keyword" onChange={handleChangeSearchInput}/>
        </div>
        <div className="col-3">
          <select name="list-category" id="list-category" className='custom-select' onChange={handleChangeSelectCategory}>
            <option value='0'>Any category</option>
            {
              listCategories?.map((item,index)=>{
                return <option key={index} value={item.id}>{item.name}</option>
              })
            }
          </select>
        </div>
        <div className="col-2">
          <select name="list-stock" id="list-stock" className='custom-select' onChange={handleChangeSelectStock}>
            {
              listStock?.map((item,index)=>{
                return <option key={index} value={item.value}>{item.name}</option>
              })
            }
          </select>
        </div>
        <div className="col-1">
            <Button className="rdbtn rdbtn--primary" variant="contained" onClick={handleSaveChangeFilters}>
              Search
            </Button>
        </div>
      </div>

      <div className="row filters-wrap-2">
        <div className="col-4 filters__checkbox">
          <label htmlFor="#">Search in:</label>
          <ul>
            <li>
              <input type="checkbox" name="search-type" id="stype-name" onChange={handleChangeSearchType} value='name'/>
              <label htmlFor="stype-name">Name</label>
            </li>
            <li>
              <input type="checkbox" name="search-type" id="stype-sku" onChange={handleChangeSearchType} value='sku'/>
              <label htmlFor="stype-sku">SKU</label>
            </li>
            <li>
              <input type="checkbox" name="search-type" id="stype-des" onChange={handleChangeSearchType} value='description'/>
              <label htmlFor="stype-des">Full Description</label>
            </li>
          </ul>
        </div>

        <div className="col-4 filters__item">
          <label htmlFor="list-availability">Availability</label>
          <select name="list-availability" id="list-availability" className='custom-select' onChange={handleChangeSelectAvailability}>
            {
              listAvailable?.map((item,index)=>{
                return <option key={index} value={item.value}>{item.name}</option>
              })
            }
          </select>
        </div>
        <div className="col-4 filters__item">
          <label htmlFor="#">Vendor</label>
          <InputText text="Vendor" data={listVendors} name='vendor' onChangeFilterInput={handleChangeVendor}/>
        </div>
      </div>

      <div className="row list-products">
        <BasicTable data={listProducts} onRefreshData={handleRefreshData}/>
        <div className='pagination'>
          <Stack spacing={2}>
            <Pagination className={classes.root} count={Math.ceil(filterRecordTotal / pagination)} page={page} color="secondary" onChange={ handleChangePage } defaultPage={1} />
          </Stack>

          <div className='pagination__option'>
            <span className='total-item'><span>{filterRecordTotal}</span> items</span>
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
        <Button className="rdbtn rdbtn--orange me-3" variant="contained" disabled={listDeletes.length > 0 ? false : true} onClick={handleDeleteProducts}>
          Remove selected
        </Button>
        <Button className="rdbtn rdbtn--orange" variant="contained">
          Export all: CSV
        </Button>
      </div>
      {
        showModal ? (
            <div className='modal__acp-wrap'>
                <div className='modal__acp-content'>
                    <p className='modal__acp-item'>Confirm Update</p>
                    <p className='modal__acp-item'>Do you want to update this product?</p>
                    <div className='modal__acp-item'>
                        <button className='custom-button accept md-btn' onClick={handleAcceptUpdateProducts}>Yes</button>
                        <button className='custom-button error md-btn' onClick={handleAcceptUpdateProducts}>No</button>
                    </div>
                </div>
            </div>
        ) : ''
      }

      {loading ?<LoadingModal/>:''}
    </div>
  )
}

export default ListProductsForm