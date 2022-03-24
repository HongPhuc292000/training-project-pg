import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { ISeller } from '../models/userModals';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props{
    data: ISeller,
    allStatus: boolean
}

function UserItem(props: Props) {
    const { data, allStatus } = props;
    const [checkboxStatus, setCheckboxStatus] = React.useState(false);
    const handleConvertDate = (dateString: string)=>{
        const dateConverted = moment(Number.parseInt(dateString) * 1000).format('lll');
        return dateConverted;
    }
    const handlChangeCheckboxStatus = ()=>{
        setCheckboxStatus(!checkboxStatus);
    }

  return (
    <TableRow key={data.profile_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <input
          checked={checkboxStatus ? checkboxStatus : allStatus}
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
          <button className="custom-button">
            <DeleteIcon />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default UserItem;
