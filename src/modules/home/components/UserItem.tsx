import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ISeller, ISellerDelete } from '../models/userModals';
import DeleteIcon from '@mui/icons-material/Delete';
import { listDeleteVendors } from '../redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { setDeleteVendors } from '../redux/vendor';
import '../scss/home.scss';

interface Props{
    data: ISeller,
    allStatus: boolean
}

function UserItem(props: Props) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const listDeletes = useSelector(listDeleteVendors);
    const { data, allStatus } = props;
    const [checkboxStatus, setCheckboxStatus] = React.useState(false);
    
    const handleConvertDate = (dateString: string)=>{
      const dateConverted = moment(Number.parseInt(dateString) * 1000).format('lll');
      return dateConverted;
    }
    const handlChangeCheckboxStatus = ()=>{
      setCheckboxStatus(!checkboxStatus)
      let vendorIdAr: Array<ISellerDelete> | undefined = [];
      const check = checkboxStatus;
      if(check){
        vendorIdAr = listDeletes.filter(item=>{
          return item.id != data.profile_id;
        })
      }
      else{
        vendorIdAr = [...listDeletes, {id: data.profile_id, delete: 1}]
      }
      dispatch(setDeleteVendors(vendorIdAr));
    }

    React.useEffect(()=>{
        setCheckboxStatus(allStatus);
    },[allStatus])

    // console.log(listDeletes);

  return (
    <TableRow key={data.profile_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className={checkboxStatus ? "opc-05" : ""}>
      <TableCell component="th" scope="row">
        <input
          checked={allStatus ? allStatus && checkboxStatus : checkboxStatus}
          type="checkbox"
          name={data.profile_id}
          id={data.profile_id}
          onChange={handlChangeCheckboxStatus}
        />
      </TableCell>
      <TableCell align="left">
        <Link to={`/detailVendor/${data.profile_id}`} className="text-wrap-1-5 link">
          {data.vendor}
        </Link>
        <span className="text-wrap-1-5">{data.storeName}</span>
      </TableCell>
      <TableCell align="left">
        <span className="text-wrap-2">{data.fistName + ' ' + data.lastName}</span>
      </TableCell>
      <TableCell align="left">{data.access_level}</TableCell>
      <TableCell align="left">{data.product}</TableCell>
      <TableCell align="left">{data.order.order_as_buyer}</TableCell>
      <TableCell align="left">{data.wishlist}</TableCell>
      <TableCell align="left" sx={{ width: '136px' }}>
        {handleConvertDate(data.created)}
      </TableCell>
      <TableCell align="left" sx={{ width: '136px' }}>
        {handleConvertDate(data.last_login)}
      </TableCell>
      <TableCell align="left">
        <div>
          <button className="custom-button" onClick={handlChangeCheckboxStatus}>
            <DeleteIcon />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default UserItem;
