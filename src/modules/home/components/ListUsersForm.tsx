import React,{useCallback, useEffect} from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../scss/home.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { styled, makeStyles } from '@mui/styles'
import { filterProducts, setInitListProducts } from '../redux/product';
import CheckBox from '../common/CheckBox';
import LoadingModal from '../common/LoadingModal';
import { ISeller } from '../models/userModals';
import TableUser from './TableUser';
import Button from '@mui/material/Button';
import { ICountry, IRole, IState } from '../models/countryModal';
import { formatDate } from '../common/FormatData';

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

function ListUsersForm() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [listNumberItemPerPage,setListNumberItemPerPage] = React.useState([10,25,50,75,100]);
  const [selectedPage,setSelectedPage] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState('all');
  const [listVendors, setListVendors] = React.useState<Array<ISeller> | undefined>();
  const [listCountry, setListCountry] = React.useState<Array<ICountry> | undefined>();
  const [listState, setListState] = React.useState<Array<IState> | undefined>();
  const [listRole, setListRole] = React.useState<Array<IRole> | undefined>();
  const [filterRecordTotal, setFilterRecordTotal] = React.useState(0);
  const [listStatus, setListStatus] = React.useState([
    {
      value: "all",
      name: "Any status"
    },
    {
      value: "E",
      name: "Enable"
    },
    {
      value: "D",
      name: "Disable"
    },
    {
      value: "U",
      name: "Unapproved vendor"
    }
  ])
  const [listMembership, setListMembership] = React.useState([
    {
      value: 'M_4',
      name: 'General M'
    },
    {
      value: 'P_4',
      name: 'General P'
    }
  ])

  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState(25);
  const [filters,setFilters] = React.useState({
    search:"",
    memberships:new Array<string>(),
    types:new Array<string>(),
    status: new Array<string>(),
    country:"",
    state:"",
    address:"",
    phone:"",
    date_type:"R",
    date_range:["", formatDate(new Date())],
    sort:"last_login",
    order_by:"DESC",
    tz:7
  })

  const [filterTemp, setFilterTemp] = React.useState({
    search:"",
    memberships:new Array<string>(),
    types:new Array<string>(),
    status: new Array<string>(),
    country:"",
    state:"",
    address:"",
    phone:"",
    date_type:"R",
    date_range:["", formatDate(new Date())],
    sort:"last_login",
    order_by:"DESC",
    tz:7
  })
  const [loading, setLoading] = React.useState(false);

  const getListVendors = useCallback(async()=>{
    setLoading(true)
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list', 'post', 
        {
          page:page,
          count: pagination,
          ...filters
        }
      ),
    );
    setListVendors(json.data);
    setFilterRecordTotal(json.recordsFiltered);
    setLoading(false);
  },[page,pagination,filters]);

  const getListCountry = useCallback(async()=>{
    const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/commons/country','get'));
    setListCountry(json.data)
  },[])

  const getListState = useCallback(async(country:string)=>{
    const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/commons/state','post', {"code": country}));
    setListState(json.data)
  },[selectedCountry])

  const getListRole = useCallback(async()=>{
    const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/commons/role', 'get'))
    setListRole([...json.data.administrator, ...json.data.customer])
  },[])

  useEffect(()=>{
    getListVendors();
    getListCountry();
    getListRole();
  },[getListVendors]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeNumberPerPage = (e:any)=>{
    setPagination(parseInt(e.target.value))
  }

  const handleChangeSearchInput = (e:any)=>{
    setFilterTemp({...filterTemp, search: e.target.value})
  }

  const handleChangeSelectMembership = (e:any)=>{
    if(e.target.value == 'all'){
      setFilterTemp({...filterTemp,  memberships: []});
    }else{
      setFilterTemp({...filterTemp, memberships: [...filterTemp.memberships, e.target.value]});
    }
  }

  const handleChangeSelectRole = (e:any)=>{
    if(e.target.value == 'all'){
      setFilterTemp({...filterTemp,  memberships: []});
    }else{
      setFilterTemp({...filterTemp, memberships: [...filterTemp.memberships, e.target.value]});
    }
  }

  const handleChangeSelectStatus = (e:any)=>{
    if(e.target.value == 'all'){
      setFilterTemp({...filterTemp, status: []})
    }else{
      setFilterTemp({...filterTemp, status: [e.target.value]})
    }
  }

  const handleChangeSelectCountry = (e:any)=>{
    if(e.target.value == 'all'){
      setFilterTemp({...filterTemp, country: ""})
      getListState("")
    }else{
      setFilterTemp({...filterTemp, country: e.target.value});
      getListState(e.target.value);
    }
  }

  const handleChangeState = (e:any)=>{
    setFilterTemp({...filterTemp, state: e.target.value})
  }

  const handleChangeAddress = (e:any)=>{
    setFilterTemp({...filterTemp, address: e.target.value})
  }

  const handleChangePhone = (e:any)=>{
    setFilterTemp({...filterTemp, phone: e.target.value})
  }

  const handleChangeDateType = (e:any)=>{
    setFilterTemp({...filterTemp, date_type: e.target.value})
  }

  const handleChangeDateSelectedFrom = (e:any)=>{
    const newArr = filterTemp.date_range;
    newArr[0] = formatDate(new Date(e.target.value));
    setFilterTemp({...filterTemp, date_range: newArr});
  }

  const handleChangeDateSelectedTo = (e:any)=>{
    const newArr = filterTemp.date_range;
    newArr[1] = formatDate(new Date(e.target.value));
    setFilterTemp({...filterTemp, date_range: newArr});
  }

  const handleSaveChangeFilters = ()=>{
    setFilters(filterTemp)
  }

  const handleRemoveSelectedUsers = ()=>{
    
  }

  console.log(filterTemp);
  

  const classes = usePaginationStyles();
  return (
    <div className="col-10 form-wrap">
      <div className='row'>
        <h2 className='col-12 form__header'>Search for users</h2>
      </div>

      <div className="row filters-wrap">
      <div className='col-3'>
        <input type="text" name="search-input" id="search-input" className='custom-input' placeholder="Search keyword" onChange={handleChangeSearchInput}/>
      </div>

      <div className="col-3">
        <select name="list-status" id="list-status" className='custom-select' onChange={handleChangeSelectMembership}>
          <option value="all">All memberships</option>
          {
            listMembership.map(item=>{
              return <option key={item.value} value={item.value}>{item.name}</option>
            })
          }
        </select>
      </div>

      <div className="col-3">
        <select name="list-status" id="list-status" className='custom-select' onChange={handleChangeSelectRole}>
          <option value="all">All user types</option>
          {
            listRole?.map(item=>{
              return <option key={item.id} value={item.id}>{item.name}</option>
            })
          }
        </select>
      </div>

      <div className="col-2">
        <select name="list-status" id="list-status" className='custom-select' onChange={handleChangeSelectStatus}>
          {
            listStatus.map(item=>{
              return <option key={item.value} value={item.value}>{item.name}</option>
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
        <div className="col-4">
          <div className="row align-items-center mb-3">
            <label className="col-3 fz-075">Country</label>
            <div className="col-9">
            <select name="list-status" id="list-status" className='custom-select' onChange={handleChangeSelectCountry}>
              <option value="all">Select country</option>
              
              {
                listCountry?.map(item=>{
                  return <option key={item.id} value={item.code}>{item.country}</option>
                })
              }
            </select>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-3 fz-075">State</label>
            <div className="col-9">
              <select name="list-status" id="list-status" className='custom-select' onChange={handleChangeState}>
                <option value="all"></option>
                {
                  listState?.map(item=>{
                    return <option key={item.state_id} value={item.state}>{item.state}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-3 fz-075">Address</label>
            <div className="col-9">
              <input type="text" name="search-input" id="search-input" className='custom-input' onChange={handleChangeAddress}/> 
            </div>
          </div>
          <div className="row align-items-center">
            <label className="col-3 fz-075">Phone</label>
            <div className="col-9">
              <input type="text" name="search-input" id="search-input" className='custom-input' onChange={handleChangePhone}/>
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <label className="col-3 txt-alr">User activity</label>
            <div className="col-9">
              <ul className='d-flex justify-content-start ps-0'>
                <li className='me-3'>
                  <input type="radio" name="select-date" id="date-register" onClick={handleChangeDateType} value="R" defaultChecked/>
                  <label htmlFor="date-register" className='ps-2'>Register</label>
                </li>
                <li>
                  <input type="radio" name="select-date" id="date-login" onClick={handleChangeDateType} value="L" />
                  <label htmlFor="date-login" className='ps-2'>Last logged in</label>
                </li>
              </ul>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-3 txt-alr mb-3">From</div>
            <div className="col-9">
              <input type="date" name="date-selected-from" id="date-selected-from" className='custom-input mb-3' onChange={handleChangeDateSelectedFrom} />
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-3 txt-alr">To</div>
            <div className="col-9">
              <input type="date" name="date-selected-to" id="date-selected-to" className='custom-input' onChange={handleChangeDateSelectedTo} />
            </div>
          </div>
        </div>
      </div>

      <div className="row list-products">
        <TableUser data={listVendors}/>
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
      <div className='fixed-action'>
        <Button className="rdbtn rdbtn--orange" variant="contained" onClick={handleRemoveSelectedUsers}>
          Remove selected
        </Button>
      </div>

      {loading ?<LoadingModal/>:''}
    </div>
  )
}

export default ListUsersForm